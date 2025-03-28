<!-- markdownlint-disable-file MD033 -->

# RAG

{{ #aipr_header colab=nlp/rag.ipynb }}

## Intro and Motivation for RAG

After an LLM has been pre-trained, its learning is captured in _parametric_ knowledge.
This speak is jargon simply implying that the knowledge is captured in the LLM's
weight parameters. If the LLM is further fine-tuned for improved instruction following
or alignment, these knowledge specializations are parametric in nature (i.e.,
since these involve weight parameter updates).

However, researchers have observed that relying only on the LLM's parametric knowledge,
can be suboptimal and this is especially observed when performing knowledge-intensive
tasks. Some pundits have argued that long-tail knowledge is not easily captured
in parametric form.

To remedy this drawback of an LLM's parametric knowledge, we can consider providing
an LLM with non-parametric knowledge. Retrieval-Augmented Generation (RAG) is one
such technique that aims to provide knowledge in the form of additional context
to an LLM at inference time. As it's name suggests, this method involves
retrieving facts (i.e., knowledge) from a data store and augmenting (e.g., by
string concatenation) the original prompt or query to the LLM with these facts.

## Components of a RAG System

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/nlp/rag-components.excalidraw.svg" alt="rag-components"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Figure: The components of RAG.
</div>

A RAG system is comprised of three main components, namely:

- **Knowledge Store** — contains non-parametric knowledge facts that the system
  can use at inference time in order to produce more accurate responses to queries.
- **Retriever** — a model that takes in a user query and retrieves the most relevant
  knowledge facts from the knowledge store. (NOTE: the retriever is also used to
  populate or index the knowledge store during setup.)
- **Generator** — a model that takes in the user's query and additional context
  and provides a response to that query.

## Canonical RAG Pipeline

<center>
<img src="https://d3ddy8balm3goa.cloudfront.net/vector-ai-pocket-refs/nlp/rag-message-flow.excalidraw.svg" alt="rag-message-flow"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Figure: Depicting the canonical RAG message flow diagram. A user submits a query
to the RAG system, which ultimately returns the response back to the user only after
completing both retrieval and generation steps in sequence.
</div>

The canonical pipeline for RAG is as follows:

1. User submits a query to the RAG system
2. **[Retrieval Step]** The RAG system matches the query with the relevant facts
   from the knowledge store. The top k matched facts are retrieved.
3. **[Generation Step]** The content of the retrieved facts are used to augment the
   query and subsequently pass to the generator.
4. Response is returned back to the user. (Post-processing steps may be applied
   to the raw result from the generator prior to returning it to the user.)

## Evaluation of RAG Systems

Evaluation of RAG systems is often not a trivial task. A common way that these
systems are evaluated are by the evaluation of the respective components, namely:
retriever and generator evaluation.

### Evaluation of Retriever

Retriever's are evaluated based on the correctness of the retrieved facts. Given
a "labelled" example containing the query as well as associated facts, we can compute
metrics such as hit rate and normalized discounted cumulative gain (NDCG). The
former computes the fraction of retrievals that returned the correct knowledge
artifact over the number of queries (or retrieval tasks). While hit rate doesn't
take into account the order in which knowledge facts are retrieved, NDCG incorporates
this ordering in its calculation, considering retrievals successful when the correct
knowledge artifacts appear in the highest-ranked positions.

### Evaluation of Generator

Generator responses can be done via human scoring where a human assess the response
to the query given the context. The human can provide a numerical score to indicate
how well the generator answers the query with the provided context. Metrics such
as faithfulness and accuracy are often computed. However, human marking is expensive
and thus another strategy makes use of LLMs (i.e., LLM As A Judge) to perform the
grading.

## Limitations

While RAG has demonstrated success in providing LLMs with sufficient context in
order to perform well across various knowledge-intensive benchmarks, building a
RAG system involves many system-level parameters, and tuning these to achieve
sufficient performance is non-trivial.

Examples of these system-level parameters include:

- _On representing knowledge (i.e., knowledge store setup)_
  - **chunk size** — when populating the knowledge store, texts are chunked in
    order to ensure that queries along with context are within the context windows
    of the LLM generator
  - **hierarchical representations** — knowledge facts may depend on one another
    or may contain levels of hierarchy that should be captured in the knowledge store.
    Advance knowledged representations via knowledge graphs are also an option but
    come with its own challenges to reach a satisfactory performance (i.e., how to
    setup the knowledge graph optimally).
- _On retrieval_
  - **matching query to knowledge facts** — the raw user query may need some
    processing in order to increase the chances of finding relevant facts from the
    knowledge store. (e.g., query re-write or agentic planning)
- _On generation_
  - **hallucinations** — in the event that there are no retrieved facts, there are
    still risks for LLM hallucinations.

## Advanced Techniques

In this section, we present a few advanced techniques for building RAG systems.
Generally speaking, advanced methods aim to address the two main requirements
for success of a RAG system, namely:

1. Retrieval must be able to find the most relevant knowledge facts for the user
   query.
2. Generation must be able to make good use of the retrieved knowledge facts.

Advanced techniques can be viewed as addressing one of these requirements or both
simultaneously. Examples include individual fine-tuning of embedding or LLM model
in order improve retrieval and generation, alone. However, dual fine-tuning of
these can be considered to address both requirements simultaneously. See the
cheat sheet below for more advanced RAG designs.

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

### RAG Inference Frameworks

There are a handful of popular open-source frameworks that exist that help to
build RAG systems on top of the user's own data sources. These frameworks are
useful for quick proto-typing of RAG systems, supporting both basic and advanced
designs. Another major advantage of these frameworks is their vast integrations
to other tools in the tech stack i.e., vector stores, llm providers (both closed
and open options), embedding models, observability tools, etc.

Three popular frameworks for RAG include:

1. LlamaIndex - [https://github.com/run-llama/llama_index](https://github.com/run-llama/llama_index)
2. LangChain - [https://github.com/langchain-ai/langchain](https://github.com/langchain-ai/langchain)
3. Haystack by Deepset - [https://github.com/deepset-ai/haystack](https://github.com/deepset-ai/haystack)

### RAG Finetuning Frameworks

The previous section mentioned frameworks that are effective for building RAG inference
systems. For fine-tuning RAG, under both centralized and federated settings, the
Vector Institute has developed, fedRAG:
[https://github.com/VectorInstitute/fed-rag](https://github.com/VectorInstitute/fed-rag).

The fedRAG framework features a lightweight
interface to turn a centralized model training pipeline into a federated task.
Additionally, it boasts integrations to popular deep-learning tools and frameworks
including PyTorch and HuggingFace.

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [_Liu, Jerry. "LlamaIndex." GitHub, Nov. 2022. DOI: 10.5281/zenodo.1234.
   github.com/run-llama/llama_index_](https://github.com/run-llama/llama_index)
1. [_A Cheat Sheet and Some Recipes For Building Advanced RAG." LlamaIndex Blog,
   Andrei Fajardo, 5 Jan. 2024, medium.com/llamaindex-blog/a-cheat-sheet-and-some-recipes-for-building-advanced-rag_](https://medium.com/llamaindex-blog/a-cheat-sheet-and-some-recipes-for-building-advanced-rag-803a9d94c41b).
1. [_Rag Bootcamp. GitHub, Vector Institute, github.com/VectorInstitute/rag_bootcamp_](https://github.com/VectorInstitute/rag_bootcamp).
1. [_Lewis, Patrick, et al. "Retrieval-augmented generation for knowledge-intensive
   nlp tasks." Advances in neural information processing systems 33 (2020): 9459-947_](https://arxiv.org/pdf/2005.11401)

{{#author nerdai}}
