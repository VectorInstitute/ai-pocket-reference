<!-- markdownlint-disable-file MD033 -->

# RLHF

<!-- Header -->

{{ #aipr_header }}

<!-- Main Body -->

## Intro and Motivation for RLHF

With pre-training on a large corpus of text, the LLM acquires a foundational
knowledge and is able to perform several tasks quite remarkably. Post pre-training,
we can fine-tune the LLM to increase the performance of an LLM in a certain domain
of text and/or a certain task (e.g., instruction fine-tuning). However, such fine-tuning
does not address the issue that arises due to the fact that language provides infinitely
many possible answers, where some are preferred (i.e. since they are less harmful)
more than others. That is, the issue of how we can further enhance the LLM to
respond in the ways that are preferred more than others.

Concretely, this phase of post-training is called _Alignment_, where the objective
is to adjust the LLM so that it responds in the preferred manner. Preference can
range in more serious forms such as less toxic or harmful as well as less more playful
in the sense of certain styles as well as verbosity and tone.

One of the more well-known methods for alignment fine-tuning is called Reinforcement
Learning with Human Feedback (RLHF), which is the main topic for this pocket reference.
In the next sections, we provide a brief overview of what RLHF involves and its limitations.

## Reinforcement Learning for Alignment of LLMs

We already know that (decoder-style) LLMs can perform text generation (which can
be re-purposed or targeted to solve a wide range of tasks). The next question, whose
answer may not be so obvious is how can we one use methods from reinforcement learning
to align these LLMs?

### A brief primer on reinforcement learning

- environments: states, actions, rewards
- policies
- PPO

### Steps to perform RLHF

## Limitations

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [_Raschka, Sebastian. "LLM Training: RLHF and Its Alternatives." Sebastian
   Raschka's Magazine, accessed 8 Mar. 2025,
   magazine.sebastianraschka.com/p/llm-training-rlhf-and-its-alternatives._](https://magazine.sebastianraschka.com/p/llm-training-rlhf-and-its-alternatives)
1. [_Raschka, Sebastian. "LLM Topics: Tips for LLM Pretraining and Evaluating RMS Norm."
   Sebastian Raschka's Magazine, accessed 8 Mar. 2025,
   magazine.sebastianraschka.com/p/tips-for-llm-pretraining-and-evaluating-rms._](https://magazine.sebastianraschka.com/p/tips-for-llm-pretraining-and-evaluating-rms?open=false#%C2%A7rlhf-vs-direct-preference-optimization-dpo)

<!-- Contributions -->

{{ #author nerdai }}
