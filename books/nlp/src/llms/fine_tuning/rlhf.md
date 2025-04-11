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

## Alignment with RLHF

### Steps for alignment

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
