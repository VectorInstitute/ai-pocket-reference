<!-- markdownlint-disable-file MD033 MD013 -->

# Servers and FL Orchestration

{{ #aipr_header }}

In many FL workflows a server plays a vital role in orchestration of client
behavior, coordinating communication, facilitating information exchange, and
synchronizing training results across clients participating in the FL system.
In many settings, for example, the server is responsible for

1. Selecting clients to participate in federated training.
2. Gathering the results of their local training processes.
3. Combining these results into a single result for further federated training.
4. Requesting model evaluations.
5. Monitoring performance and model checkpointing.

While the server provides significant value through orchestration, it typically
bears a reduced computational responsibility. That is, its processes are often
less resource intensive compared to those of the FL clients. As such, it can
be hosted in environments with lower compute or even collocated with clients.
However, there are FL methods that also perform compute intensive procedures
on the server-side of the FL system. The trade-offs associated with these
methods should play a part in any system design choices.

The figure below provides a simple illustrative example of one role that a
server typically plays in a Horizontal FL system. That is, after each client
has trained a model on their local training data, they send the model weights
to the server to be combined, in some way, into a single new set of weights,
which are sent back to the clients for further training.

<figure>
<center>
<img src="../assets/Distributed Data Diagram Weights.png" alt="Exchanging of Weights ", width="350">
<figcaption>Among many other roles, an FL server may receive and combine model weights from FL clients.</figcaption>
</center>
</figure>

A fundamental tenant of FL is that raw data never leaves the local
repositories of each client. As such, FL servers never receive raw training
data from participating clients. However, the exchange of information is not
necessarily restricted to model weights. For example, in adaptive forms of
[FedProx](../horizontal/robust_global_fl/fedprox.md),[^1] the server is
responsible for adjusting the proximal loss weight used in client training in
response to a global view of the loss landscape across participating clients.
This requires transmitting such adjustments to the clients at the appropriate
times.

In subsequent chapters, the exact role that the server plays in various forms
of FL will be discussed in detail. In each setting, the compute burden of the
server may vary and the role it plays may differ quite significantly. When
deciding on an FL approach, the role of the server is also an important
design consideration. For example, in certain settings, the server may not
need to reside on a separate machine from the clients. In certain setups, one
of the clients may also play the role of the server. In others, that
responsibility may rotate between clients.

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

[^1]:
    T. Li, A. K. Sahu, M. Zaheer, M. Sanjabi, A. Talwalkar, and V. Smith.
    Federated optimization in heterogeneous networks. In I. Dhillon,
    D. Papailiopoulos, and V. Sze, editors, Proceedings of Machine Learning and
    Systems, volume 2, pages 429–450, 2020.

{{#author emersodb}}
