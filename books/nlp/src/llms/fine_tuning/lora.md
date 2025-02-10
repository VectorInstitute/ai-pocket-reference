<!-- markdownlint-disable-file MD033 -->

# LoRA

<!-- markdownlint-disable MD013 -->
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2em;">
  <div>
    <a target="_blank" href="https://github.com/VectorInstitute/ai-pocket-reference/issues/new?template=edit-request.yml">
      <img src="https://img.shields.io/badge/Suggest_an_Edit-black?logo=github&style=flat" alt="Suggest an Edit"/>
    </a>
    <a target="_blank" href="https://colab.research.google.com/github/VectorInstitute/ai-pocket-reference-code/blob/main/notebooks/nlp/dummy.ipynb">
      <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
    </a>
    <p style="margin: 0;"><small>Reading time: {{ #reading_time }}</small></p>
  </div>
</div>
<!-- markdownlint-enable MD013 -->

Low-rank adaptation (LoRA) is parameter-efficient fine-tuning ([PEFT](../fine_tuning/peft.md))
introduced by Hu, Edward J. et al. (2021). The creators of LoRA posited that since
trained deep learning models reside in low intrinsic dimensions, perhaps their
weight-update matrices do as well.

Specifically, with LoRA, we learn a low-rank representation of the weight-update
matrices of dense, linear layers of a pre-trained LLM. The original weights
of the LLM are frozen during fine-tuning and only the low-rank weight-update matrices
at each step of fine-tuning. This reduction in dimensionality helps to amplify the
most important or influential features of the model.

## Some Math

Let \\(W\\) represent the \\(d\times d\\) weight matrix for a dense, linear layer.
We can then loosely represent an updated version (i.e. after fine-tuning) of
this matrix as follows:

$$W_{\text{updated}} = W + \Delta W,$$

where \\(\Delta W\\) is the update matrix. With LoRA, it is \\(\Delta W\\) which
we project into a low-rank space:

$$\Delta W \approx AB,$$

where \\(A\\) and \\(B^T\\) are both matrices of dimension \\(d \times r\\) and
\\(r << d\\). During fine-tuning, \\(W\\) is frozen and only \\(A\\) and \\(B\\)
are updated.

For inference (i.e., forward phase), let \\(x\\) be an input embedding, then by
the distributive property

$$xW_{\text{updated}} = xW + x\Delta W \approx xW + xAB.$$

## Implementation Details

One modular implementation of LoRA involves the introduction of a `LoRALayer` that
comprises of only the \\(A\\) and \\(B\\) dense weights. In this way, a `LoRALayer`
can adapt a pre-trained `Linear` layer.

```python
import torch


class LoRALayer(torch.nn.Module):
    """A basic LoRALayer implementation."""

    def __init__(self, d_in: int, d_out: int, rank: int):
        self.A = torch.nn.Parameter(torch.empty(d_in, rank))
        self.B = torch.nn.Parameter(torch.zeros(rank, d_out))

    def forward(self, x):
        return x @ self.A @ self.B
```

With the `LoRALayer` defined in this way, one can then combine this with a `Linear`
layer to implement the LoRA technique. See the supplementary Colab notebook linked
at the top of this pocket reference for more details.

## Performance

In the original paper, the authors reported similar levels of performance when using
LoRA compared to full fine-tuning on various natural language generation and understanding
tasks.

## Additional Benefits

Since LoRA matrices can be stored efficiently and separately from the pre-trained
LLM weights, customization of these large models is highly scalable. Organizations
can build libraries of specialized LoRA matrices for different datasets and domains,
switching between them as needed for specific applications.

## Limitations

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [_Hu, Edward J., et al. "Lora: Low-rank adaptation of large language models."
   arXiv preprint arXiv:2106.09685, 2021._](https://arxiv.org/pdf/2106.09685)
2. [_Raschka, Sebastian. Build a Large Language Model (From Scratch). Simon and
   Schuster, 2024._](https://www.amazon.com/Build-Large-Language-Model-Scratch/dp/1633437167)
3. [_Sourab Mangrulkar et al. PEFT: State-of-the-art Parameter-Efficient Fine-Tuning methods (LoRA methods), 2022._](https://huggingface.co/docs/peft/en/task_guides/lora_based_methods)
4. [_Huang, Chengsong, et al. "Lorahub: Efficient cross-task generalization via
   dynamic lora composition." arXiv preprint arXiv:2307.13269 (2023)._](https://arxiv.org/pdf/2307.13269)
5. [_Fajardo V.A. LoRA PaperCard, 2023._](https://d3ddy8balm3goa.cloudfront.net/paper-cards/w29_2023-lora.excalidraw.svg)

{{#author nerdai}}
