<!-- markdownlint-disable-file MD033 MD013 -->

# MOON: Model-Contrastive Federated Learning

{{ #aipr_header }}

The MOON algorithm[^1] is built on the same principles as the
[FedProx](./fedprox.md)[^2] approach. That is, it targets limiting
client-specific drift during local training by constraining how heavily local
model updates stray from global models. The fundamental difference is the
way that drift is measured to construct the penalty function.

## Contrastive Loss: A Brief Interlude

Before defining the MOON penalty, we need to review contrastive loss and what
it aims to do in general. Say we have three vectors, \\(\\mathbf{z}\\),
\\(\\mathbf{z}\_s\\), \\(\\mathbf{z}\_d \in \mathbb{R}^n\\) and we want to
optimize a model, parameterized by \\(\\mathbf{w}\\), to map from an input,
\\(\\mathbf{x}\\), to a representation, \\(\\mathbf{z}\\), which is **closer**
to \\(\\mathbf{z}\_s\\) and **further** from \\(\\mathbf{z}\_d\\). We define

$$
\begin{align*}
\\ell\_{\\text{con}}(\mathbf{x};\\mathbf{w}) = - \\log \\frac{\exp
\\left(\\text{sim}(\\mathbf{z}, \\mathbf{z}\_s) \\tau^{-1} \\right)}{\\exp
\\left(\\text{sim}(\\mathbf{z}, \\mathbf{z}\_s) \\tau^{-1} \\right) + \\exp
\\left(\\text{sim}(\\mathbf{z}, \\mathbf{z}\_d) \\tau^{-1} \\right)},
\end{align*}
$$

where \\(\\text{sim}(\\cdot, \\cdot)\\) is cosine-similarity and
\\(\tau > 0\\) is a temperature. Increasing the similarity of
\\(\\mathbf{z}\\) to \\(\\mathbf{z}\_s\\) **increases** the numerator. Pushing
\\(\\mathbf{z}\\) away from \\(\\mathbf{z}\_d\\) decreases the denominator.
Each of which makes \\(\\ell\_{\\text{con}}(\mathbf{x};\\mathbf{w})\\)
**smaller**.

Contrastive loss objectives have been widely used to bring latent
representations of similar inputs closer together and push dissimilar inputs
further apart. For example, contrastive learning is used extensively in
CLIP[^3] as a means of pushing image-caption text pairs closer together, while
pushing unrelated image-text pairs further apart in the CLIP model's
representation space.

## MOON models and an alternative to weight-drift penalties

As in FedProx, the major contribution of the MOON algorithm is to modify the
local learning objective for each client. As foreshadowed in the previous
section, the modification involves a contrastive loss function. To define this
loss function, MOON first considers splitting the model to be federally trained
into two stages: a feature map followed by a classification module.
Furthermore, at each server round, \\(t\\), it distinguishes between three
models. These models are illustrated in the figure below.

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/SplitModels.svg" alt="Moon models and their latent representation" width="100%">
<figcaption>The three models important in the computation of MOON's
contrastive loss functions and their latent representations.</figcaption>
</center>
</figure>

For server round \\(t\\), the model on the left represents the model after
weight aggregation by the server. In the middle is the final model after
local training on Client \\(i\\). The weights, \\(\\mathbf{w}^{t-1}\_i\\), have
been aggregated across participating clients to form \\(\\mathbf{w}^t\\).
Finally, the model on the right is the one being locally trained on Client
\\(i\\). The output of the feature maps in these models will be used to form
the local contrastive loss for Client \\(i\\).

Let \\(\\ell_i((\\mathbf{x}, y); \\mathbf{w})\\) denote the local loss function
of Client \\(i\\) for an input, \\(\mathbf{x}\\), and label, \\(y\\),
parameterized by model weights \\(\\mathbf{w}\\). MOON augments this local loss
with the contrastive loss function

$$
\begin{align*}
\\ell\_{i, \\text{con}}((\\mathbf{x}, y);\\mathbf{w}^t\_i) = - \\log \\frac{\exp
\\left(\\text{sim}(\\mathbf{z}, \\mathbf{z}\_{\\text{glob}}) \\tau^{-1}
\\right)}{\\exp \\left(\\text{sim}(\\mathbf{z}, \\mathbf{z}\_{\\text{glob}})
\\tau^{-1} \\right) + \\exp \\left(\\text{sim}(\\mathbf{z},
\\mathbf{z}\_{\\text{prev}}) \\tau^{-1} \\right)}.
\end{align*}
$$

That is, the local objective for Client \\(i\\) is written

$$
\begin{align*}
\\ell_i((\\mathbf{x}, y); \\mathbf{w}^t\_i) +
\mu \\ell\_{i, \\text{con}}((\\mathbf{x}, y);\\mathbf{w}^t\_i),
\end{align*}
$$

for \\(\mu > 0\\). Note that, when computed over a batch of data, the average
loss over all data points in the batch is computed.

The idea here is similar to FedProx. In some sense, we
still want to make sure that, during training, the model does not drift too
far from the global model, as was the case in FedProx. The difference, here,
is that we're applying that constraint in the feature representation space,
rather than directly in the model weights themselves. In the original work,
MOON showed notable improvements over methods like FedProx in heterogeneous
settings. However, it does not **always** outperform FedProx or even FedAvg.[^4]
As such, there are likely scenarios where MOON is the right approach for FL in
heterogeneous settings, while others might benefit from an alternative
technique.

## The Algorithm

The MOON algorithm is fairly similar to that of FedProx. Most server-side
aggregation strategies may be applied in combination with MOON. However, the
algorithm has some additional compute and memory overhead, as forward passes
of three separate models must be run in order to extract the latent
representations of the data points in each training batch. In the algorithm
below, FedAvg is used as the server-side strategy.

<figure>
<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/fl/algorithm-moon.svg" alt="Moon Algorithms" width="100%">
</center>
</figure>

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

[^1]:
    [Q. Li, B. He, and D. Song. Model-contrastive federated learning. In Proceedings of the
    IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2021a.](https://openaccess.thecvf.com/content/CVPR2021/papers/Li_Model-Contrastive_Federated_Learning_CVPR_2021_paper.pdf)

[^2]:
    [T. Li, A. K. Sahu, M. Zaheer, M. Sanjabi, A. Talwalkar, and V. Smith.
    Federated optimization in heterogeneous networks. In I. Dhillon,
    D. Papailiopoulos, and V. Sze, editors, Proceedings of Machine Learning and
    Systems, volume 2, pages 429–450, 2020.](https://arxiv.org/pdf/1812.06127)

[^3]:
    [Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh, Sandhini Agarwal,
    Girish Sastry, Amanda Askell, Pamela Mishkin, Jack Clark, et al. Learning transferable visual
    models from natural language supervision. In International conference on machine learning,
    pages 8748–8763. PMLR, 2021.](https://proceedings.mlr.press/v139/radford21a/radford21a.pdf)

[^4]:
    [Fatemeh Tavakoli, D. B. Emerson, Sana Ayromlou, John Taylor Jewell,
    Amrit Krishnan, Yuchong Zhang, Amol Verma, and Fahad Razak.
    A comprehensive view of personalized federated learning on heterogeneous
    clinical datasets. In Kaivalya Deshpande, Madalina Fiterau, Shalmali Joshi,
    Zachary Lipton, Rajesh Ranganath, and Iñigo Urteaga, editors, Proceedings
    of the 9th Machine Learning for Healthcare Conference, volume 252 of
    Proceedings of Machine Learning Research. PMLR, 16–17 Aug 2024.](https://proceedings.mlr.press/v252/tavakoli24a.html)

{{#author emersodb}}
