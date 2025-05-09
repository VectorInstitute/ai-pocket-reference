<!-- markdownlint-disable-file MD033 MD013 -->

# Aggregation Strategies

{{ #aipr_header }}

In FL workflows, servers are responsible for a number of crucial components, as
discussed in [Servers and FL Orchestration](server.md). One of these roles is
that of aggregation and synchronization of the results of distributed client
training processes. This is most prominent in Horizontal FL, where the server
is responsible for executing, among other things, an aggregation strategy.

In most Horizontal FL algorithms, there is a concept of a _server round_
wherein each decentralized client trains a model (or models) using local
training data. After local training has concluded, each client sends the model
weights back to the server. These model weights are combined into a single
set of weights using an aggregation strategy. One of the earliest forms of
such a strategy, and still one of the most widely used, is FedAvg.[^1]
In FedAvg, client model weights are combined using a weighted averaging scheme.
More details on this strategy can be found in [FedAvg](../horizontal/vanilla_fl/fedavg.md).

Other forms of FL, beyond Horizontal, incorporate aggregation strategies in
various forms. For example, in Vertical FL, the clients must synthesize
partial gradient information received from other clients in the system in order
to properly perform gradient descent for their local model split in SplitNN
algorithms.[^2] This process, however, isn't necessarily the responsibility of
an FL server. Nevertheless, aggregation strategies are most prominently
featured and the subject of significant research in Horizontal FL frameworks.
As is seen in the sections of [Horizontal Federated Learning](../horizontal/index.md),
many variations and extensions of FedAvg have been proposed to improve
convergence, deal with data heterogeneity challenges, stabilize training
dynamics, and produce better models. We'll dive into many of these advances
in subsequent chapters.

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

[^1]:
    [H. B. McMahan, E. Moore, D. Ramage, S. Hampson, and B. A. y Arcas.
    Communication-efficient learning of deep networks from decentralized data.
    Proceedings of the 20th AISTATS, 2017.](https://proceedings.mlr.press/v54/mcmahan17a/mcmahan17a.pdf)

[^2]:
    [Gupta, Otkrist and Raskar, Ramesh, Distributed learning of deep neural
    network over multiple agents, Journal of Network and Computer Applications,
    Vol.116, pp.1–8, 2018.](https://arxiv.org/pdf/1810.06060)

{{#author emersodb}}
