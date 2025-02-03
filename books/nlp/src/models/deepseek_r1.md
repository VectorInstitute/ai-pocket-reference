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

**Reasoning Cold Start**: a collection of 200K samples of long CoT passages from
multiple domains, verified by human annotators was used.

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

1. **Performance on Benchmarks:** dfadf

2. **Distilling Reasoning Capabilities:** lorem ipsum

3. **RL's Potential:** lorem ipsum

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
