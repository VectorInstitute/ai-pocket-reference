<!-- markdownlint-disable-file MD033 -->

# RAG

{{ #aipr_header colab=nlp/rag.ipynb }}

## Intro and Motivation for RAG

After an LLM has been pre-trained, its learning is captured in _parametric_ knowledge.
This speak is jargon simply implying that the knowledge is captured in the LLM's
weight parameters. If the LLM is further fine-tuned for improved instruction following
or alignment, these knowledge specializations are still also considered to be parametric
in nature (i.e., since these involve weight parameter updates).

However, researchers have observed that relying only on the LLM's parametric knowledge,
can be suboptimal and this is especially observed when performing knowledge-intensive
tasks. Some pundits have argued that long-tail knowledge is not easily captured
in parametric form.

To remedy this drawback of an LLM's parametric knowledge, we can consider providing
an LLM with non-parametric knowledge. Retrieval-Augmented Generation (RAG) is one
such technique that aims to provide context to an LLM at inference time. As it's
name suggests, this method involves retrieving facts (i.e., knowledge) from a
data store and augmenting (e.g., by string concatenation) the original prompt or
query to the LLM with these facts.

## Canonical RAG Pipeline

### Evaluation

## Limitations

## Advanced Techniques

### Two Requirements For Success

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/llamaindex/rag-cheat-sheet-final.svg" alt="rag-cheat-sheet"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Figure: A RAG cheat sheet displaying various techniques for building advanced
retrieval-augmented generation systems. The left side shows methods for
independently addressing generation requirements (including compression, re-ranking,
and adapter methods), while the right side illustrates techniques for simultaneously
addressing multiple requirements (including fine-tuning, foundational models,
and iterative retrieval-generation). (Created by author while working at
LlamaIndex, 2024.)
</div>

## Frameworks

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [_Liu, Jerry. "LlamaIndex." GitHub, Nov. 2022. DOI: 10.5281/zenodo.1234.
   github.com/run-llama/llama_index_](https://github.com/run-llama/llama_index)
1. [_A Cheat Sheet and Some Recipes For Building Advanced RAG." LlamaIndex Blog,
   Andrei Fajardo, 5 Jan. 2024, medium.com/llamaindex-blog/a-cheat-sheet-and-some-recipes-for-building-advanced-rag_](https://medium.com/llamaindex-blog/a-cheat-sheet-and-some-recipes-for-building-advanced-rag-803a9d94c41b).
1. [_Rag Bootcamp. GitHub, Vector Institute, github.com/VectorInstitute/rag_bootcamp_](https://github.com/VectorInstitute/rag_bootcamp).

{{#author nerdai}}
