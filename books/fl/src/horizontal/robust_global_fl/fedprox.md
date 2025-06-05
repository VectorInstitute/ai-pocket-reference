<!-- markdownlint-disable-file MD033 MD013 -->

# FedProx

{{ #aipr_header }}

The FedProx algorithm[^1] is one of the earliest approaches specifically aimed
at addressing the optimization challenges associated with data heterogeneity in
FL. At its core, the FedProx algorithm is quite straightforward. However,
prior to diving into the modifications proposed in the FedProx approach, we'll
first consider the kind of phenomenon that FedProx, along with other methods,
attempts to counteract.

To help illustrate the issue, we'll use some helpful visualizations
from researchers who proposed the SCAFFOLD method.[^2]<sup>,</sup>[^3]
Consider a two-client FL setting. Each client has their own loss landscape
based on their privately held data, denoted \\(f_1\\) and \\(f_2\\). If each
client has an equal amount of data, the global loss surface, which is the loss
function when constructed from all data available on both clients is equivalent
to \\((f_1 + f_2)/2\\). When performing standard federated training, the
objective is to find model weights corresponding to the minimum of this global
loss function. See the figure below. Note that the minima associated with the
client loss functions are distinct from the global minimum.

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/combined_loss_objective.svg" alt="Combined loss objective" width="66%">
<figcaption>Comparison of local loss landscapes for two clients with the combined global loss.</figcaption>
</center>
</figure>

Recall that optimization with [FedSGD](../vanilla_fl/fedsgd.md) is equivalent
to centralized large-batch SGD. That is, rounds of FedSGD are equivalent to
optimizing the global loss function, expressed here as \\((f_1 + f_2)/2\\). As
such, with a properly tuned learning rate, FedSGD will converge to the
global optimum, as illustrated in the figure below. Each averaged gradient
step makes steady progress towards the global minimum.

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/fedsgd_steps.svg" alt="FedSGD and global convergence" width="66%">
<figcaption>FedSGD rounds result in averaged models making steady progress towards
the global minimum.</figcaption>
</center>
</figure>

As detailed in the chapter on [FedAvg](../vanilla_fl/fedavg.md),[^4] there is a
substantial reduction in communication overhead if each client applies
multiple steps of batch SGD, optimizing the local model based on the local
loss. It was noted therein, however, that this breaks the equivalence enjoyed,
for example, by FedSGD with centralized large-batch SGD. In settings, such as
the one illustrated in the figures thus far, with data heterogeneity and
markedly different loss landscapes this can engender various issues. One such
issue is often referred to as "client drift" and is illustrated in the figure
below.

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/fedavg_drift.svg" alt="FedAvg and the influence of local drift" width="66%">
<figcaption>Illustration of "client drift" in FedAvg updates caused by
differences in the shape of the local loss functions of each client.</figcaption>
</center>
</figure>

In the figure, each client is applying three local steps of batch SGD before
sending the resulting weights to server for aggregation. The grey dots
represent the updates using FedSGD for three rounds from the previous figure.
The update using FedAvg deviates quite a bit from this path with a distinct
drift towards the minima of Client 2. Drifts of this kind can be induced by the
shape of the local loss surface and cause issues with FedAvg, such as slowed
convergence.

## The Math

The general idea for FedProx is to limit models from drifting too far during
local training. For a server round \\(t\\), consider the aggregated weights
\\(\\mathbf{w}\_t\\). For a given client \\(k\\), let
\\(\\ell_k(b; \\mathbf{w})\\) denote the local loss function for a batch,
\\(b\\), of data, parameterized by model weights \\(\\mathbf{w}\\). The primary
modification of FedAvg in the FedProx algorithm is to augment
\\(\\ell_k(b; \\mathbf{w})\\) with a penalty term such that, for \\(\mu > 0\\),
the local loss becomes

$$
\begin{align*}
\\ell_k(b; \\mathbf{w}) + \\mu \\Vert \\mathbf{w} - \\mathbf{w_t} \\Vert^2.
\end{align*}
$$

The penalty term is referred to as the proximal loss. It penalizes significant
deviation from the global model during local training such that loss
optimization must trade off improvements in the standard loss with potential
divergence from the original model weights. Revisiting the loss surfaces above,
the FedProx penalty term alters the loss surface to make client drift less
attractive, unless it leads to significant performance gains.

## The Algorithm

The FedProx algorithm is very similar to that of FedAvg, with the only
modification coming in the local update calculations.

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/algorithm-fedprox.svg" alt="FedProx Algorithms" width="100%">
</center>
</figure>

## Adapting \\(\\mu\\)

For a well-tuned \\(\\mu\\), FedProx has been shown to outperform FedAvg under
heterogeneous data conditions. It is widely applied, both because it is a
simple modification to the FedAvg framework and because it works fairly well
across a number of tasks. However, in settings where the data is homogeneous,
FedProx has been shown to under-perform compared to FedAvg when \\(\\mu>0\\).
See the top left of the figure below.

Because of this, the authors of FedProx offer an alternative to extensive
hyper-parameter tuning. Heuristically, the proximal weight may be adapted
across server rounds. If the aggregated server-side training loss
(average final loss on each client) fails to decrease for a round, \\(\\mu\\)
is increased. If the loss improves for some number of rounds, \\(\\mu\\) is
decreased. In the figure below, this procedure results in the fuchsia colored
line in the Figures below.

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/FedProxAdaptation_top.png" alt="FedProx vs. FedAvg" width="100%">
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/FedProxAdaptation_bottom.png" alt="FedProx vs. FedAvg" width="100%">
<figcaption>Comparison of FedProx to FedAvg in various settings. On the top left,
data is homogeneous across clients. Without adaptation FedProx struggles to out
perform FedAvg. Data is heterogeneous in the other settings and FedProx performs
well with and without adaptation.
</figcaption>
</center>
</figure>

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

[^1]:
    [T. Li, A. K. Sahu, M. Zaheer, M. Sanjabi, A. Talwalkar, and V. Smith.
    Federated optimization in heterogeneous networks. In I. Dhillon,
    D. Papailiopoulos, and V. Sze, editors, Proceedings of Machine Learning and
    Systems, volume 2, pages 429–450, 2020.](https://arxiv.org/pdf/1812.06127)

[^2]:
    [S. P. Karimireddy, S. Kale, M. Mohri, S. Reddi, S. Stich, and A. T. Suresh.
    SCAFFOLD: Stochastic controlled averaging for federated learning. In
    Hal Daumé III and Aarti Singh, editors, Proceedings of the 37th
    International Conference on Machine Learning, volume 119 of Proceedings of
    Machine Learning Research, pages 5132–5143. PMLR, 13–18 Jul 2020.](https://www.microsoft.com/en-us/research/publication/frustratingly-easy-neural-domain-adaptation/)

[^3]:
    [Images adapted from Talk on "Stochastic Controlled Averaging for
    Federated Learning"](https://docs.google.com/presentation/d/1SYhRC6NMEMJJL2FTGDu5DJeINJBkbwFVGd2Emy43fk0/edit)

[^4]:
    [H. B. McMahan, E. Moore, D. Ramage, S. Hampson, and B. A. y Arcas.
    Communication-efficient learning of deep networks from decentralized data.
    Proceedings of the 20th AISTATS, 2017.](https://proceedings.mlr.press/v54/mcmahan17a/mcmahan17a.pdf)

{{#author emersodb}}
