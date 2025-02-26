# KV Cache

<!-- Header -->

{{ #aipr_header }}

<!-- Main Body -->

With autoregressive models like decoder-only LLMs (i.e., GPTs), inference is performed
by predicting one token at a time, using the past token generations as inputs for
future ones. To predict future tokens, certain computed representations of these
past tokens are required for every future token prediction. As such, it can become
quite wasteful to have to re-compute these representations at every token prediction
step.

To formalize this, let \\(x_1,x_2, \ldots, x\_{t-1}\\) represent the input sequence
of \\(h\\) dimensional embeddings i.e., \\(x_i \in R^{1\times h}\\). For simplicity,
let's consider a single Attention head and a single Transformer block. In order
to get the logits for the next token, the LLM must compute the contextualized vector
\\(c\_{t-1}\\) given by:

$$
\begin{aligned}
c_{t-1} &= \mathbf{Attn}(x_1, x_2, \ldots x_{t-1}),
\end{aligned}
$$

Recall that to compute attention, we need to compute the various keys and values
representations of the input embeddings as well as the query representation of \\(x\_{t-1}\\):

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

Using scaled-dot attention, we turn these keys and values into an attention weights
vector via:

$$
a_{t-1} = \mathbf{Softmax}(q_{t-1} K_{t-1}^T / \sqrt{h}).
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
c_t &= \mathbf{Attn}(x_1, x_2, \ldots x_{t-1}, x_t).
\end{aligned}
$$

As before, we understand that we need the following keys and values:

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

However, it is also straightforward to see that

$$
K_{t} = \begin{bmatrix}
K_{t-1} \\\\
x_t W_k
\end{bmatrix},
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

Rather than re-computing \\(K\_{t-1}\\) and \\(V\_{t-1}\\), it'd be more efficient
if these past keys and values were cached and be simply re-used for future
computations. This is exactly what the KV Cache is used for. At each iteration of
inference, we compute the newest key and value emanating from the latest input embedding
token and add it to the respective cache.

## Limitations

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [Liu, Zirui, et al. "Kivi: A tuning-free asymmetric 2bit quantization for kv
   cache." arXiv preprint arXiv:2402.02750 (2024).](https://arxiv.org/pdf/2402.02750)
1. [_Raschka, Sebastian. Build a Large Language Model (From Scratch). Simon and
   Schuster, 2024._](https://www.amazon.com/Build-Large-Language-Model-Scratch/dp/1633437167)

<!-- Contributions -->

{{ #author nerdai }}
