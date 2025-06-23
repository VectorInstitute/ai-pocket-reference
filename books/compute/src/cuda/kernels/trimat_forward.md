<!-- markdownlint-disable-file MD033 -->

# Kernels for Triangular Matrix Multiplication (Trimat Forward Pass)

{{ #aipr_header }}

<!-- Main Body -->

## Introduction

This pocket reference provides efficient GPU implementations of **triangular
matrix multiplication**, as used in **causal self-attention** in autoregressive
transformer models.
For **causal (autoregressive) attention**, we only need the **lower triangle**
of the attention matrix. That is, each token should only attend to current and
previous tokens.

Computing the full matrix is wasteful when only the lower triangle is needed.
Triangular matrix multiplication is a specialized form of matrix multiplication,
where instead of computing the full output matrix, only the **lower triangle**
is computed. This leads to substantial computational savings.

This guide explains a series of CUDA kernel implementations for the **Trimat
Forward Pass**, based on the [llm.c](https://github.com/karpathy/llm.c/tree/master/dev/cuda)
GitHub repository.
These kernels avoid unnecessary computation and offer potential speedups over
cuBLAS. They are introduced in increasing order of optimization:

- [Kernel 1: `matmul_tri_naive`](#kernel-1-naive-implementation-matmul_tri_naive):
  A simple nested loop implementation with no memory optimization.
- [Kernel 2: `matmul_tri_registers`](#kernel-2-register-tiling-matmul_tri_registers):
  Uses **register tiling** to reduce redundant memory loads.
- [Kernel 3: `matmul_tri3`](#kernel-3-vectorized-loads-matmul_tri3): Adds **vectorized
  memory access** using `float4` to improve memory coalescing.
- [Kernel 4: `matmul_tri4`](#kernel-4-shared-memory-tiling-matmul_tri4):
  Leverages **shared memory** tiling for inter-thread data reuse and further
  performance gains.

The next section, [Input, Output, and
Computation](#input-output-and-computation), describes the tensor shapes, the
configuration used in the examples, and the exact computation performed during
the Trimat Forward Pass.

## Input, Output, and Computation

This section describes the structure of the input/output tensors and the
computation performed by the trimat kernels.

### Input Tensor

The input tensor packs queries and keys (and values, though unused here) in
the shape:

$$
(B, T, 3, NH, HS)
$$

where:

- \\(B\\): Batch size
- \\(T\\): Sequence length
- \\(3\\): Stacked Query, Key, and Value vectors
- \\(NH\\): Number of attention heads
- \\(HS\\): Head size, where \\(HS = C / NH\\) and \\(C\\) is the total
  channel size

Only the \\(Q\\) and \\(K\\) portions of the input are used in this
computation.

### Output Tensor

The output tensor has shape:

$$
(B, NH, T, T)
$$

where:

- \\(B\\): Batch size
- \\(NH\\): Number of attention heads
- \\(T\\): Sequence length (used for both dimensions of the attention
  matrix)

Each output slice \\([b, nh]\\) contains the attention scores for batch \\(b\\)
and head \\(nh\\).
Values above the diagonal (i.e., when a token would attend to a future token)
are ignored or masked (e.g., set to NaN).

### Configuration Used

The configurations used in the examples are:

- \\(B = 8\\): Batch size
- \\(T = 1024\\): Sequence length
- \\(C = 768\\): Total channels
- \\(NH = 12\\): Number of heads
- \\(HS = 64\\): Head size, where \\(HS = C / NH\\)

### Computation Goal

The goal is to compute the scaled dot-product attention score between queries
and keys:

$$
\text{out}[b][h][i][j] = \frac{Q[b][i][h] \cdot K[b][j][h]}{\sqrt{\text{HS}}}
\quad \text{for } j \leq i
$$

That is, for each batch \\((b)\\), head \\((h)\\), and timestep pair \\((i, j)\\)
such that \\(j \leq i\\), we compute the dot product between query vector
\\(Q\[b\]\[i\]\[h\]\\) and key vector \\(K\[b\]\[j\]\[h\]\\).
The upper triangle \\((j > i)\\) is skipped or masked due to the causal
attention constraint.

### Mathematical Illustration

To illustrate what this computation is accomplishing mathematically, consider
the following example:

Let \\(X\\) and \\(Y\\) be two 3×3 matrices. In a full matrix multiplication,
we would compute:

$$
Z = X \cdot Y =
\begin{bmatrix}
\sum_{i=1}^3 x_{1,i} y_{i,1} & \sum_{i=1}^3 x_{1,i} y_{i,2} &
\sum_{i=1}^3 x_{1,i} y_{i,3} \\\\
\sum_{i=1}^3 x_{2,i} y_{i,1} & \sum_{i=1}^3 x_{2,i} y_{i,2} &
\sum_{i=1}^3 x_{2,i} y_{i,3} \\\\
\sum_{i=1}^3 x_{3,i} y_{i,1} & \sum_{i=1}^3 x_{3,i} y_{i,2} &
\sum_{i=1}^3 x_{3,i} y_{i,3}
\end{bmatrix}
$$

However, in **triangular (causal) matrix multiplication**, we only compute the
**lower triangle**:

$$
Z_{\text{causal}} =
\begin{bmatrix}
\sum_{i=1}^3 x_{1,i} y_{i,1} & 0 & 0 \\\\
\sum_{i=1}^3 x_{2,i} y_{i,1} & \sum_{i=1}^3 x_{2,i} y_{i,2} & 0 \\\\
\sum_{i=1}^3 x_{3,i} y_{i,1} & \sum_{i=1}^3 x_{3,i} y_{i,2} &
\sum_{i=1}^3 x_{3,i} y_{i,3}
\end{bmatrix}
$$

This ensures that each row \\(i\\) only attends to columns \\(j \leq i\\),
enforcing the causal constraint.

## Kernel 1: Naive Implementation (`matmul_tri_naive`)

This is the baseline GPU kernel, designed for clarity and correctness rather
than performance.
Each thread is responsible for computing an **8×8 tile** of the output
attention matrix using a straightforward triple-nested loop.
There are **no memory optimizations**; all reads are done directly from global
memory.
It is intentionally simple and mirrors a CPU-style nested loop structure to
show what an unoptimized CUDA implementation looks like.

### Key Characteristics of Kernel 1

- **No shared memory** or caching.
- **Each thread loads \\(Q[i]\\) and \\(K[j]\\)** directly from global memory.
- Computes **64 dot products** per thread (8 queries × 8 keys).
- Causal masking is enforced by skipping blocks where \\(j > i\\).
- **Upper triangle is ignored**, though some redundant work may occur inside
  diagonal blocks.

Below is a visualization of how threads compute 8×8 blocks in the output
matrix:

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/trimat_forward/kernel1.svg" alt="Kernel 1 Diagram" width="100%"> <!-- markdownlint-disable-line MD013 -->
</center>
</figure>

## Kernel 2: Register Tiling (`matmul_tri_registers`)

This kernel improves performance by leveraging **register tiling**.
Each thread still computes an **8×8 tile** of the output, but instead of
reading query and key vectors from global memory multiple times, each thread
loads its \\(Q\\) and \\(K\\) vectors into registers for reuse.

### Key Characteristics of Kernel 2

- One thread per **8×8 tile**, same as Kernel 1.
- \\(Q\\) and \\(K\\) values are loaded into **`float lhs[8]` and `float rhs[8]`**
  arrays in registers.
- Loops over the head size \\((HS)\\) to compute 64 dot products per thread.
- **No shared memory**, but much better memory locality than Kernel 1.
- Still performs some redundant computation above the diagonal (ignored due to
  masking).
- Faster than Kernel 1 due to fewer global loads.

See **Figure 2** for a visualization of how registers are used to tile the data
within a thread:

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/trimat_forward/kernel2.svg" alt="Kernel 2 Diagram" width="100%"> <!-- markdownlint-disable-line MD013 -->
</center>
</figure>

## Kernel 3: Vectorized Loads (`matmul_tri3`)

This kernel builds on Kernel 2 by introducing **vectorized and coalesced
memory access** using `float4` loads.
The goal is to improve global memory bandwidth utilization by aligning reads
and writes to 16-byte boundaries.

### Key Characteristics of Kernel 3

- Each thread still computes an **8×8 tile** (64 dot products).
- \\(Q\\) and \\(K\\) values are loaded using `float4` for better memory coalescing.
- Improves memory access patterns by reducing the number of memory
  transactions.
- No shared memory; only register reuse + vectorized reads and writes.
- Uses `ld_vec()` and `st_vec()` helper functions to safely cast pointers to
  `float4`.
- Faster than Kernel 2 due to reduced memory traffic.

## Kernel 4: Shared Memory Tiling (`matmul_tri4`)

This kernel introduces **shared memory tiling** to improve memory reuse across
threads in a thread block.
Threads collaborate to load tiles of the \\(Q\\) and \\(K\\) matrices into
shared memory,
significantly reducing global memory accesses.

### Key Characteristics of Kernel 4

- Uses shared memory arrays: `lhs_s[128][32]`, `rhs_s[128][32]`.
- 16×16 threads cooperatively load **128 rows × 32 dimensions** from \\(Q\\)
  and \\(K\\) into shared memory.
- Computes **8×8 tiles** per thread, iterating over \\(HS / 32\\) slices to
  accumulate dot products.
- Final results are written with **vectorized `float4` stores** for efficient
  global memory writes.

See **Figure 4** for an illustration of shared memory tiling and accumulation:

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/compute/trimat_forward/kernel4.svg" alt="Kernel 4 Diagram" width="100%"> <!-- markdownlint-disable-line MD013 -->
</center>
</figure>

## References

1. [llm.c CUDA kernels](https://github.com/karpathy/llm.c/tree/master/dev/cuda)
2. [Scaled Dot-Product Attention (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762)
3. [CUDA Programming Guide: Memory
   Coalescing](https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html#memory-coalescing)

<!-- Contributors -->

{{#author kohankhaki}}
