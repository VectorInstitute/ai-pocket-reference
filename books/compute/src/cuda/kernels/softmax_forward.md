# Kernels for softmax forward pass

<!-- Header -->

{{ #aipr_header }}

<!-- Main Body -->

## Introduction

The Softmax operation converts a vector of real numbers into a probability distribution. It is typically applied along the last dimension of an activation tensor, and commonly used in classification tasks. Mathematically, the Softmax function is defined as:

$$
y_i = \frac{e^{x_i}}{\sum_{j=1}^{C} e^{x_j}}
$$

where $x_i$ represents the input score for class $i$, and the denominator sums over all classes $C$ to ensure the resulting probabilities sum to 1. To improve numerical stability and avoid overflow issues, it is standard practice to modify the computation by subtracting the maximum input value $x_{\text{max}}$ from each score before exponentiation:

$$
y_i = \frac{e^{x_i - x_{\text{max}}}}{\sum_{j=1}^{C} e^{x_j - x_{\text{max}}}}
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

The first kernel is a naive port from CPU code. It parallelizes over $B$ and $T$, and loops over $V$. The kernel logic is executed in the following steps:

1. **Compute the maximum value for numerical stability:**

$$
x_{\text{max}} = \max_{1 \leq i \leq V} x_i
$$

2. **Compute the exponentials and their sum:**

$$
expSum = \sum_{i=1}^{V} e^{x_i - x_{\text{max}}}
$$

3. **Normalize the exponentials to obtain probabilities:**

$$
y_i = \frac{e^{x_i - x_{\text{max}}}}{expSum}
$$

<!-- Contributors -->

{{#author VectorInstitute}} <!-- replace VectorInstitute with your github user -->