<!-- markdownlint-disable-file MD033 MD013, MD053 -->

# Foundational FL Techniques

{{ #aipr_header }}

In this section, [FedSGD](fedsgd.md) and [FedAvg](fedavg.md) are detailed,
both of which were first proposed in [1]. These methods fall under the
category of Horizontal FL. Before detailing how each method works, let's first
establish some notation that will be shared in describing both methods. First
assume that there are \\(N\\) clients in the FL pool, each with a unique local
training dataset, \\(D_i\\). Let

$$
D = \\bigcup\\limits\_{k=1}^{N} D\_k,
$$

and denote \\(\\vert D \vert = n\\). The end goal is to train a model
parameterized by weights \\(\\mathbf{w}\\) using all data in \\(D\\). Further,
let \\(\\ell(\\mathbf{w})\\) be a loss function depending on \\(\\mathbf{w}\\).

In standard FL, we aim to train a model by minimizing the loss over the
dataset \\(D\\) of total size \\(n\\). This is written

$$
\begin{align*}
\\min\_{\\mathbf{w} \\in \\mathbf{R}^d} \\ell(\\mathbf{w}),
\\qquad \\text{where} \\qquad & \\ell(\\mathbf{w}) =
\\frac{1}{n} \\sum\_{i=1}^n \\ell\_i(\\mathbf{w}),
\end{align*}
$$

and \\(\\ell_i(\mathbf{w})\\) is the loss with respect to the
\\(i^{\\text{th}}\\) sample in the training dataset. Note that we have
implicitly denoted the dimensionality of the model weights, in the equation
above, as \\(d\\).

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

[^1]:
    H. B. McMahan, E. Moore, D. Ramage, S. Hampson, and B. A. y Arcas.
    Communication-efficient learning of deep networks from decentralized data.
    Proceedings of the 20th AISTATS, 2017.

{{#author emersodb}}
