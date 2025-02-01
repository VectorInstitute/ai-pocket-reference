// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Natural Language Processing</li><li class="chapter-item expanded "><a href="llms/index.html"><strong aria-hidden="true">1.</strong> LLMs</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="llms/architecture/index.html"><strong aria-hidden="true">1.1.</strong> Architecture</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="llms/architecture/attention.html"><strong aria-hidden="true">1.1.1.</strong> Attention</a></li><li class="chapter-item expanded "><a href="llms/architecture/transformer.html"><strong aria-hidden="true">1.1.2.</strong> Transformer</a></li><li class="chapter-item expanded "><a href="llms/architecture/moe.html"><strong aria-hidden="true">1.1.3.</strong> Mixture of Experts</a></li><li class="chapter-item expanded "><a href="llms/architecture/encoders.html"><strong aria-hidden="true">1.1.4.</strong> Encoders</a></li><li class="chapter-item expanded "><a href="llms/architecture/decoders.html"><strong aria-hidden="true">1.1.5.</strong> Decoders</a></li><li class="chapter-item expanded "><a href="llms/architecture/encoder_decoder.html"><strong aria-hidden="true">1.1.6.</strong> Encoder-Decoder</a></li></ol></li><li class="chapter-item expanded "><a href="llms/prompting/index.html"><strong aria-hidden="true">1.2.</strong> Prompting</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="llms/prompting/prompt_engineering.html"><strong aria-hidden="true">1.2.1.</strong> Prompt Engineering</a></li><li class="chapter-item expanded "><a href="llms/prompting/icl.html"><strong aria-hidden="true">1.2.2.</strong> In-Context Learning</a></li><li class="chapter-item expanded "><a href="llms/prompting/few_shot.html"><strong aria-hidden="true">1.2.3.</strong> Few-Shot Learning</a></li><li class="chapter-item expanded "><a href="llms/prompting/cot.html"><strong aria-hidden="true">1.2.4.</strong> Chain of Thought</a></li><li class="chapter-item expanded "><a href="llms/prompting/tot.html"><strong aria-hidden="true">1.2.5.</strong> Tree of Thought</a></li><li class="chapter-item expanded "><a href="llms/prompting/soft.html"><strong aria-hidden="true">1.2.6.</strong> Soft prompts</a></li><li class="chapter-item expanded "><a href="llms/prompting/hard.html"><strong aria-hidden="true">1.2.7.</strong> Hard prompts</a></li></ol></li><li class="chapter-item expanded "><a href="llms/fine_tuning/index.html"><strong aria-hidden="true">1.3.</strong> Fine-tuning</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="llms/fine_tuning/sft.html"><strong aria-hidden="true">1.3.1.</strong> Supervised Fine-Tuning</a></li><li class="chapter-item expanded "><a href="llms/fine_tuning/rlhf.html"><strong aria-hidden="true">1.3.2.</strong> RLHF</a></li><li class="chapter-item expanded "><a href="llms/fine_tuning/dpo.html"><strong aria-hidden="true">1.3.3.</strong> DPO</a></li><li class="chapter-item expanded "><a href="llms/fine_tuning/peft.html"><strong aria-hidden="true">1.3.4.</strong> PEFT</a></li><li class="chapter-item expanded "><a href="llms/fine_tuning/lora.html"><strong aria-hidden="true">1.3.5.</strong> LoRA</a></li><li class="chapter-item expanded "><a href="llms/fine_tuning/qlora.html"><strong aria-hidden="true">1.3.6.</strong> QLoRA</a></li><li class="chapter-item expanded "><a href="llms/fine_tuning/dora.html"><strong aria-hidden="true">1.3.7.</strong> DoRA</a></li></ol></li><li class="chapter-item expanded "><a href="llms/agents/index.html"><strong aria-hidden="true">1.4.</strong> Agents</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="llms/agents/tool_use.html"><strong aria-hidden="true">1.4.1.</strong> Tool Use</a></li><li class="chapter-item expanded "><a href="llms/agents/reflection.html"><strong aria-hidden="true">1.4.2.</strong> Reflection</a></li><li class="chapter-item expanded "><a href="llms/agents/multi_agents.html"><strong aria-hidden="true">1.4.3.</strong> Multi Agent</a></li><li class="chapter-item expanded "><a href="llms/agents/planning.html"><strong aria-hidden="true">1.4.4.</strong> Planning</a></li></ol></li><li class="chapter-item expanded "><a href="llms/rag/index.html"><strong aria-hidden="true">1.5.</strong> RAG</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="llms/rag/chunks.html"><strong aria-hidden="true">1.5.1.</strong> Chunks</a></li><li class="chapter-item expanded "><a href="llms/rag/sliding_window.html"><strong aria-hidden="true">1.5.2.</strong> Sliding Window</a></li><li class="chapter-item expanded "><a href="llms/rag/graph.html"><strong aria-hidden="true">1.5.3.</strong> Graph RAG</a></li></ol></li><li class="chapter-item expanded "><a href="llms/compression/index.html"><strong aria-hidden="true">1.6.</strong> Model Compression</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="llms/compression/distillation.html"><strong aria-hidden="true">1.6.1.</strong> Distillation</a></li><li class="chapter-item expanded "><a href="llms/compression/quantization.html"><strong aria-hidden="true">1.6.2.</strong> Quantization</a></li></ol></li><li class="chapter-item expanded "><a href="llms/efficient_inference/index.html"><strong aria-hidden="true">1.7.</strong> Efficient Inference</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="llms/efficient_inference/fast_attention.html"><strong aria-hidden="true">1.7.1.</strong> Fast Attention</a></li><li class="chapter-item expanded "><a href="llms/efficient_inference/distillation.html"><strong aria-hidden="true">1.7.2.</strong> Distillation</a></li><li class="chapter-item expanded "><a href="llms/efficient_inference/quantization.html"><strong aria-hidden="true">1.7.3.</strong> Quantization</a></li></ol></li><li class="chapter-item expanded "><a href="llms/misc/index.html"><strong aria-hidden="true">1.8.</strong> Miscellaneous</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="llms/misc/emergent.html"><strong aria-hidden="true">1.8.1.</strong> Emergent</a></li><li class="chapter-item expanded "><a href="llms/misc/llm_as_judge.html"><strong aria-hidden="true">1.8.2.</strong> LLM As Judge</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="models/index.html"><strong aria-hidden="true">2.</strong> Notable Models</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="models/bert.html"><strong aria-hidden="true">2.1.</strong> BERT</a></li><li class="chapter-item expanded "><a href="models/llama_3.html"><strong aria-hidden="true">2.2.</strong> Llama-3</a></li><li class="chapter-item expanded "><a href="models/deepseek_r1.html"><strong aria-hidden="true">2.3.</strong> DeepSeek-R1</a></li><li class="chapter-item expanded "><a href="models/deepseek_v3.html"><strong aria-hidden="true">2.4.</strong> DeepSeek-v3</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Evaluation</li><li class="chapter-item expanded "><a href="evaluation/index.html"><strong aria-hidden="true">3.</strong> Metrics</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="evaluation/rouge.html"><strong aria-hidden="true">3.1.</strong> Rouge</a></li><li class="chapter-item expanded "><a href="evaluation/bleu.html"><strong aria-hidden="true">3.2.</strong> Bleu</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
