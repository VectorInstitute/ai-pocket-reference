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

## Kernel 1

The first kernel is a naive port from CPU code. It parallelizes over $B$ and $T$, where each thread independently computes one segment corresponding to the vocabulary dimension $V$. Therefore, each thread iterates sequentially over all elements in its assigned vocabulary segment.The kernel logic for each row ($i$) is executed in the following steps:

1. **Compute the maximum value of each row for numerical stability:**

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

This kernel uses a straightforward 1D grid and block structure to map threads to segments in the  $B * T$ space. Here is the CUDA code for kernel 1

```C
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

<!-- Contributors -->

{{#author VectorInstitute}} <!-- replace VectorInstitute with your github user -->