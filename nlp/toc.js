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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Natural Language Processing</li><li class="chapter-item expanded "><a href="llms/index.html"><strong aria-hidden="true">1.</strong> LLMs</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="llms/attention.html"><strong aria-hidden="true">1.1.</strong> Attention</a></li><li class="chapter-item expanded "><a href="llms/transformer.html"><strong aria-hidden="true">1.2.</strong> Transformer</a></li><li class="chapter-item expanded "><a href="llms/kv_cache.html"><strong aria-hidden="true">1.3.</strong> KV Cache</a></li><li class="chapter-item expanded "><a href="llms/moe.html"><strong aria-hidden="true">1.4.</strong> Mixture of Experts</a></li><li class="chapter-item expanded "><a href="llms/distillation.html"><strong aria-hidden="true">1.5.</strong> Distillation</a></li><li class="chapter-item expanded "><a href="llms/icl.html"><strong aria-hidden="true">1.6.</strong> In-Context Learning</a></li><li class="chapter-item expanded "><a href="llms/sft.html"><strong aria-hidden="true">1.7.</strong> Supervised Fine-Tuning</a></li><li class="chapter-item expanded "><a href="llms/encoders.html"><strong aria-hidden="true">1.8.</strong> Encoders</a></li><li class="chapter-item expanded "><a href="llms/decoders.html"><strong aria-hidden="true">1.9.</strong> Decoders</a></li><li class="chapter-item expanded "><a href="llms/encoder_decoder.html"><strong aria-hidden="true">1.10.</strong> Encoder-Decoder</a></li><li class="chapter-item expanded "><a href="llms/pref_tuning.html"><strong aria-hidden="true">1.11.</strong> Preference Tuning</a></li><li class="chapter-item expanded "><a href="llms/rlhf.html"><strong aria-hidden="true">1.12.</strong> RLHF</a></li><li class="chapter-item expanded "><a href="llms/dpo.html"><strong aria-hidden="true">1.13.</strong> DPO</a></li></ol></li><li class="chapter-item expanded "><a href="models/index.html"><strong aria-hidden="true">2.</strong> Notable Models</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="models/llama_3.html"><strong aria-hidden="true">2.1.</strong> Llama-3</a></li><li class="chapter-item expanded "><a href="models/deepseek_r1.html"><strong aria-hidden="true">2.2.</strong> DeepSeek-R1</a></li><li class="chapter-item expanded "><a href="models/deepseek_v3.html"><strong aria-hidden="true">2.3.</strong> DeepSeek-v3</a></li></ol></li></ol>';
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
