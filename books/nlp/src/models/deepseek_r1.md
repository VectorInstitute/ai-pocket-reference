# DeepSeek-R1

The DeepSeek-R1 model was introduced by DeepSeek in January of 2024. It is
derived from an earlier checkpoint of [DeepSeek-V3](../models/deepseek_v3.md).
In particular, starting with DeepSeek-V3-base, four stages of fine-tuning were
performed in order to arrive at the checkpoint known as DeepSeek-R1: (i) **Reasoning
Cold-Start** (using [SFT](../llms/fine_tuning/sft.md)), (ii) **RL for Reasoning**
(using [GRPO](../llms/fine_tuning/grpo.md)), (iii) **SFT for Enhanced Reasoning
& General Capabilities** (using RL-generated reasoning data sampled with
[Rejection Sampling](../llms/misc/rejection_sampling.md)), and (iv) **RL for Alignment**
(to human preferences).

![Lineage](https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/deepseek-v3-r1-lineage.excalidraw.svg)

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>

Figure: Illustrating DeepSeek-R1 model evolution.

</div>

As illustrated in the Figure above, the model lineage of DeepSeek-R1 implements
a full-scale RL for reasoning stage that leverages cold-start data. In contrast,
DeepSeek-R1-Zero does not use any cold-start SFT data whatsoever and uses purely
RL steps to acquire its reasoning capabilities. The reward signal used for
guiding the RL process of DeepSeek-R1-Zero is rules based computed from the
response's correctness as well as its adherence to the desired format. While
DeepSeek-R1-Zero demonstrated remarkable reasoning capabilities, it suffered greatly
from poor readability and language mixing.

This motivated the usage of cold-start data in the RL for Reasoning stage of
DeepSeek-R1's training. Additionally, a reward signal to reduce language mixing
as well as a model-based reward (using DeepSeek-V3 for judgement) was also
incorporated.

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

> DeepSeek-V3 is trained on a cluster equipped with 2048 NVIDIA H800 GPUs.
>
> _(quoted from the DeepSeek-V3 Technical Report)_

The fact that DeepSeek-R1's performance rivaled that of it's closed-source
counterpart in OpenAI o3 on multiple benchmarks (using reportedly less compute)
led to a frenzy in the LLM and broader AI community. As an example, many teams
(including at least one from HuggingFace) worked tirelessly to produce their own
versions of DeepSeek-R1 in the days after its release.

## Architectural Highlights

See [DeepSeek-V3](../models/deepseek_v3.md).

## Training Data

The training data used for the four stages are described below:

**Reasoning Cold Start**: 1000s of samples of long CoT passages from multiple domains,
verified by human annotators was used.

**RL for Reasoning**: self-exploration, using increased test-time for RL discovery
until convergence (referred to as the RL checkpoint).

**SFT for Enhanced Reasoning & General Capabilities**: the RL checkpoint was then
used to generate 600K reasoning related samples (using rejection sampling).
DeepSeek-V3 was used to create 200K non-reasoning data omitting the CoT portion
for simple queries.

**RL for Alignment**: a combination of reward signals diverse data distributions
including preference pairs and analyses of generated summaries & responses.

## Key Results

Below are three key results of DeepSeek-R1 and its development:

<!-- markdownlint-disable MD013 -->

| Benchmark (Metric)         | Claude-3.5-Sonnet-1022 | GPT-4 0513 | DeepSeek-V3 | OpenAI o1-mini | OpenAI o1-1217 | DeepSeek-R1 |
| -------------------------- | ---------------------- | ---------- | ----------- | -------------- | -------------- | ----------- |
| MMLU (Pass@1)              | 88.3                   | 87.2       | 88.5        | 85.2           | **91.8**       | 90.8        |
| MMLU-Redux (EM)            | 88.9                   | 88.0       | 89.1        | 86.7           | -              | **92.9**    |
| MMLU-Pro (EM)              | 78.0                   | 72.6       | 75.9        | 80.3           | -              | **84.0**    |
| DROP (3-shot F1)           | 88.3                   | 83.7       | 91.6        | 83.9           | 90.2           | **92.2**    |
| IF-Eval (Prompt Strict)    | **86.5**               | 84.3       | 86.1        | 84.8           | -              | 83.3        |
| GFQA Diamond (Pass@1)      | 65.0                   | 49.9       | 59.1        | 60.0           | **75.7**       | 71.5        |
| SimpleQA (Correct)         | 28.4                   | 38.2       | 24.9        | 7.0            | **47.0**       | 30.1        |
| FRAMES (Acc.)              | 72.5                   | 80.5       | 73.3        | 76.9           | -              | **82.5**    |
| AlpacaEval2.0 (LC-winrate) | 52.0                   | 51.1       | 70.0        | 57.8           | -              | **87.6**    |
| ArenaHard (GPT-4-1106)     | 85.2                   | 80.4       | 85.5        | 92.0           | -              | **92.3**    |
| LiveCodeBench (Pass@1-COT) | 38.9                   | 32.9       | 36.2        | 53.8           | 63.4           | **65.9**    |
| Codeforces (Percentile)    | 20.3                   | 23.6       | 58.7        | 93.4           | **96.6**       | 96.3        |
| Codeforces (Rating)        | 717                    | 759        | 1134        | 1820           | **2061**       | 2029        |
| SWE Verified (Resolved)    | **50.8**               | 38.8       | 42.0        | 41.6           | 48.9           | 49.2        |
| Aider-Polyglot (Acc.)      | 45.3                   | 16.0       | 49.6        | 32.9           | **61.7**       | 53.3        |
| AIME 2024 (Pass@1)         | 16.0                   | 9.3        | 39.2        | 63.6           | 79.2           | **79.8**    |
| MATH-500 (Pass@1)          | 78.3                   | 74.6       | 90.2        | 90.0           | 96.4           | **97.3**    |
| CNMO 2024 (Pass@1)         | 13.1                   | 10.8       | 43.2        | 67.6           | -              | **78.8**    |
| CLUEWSC (EM)               | 85.4                   | 87.9       | 90.9        | 89.9           | -              | **92.8**    |
| C-Eval (EM)                | 76.7                   | 76.0       | 86.5        | 68.9           | -              | **91.8**    |
| C-SimpleQA (Correct)       | 55.4                   | 58.7       | **68.0**    | 40.3           | -              | 63.7        |

<!-- markdownlint-enable MD013 -->

<div
  class="table-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>

Table: Comparison between DeepSeek-R1 and other representative models.
(Copied from Table 4 of Guo, Daya, et al (2024).)

</div>

1. **Performance on Benchmarks:** The table above which was copied from the DeepSeek-R1
   paper compares the performance of DeepSeek-R1 and -V3 with representative models
   from Anthropic and OpenAI. The values reported clearly demonstrate the impressive
   performance of DeepSeek-R1 across various benchmarks and tasks. Most notably,
   DeepSeek-R1 was able to surpass OpenAI's reasoning model o1-1217 on several benchmarks.

2. **Distilling Reasoning Capabilities:** The 800K samples that included generated
   examples by both DeepSeek-R1 (reasoning) and DeepSeek-V3 (non-reasoning) were
   used to distill other open-source models like [Qwen](../models/qwen2pt5.md)
   and [Llama](../models/llama_3.md). With only the application SFT (i.e., no RL),
   some of these distilled models were not only able to outperform OpenAI's non-reasoning
   model GPT-4o-0513 across all benchmarks tested, but also OpenAI's o1-mini model
   on most benchmarks.

3. **RL's Potential:** Pure RL empowered DeepSeek-R1-Zero to autonomously acquire
   robust reasoning capabilities without any SFT data. What's more is that as test-time
   computation was increased, desirable behaviours such as reflection and re-evaluation
   on past trajectories emerged making it possible for the model to have "aha moments"
   when solving complex tasks. This development should serve as a reminder of the
   great potential of RL and its overall place in AI as endeavour to reach new
   heights.

## Limitations

DeepSeek reported various limitations for DeepSeek-R1. Most notably, DeepSeek-R1
is inferior to DeepSeek-V3 in general capabilities such as function calling, producing
structured outputs (JSON), role-playing, and multi-turn conversations. Additionally,
due to its optimization for English and Chinese, the model sometimes suffers from
language mixing. Lastly, DeepSeek-R1 reportedly demonstrated a high sensitivity
to prompts and long inference times, making it unsuitable for low-latency applications
such as software-engineering tasks.

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
