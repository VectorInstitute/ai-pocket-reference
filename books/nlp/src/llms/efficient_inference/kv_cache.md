# KV Cache

<!-- Header -->

{{ #aipr_header }}

<!-- Main Body -->

Autoregressive models like decoder-only LLMs (i.e., GPTs) perform inference by
predicting one token at a time, using the past token generations as inputs for
future ones. Specifically, recall that in the Attention module of Transformers,
the goal is to obtain contextualized representations of every token in a given
sequence. For ease of explanation, consider a single attention module and the
\\(t\\)-th token of a sequence. To compute its context vector, we use the keys
and values representations of tokens \\(1 \ldots t-1\\).

## Limitations

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [Liu, Zirui, et al. "Kivi: A tuning-free asymmetric 2bit quantization for kv
   cache." arXiv preprint arXiv:2402.02750 (2024).](https://arxiv.org/pdf/2402.02750)
1. [_Raschka, Sebastian. Build a Large Language Model (From Scratch). Simon and
   Schuster, 2024._](https://www.amazon.com/Build-Large-Language-Model-Scratch/dp/1633437167)

<!-- Contributions -->

{{ #author nerdai }}
