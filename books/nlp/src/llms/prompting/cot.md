# Chain of Thought

<!-- Header -->

{{ #aipr_header }}

<!-- Main Body -->

The Chain of Thought (CoT) prompting technique, introduced by Wei, Jason et al (2022),
encourages an LLM to articulate its reasoning steps before arriving at a final
answer to a given task.

Before its introduction, scaling LLMs had demonstrated the ability to generate coherent
text and solve various tasks. However, these LLMs still underperformed on
complex reasoning tasks like arithmetic and symbolic reasoning. While some prompting
techniques and [in-context learning](./icl.md) had been discovered, none had successfully
enabled LLMs to handle complex reasoning tasks.

CoT was originally introduced as a few-shot prompting technique where each included
examplar is augmented with a _chain of thought_ that explains how the final answer
was determined. An example of such an examplar taken from the original paper is
provided below:

```yaml
# An examplar
examplar:
  question: >
    Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each
    can has 3 tennis balls. How many tennis balls does he have now?
  chain of thought: >
    Roger started with 5 balls. 2 cans of 3 tennis balls each
    is 6 tennis balls. 5 + 6 = 11.
  answer: The answer is 11.
```

The authors used the same set of 8 examplars across all tested benchmarks, with
the exception of [AQuA](https://github.com/google-deepmind/AQuA) for which 4
examplars derived from the training set was used instead.

## Performance

With larger models, CoT outperformed standard prompting across all tested reasoning
benchmarks (mathematical, commonsense, and symbolic). For some of these, it even
achieved state of the art results, beating out previous methods that relied on
fine-tuning. However, CoT added little benefit for smaller models, leading the
authors to posit it as an [emergent](../misc/emergent.md) ability of model
scale.

## CoT and Reasoning LLMs

## Limitations

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [_Wei, Jason, et al. "Chain-of-thought prompting elicits reasoning in large
   language models." Advances in neural information processing systems 35 (2022):
   24824-24837._](https://arxiv.org/pdf/2106.09685)

<!-- Contributions -->

{{ #author nerdai }}
