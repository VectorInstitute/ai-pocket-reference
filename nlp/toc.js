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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><div>Awesome NLP</div></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Natural Language Processing</li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.</strong> LLMs</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.1.</strong> Architecture</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.1.1.</strong> FeedForward</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.1.2.</strong> Attention</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.1.3.</strong> Transformer</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.1.4.</strong> Mixture of Experts</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.1.5.</strong> Encoders</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.1.6.</strong> Decoders</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.1.7.</strong> Encoder-Decoder</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.1.8.</strong> Multi-Latent Attention</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.2.</strong> Prompting</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.2.1.</strong> Prompt Engineering</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.2.2.</strong> In-Context Learning</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.2.3.</strong> Few-Shot Learning</div></li><li class="chapter-item expanded "><a href="llms/prompting/cot.html"><strong aria-hidden="true">1.2.4.</strong> Chain of Thought</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.2.5.</strong> Tree of Thought</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.2.6.</strong> Soft prompts</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.2.7.</strong> Hard prompts</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.3.</strong> Fine-tuning</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.3.1.</strong> Supervised Fine-Tuning</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.3.2.</strong> RLHF</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.3.3.</strong> DPO</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.3.4.</strong> GRPO</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.3.5.</strong> PEFT</div></li><li class="chapter-item expanded "><a href="llms/fine_tuning/lora.html"><strong aria-hidden="true">1.3.6.</strong> LoRA</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.3.7.</strong> QLoRA</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.3.8.</strong> DoRA</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.3.9.</strong> YaRN</div></li></ol></li><li class="chapter-item expanded "><a href="llms/agents/index.html"><strong aria-hidden="true">1.4.</strong> Agents</a></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.4.1.</strong> Tool Use</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.4.2.</strong> Reflection</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.4.3.</strong> Multi Agent</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.4.4.</strong> Planning</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.5.</strong> RAG</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.5.1.</strong> Chunks</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.5.2.</strong> Sliding Window</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.5.3.</strong> Graph RAG</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.6.</strong> Model Compression</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.6.1.</strong> Distillation</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.6.2.</strong> Quantization</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.7.</strong> Efficient Inference</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.7.1.</strong> Fast Attention</div></li><li class="chapter-item expanded "><a href="llms/efficient_inference/kv_cache.html"><strong aria-hidden="true">1.7.2.</strong> KV Cache</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.8.</strong> Decoding</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.8.1.</strong> Multi-Token Prediction</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.8.2.</strong> Top-k</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.8.3.</strong> Greedy</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.8.4.</strong> Speculative</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.9.</strong> Miscellaneous</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.9.1.</strong> Rejection Sampling</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.9.2.</strong> Emergent</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.9.3.</strong> LLM As Judge</div></li></ol></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.</strong> Notable Models</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">2.1.</strong> BERT</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.2.</strong> Llama-3</div></li><li class="chapter-item expanded "><a href="models/deepseek_r1.html"><strong aria-hidden="true">2.3.</strong> DeepSeek-R1</a></li><li class="chapter-item expanded "><a href="models/deepseek_v3.html"><strong aria-hidden="true">2.4.</strong> DeepSeek-v3</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.5.</strong> Qwen2.5</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Evaluation</li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> Metrics</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">3.1.</strong> Rouge</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.2.</strong> Bleu</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.3.</strong> pass@k</div></li></ol></li></ol>';
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
