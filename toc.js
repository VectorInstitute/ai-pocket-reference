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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Fundamentals</li><li class="chapter-item expanded "><a href="training/index.html"><strong aria-hidden="true">1.</strong> Training</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="training/sgd.html"><strong aria-hidden="true">1.1.</strong> Stochastic Gradient Descent</a></li><li class="chapter-item expanded "><a href="training/vanishing_gradients.html"><strong aria-hidden="true">1.2.</strong> Vanishing Gradients</a></li><li class="chapter-item expanded "><a href="training/exploding_gradients.html"><strong aria-hidden="true">1.3.</strong> Exploding Gradients</a></li></ol></li><li class="chapter-item expanded "><a href="activations/index.html"><strong aria-hidden="true">2.</strong> Activation Functions</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="activations/relu.html"><strong aria-hidden="true">2.1.</strong> ReLU</a></li><li class="chapter-item expanded "><a href="activations/leaky_relu.html"><strong aria-hidden="true">2.2.</strong> Leaky ReLU</a></li><li class="chapter-item expanded "><a href="activations/gelu.html"><strong aria-hidden="true">2.3.</strong> GELU</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Natural Language Processing</li><li class="chapter-item expanded "><a href="nlp/llms/index.html"><strong aria-hidden="true">3.</strong> LLMs</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nlp/llms/attention.html"><strong aria-hidden="true">3.1.</strong> Attention</a></li><li class="chapter-item expanded "><a href="nlp/llms/transformer.html"><strong aria-hidden="true">3.2.</strong> Transformer</a></li><li class="chapter-item expanded "><a href="nlp/llms/kv_cache.html"><strong aria-hidden="true">3.3.</strong> KV Cache</a></li><li class="chapter-item expanded "><a href="nlp/llms/moe.html"><strong aria-hidden="true">3.4.</strong> Mixture of Experts</a></li><li class="chapter-item expanded "><a href="nlp/llms/distillation.html"><strong aria-hidden="true">3.5.</strong> Distillation</a></li><li class="chapter-item expanded "><a href="nlp/llms/icl.html"><strong aria-hidden="true">3.6.</strong> In-Context Learning</a></li><li class="chapter-item expanded "><a href="nlp/llms/sft.html"><strong aria-hidden="true">3.7.</strong> Supervised Fine-Tuning</a></li><li class="chapter-item expanded "><a href="nlp/llms/encoders.html"><strong aria-hidden="true">3.8.</strong> Encoders</a></li><li class="chapter-item expanded "><a href="nlp/llms/decoders.html"><strong aria-hidden="true">3.9.</strong> Decoders</a></li><li class="chapter-item expanded "><a href="nlp/llms/encoder_decoder.html"><strong aria-hidden="true">3.10.</strong> Encoder-Decoder</a></li><li class="chapter-item expanded "><a href="nlp/llms/pref_tuning.html"><strong aria-hidden="true">3.11.</strong> Preference Tuning</a></li><li class="chapter-item expanded "><a href="nlp/llms/rlhf.html"><strong aria-hidden="true">3.12.</strong> RLHF</a></li><li class="chapter-item expanded "><a href="nlp/llms/dpo.html"><strong aria-hidden="true">3.13.</strong> DPO</a></li></ol></li><li class="chapter-item expanded "><a href="nlp/models/index.html"><strong aria-hidden="true">4.</strong> Notable Models</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nlp/models/llama_3.html"><strong aria-hidden="true">4.1.</strong> Llama-3</a></li><li class="chapter-item expanded "><a href="nlp/models/deepseek_r1.html"><strong aria-hidden="true">4.2.</strong> DeepSeek-R1</a></li><li class="chapter-item expanded "><a href="nlp/models/deepseek_v3.html"><strong aria-hidden="true">4.3.</strong> DeepSeek-v3</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Computer Vision</li><li class="chapter-item expanded "><a href="cv/cnns/index.html"><strong aria-hidden="true">5.</strong> CNNs</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="cv/cnns/convolution.html"><strong aria-hidden="true">5.1.</strong> Convolutions</a></li><li class="chapter-item expanded "><a href="cv/cnns/vit.html"><strong aria-hidden="true">5.2.</strong> Vision Transformers</a></li></ol></li><li class="chapter-item expanded "><a href="nlp/models/index.html"><strong aria-hidden="true">6.</strong> Notable Models</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="nlp/models/alex_net.html"><strong aria-hidden="true">6.1.</strong> LeNet</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Reinforcement Learning</li><li class="chapter-item expanded "><a href="rl/tabular/index.html"><strong aria-hidden="true">7.</strong> Tabular Methods</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="rl/tabular/q_learning.html"><strong aria-hidden="true">7.1.</strong> Q-Learning</a></li><li class="chapter-item expanded "><a href="rl/tabular/sarsa.html"><strong aria-hidden="true">7.2.</strong> SARSA</a></li></ol></li><li class="chapter-item expanded "><a href="rl/policy_gradient/index.html"><strong aria-hidden="true">8.</strong> Policy Gradient</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="rl/policy_gradient/actor_critic.html"><strong aria-hidden="true">8.1.</strong> Actor-Critic</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">Distributed Learning</li><li class="chapter-item expanded "><a href="distributed_learning/fl/index.html"><strong aria-hidden="true">9.</strong> Federated Learning</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="distributed_learning/fl/fed_avg.html"><strong aria-hidden="true">9.1.</strong> FedAvg</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">AI Safety</li><li class="chapter-item expanded "><a href="ai_safety/fair_and_bias/index.html"><strong aria-hidden="true">10.</strong> Fairness and Bias</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ai_safety/fair_and_bias/dem_p.html"><strong aria-hidden="true">10.1.</strong> Demographic Parity</a></li></ol></li><li class="chapter-item expanded "><a href="ai_safety/privacy/index.html"><strong aria-hidden="true">11.</strong> Privacy</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ai_safety/privacy/dp.html"><strong aria-hidden="true">11.1.</strong> Differential Privacy</a></li><li class="chapter-item expanded "><a href="ai_safety/privacy/k_anon.html"><strong aria-hidden="true">11.2.</strong> K Anonymity</a></li></ol></li></ol>';
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
