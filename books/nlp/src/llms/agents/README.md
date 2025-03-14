<!-- markdownlint-disable-file MD033 -->

# Agents

{{ #aipr_header }}

Agents are LLMs equipped with [tools](./tool_use.md) and memory to interact
with the environment and complete specific, user-defined objectives.
They go about this by following workflows which direct them in
(i) [planning](./planning.md) for what steps and tools are needed,
(ii) executing an action, and (iii) [reflecting](./reflection.md) on feedback
from their action, looping through these steps when the initial plan requires
multiple actions, or when reflection suggests additional actions are needed to
achieve the objective.
Compared to an LLM on its own, the "plan-action-reflect" workflow of agents
give them a higher degree of agency and capacity for complex or long term
tasks, while tools offer the ability to learn up-to-date information
from the environment and offload certain computations.

## Components

<center>
<img src="./agent.svg" alt="agent"> <!-- markdownlint-disable-line MD013 -->
</center>

<div
  class="figure-caption"
  style="text-align: center; font-size: 0.8em; margin-top: 10px;"
>
Figure: Agent components
</div>

### Tools

[Tools](./tool_use.md) can include external data sets (including
unstructured data such as PDF documents), web searches, APIs, custom functions,
and even [other agents](./multi_agents.md).
They should fulfill a clear objective which is clearly communicated
to the LLM through a short, formatted description.
This is so the LLM is aware of the tool's existence and can invoke it
when necessary. However, since an LLM's input and output are text-based,
invoking a tool means generating a structured output in a specific
format—typically JSON or direct code. Standardized communication
between tools and LLMs are also being established and propagated, with
Anthropic's Model Context Procotol [(2024)](https://www.anthropic.com/news/model-context-protocol)
being a notable example.

### Memory

The information retrieved from a tool updates the agent's memory,
which also contains the context of its objective: the original
user-defined objective, any other user input, as well as the results
of prior planning, actions, and reflection.
This memory is vital for the agent to complete its objective coherently
and not be stuck in endless loops, conducting unnecessary actions,
or offering irrelevant results. Memory does not have to be one continuous
block. It can be separated into multiple sections with different persistence
and frequencies of use. This is the case with LlamaIndex's
[composable memory](https://docs.llamaindex.ai/en/stable/examples/agent/memory/composable_memory/).

### LLM

The underlying LLM powering the agent's every move can be
any language model, including the notable models listed in
[the pocket references of notable models](../../models/README.md)
(e.g., [Llama-3](../../models/llama_3.md),
[DeepSeek-R1](../../models/deepseek_r1.md), etc.).

### Framework

The final component of an agent that cannot be overlooked is the
"connective tissue" that enables the LLM to work together with its memory
and its tools. This is the code that structures the user-defined objective
and the tool descriptions into a prompt for the LLM, that parses an LLM's
output and directs their JSON/code to the corresponding tool, that incorporates
tool results into memory and text to properly give back to
the LLM for reflection. Some popular frameworks include [CrewAI](https://github.com/crewAIInc/crewAI),
[MetaGPT](https://github.com/geekan/MetaGPT),
[smolagents](https://github.com/huggingface/smolagents),
[LangGraph](https://github.com/langchain-ai/langgraph),
[LlamaIndex](https://github.com/run-llama/llama_index).

## Applications

The potential applications for agents are quite broad. Some examples include:

- Personal scheduling assistant
- Customer service queue specialist
- Internet-of-things (IoT) hub manager
- Discussion forum moderator
- Lab research assistant
- etc.

While the above are theoretical applications, tangible agents have also begun
making their way to the market. At the time of writing this reference,
Deep Research [(2025)](https://openai.com/index/introducing-deep-research/),
a research assistant for synthesizing literature,
and Manus [(2025)](https://manus.im/),
for broader analysis and development,
are two agents that have made headlines. Furthermore, Casper et al. [(2025)](https://arxiv.org/pdf/2502.01635)
have compiled an [index](https://aiagentindex.mit.edu/index/)
to track existing agents and discover patterns. They
have found agents "being deployed at a steadily increasing rate".

## Limitations and Advances

Built on LLMs, agents can be computationally expensive,
and thus may be unnecessary for overly simplistic tasks.
Due to their semi-supervised nature, the possibility of an agent
making inefficient LLM calls or worse, getting stuck in feedback loops,
should be kept in mind.
Extra care should be taken when implementing multi-agent collaboration,
as a hallucination in one agent would affect the whole system.
Additionally with multi-agents, if they were all built on the same LLM,
any reasoning deficiency would be shared across all agents.
Lastly, more work and time are needed to foster community trust
in the viability of agents for everyday life.

Advances have been made to address these perceived shortcomings,
with the foremost technique being [fine-tuning](../fine_tuning/README.md).
Supervised fine-tuning with instructions
[(Zhang et al., 2024)](https://arxiv.org/abs/2308.10792)
and reasoning fine-tuning with reinforcement learning
[(Luong et al., 2024)](https://arxiv.org/abs/2401.08967),
are among the promising fine-tuning techniques proposed.

## Further Reading

While there is general agreement on what agents do in the industry,
the specifics vary between sources and application settings. Therefore,
it would be useful to browse different definitions and see more perspectives.
The links below include introductions to agents from
[Hugging Face](https://huggingface.co/learn/agents-course/unit1/what-are-agents)
,
[LlamaIndex](https://github.com/nerdai/talks/blob/main/2024/genai-philippines/genai-philippines.ipynb)
,
[IBM](https://www.ibm.com/think/topics/ai-agents)
,
[MIT](https://aiagentindex.mit.edu/)
,
and
[Anthropic](https://www.anthropic.com/engineering/building-effective-agents).

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [_Anthropic. "Introducing the Model Context Protocol." Anthropic News,
   anthropic.com/news/model-context-protocol. Accessed 14 Mar. 2025._](https://www.anthropic.com/news/model-context-protocol)
2. [_LlamaIndex. "Single composable memory." LlamaIndex Documentation,
   docs.llamaindex.ai/en/stable/examples/agent/memory/composable_memory/.
   Accessed 14 Mar. 2025._](https://docs.llamaindex.ai/en/stable/examples/agent/memory/composable_memory/)
3. [_OpenAI. "Introducing deep research." OpenAI Documentation,
   openai.com/index/introducing-deep-research/. Accessed 8 Mar. 2025._](https://openai.com/index/introducing-deep-research/)
4. [_Manus. "Introducing Manus." Manus Home Page, manus.im/.
   Accessed 8 Mar. 2025._](https://manus.im/)
5. [_Casper, S., Bailey, L., Hunter, R., Ezell, C., Cabalé, E.,
   Gerovitch, M., Slocum, S., Wei, K., Jurkovic, N., Khan, A.,
   Christoffersen, P.J.K., Ozisik, A.P., Trivedi, R., Hadfield-Menell, D.,
   and Kolt, N. "The AI Agent Index." (2025),
   DOI: 10.48550/arXiv.2502.01635._](https://arxiv.org/pdf/2502.01635)
6. [_Zhang, S., Dong, L., Li, X., Zhang, S., Sun, X., Wang, S., Li, J., Hu, R.,
   Zhang, T., Wu, F., and Wang, G. "Instruction tuning for large
   language models: a survey." (2024),
   DOI: 10.48550/arXiv.2308.10792._](https://arxiv.org/abs/2308.10792)
7. [_Luong, T.Q., Zhang, X., Jie, Z., Sun, P., Jin, X., and Li, H.
   "ReFT: reasoning with reinforced fine-tuning." (2024),
   DOI: doi.org/10.48550/arXiv.2401.08967._](https://arxiv.org/abs/2401.08967)
8. [_Hugging Face. "What is an agent?" Hugging Face Agents Course,
   huggingface.co/learn/agents-course/unit1/what-are-agents.
   Accessed 8 Mar. 2025._](https://huggingface.co/learn/agents-course/unit1/what-are-agents)
9. [_Fajardo, V.A. LlamaIndex GenAI Philippines talk, github.com/nerdai/
   talks/blob/main/2024/genai-philippines/genai-philippines.ipynb.
   Accessed 8 Mar. 2025._](https://github.com/nerdai/talks/blob/main/2024/genai-philippines/genai-philippines.ipynb)
10. [_IBM. "What are AI agents?" IBM Think, ibm.com/think/topics/ai-agents.
   Accessed 8 Mar. 2025._](https://www.ibm.com/think/topics/ai-agents)
11. [_Anthropic. "Building effective agents." Anthropic Engineering,
   anthropic.com/engineering/building-effective-agents.
   Accessed 14 Mar. 2025._](https://www.anthropic.com/engineering/building-effective-agents)

#### GitHub Repositories for Agent Frameworks

1. [_crewAI. github.com/crewAIInc/crewAI_](https://github.com/crewAIInc/crewAI)
2. [_MetaGPT. github.com/geekan/MetaGPT_](https://github.com/geekan/MetaGPT)
3. [_smolagents. github.com/huggingface/smolagents_](https://github.com/huggingface/smolagents)
4. [_LangGraph. github.com/langchain-ai/langgraph_](https://github.com/langchain-ai/langgraph)
5. [_LlamaIndex. github.com/run-llama/llama_index_](https://github.com/run-llama/llama_index)

<!-- Contributions -->

{{ #author c567wang }}
