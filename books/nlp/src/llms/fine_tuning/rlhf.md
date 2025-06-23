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

Just how reinforcement learning techniques apply to LLMs may not be immediately
apparent. In this section, we clarify specifically how these techniques can be
leveraged for alignment fine-tuning of LLMs.

### A brief primer on reinforcement learning

In reinforcement learning, there is an environment and a so-called agent which
interacts with it. The agent observes the current state of the environment, takes
an action, which then alters the environment's state and produces a quantifiable
reward for the agent. The main objective of reinforcement learning is to optimize
these rewards by learning an optimal policy—a strategy for taking actions based
on the current environmental state.

Methods for finding the optimal policy depend on certain parameters of the reinforcement
learning problem, such as whether or not the state space and action spaces are finite.

#### Policy Gradient Methods

For LLM alignment fine-tuning, we make use of a branch of reinforcement learning
techniques called _Policy Gradient Methods_ which approximates the optimal policy
by first representing it as a smooth parametric function from the state space to
the action space.

#### Proximal Policy Optimization (PPO)

### Steps to perform RLHF

Performing RLHF on an LLM involves the following two high-level steps:

1. **Building a reward model**
2. **Fine-tuning the LLM using PPO**

#### Building a reward model

- Still an LLM
- Change prediction head to a classification head
- [Bradley-Terry model] Predict which of two generated responses preferred by human

#### Fine-tuning the LLM using PPO

## Limitations

## Alternatives

### DPO

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [_Barto, Andrew G. "Reinforcement learning: An introduction. by richard’s sutton."
   SIAM Rev 6.2 (2021): 423._](http://www.incompleteideas.net/book/the-book.html)
1. [_Raschka, Sebastian. "LLM Training: RLHF and Its Alternatives." Sebastian
   Raschka's Magazine, accessed 8 Mar. 2025,
   magazine.sebastianraschka.com/p/llm-training-rlhf-and-its-alternatives._](https://magazine.sebastianraschka.com/p/llm-training-rlhf-and-its-alternatives)
1. [_Raschka, Sebastian. "Tips for LLM Pretraining and Evaluating Reward Models"
   Sebastian Raschka's Magazine, accessed 8 Mar. 2025,
   magazine.sebastianraschka.com/p/tips-for-llm-pretraining-and-evaluating-rms._](https://magazine.sebastianraschka.com/p/tips-for-llm-pretraining-and-evaluating-rms)
1. [_Lambert, Nathan, et al. "Rewardbench: Evaluating reward models for language
   modeling." arXiv preprint arXiv:2403.13787 (2024)._](https://arxiv.org/abs/2403.13787)

<!-- Contributions -->

{{ #author nerdai }}
