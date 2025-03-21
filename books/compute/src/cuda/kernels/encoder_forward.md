# Kernels for positional encoder forward pass in GPT-2

<!-- Header -->

{{ #aipr_header }}

<!-- Main Body -->

## Introduction

After tokenization, batches of input texts would be turned into arrays of token ids . The GPT-2 Encoder will turn these input ids into hidden representations that can be proceessed with the remainder of the transformer blocks:

- Input: 
    - "input" `inp`, produced by the tokenizer- An integer array of shape $(B,\, T)$, where $B$ denotes the batch size (a total of $B$ sequences in the batch) while $T$ denotes the tokens in each sequence (each sequence contains a maximum of $T$ tokens.)
    - token embeddings `wte`, from the model parameters- a float array of shape (vocab\_size, $C$), where $C$ is the latent dimension of this transformer model. The $n$th row of this matrix is the embedding vector for the $n$th token.
    - position embeddings `wpe`, provided- a float array of shape (max\_length, $C$), where $C$ is the latent dimension of the transformer model. The $n$th role of this matrix represents the position embedding vector for the a token at position $n$ .
- Output: float tensor of shape $(B, T, C)$, where in addition to the batch ($B$) and sequence length ($T$) dimension, a "channel" $C$ is added ($C$ is the same as the latent embedding dimension of the transformer.) 

![GPT-2 Encoder Input and Output Format](./imgs/encoder_overview.svg)

Unlike most other parts of a transformer, the embedding kernel contains notably few calculations- for the forward pass, both the word embeddings and the position embeddings are **pre-computed** and available as arrays in memory. The only job of the encoder kernel is to load the appropriate rows from both matrices, add these togehter, and write the sum to the appropriate location in memory.

## Kernel 1 

![GPT-2 Encoder Kernel 1](./imgs/encoder_kernel1.svg)

THis kernel uses a total of $B \times T$ threads, where each thread handles a token in the $(B,\, T)$ input array. Within each thread, a for-loop iterates over the hidden dimensions, reading one float from `wte` and from `wpe`, take the sum, and write the sum to the output tensor. 

While this approach might work fine on CPU because of the predictable memory access pattern, the for-loop approach does not fully unleash the multiprocessing potentials of the GPU.

## Kernel 2

![GPT-2 Encoder Kernel 2](./imgs/encoder_kernel2.svg)

This kernel uses substantially more threads than kernel 1, a total of $B \times T \times C$, one for each element in the output. (Recall that in modern GPTs, the hidden dimension $C$ is usually in the thousands if not larger.) Each thread handles one float in the output tensor- the thread would read one float from the `wte` token embedding array, one float from the `wpe` position embedding array, sum the two floating point numbers, and write the result to the appropriate location in the output tensor.

This appraoch improves over kernel 1 by using many more threads in parallel. However, since each thread needs to do its own memory read/write, the memory access pattern becomes a lot less predictable. Random memory access might quickly become a bottleneck for this approach.

## Kernel 3

![GPT-2 Encoder Kernel 3](./imgs/encoder_kernel3.svg)

On NVIDIA GPUs, reading and writing consecutive chunks of memory at a time can be significantly more efficient than doing so one byte at a time. This kernel leverages this feature to make processing a lot more efficient. 


While in the kernel, the additions are defined in a for-loop across the $\texttt{x128::size}$, one floating point number at a time, the kernel uses `#pragma unroll` to automatically optimizes this part of the code during compilation.

## References

1. Code for encoder forward kernels from [llm.c](https://github.com/karpathy/llm.c/blob/master/dev/cuda/encoder_forward.cu)

<!-- Contributors -->

{{#author VectorInstitute}} <!-- replace VectorInstitute with your github user -->
