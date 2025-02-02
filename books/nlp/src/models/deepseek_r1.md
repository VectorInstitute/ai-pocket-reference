# DeepSeek-R1

The DeepSeek-R1 model was introduced by DeepSeek in January of 2024. It is
derived from an earlier checkpoint of [DeepSeek-V3](../models/deepseek_v3.md).
In particular, starting with DeepSeek-V3-base, four stages of fine-tuning were
applied:

1. "cold-start" [SFT](../llms/fine_tuning/sft.md),
2. Reinforcement Learning (RL) for reasoning via [GRPO](../llms/fine_tuning/grpo.md),
3. SFT using RL-generated reasoning data (sampled with [Rejection Sampling](../llms/misc/rejection_sampling.md))
4. RL for aligning to human preferences

## Distinctive Features

- [Multi-Latent Attention](../llms/architecture/mla.md) for memory efficiency
- [GRPO](../llms/fine_tuning/grpo.md) for reasoning
- [SFT](../llms/fine_tuning/sft.md) for reasoning cold start
- [MoE](../llms/architecture/moe.md)
- [Multi-Token Prediction](../llms/decoding/multi_token_prediction.md)
- [Rejection Sampling](../llms/misc/rejection_sampling.md)
- F8 training

## Architecture

## Performance

#### References <!-- markdownlint-disable-line MD001 -->

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
