<!-- markdownlint-disable-file MD033 MD013 -->

# The Different Flavors of Federated Learning

{{ #aipr_header }}

Machine learning (ML) models are most commonly trained on a centralized pool of
data, meaning that all training data is accessible to a single training
process. Federated learning (FL) is used to train ML models on decentralized
data, such that data is compartmentalized. The sites at which the data is held
and trained are typically referred to as clients. Training data is most often
decentralized when it cannot or should not be moved from its location. This
might be the case for various reasons, including privacy regulations, security
concerns, or resource constraints. Many industries are subject to strict
privacy laws, compliance requirements, or data handling requirements, among
other important considerations. As such, data centralization is often
infeasible or ill-advised. On the other hand, it is well known that access to
larger quantities of representative training data often leads to better ML
models.[^1] Thus, in spite of the potential challenges associated
with decentralized training, there is significant incentive to facilitate
distributed model training.

There are many different flavors of FL. Covering the full set of variations is
beyond the scope of these references. However, this reference will cover a few
of the major types considered in practice.

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/Distributed Data Diagram.svg" alt="Decentralized Datasets", width="400">
</center>

## Horizontal Vs. Vertical FL

One of the primary distinctions in FL methodologies is whether one is aiming to
perform Horizontal or Vertical FL. The choice of methodological framework here
is primarily driven by the kind of training data that exists and why you are
doing FL in the first place.

### Horizontal FL: More Data, Same Features

In Horizontal FL, it is assumed that models will be trained on a **unified**
set of features and targets. That is, across the distributed datasets, each
training point has the same set of features with the same set of
interpretations, pre-processing steps, and ranges of potential values, for
example. The goal in Horizontal FL is to facilitate access to
**additional data points** during the training of a model. For more details, see
[Horizontal FL](../horizontal/index.md).

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/horizontal_fl.svg" alt="Horizontal FL", width="500">
<figcaption>Feature spaces are shared between clients, enabling access to more unique training data points.</figcaption>
</center>
</figure>

### Vertical FL: More Features, Same Generators

While Horizontal FL is concerned with accessing more data points during training,
Vertical FL aims to add additional predictive features to improve model
predictions. In Vertical FL, there is a shared target or set of targets to be
predicted across distributed datasets and it is assumed that all datasets share
a non-empty intersection of "data generators" that can be "linked" in some way.
For example, the "data generators" might be individual customers of different
retailers. Two retailers, might want to collaboratively train a customer
segmentation model to improve predictions for their shared customer base. Each
retailer has unique information about the customer from their interactions
that, when combined, might improve prediction performance.

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/vertical_fl.svg" alt="Vertical FL", width="500">
<figcaption>"Data generators" are shared between clients with unique features.</figcaption>
</center>
</figure>

To produce a useful distributed training dataset in Vertical FL, datasets are
privately "aligned" such that only the intersection of "data generators" are
considered in training. In most cases, the datasets are ordered to ensure that
disparate features are meaningfully aligned by the underlying generator.
Depending on the properties of the datasets, fewer individual data points may
be available for training, but hopefully they have been enriched with
additional important features. For more details, see [Vertical FL](../vertical/index.md).

## Cross-Device Vs. Cross-Silo FL

An important distinction between standard ML training and decentralized model
training is the presence of multiple, and potentially diverse, compute
environments. Leaving aside settings with the possibility of significant
resource disparities across data hosting environments, there are still many
things to consider that influence the kinds of FL techniques to use. There are
two main categories with general, but not firm, separating characteristics:
Cross-Silo FL and Cross-Device FL. In the table below, key distinctions between
the two types of FL are summarized.

| Type                  | Cross-Silo                             | Cross-Device                        |
| --------------------- | -------------------------------------- | ----------------------------------- |
| **# of Participants** | Small- to medium-sized pool of clients | Large pool of participants          |
| **Compute**           | Moderate to large compute              | Limited compute resources           |
| **Dataset Size**      | Moderate to large datasets             | Typically small datasets            |
| **Reliability**       | Stable connection and participation    | Potentially unreliable participants |

A quintessential example of a cross-device setting is training a model using
data housed on different cell-phones. There are potentially millions of devices
participating in training, each with limited computing resources. At any given
time, a phone must be switched off or disconnected from the internet.
Alternatively, cross-silo settings might arise in training a model between
companies or institutions, such as banks or hospitals. They likely have larger
datasets at each site and access to more computational resources. There will
be fewer participants in training, but they are more likely to reliably
contribute to the training system.

Knowing which category of FL one is operating in helps inform design decisions
and FL component choices. For example, the model being trained may need to be
below a certain size or the memory/compute needs of an FL technique might be
prohibitive. A good example of the latter is [Ditto](../horizontal/personalized/ditto.md),
which requires larger compute resources than many other methods.

## One Model or a Model Zoo

The final distinction that is highlighted here is whether the model architecture
to be trained is the same (homogeneous) across disparate sites or if it differs
(heterogeneous). In many settings, the goal is to train a homogeneous model
architecture across FL participants. In the context of Horizontal FL, this
implies that each client has an identical copy of the architecture with shared
feature and label dimensions, as in the figure below.

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/shared_labels.svg" alt="Homogeneous Architectures">
<figcaption>Each client participating in Horizontal FL typically trains the same architecture.</figcaption>
</center>
</figure>

Alternatively, there are FL techniques which aim to federally train collections
of heterogeneous architectures across clients.[^2] That is, each
participant in the FL system might be training a **different** model
architecture. Such a setting may arise, for example, if participants would
like to benefit from the expanded training data pool offered through Horizontal
FL, but want to train their own, proprietary model architecture, rather than a
shared model design across all clients. As another example, perhaps certain
participants, facing compute constraints, aim to train a model of more
manageable size given the resources at their disposal.

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/heterogeneous_architectures.svg" alt="Homogeneous Architectures">
<figcaption>Model heterogeneous FL attempts to wrangle a zoo of model architectures across participants.</figcaption>
</center>
</figure>

The primary focus of the current pocket references will consider the
homogeneous architecture setting. However, there is significant research across
each of the different flavors of FL discussed above.

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

[^1]:
    [C. Sun, A. Shrivastava, S. Singh, and A. Gupta. Revisiting unreasonable
    effectiveness of data in deep learning era. In ICCV 2017, pages 843–852, 2017. doi: 10.1109/ICCV.2017.97.](https://openaccess.thecvf.com/content_ICCV_2017/papers/Sun_Revisiting_Unreasonable_Effectiveness_ICCV_2017_paper.pdf)

[^2]:
    [Mang Ye, Xiuwen Fang, Bo Du, Pong C. Yuen, and Dacheng Tao. 2023.
    Heterogeneous Federated Learning: State-of-the-art and Research Challenges.
    ACM Comput. Surv. 56, 3, Article 79 (March 2024), 44 pages. https://doi.org/10.1145/3625558](https://arxiv.org/pdf/2307.10616)

{{#author emersodb}}
