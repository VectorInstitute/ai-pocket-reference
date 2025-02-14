<!-- markdownlint-disable-file MD033 -->

# Chain of Thought

<!-- Header -->

{{ #aipr_header }}

<!-- Main Body -->

The Chain of Thought (CoT) prompting technique, introduced by Wei, Jason et al (2022),
encourages an LLM to articulate its reasoning steps before arriving at a final
answer to a given task.

Before its introduction, scaling LLMs had demonstrated the ability to generate coherent
text and solve various tasks. However, these LLMs still underperformed on complex
reasoning tasks like arithmetic and symbolic reasoning. While some prompting techniques
and [in-context learning](./icl.md) had already been discovered, none had successfully
enabled LLMs to handle complex reasoning tasks.

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/nlp/cot.svg" alt="cot"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Figure: LLM producing a chain of thought.
</div>

## Original Implementation Details

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

## Limitations

One of the noted limitations of CoT is the lack of guarantees on correct reasoning
paths taken by the LLM. In other words, the reasoning steps that the LLM performs
can be flawed, leading to inefficient token generation and potentially amplifying
the issue of LLM hallucinations.

## Modern Implementations

Since its introdcution, the CoT prompting technique has become more flexible.
Broadly speaking, it is widely recognized as a prompting technique that elicits a
_chain of thought_ output in its generation. To do so, many include general
instructions in the prompt, specifying the desired output format and other requirements.
With these system instructions and output formats, CoT can also be implemented
in a zero-shot fashion.

```yaml
# Example CoT prompt instructions
prompt:
  system: >
    You are a helpful assistant that is able to handle complex reasoning
    tasks. To arrive at the final answer, perform chain of thought steps
    and include these in your output.

    Structure your output using the following format
      <thought>
        chain of thought here
      </thought>
      <answer>
        answer here
      </answer>
  question: >
    Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each
    can has 3 tennis balls. How many tennis balls does he have now?
```

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [_Wei, Jason, et al. "Chain-of-thought prompting elicits reasoning in large
   language models." Advances in neural information processing systems 35 (2022):
   24824-24837._](https://arxiv.org/pdf/2106.09685)

<!-- Contributions -->

{{ #author nerdai }}
