# DeepSeek-R1

The DeepSeek-R1 model was introduced by DeepSeek in January of 2024. It is
derived from an earlier checkpoint of [DeepSeek-V3](../models/deepseek_v3.md).
In particular, starting with DeepSeek-V3-base, four stages of fine-tuning were
performed in order to arrive at the checkpoint known as DeepSeek-R1:

1. "cold-start" [SFT](../llms/fine_tuning/sft.md),
2. Reinforcement Learning (RL) for reasoning using [GRPO](../llms/fine_tuning/grpo.md),
3. SFT using RL-generated reasoning data (sampled with [Rejection Sampling](../llms/misc/rejection_sampling.md)),
4. RL for aligning to human preferences.

## Historical Significance

At the time of its release, LLM reasoning models such as the OpenAI's o-series
models had demonstrated remarkable performance on complex tasks, including those
requiring multiple steps (e.g., [OpenAI o3's breakthrough score on ARC-AGI](https://arcprize.org/blog/oai-o3-pub-breakthrough)).
However, OpenAI—operating under a closed-source model—provided little details to
how these models were developed, merely mentioning that Reinforcement Learning techniques
were used to train the LLMs to produce long (internal) chain-of-thought style
reasoning prior to providing a final answer.

In contrast, DeepSeek open-sourced DeepSeek-R1 and provided a very detailed
technical report, shedding much light on its training pipeline, which included an
RL approach for the model to acquire its reasoning capabilities. It was also
reported that DeepSeek-R1 was trained on NVIDIA H800's, a less capable GPU than
the NVIDIA H100 or A100.

The fact that DeepSeek-R1's performance rivaled that of it's closed-source
counterpart in OpenAI o3 on multiple benchmarks (using reportedly less compute)
led to a frenzy in the LLM and broader AI community. As an example, many teams
(including at least one from HuggingFace) worked tirelessly to produce their own
versions of DeepSeek-R1 in the days after it's release.

## Architectural Highlights

See [DeepSeek-V3](../models/deepseek_v3.md).

## Training Data

## Key Results

## Limitations

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [_Guo, Daya, et al. "Deepseek-r1: Incentivizing reasoning capability in llms
   via reinforcement learning." arXiv preprint arXiv:2501.12948 (2025)._](https://arxiv.org/pdf/2501.12948)
2. [_Liu, Aixin, et al. "Deepseek-v3 technical report." arXiv preprint
   arXiv:2412.19437 (2024)._](https://arxiv.org/pdf/2412.19437)
3. [_China's DeepSeek sets off Nvidia investor panic over US export controls_](https://fortune.com/2025/01/27/china-deepseek-nvidia-gpu-investor-panic-us-export-controls-rethink/)
   _(appearing in fortune.com)_
4. [_Open-R1: a fully open reproduction of DeepSeek-R1_](https://huggingface.co/blog/open-r1)
   _(by HuggingFace)_

<!-- TODO: mdBook preprocessor with custom mustache handler {{ #author }} -->
<!-- markdownlint-disable-file MD033 -->

---

<div class="contributor-footnotes">
<small>

**Contributors:**

<a href="https://github.com/nerdai">
<img src="https://github.com/nerdai.png"
  width="32px" alt="Contributor 1" style="border-radius: 50%">
</a>
</small>

</div>
