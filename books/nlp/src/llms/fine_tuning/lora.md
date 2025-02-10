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
matrices of the dense, linear layers of a pre-trained LLM. The original weights
of the LLM are frozen during fine-tuning and only the low-rank weight-update matrices
at each step of fine-tuning.

## Performance

## Additional Benefits

## Limitations

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [_Hu, Edward J., et al. "Lora: Low-rank adaptation of large language models."
   arXiv preprint arXiv:2106.09685 (2021)._](https://arxiv.org/pdf/2106.09685)
2. [_Raschka, Sebastian. Build a Large Language Model (From Scratch). Simon and
   Schuster, 2024._](https://www.amazon.com/Build-Large-Language-Model-Scratch/dp/1633437167)

{{#author nerdai}}
