<!-- markdownlint-disable-file MD033 -->
<!-- Header -->

# Kernels for LayerNorm forward pass

{{ #aipr_header }}

<!-- Main Body -->

## Introduction

The Layer Normalization (LayerNorm) operation applies normalization across the
last D dimensions of the activation tensor as described in
[this foundational paper](https://arxiv.org/abs/1607.06450) by Ba et al. (2016).
The normalization equation is given below:

<<<<<<< HEAD
$$y = \frac{x - \mathbb{E}[x]}{\sqrt{Var[x] + \epsilon}} \times \gamma + \beta$$
=======
$$y = \frac{x - \mathbb{E}[x]}{\sqrt{Var[x] + \epsilon}} * \gamma + \beta$$
>>>>>>> 522c130 (Fix latex bug)

where, \\(\mathbb{E}[z]\\) and \\(Var[z]\\) are the expectation and variance
of random variable \\(z\\), respectively. Note that in the above \\(\epsilon\\)
is a small term for to avoid division by zero errors, whereas \\(\gamma\\) and \\(\beta\\)
are scale and shift parameters, respectively.

This pocket reference outlines and provides a detailed explanation
of a series of CUDA kernel implementations of LayerNorm forward pass based on the
[llm.c](https://github.com/karpathy/llm.c/tree/master/dev/cuda) github repository.
Please refer to the [Layer Normalization](../../../../fundamentals/src/normalizations/layernorm.md)
pocket reference for conceptual understanding and other details about the operation.
For the purpose of this pocket reference, lets implement kernels for LayerNorm
in the [Transformer](../../../../nlp/src/llms/architecture/transformer.md)
architecture for language modeling. The input to the LayerNorm operation
is expected to be **a tensor of shape \\((B, T, C)\\) as input**, where:

- \\(B\\) is the batch size
- \\(T\\) is the sequence length
- \\(C\\) is the hidden dimension size.

LayerNorm is applied along the last dimension \\(C\\).
For benchmarking purposes, we use the following configuration:

- \\(B = 8\\)
- \\(T = 1024\\)
- \\(C = 768\\)

The following table shows memory bandwidth for each kernel on a **A40 GPU for
block size 512**. The last column shows improvement **over the first kernel**:

| Kernel # | Bandwidth (GB/s) | Improvement |
| :------- | ---------------: | :---------- |
| 1        |            41.43 | -           |
| 2        |           201.25 | 4.9x        |
| 3        |           362.10 | 8.7x        |
| 4        |           432.03 | 10.4x       |
| 5        |           538.88 | 13x         |

## Kernel 1

The first kernel is a copy of the CPU implementation. It parallelizes
over the first 2 dimensions, \\(B\\) and \\(T\\), where \\(N = B\*T\\).
**A single thread (see Figure-1a) is responsible for normalizing**
**one segment of size C**, hence it loops over all elements
in that segment. The kernel code is broken down into 4 steps:

1. Mean calculation

   $$\mathbb{E}[x] = \frac{1}{C} \sum_{i=1}^{C} x_i$$

2. Variance and reciprocal of standard deviation (rstd) calculation
<<<<<<< HEAD

   $$Var[x] = \frac{1}{C} \sum_{i=1}^{C} (x_i - \mathbb{E}[x])^2$$

   $$rstd[x] = \frac{1}{\sqrt{Var[x] + \epsilon}}$$

3. Apply mean and variance normalization and then scale and
   shift with the learnable weight and bias parameters

   $$y_i = ((x_i - \mathbb{E}[x]) * rstd[x]) * \gamma_i + \beta_i$$

=======
$$Var[x] = \frac{1}{C} \sum_{i=1}^{C} (x_i - \mathbb{E}[x])^2$$
$$rstd[x] = \frac{1}{\sqrt{Var[x] + \epsilon}}$$
3. Apply mean and variance normalization and then scale and shift with the learnable weight and bias parameters
$$y_i = ((x_i - \mathbb{E}[x]) * rstd[x]) * \gamma_i + \beta_i$$
>>>>>>> 522c130 (Fix latex bug)
4. Store mean and rstd for backward pass

The kernel uses a 1D grid and block as shown in Figure-1a.
Also note that all operations are implemented in a single kernel.

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/layernorm_kernel/layernorm_kernel1.svg" alt="layernorm_kernel1"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Figure-1a: Kernel 1 Illustration.
</div>

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/layernorm_kernel/layernorm_kernel1_code.png" alt="layernorm_kernel1_code"> <!-- markdownlint-disable-line MD013 -->
</center>

<div class="figure-caption"
     style="text-align: center; font-size: 0.8em; margin-top: 10px;">
Figure-1b: Kernel 1
<a href="https://github.com/VectorInstitute/ai-pocket-reference-code/blob/main/cuda/layernorm/layernorm_forward.cu#L61">
Code</a>.
</div>

## Kernel 2

In Kernel 2, steps 1, 2 and 3 are implemented as separate kernels. For the _mean_
and _rstd_ kernels, **each block is responsible for one segment of C** instead of
each thread (see Figure-2a) which allows for further parallelization. Whereas for
the _normalization_ kernel (step 3), each thread calculates one output element.

Since both the _mean_ and _rstd_ calculations involve the sum operation, they
make use of _thread coarsening_ and _reduction_. In _thread coarsening_, each
thread sums corresponding elements and stores it in a _shared memory array_
(same size as the thread block). In _reduction_, the elements in the _shared
array_ are iteratively reduced to obtain the final sum. For more details,
see the [thread coarsening](../concepts/thread_coarsening.md)
and [reduction](../concepts/reduction.md) pocket references.

These optimizations lead to an improvement of **~5x over Kernel 1** (for block
size 512).

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/layernorm_kernel/layernorm_kernel2.svg" alt="layernorm_kernel2"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Figure-2a: Kernel 2 Illustration - mean and rstd kernels.
</div>

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/layernorm_kernel/layernorm_kernel2_code1.png" alt="layernorm_kernel2_code1"> <!-- markdownlint-disable-line MD013 -->
</center>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/layernorm_kernel/layernorm_kernel2_code2.png" alt="layernorm_kernel2_code2"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
<!-- markdownlint-disable MD033 -->
Figure-2b: Kernel 2
<a href="https://github.com/VectorInstitute/ai-pocket-reference-code/blob/main/cuda/layernorm/layernorm_forward.cu#L123">Code</a>.
<!-- markdownlint-disable MD033 -->
</div>

## Kernel 3

Kernel 3 introduces the use of _cooperative groups_, allowing us to utilize
thread groups of arbitrary sizes (multiples of 2) that are not limited to the thread
block. The _cooperative groups_ concept provides thread group classes
(`tiled_partition<N>(g)`) with useful methods such as `thread_rank()`,
which returns the id of the current thread in that group (similar to
`threadId.x`), and `reduce()`, which performs a _reduction_ operation
(similar to that described in Figure-2a) on the values assigned to variables for
threads in that group. The _cooperative groups_ objects are defined within the
`cooperative_groups` namespace.

This kernel uses a thread group (or tile) size of 32 to align with the number of
threads in a _warp_ (let's refer to this thread group as a warp). Hence, **one
warp is responsible for one segment of C** in Kernel 3 (see Figure-3a - A warp of
size 4 is used for simplicity). Also note that all operations are again combined
in a single kernel.

This kernel also includes a few additional changes:

1. Use of the [`__restrict__` keyword](https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html#restrict):
   This allows the compiler to perform further optimizations through reduced
   memory accesses and computation.
2. Use of [Cache Operators](https://docs.nvidia.com/cuda/parallel-thread-execution/index.html#cache-operators):
   `__stcs()` and `__ldcs()` limit cache pollution.

These optimizations lead to an improvement of **~1.8x over Kernel 2** (for block
size 512).

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/layernorm_kernel/layernorm_kernel3.svg" alt="layernorm_kernel3"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Figure-3a: Kernel 3 Illustration.
</div>

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/layernorm_kernel/layernorm_kernel3_code.png" alt="layernorm_kernel3_code"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
<!-- markdownlint-disable MD033 -->
Figure-3b: Kernel 3
<a href="https://github.com/VectorInstitute/ai-pocket-reference-code/blob/main/cuda/layernorm/layernorm_forward.cu#L233">Code</a>.
<!-- markdownlint-disable MD033 -->
</div>

## Kernel 4

This kernel is similar to Kernel 3, except for the formula used to calculate
variance. The variance is calculated as follows, leading to fewer subtraction
operations:

$$Var[x] = \mathbb{E}[x^2] - (\mathbb{E}[x])^2$$

This simple change also leads to a small improvement of **~1.2x over Kernel 3**
(for block size 512).

## Kernel 5

The final kernel operates in two stages. Similar to Kernel 2, **each block is
responsible for one segment of C**. In stage 1, even though _thread coarsening_
is done on the block level, the first _reduction_ is done on the warp level.
This sum is written into a _shared memory array_ whose size is equal to the
number of warps. In stage 2, the threads in the first warp are re-used to
perform another _warp reduction_ on the _shared array_ to obtain the final sum.
There is no _thread coarsening_ for this stage. See Figure-4a for the complete
flow.

The final kernel improves by **~1.25x over Kernel 4** and **~13x over the first
kernel** (for block size 512).

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/layernorm_kernel/layernorm_kernel5.svg" alt="layernorm_kernel5"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Figure-4a: Kernel 5 Illustration.
</div>

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/layernorm_kernel/layernorm_kernel5_code.png" alt="layernorm_kernel5_code"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
<!-- markdownlint-disable MD033 -->
Figure-4b: Kernel 5
<a href="https://github.com/VectorInstitute/ai-pocket-reference-code/blob/main/cuda/layernorm/layernorm_forward.cu#L377">Code</a>.
<!-- markdownlint-disable MD033 -->
</div>

## Summary

The following figure provides a summary of the memory bandwidth
for all kernels on a A40 GPU across different block sizes:

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/layernorm_kernel/layernorm_bandwidth_line_chart_a40.png" alt="layernorm_bandwidth_line_chart_a40"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Figure-5: A40 Memory Bandwidth Summary.
</div>

#### References and Useful Links <!-- markdownlint-disable-line MD001 -->

1. Code for LayerNorm forward kernels
   from the [llm.c](https://github.com/karpathy/llm.c/blob/master/dev/cuda/layernorm_forward.cu)
   github repository
2. [Layer Normalization paper](https://arxiv.org/abs/1607.06450)
3. [CUDA C++ Programming Guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html)
4. [CUDA Parallel Thread Execution (PTX) Guide](https://docs.nvidia.com/cuda/parallel-thread-execution/index.html)

<!-- Contributors -->

{{#author xeon27}}
