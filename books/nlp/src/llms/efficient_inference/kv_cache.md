<!-- markdownlint-disable-file MD033 -->

# KV Cache

<!-- Header -->

{{ #aipr_header }}

<!-- Main Body -->

With autoregressive models like decoder-only LLMs (i.e., GPTs), inference is performed
by predicting one token at a time, using the past token generations as inputs for
future ones. To predict future tokens, certain computed representations of these
past tokens are required for every future token prediction. This makes it computationally
inefficient to recalculate these representations at each token generation step."

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/nlp/kv-cache-final.excalidraw.svg" alt="kv-cache"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Figure: KV Cache for autoregressive inference
</div>

To formalize this, let \\(x_1,x_2, \ldots, x\_{t-1}\\) represent the input sequence
of \\(h\\) dimensional embeddings i.e., \\(x_i \in R^{1\times h}\\). For simplicity,
let's consider a single [Attention](../architecture/attention.md) head and a single
[Transformer](../architecture/transformer.md) block. In order to get the logits
for the next token, the LLM must compute the contextualized vector \\(c\_{t-1}\\)
given by:

$$
\begin{aligned}
c_{t-1} &= f_{attn}(x_1, x_2, \ldots, x_{t-1}; W_k, W_v, W_q),
\end{aligned}
$$

where \\(f\_{attn}(\cdot)\\) is the attention operator that produces a contextualized
vector using all of the input embedding vectors, and \\(W_k\\), \\(W_v\\) and \\(W_q\\)
are the \\(h\times h\\) projection matrices for keys, values, and queries, respectively.
(Note that the Attention module computes the contextualized vectors of all input
embeddings simultaneously, employing causal masking to ensure that each token
only attends to itself and previous tokens in the sequence.)

Recall that with the attention operator, we first need to compute the various keys
and values representations of the input embeddings as well as the query
representation of \\(x\_{t-1}\\):

$$
K_{t-1} = \begin{bmatrix}
x_1 W_k \\\\
x_2 W_k \\\\
\vdots \\\\
x_{t-1} W_k
\end{bmatrix},
\quad
V_{t-1} = \begin{bmatrix}
x_1 W_v \\\\
x_2 W_v \\\\
\vdots \\\\
x_{t-1} W_v
\end{bmatrix},
\quad
\text{and}
\quad
q_{t-1} = x_{t-1}W_q.
$$

Using scaled-dot attention, we combine the keys with the query to derive an attention
weights vector via:

$$
a_{t-1} = \text{Softmax}(q_{t-1} K_{t-1}^T / \sqrt{h}).
$$

Finally, the contextualized vector of the (\\(t-1)\\)-th token is the attention-weighted
combination of the values vectors:

$$
c_{t-1} = a_{t-1} V_{t-1}.
$$

The LLM ultimately makes use of this contexualized vector to build the logits for
the \\(t\\)-th token prediction. Let's suppose that \\(x_t\\) is generated from
such logits.

With \\(x_t\\) generated, we aim to predict the next token. To do so, we now
need to build the contextualized vector, \\(c_t\\):

$$
\begin{aligned}
c_t &= f_{attn}(x_1, x_2, \ldots, x_{t-1}, x_t; W_k, W_v, W_q),
\end{aligned}
$$

As before, we understand that in order to apply this operator, the following keys,
values and query are required:

$$
K_{t} = \begin{bmatrix}
x_1 W_k \\\\
x_2 W_k \\\\
\vdots \\\\
x_{t-1} W_k \\\\
x_t W_k
\end{bmatrix},
\quad
V_{t} = \begin{bmatrix}
x_1 W_v \\\\
x_2 W_v \\\\
\vdots \\\\
x_{t-1} W_v \\\\
x_t W_v
\end{bmatrix},
\quad
\text{and}
\quad
q_t = x_{t}W_q.
$$

It immediately follows though that

$$
K_{t} = \begin{bmatrix}
K_{t-1} \\\\
x_t W_k
\end{bmatrix}
\quad
\text{and}
\quad
V_{t} = \begin{bmatrix}
V_{t-1} \\\\
x_t W_v
\end{bmatrix}.
$$

In other words, the keys and values required to build \\(c_t\\) consist of all the
previous keys and values needed for \\(c\_{t-1}\\) plus only the new key and value
derived from the latest input embedding token \\(x_t\\).

This insight presents an opportunity to significantly reduce computational overhead
during generation by caching and reusing past keys and values rather than recomputing
them.

This is exactly the purpose of having a KV Cache. At each iteration of inference,
we compute the newest key and value emanating from the latest input embedding
token and add it to the respective caches, one for each keys and values.

> **Algorithm: KV Cache for Autoregressive Inference**
>
> _Pre-fill Stage_\
> Given input sequence \\(x_1, x_2, \ldots, x_n\\)\
> Initialize key cache \\(K_n = [x_1W_k; x_2W_k; \ldots; x_nW_k]\\)\
> Initialize value cache \\(V_n = [x_1W_v; x_2W_v; \ldots; x_nW_v]\\)
>
> _Decode Stage_\
> Loop for each token generation step t > n:\
> \\(\quad\\)Compute new key and value: \\(k_t = x_t W_k\\), \\(v_t = x_t W_v\\)\
> \\(\quad\\)Update caches by appending new key and value:\
> \\(\qquad\\)\\(K_t = [K\_{t-1}; k\_t]\\)\
> \\(\qquad\\)\\(V_t = [V\_{t-1}; v\_t]\\)\
> \\(\quad\\)Compute attention using cached keys and values:\
> \\(\qquad\\)\\(q_t = x_t W_q\\)\
> \\(\qquad\\)\\(c_t = \text{Softmax}(q_t K_t^T / \sqrt{h}) V_t\\)\
> \\(\quad\\)Compute next token logits using \\(c_t\\)\
> \\(\quad\\)Generate \\(x\_{t+1}\\) // (which becomes part of the next step's input)

## Limitations

Note that LLMs use Multi-Head Attention modules with several Transformer layers.
Each attention head would need to maintain its own KV Cache and as such, the memory
requirements can be quite expensive. As one example, Liu et al (2024) note that
with 540B PaLM, using a batch size of 512 and context length of 2048, would required
a KV Cache that can take upwards of 3TB of memory — more than the amount of memory
required to hold the model's weight parameters.

This memory bottleneck becomes especially pronounced when serving multiple requests
simultaneously or working with very long context windows.

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [Liu, Zirui, et al. "Kivi: A tuning-free asymmetric 2bit quantization for kv
   cache." arXiv preprint arXiv:2402.02750 (2024).](https://arxiv.org/pdf/2402.02750)
1. [_Raschka, Sebastian. Build a Large Language Model (From Scratch). Simon and
   Schuster, 2024._](https://www.amazon.com/Build-Large-Language-Model-Scratch/dp/1633437167)
1. [Rajan, R. "KV Cache - Understanding the Mechanism behind it." R4J4N Blogs,
   r4j4n.github.io/blogs/posts/kv/. Accessed 27 Feb. 2025.](https://r4j4n.github.io/blogs/posts/kv/)

<!-- Contributions -->

{{ #author nerdai }}
