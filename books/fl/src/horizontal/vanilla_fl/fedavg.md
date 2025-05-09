<!-- markdownlint-disable-file MD033 MD013 -->

# FedAvg

{{ #aipr_header }}

The FedAvg algorithm[^1] builds on the same principles of FedSGD, but aims to
reduce the communication costs incurred by the [FedSGD](fedsgd.md`) approach.
Recall that the major shortcoming of FedSGD was that it required clients to
send local gradients for every training step in order to perform model updates.
The FedAvg algorithm attempts to reduce this overhead by pushing additional
computation onto the clients.

## The math

Assume a fixed learning rate of \\(\eta > 0\\), and denote

$$
\begin{align}
\\mathbf{w}\_{t+1}^k = \\mathbf{w}_t - \\eta \\nabla L_k(\\mathbf{w}\_t). \tag{1}
\end{align}
$$

Note that \\(\\mathbf{w}\_t - \\eta \\nabla L_k(\\mathbf{w}\_t)\\) is just a
local (full) gradient step on client \\(k\\). That is,
\\(\\nabla L_k(\\mathbf{w}\_t)\\) is the gradient with respect to all training
data on client \\(k\\). So the weights \\(\\mathbf{w}\_{t+1}^k\\) represent
a new model using only the data of client \\(k\\) to update the weights,
\\(\\mathbf{w}\_t\\). Then we can rewrite the server update in FedSGD in terms
of \\(\\mathbf{w}\_{t+1}^k\\) with a little algebra as

$$
\begin{align}
\\mathbf{w}\_{t+1}&= \\mathbf{w}_t - \\eta \\sum\_{k \\in C\_t} \\frac{n_k}{n_s} \\nabla L_k(\\mathbf{w}_t) \\\\
&= \\sum\_{k \\in C\_t} \\frac{n_k}{n_s} \\mathbf{w}_t - \\eta \\sum\_{k \\in C\_t} \\frac{n_k}{n_s} \\nabla L_k(\\mathbf{w}_t) \\\\
&= \\sum\_{k \\in C\_t} \\frac{n_k}{n_s} \\mathbf{w}\_{t+1}^k. \tag{2}
\end{align}
$$

The final line of Equation (2) implies that the updated weights,
\\(\\mathbf{w}\_{t+1}\\), in FedSGD can be rewritten as the linearly weighted
average of **local** weight updates performed by the clients themselves. That
is, \\(\\mathbf{w}\_{t+1}\\) is just a weighted average of locally updated
weights, where the weights are the proportion of data points on
each client (\\(n_k\\)) relative the the size of all data points used to compute the
update (\\(n_s\\)).

With this in hand, we can push responsibility for updating model weights onto
the clients participating in a round of FL training. Only model weights are
communicated back and forth, and the server need only average the locally
updated weights to obtain the new model. This procedure remains mathematically
equivalent to centralized large batch SGD, as is the case for FedSGD. The bad
news is that we haven't saved any communication yet. This still relies on
communicating the updated weights after each step and the dimensionality of the
model weights and their gradient is equal. So what can we do?

Rather than a full, local-gradient step on each client, as expressed in
Equation (1), we can run multiple local batch SGD updates. For client \\(k\\),
let \\(B\\) be a set of batches drawn from \\(P_k\\), the collection of
training data points on client \\(k\\). For \\(b \\in B\\), perform local
updates of the form

$$
\begin{align*}
\\mathbf{w}^k = \\mathbf{w}^k - \\eta \frac{1}{\\vert b \\vert} \\sum\_{i \\in b} \\nabla \\ell_i (\\mathbf{w}^k).
\end{align*}
$$

This allows for each client to perform multiple local batch SGD updates to
the model weights. As in standard ML training, these updates can be performed
for a certain number epochs, iterating through each client's local data. Only after
completing such iterations are the updated weights communicated to the server for
aggregation using the same formula in Equation (2) on the server side. In this
manner, we have decoupled model updates from communication with the server and
are free to communicate as frequently or infrequently as we choose.

## The algorithm

With the new approach proposed in the previous section, the full FedAvg
algorithm may be summarized in the algorithm below. Inputs to the algorithm
are:

- \\(N\\): The number of clients.
- \\(T\\): The number of server rounds to perform.
- \\(\\eta\\): The learning rate to be used by each client.
- \\(n_b\\): The batch size to be used for each local gradient step.
- \\(\\mathbf{w}\\): The initial weights for the model to be trained.
- \\(E\\): The number of epochs for each client to perform.

After the final server round is complete, each client receives the final
model as described by the weights \\(\mathbf{w}\_T\\).

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/algorithm-fedavg.svg" alt="FedAvg Algorithm">
</center>
</figure>

Note that, in the algorithm above, the local updates are performed with
standard batch SGD. There is nothing stopping us from using a different
training procedure on the client side. For example, one might instead perform
such updates using an AdamW optimizer.[^2] As with standard ML
training, the type of optimizer that works best is problem dependent.

### A broken equivalence can have consequences

Both theoretically and experimentally, FedAvg is a strong algorithm. The
modifications to FedSGD can be used to substantially drive down communication
costs while retaining many of the benefits of FedSGD in practice. Since its
introduction, the FedAvg algorithm has been widely used to make ML model
training on decentralized datasets a reality. However, the modifications that
make FedAvg more communication efficient compared with FedSGD also break the
mathematical equivalence to global large-batch SGD enjoyed by FedSGD.

When the training data spread across clients is identically and independently
distributed (i.e. drawn independently from the same distribution), this loss
of equivalence is generally less consequential. On the other hand, when
client data distributions become more heterogeneous, the lack of true
equivalence materially impacts the convergence properties of FedAvg and can
lead to suboptimal performance. As such, many approaches have since been
proposed to improve upon FedAvg while maintaining its desirable qualities, like
communication efficiency.

#### References & Useful Links

[^1]:
    [H. B. McMahan, E. Moore, D. Ramage, S. Hampson, and B. A. y Arcas.
    Communication-efficient learning of deep networks from decentralized data.
    Proceedings of the 20th AISTATS, 2017.](https://proceedings.mlr.press/v54/mcmahan17a/mcmahan17a.pdf)

[^2]:
    [I. Loshchilov and F. Hutter. Fixing weight decay regularization in ADAM,
    2018.386](https://arxiv.org/pdf/1711.05101)

{{#author emersodb}}
