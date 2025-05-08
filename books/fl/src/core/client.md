<!-- markdownlint-disable-file MD033 -->

# The Role of Clients in Federated Learning

{{ #aipr_header }}

As discussed in [The Different Flavors of Federated Learning](fl_flavors.md),
FL is a collection of methods that aim to facilitate training ML models on
decentralized training datasets. The entities that house these datasets are
often referred to as clients. Any procedures that involve working directly
with raw data are typically the responsibility of the clients participating in
the FL systems. In addition, clients are only privy to their own local datasets
and generally receive no raw data from other participants.

Some FL methods consider the use of related public or synthetic data,
potentially modeled after local client data. However, there are often caveats
to each of these settings. The former setting is restricted by the assumed
existence of relevant public data and the level of "relatedness" can have
notable implications in the FL process. In the latter setting, data synthesis
has privacy implications that might undermine the goal of keeping data separate
in the first place.

Because each client is canonically the only one with access to the data stored
in its dataset, they are predominantly responsible for model training, through
some mechanism, on their local data. In Horizontal FL, this often manifests as
performing some form of gradient-based optimization targeting a local loss
function incorporating local data. In Vertical FL, partial forward passes
and gradients are constructed based on information from the partial (local)
features in each client.

<figure>
<center>
<img src="../assets/ClientDiagram.svg" alt="Client ", width="350">
<figcaption>Visualization of some assets for FL clients.</figcaption>
</center>
</figure>

The figure above is a simplified illustration of the various resources housed
within an FL client. Each of these components needs to be considered to ensure
that federated training proceeds smoothly. For example, given the size of the
model to be trained and the desired training settings like batch size, will
the client have enough memory to perform backpropagation? Will the training
iterations complete in a reasonable amount of time? Is the network bandwidth
going to be sufficient to facilitate efficient communication with other
components of the FL system?

In subsequent chapters, we'll discuss the exact role clients play in FL, and
how they interact with other components of the FL system.

{{#author emersodb}}
