# Kernels for softmax forward pass

<!-- Header -->

{{ #aipr_header }}

<!-- Main Body -->

## Introduction

The Softmax operation converts a vector of real numbers into a probability distribution. It is typically applied along the last dimension of an activation tensor, and commonly used in classification tasks. Mathematically, the Softmax function is defined as:

$$
y_i = \frac{e^{x_i}}{\sum_{j=1}^{K} e^{x_j}}
$$

where $x_i$ represents the input score for class $i$, and the denominator sums over all classes $K$ to ensure the resulting probabilities sum to 1. To improve numerical stability and avoid overflow issues, it is standard practice to modify the computation by subtracting the maximum input value $x_{\text{max}}$ from each score before exponentiation:

$$
y_i = \frac{e^{x_i - x_{\text{max}}}}{\sum_{j=1}^{K} e^{x_j - x_{\text{max}}}}
$$

This pocket reference provides a detailed breakdown and practical CUDA kernel implementations of the Softmax operation based on the
[llm.c](https://github.com/karpathy/llm.c/tree/master/dev/cuda) github repository. For the purpose of this pocket reference, we will implement Softmax kernels in the [Transformer](../../../../nlp/src/llms/architecture/transformer.md) architecture. The input tensor shape for the Softmax operation is expected to be a **tensor of shape $(B, T, V)$**, where:

- $B$ is the batch size,
- $T$ is the sequence length,
- $V$ is the vocabulary size.

Softmax is applied along the vocabulary dimension $V$. For benchmarking purposes, we use the following configuration:

- $B = 8$
- $T = 1024$
- $V = 50257$ (Vocabulary size for GPT-2 and GPT-3)

We use the above configuration on an NVIDIA T4 GPU with a block size of 512:

| Kernel   | Execution Time (ms) | Improvement (%) |
|----------|---------------------|-----------------|
| Kernel 1 | 162.3272            | 0.0%            |
| Kernel 2 | 48.6429             | 70.0%           |
| Kernel 4 | 50.7793             | 68.7%           |

<img width="600" alt="mem_v_blk" src="https://github.com/user-attachments/assets/91836c75-3f5e-4f49-a873-7972cfee9630">

## Kernel 1

Kernel 1 is a naive port from CPU code. It parallelizes over $B$ and $T$, where each thread independently computes one segment corresponding to the vocabulary dimension $V$. Therefore, each thread iterates sequentially over all elements in its assigned vocabulary segment.The kernel logic for each row ($i$) is executed in the following steps:

1. **Compute the row-wise maximum value for numerical stability:**

$$
x_{\text{max}} = \max_{1 \leq i \leq V} x_i
$$

2. **Subtract the maximum value from each element and exponentiate, and compute the sum:**

$$
expSum = \sum_{i=1}^{V} e^{x_i - x_{\text{max}}}
$$

3. **Divide each exponential by the sum to normalize:**

$$
y_i = \frac{e^{x_i - x_{\text{max}}}}{expSum}
$$

<img width="600" src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/layernorm_kernel/layernorm_kernel1.svg" alt="layernorm_kernel1"> <!-- markdownlint-disable-line MD013 -->

This kernel uses a straightforward 1D grid and block structure to map threads to segments in the  $B * T$ space. Here is the CUDA code for kernel 1

```V
__global__ void softmax_forward_kernel1(float* out, const float* inp, int N, int V) {
    // inp is (N, V), where N = B * T
    // out is (N, V), each row of inp will get softmaxed
    // one thread per row
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    // bounds check (necessary when threads exceed N)
    if (i < N) {
        const float* inp_row = inp + i * V;
        float* out_row = out + i * V;

        // Step 1: Find max val of each row for numerical stability
        float maxval = -INFINITY;
        for (int j = 0; j < V; j++) {
            if (inp_row[j] > maxval) {
                maxval = inp_row[j];
            }
        }

        // Step 2: Compute exponentials and sum them up
        double sum = 0.0;
        for (int j = 0; j < V; j++) {
            out_row[j] = expf(inp_row[j] - maxval);
            sum += out_row[j];
        }

        // Step 3: Normalize each exponential by the sum
        for (int j = 0; j < V; j++) {
            out_row[j] /= (float)sum;
        }
    }
}
```

## Kernel 2

Kernel 2 is a fused kernel that parallelizes across all 3 dimensions of $B$, $T$, and $V$. In comparison with Kernel 1, Kernel 2 improves performance by:

* Leveraging **thread-level parallelism** within each row across dimension $V$.
  * Multiple threads compute over one row in parallel.
* Using **shared memory** for fast intra-block communications.
  * Used to store intermediate results within a block, reducing the latency associated with global memory access.
* **Thread coarsening** for efficient memory access.
  * Instead of one thread computing just one element, each thread computes multiple elements, better utilizing memory bandwidth.
* **Parallel reduction** for both max and sum calculations.
  * Efficiently computes scalar reductions by parallelizing operations within each CUDA block, significantly reducing computational overhead and latency.
 
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/layernorm_kernel/layernorm_kernel2.svg" alt="layernorm_kernel2"> <!-- markdownlint-disable-line MD013 -->

Kernel 2 can be broken down into the following steps:

1. **Compute the row-wise maximum value for numerical stability**
   - Each thread fins max across its assigned elements
   - Use parallel reduction to find global max across all threads
```C
    // Pointer to current row in input
    const float* x = inp + idx * V; 

    // Thread coarsening: Each thread handles multiple elements (stride = block size)
    float maxval = -INFINITY;
    for (int i = tid; i < V; i += block_size) {
        maxval = fmaxf(maxval, x[i]);
    }

    // Store thread-local max values in shared memory
    shared[tid] = maxval

    // Perform parallel reduction in shared memory
    for (int stride = block_size / 2; stride >= 1; stride /= 2) {
        // Ensure all threads have written before reading
        __syncthreads();
        if (tid < stride) {
            shared[tid] = fmaxf(shared[tid], shared[tid + stride]);
        }
    }
    // Ensure reduction complete
    __syncthreads();

    // global maximum for this row
    float offset = shared[0];
```

2. **Exponentiation and compute the sum**
   - Compute exponentials and store them in global memory
   - Compute the sum of exponentials in parallel
```C
// Compute exponentials with numerical stability (x - maxval)
for (int i = tid; i < V; i += block_size) {
    out[idx * V + i] = expf(x[i] - offset);
}
__syncthreads();

// Prepare for summation (point x to the exponentials stored in 'out')
x = out + idx * V;
float sumval = 0.0f;

// Thread coarsening for summation
for (int i = tid; i < V; i += block_size) {
    sumval += x[i];
}

shared[tid] = sumval;
```

3. **Parallel reduction to find global sum**
   - Reduce individual thread sums into a single global sum
```C
// Paralle reduction to compute the global sum
for (int stride = block_size / 2; stride >= 1; stride /= 2) {
    __syncthreads();
    if (tid < stride) {
        shared[tid] += shared[tid + stride];
    }
}
// Broadcast the sum to all threads in the block
__syncthreads();
float sum = shared[0]; // global sum of exponentials
```

4. **Normalization**
   - Each thread normalizes the exponentials to obtain final probabilities.
```C
// Normalize each exponential by dividing by the sum to produce probabilities
for (int i = tid; i < V; i += block_size) {
    out[idx * V + i] = x[i] / sum;
}
```

Here is the complete CUDA code for kernel 2:

```C
__global__ void softmax_forward_kernel2(float* out, const float* inp, int N, int V) {
    // inp is (N, V), where N = B * T
    // in each row of V elements, first calculates maxval, then returns expf(val - maxval)
    extern __shared__ float shared[]; // Shared memory allocation
    int idx = blockIdx.x; // Block ID corresponds to row ID, ranges [0, N)
    int tid = threadIdx.x; // Thread ID within the block, ranges [0, block_size)
    int block_size = blockDim.x; // Total threads per block

    const float* x = inp + idx * V; // idx-th row of inp
    float maxval = -INFINITY;
    // Thread coarsening
    for (int i = tid; i < V; i += block_size) {
        maxval = fmaxf(maxval, x[i]);
    }
    shared[tid] = maxval;
    // Parallel reduction in shared memory
    for (int stride = block_size / 2; stride >= 1; stride /= 2) {
        __syncthreads();
        if (tid < stride) {
            shared[tid] = fmaxf(shared[tid], shared[tid + stride]);
        }
    }
    __syncthreads();
    float offset = shared[0];
    // Compute expf and write the intermediate result to global memory
    for (int i = tid; i < V; i += block_size) {
        out[idx * V + i] = expf(x[i] - offset);
    }
    __syncthreads();
    
    x = out + idx * V; // idx-th row of out
    float sumval = 0.0f;
    // Thread coarsening again for summation
    for (int i = tid; i < V; i += block_size) {
        sumval += x[i];
    }
    shared[tid] = sumval;
    // Parallel reduction to compute global sum
    for (int stride = block_size / 2; stride >= 1; stride /= 2) {
        __syncthreads();
        if (tid < stride) {
            shared[tid] += shared[tid + stride];
        }
    }
    // Broadcast the sum to all threads in the block
    __syncthreads();
    float sum = shared[0];
    // Normalize each exponential by dividing by the sum 
    for (int i = tid; i < V; i += block_size) {
        out[idx * V + i] = x[i] / sum;
    }
}
```



<!-- Contributors -->

{{#author VectorInstitute}} <!-- replace VectorInstitute with your github user -->
