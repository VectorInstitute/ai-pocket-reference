<!-- markdownlint-disable-file MD033 MD013 -->

# Horizontal Federated Learning

{{ #aipr_header }}

As outlined in [The Different Flavors of Federated Learning](../core/fl_flavors.md),
Horizontal FL considers the setting where \\(i=1, \\ldots, N\\) clients each hold a
distributed training dataset, \\(D\_{i}\\), on their local compute
environment. Each of the datasets share the same feature and label spaces. The
goal of Horizontal FL is to train a high-performing model (or models) using
all of the training data, \\(\\{D_i\\}\_{i=1}^N\\), residing on each of the clients in
the system.

<figure>
<center>
<img src="../assets/horizontal_fl.svg" alt="Horizontal FL", width="500">
<figcaption>Feature spaces are shared between clients, enabling access to more unique training data points.</figcaption>
</center>
</figure>

In an Horizontal FL system, some fundamental elements are generally
present. In most cases, communication and computation between the server and
clients is broken into iterations known as _server rounds_. Typically, the
number of such rounds is simply specified as a hyper-parameter, \\(T > 0\\).
During each round, the server chooses a subset of all possible clients of size
\\(m \\leq N \\) to participate in that round. Note that one may choose to
include all clients or a proper subset thereof. These clients perform some
kind of training using their local datasets and send the results of that
training back to the server. The contents of these "training results" varies
depending on the method used, but often include the model parameters after
local training.

After receiving the training results for the clients participating in the
round, the server performs some kind of aggregation, combining the training
results together. These combined results are returned to the clients for the
next round of training. In most cases, the results are communicated to all
clients, rather than just the subset that participated in the round.

This process skeleton is summarized in the algorithm below. The specifics of
how each of the high-level steps outlined in the algorithms function depends
on the exact Horizontal FL algorithm being used. There are also variations of
such algorithms that modify or add to the basic framework below.

<figure>
<center>
<img src="../assets/algorithm-hfl-outline.svg" alt="Horizontal FL Algorithm Outline">
</center>
</figure>

This section of the book is organized as follows:

- [Vanilla FL](vanilla_fl/index.md)
  - [FedSGD](vanilla_fl/fedsgd.md)
  - [FedAvg](vanilla_fl/fedavg.md)
- [Robust Global FL](robust_global_fl/index.md)
  - [FedAdam](robust_global_fl/fedadam.md)
  - [FedProx](robust_global_fl/fedprox.md)
  - [MOON](robust_global_fl/moon.md)
- [Personalized FL](personalized/index.md)
  - [FedPer](personalized/fedper.md)
  - [FENDA-FL](personalized/fenda.md)
  - [Ditto](personalized/ditto.md)

Each of the chapters covers a different aspect of Horizontal FL and provides
deeper details on the inner workings of the various algorithms. In
[Vanilla FL](vanilla_fl/index.md), the foundational Horizontal FL
algorithms are discussed. In
[Robust Global FL](robust_global_fl/index.md), extensions to these
foundational algorithms are detailed. Such extensions aim to improve things
like convergence and robustness to heterogeneous data challenges common in FL
applications while still producing a single generalizable model. Finally,
[Personalized FL](personalized/index.md) discusses methods for
robust and effective methods for training individual models per client that
still benefit from the global perspective of other clients. The end result
is a set of models individually optimized to perform well on each clients
unique distributions.

{{#author emersodb}}
