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

lorem ipsum

## Architectural Highlights

See [DeepSeek-V3](../models/deepseek_v3.md).

## Training Data

## Key Results

## Limitations

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. _Guo, Daya, et al. "Deepseek-r1: Incentivizing reasoning capability in llms
   via reinforcement learning." arXiv preprint arXiv:2501.12948 (2025)._

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
