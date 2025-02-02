# DeepSeek-R1

The DeepSeek-R1 model was introduced by DeepSeek in January of 2024. It is
derived from a checkpoint of [DeepSeek-V3](../models/deepseek_v3.md). In particular,
starting with DeepSeek-V3 as the base model, two stages of fine-tuning were
applied.

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
