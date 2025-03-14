<!-- markdownlint-disable-file MD033 -->

# Agents

{{ #aipr_header }}

Agents are LLMs equipped with [tools](./tool_use.md) and memory to interact
with the environment and complete specific, user-defined objectives.
They go about this by following workflows which direct them in
(i) [planning](./planning.md) for what steps and tools are needed,
(ii) executing an action, and (iii) [reflecting](./reflection.md) on feedback
from their action, looping through these steps
when the initial plan calls for multiple actions or reflection
deems more actions to be needed to complete the objective.
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

Tools: [Tools](./tool_use.md) can include external data sets (including
unstructured data such as PDF documents), web searches, APIs, custom functions,
and even [other agents](./multi_agents.md).
They should fulfill a clear objective which is clearly communicated
to the LLM through a short, formatted description.
This is so the LLM knows of the tool's existence and can invoke it when
necessary. However, the input and output of an LLM is text, so what invoking
a tool actually entails is specifying that the LLM should output their
invoking of a tool in a set format,
with common formats including JSON or direct code.

Memory: The information retrieved from a tool updates the agent's memory,
which also contains the context of its objective: the original
user-defined objective, any other user input, as well as the results
of prior planning, actions, and reflection.
This memory is vital for the agent to complete its objective coherently
and not be stuck in endless loops, conducting unnecessary actions,
or offering irrelevant results.

LLM: The underlying LLM powering the agent's every move can be
any language model, including the notable models listed in
[Section 2](../../models/README.md).

Framework: The final component of an agent that cannot be overlooked is the
"connective tissue" that enables the LLM to work together with its memory
and its tools. This is the code that structures the user-defined objective
and the tool descriptions into a prompt for the LLM, that parses an LLM's
output and directs their JSON/code to the corresponding tool, that incorporates
tool results into memory and text to properly give back to
the LLM for reflection.

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
Deep Research (2025), a research assistant for synthesizing literature,
and Manus (2025), for broader analysis and development,
are two agents that have made headlines.

## Limitations

Built on LLMs, agents can be computationally expensive,
and thus may be unnecessary for overly simplistic tasks.
Due to their semi-supervised nature, the possibility of an agent
making inefficient LLM calls or worse, getting stuck in feedback loops,
should be kept in mind.
Extra care should be taken when implementing multi-agent collaboration,
as a hallucination in one agent would affect the whole system.
Additionally with multi-agents, if they were all built on the same LLM,
any reasoning deficiency would be shared across all agents.
Lastly, more work and time is needed to foster trust in the community
for the viability for agents in everyday life.

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [_Hugging Face. "What is an agent?" Hugging Face Agents Course,
   huggingface.co/learn/agents-course/unit1/what-are-agents.
   Accessed 8 Mar. 2025._](https://huggingface.co/learn/agents-course/unit1/what-are-agents)
2. [_Fajardo, V.A. LlamaIndex GenAI Philippines talk, github.com/nerdai/
   talks/blob/main/2024/genai-philippines/genai-philippines.ipynb.
   Accessed 8 Mar. 2025._](https://github.com/nerdai/talks/blob/main/2024/genai-philippines/genai-philippines.ipynb)
3. [_IBM. "What are AI agents?" IBM Think, ibm.com/think/topics/ai-agents.
   Accessed 8 Mar. 2025._](https://www.ibm.com/think/topics/ai-agents)
4. [_OpenAI. "Introducing deep research." OpenAI Documentation,
   openai.com/index/introducing-deep-research/. Accessed 8 Mar. 2025._](https://openai.com/index/introducing-deep-research/)
5. [_Manus. "Introducing Manus." Manus Home Page, manus.im/.
   Accessed 8 Mar. 2025._](https://manus.im/)

<!-- Contributions -->

{{ #author c567wang }}
