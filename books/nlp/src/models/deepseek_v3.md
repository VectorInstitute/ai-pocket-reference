<!-- markdownlint-disable-file MD033 -->

# DeepSeek-v3

<!-- markdownlint-disable MD013 -->
<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2em;">
  <div>
    <a target="_blank" href="https://github.com/VectorInstitute/ai-pocket-reference/issues/new?template=edit-request.yml">
      <img src="https://img.shields.io/badge/Suggest_an_Edit-black?logo=github&style=flat" alt="Suggest an Edit"/>
    </a>
    <p style="margin: 0;"><small>Reading time: {{ #reading_time }}</small></p>
  </div>
</div>
<!-- markdownlint-enable MD013 -->

The DeepSeek-V3 model was introduced by DeepSeek in December of 2024. It is an
LLM that leverages [MoE](../llms/architecture/moe.md) in its design.

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/deepseek-v3-lineage-v2.excalidraw.svg" alt="DeepSeek-V3 Model Lineage"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Figure: Illustrating DeepSeek-V3 training evolution.
</div>

The training pipeline for DeepSeek-V3 consists of the two typical stages: pre-training
and post-training. As depicted in the Figure above, the pre-training stage involves
pre-training on 14.8T tokens followed by long-context extension using the [YaRN](../llms/fine_tuning/yarn.md)
methodology. Post-training of DeepSeek-V3 utilizes [SFT](../llms/fine_tuning/sft.md)
as well as Reinforcement Learning methods.

## Historical Significance

At the time of its release, open-source models had already been lessening the gap
in performance with closed-source counterparts. DeepSeek-V3 was yet another open-source
model that achieved high levels of performance, beating other open-source alternatives
as well as some closed-source models in various benchmarks. What made DeepSeek-V3's
achievement even more intriguing was that it was reportedly trained using less
compute than its closest counterparts.

## Architectural Highlights

DeepSeek-V3 is a transformer-based model that swaps out nearly all dense [feedforward](../llms/architecture/feedforward.md)
for [MoE](../llms/architecture/moe.md). The model has a total of 671B parameters
but through its specialized variant of MoE (referred to as DeepSeekMoE), only
37B parameters are activated in both training and inference. Through a series of
long-context extension fine-tuning steps, the maximum context length for this model
was extended to 128K tokens.

**DeepSeekMoE:** Used to carry out training more efficiently, this MoE design
consists of two sets of experts, namely: shared and routed. The former set of routers
is used for every token in the input sequence whereas the usage of routed ones are
determined according to the affinity to the input token.

**Auxiliary-loss Load Free Balancing:** When using an MoE architecture, one must
consider load balancing across the networks to prevent routing collapse. This has
been typically addressed via the introduction of an auxiliary loss. However, if
this loss has too great of an influence, it can lead to a model degradation. DeepSeek-V3
instead considers a technique that requires no auxiliary loss but instead relies
on a new bias term that dynamically changes its value according to the experts
current workload.

**Multi-Head Latent Attention (MLA):** Used for making inference more efficient
by jointly compressing attention keys and values to a lower dimension. The compression
involves a linear projection matrix compressing keys and values down as well as
another linear project matrix for compressing keys and values back up. Only the
compressed joint representation of keys and values need to be cached during inference.
For more details see [MLA](../llms/architecture/mla.md).

**Multi-Token Prediction:** In an effort to improve the training signal, DeepSeek-V3
expands the prediction scope to additional future tokens at every token position
of the sequence. In other words, instead of only predicting the next immediate token
and training the model on this signal, $D$ future tokens are predicted. These tokens
are predicted sequentially by $D$ sequential multi-token prediction modules in order
to maintain the causal chain. For more details see [MTP](../llms/decoding/multi_token_prediction.md).

| Parameter                           | Value                     |
| ----------------------------------- | ------------------------- |
| Total parameters                    | 671B                      |
| Activated parameters                | 37B                       |
| Maximum context length              | 128K tokens               |
| Number of Transformer layers        | 61                        |
| Hidden dimension size               | 7168                      |
| Number of attention heads           | 128                       |
| Number of experts (MoE)             | 1 (shared) & 256 (routed) |
| Hidden dimension of experts         | 2048                      |
| KV compression dimension size (MLA) | 512                       |
| Multi-token depth (MTP)             | 1                         |

<div
  class="table-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Table 1: Summary of DeepSeek-V3 architecture and hyper parameters.
</div>

## Training Data

The pre-training corpus is a revised version of the one used to train an earlier
version of the model, DeepSeek-V2. In this revision, more samples pertaining to
mathematics and programming were included. Ultimately, the dataset comprised of
14.8T tokens.

## Compute Details

DeepSeek-V3 was trained on a cluster with 2048 NVIDIA H800 GPUs. Each node within
the cluster consists of 8 H800 GPUs inter-connected via NVLink and NVSwitch. In total,
it was reported that only 2.664M H800 GPU hours were used for pre-training while
subsequent training stages required only 0.1M GPU hours. One of the main reasons
for this training efficiency was their application of an FP8 mixed precision
training framework.

## Key Results

<!-- markdownlint-disable MD013 -->

| Benchmark (Metric)          | # Shots | DeepSeek-V2 Base | Qwen2.5 72B Base | LLaMA-3.1 405B Base | DeepSeek-V3 Base |
| --------------------------- | ------- | ---------------- | ---------------- | ------------------- | ---------------- |
| Pile-test (BPB)             | -       | 0.606            | 0.638            | **0.542**           | 0.548            |
| BBH (EM)                    | 3-shot  | 78.8             | 79.8             | 82.9                | **87.5**         |
| MMLU (EM)                   | 5-shot  | 78.4             | 85.0             | 84.4                | **87.1**         |
| MMLU-Redux (EM)             | 5-shot  | 75.6             | 83.2             | 81.3                | **86.2**         |
| MMLU-Pro (EM)               | 5-shot  | 51.4             | 58.3             | 52.8                | **64.4**         |
| DROP (F1)                   | 3-shot  | 80.4             | 80.6             | 86.0                | **89.0**         |
| ARC-Easy (EM)               | 25-shot | 97.6             | 98.4             | 98.4                | **98.9**         |
| ARC-Challenge (EM)          | 25-shot | 92.2             | 94.5             | **95.3**            | **95.3**         |
| HellaSwag (EM)              | 10-shot | 87.1             | 84.8             | **89.2**            | 88.9             |
| PIQA (EM)                   | 0-shot  | 83.9             | 82.1             | **85.9**            | 84.7             |
| WinoGrande (EM)             | 5-shot  | **86.3**         | 82.3             | 85.2                | 84.9             |
| RACE-Middle (EM)            | 3-shot  | 73.1             | 68.1             | **74.2**            | 74.9             |
| RACE-High (EM)              | 5-shot  | 52.6             | 50.3             | **56.8**            | 51.3             |
| TriviaQA (EM)               | 5-shot  | 80.0             | 71.9             | **82.7**            | 82.9             |
| NaturalQuestions (EM)       | 5-shot  | 38.6             | 33.2             | **41.5**            | 40.0             |
| AGIEval (EM)                | 0-shot  | 57.5             | 75.8             | 60.6                | **79.6**         |
| HumanEval (Pass@1)          | 0-shot  | 43.3             | 53.0             | 54.9                | **65.2**         |
| MBPP (Pass@1)               | 3-shot  | 65.0             | 72.6             | 68.4                | **75.4**         |
| LiveCodeBench-Base (Pass@1) | 3-shot  | 11.6             | 12.9             | 15.1                | **19.4**         |
| CRUXEval-1 (EM)             | 2-shot  | 52.5             | 59.1             | 58.5                | **67.3**         |
| CRUXEval-O (EM)             | 2-shot  | 49.8             | 59.9             | 59.9                | **69.8**         |
| CSMRR (EM)                  | 8-shot  | 81.6             | 88.3             | 89.3                | **89.3**         |
| MATH (EM)                   | 4-shot  | 43.4             | 54.4             | 49.0                | **61.6**         |
| MGSM (EM)                   | 8-shot  | 63.6             | 76.2             | 69.9                | **79.8**         |
| CMath (EM)                  | 3-shot  | 78.7             | 84.5             | 77.3                | **90.7**         |
| CLUEWSC (EM)                | 5-shot  | 82.0             | 82.5             | **83.0**            | 82.7             |
| C-Eval (EM)                 | 0-shot  | 81.4             | 72.5             | 72.5                | **90.1**         |
| CMMLU (EM)                  | 5-shot  | 84.0             | **89.5**         | 73.7                | 88.8             |
| CMRC (EM)                   | 1-shot  | **77.4**         | 75.8             | 76.0                | 76.3             |
| C3 (EM)                     | 0-shot  | 77.4             | 76.7             | **79.7**            | 78.6             |
| CCPM (EM)                   | 0-shot  | **93.0**         | 88.5             | 78.6                | 92.0             |
| MMLU-non-English (EM)       | 5-shot  | 64.0             | 74.8             | 73.8                | **79.4**         |

<!-- markdownlint-enable MD013 -->

<div
  class="table-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Table 2: Comparison between DeepSeek-V3 and other representative models.
(Copied from Table 3 of Liu, Aixin, et al (2024).)
</div>

1. **Superior Open-Source Model:** DeepSeek-V3 outperformed all other open-source
   models on educational benchmarks (MMLU, MMLU-Pro, GPQA) achieving performance
   levels that rivals that for closed-source models such as GPT-4o and Claude-Sonnet-3.5.
   DeepSeek-V3 also achieved SOTA on math-related benchmarks (GSM8K, MATH, MGSM,
   CMath).

2. **Efficient Training:** DeepSeek-V3 was trained using only 2.664M H800 GPU hours,
   leveraging an FP8 mixed precision training framework. This marked, as reported
   by the authors, the first successful use of an FP8 scheme to train a large-scale
   model.

3. **Reasoning Distillation:** As part of the post-training step, DeepSeek-V3 creators
   were able to distill reasoning capabilities via long [CoT](../llms/prompting/cot.md)
   passages generated by [DeepSeek-R1](../models/deepseek_r1.md). The authors noted
   that this pipeline improved reasononing performance while still maintaining the
   ability to produce desired outputs and efficient response lengths.

## Limitations

DeepSeek-V3 requires significant amounts of computation facilities to ensure efficient
inference.

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [_Liu, Aixin, et al. "Deepseek-v3 technical report." arXiv preprint
   arXiv:2412.19437 (2024)._](https://arxiv.org/pdf/2412.19437)
2. [DeepSeek sparks AI stock selloff; Nvidia posts record market-cap loss](https://www.reuters.com/technology/chinas-deepseek-sets-off-ai-market-rout-2025-01-27/)
   (_appearing in reuters.com_)

<!-- TODO: mdBook preprocessor with custom mustache handler {{ #author }} -->
<!-- markdownlint-disable-file MD033 -->

{{#author nerdai}}
