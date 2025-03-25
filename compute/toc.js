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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><div>Awesome High-Performance AI Compute</div></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">High-Performance AI Computing</li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.</strong> Parallel Computing</div></li><li class="chapter-item expanded "><a href="cuda/index.html"><strong aria-hidden="true">2.</strong> CUDA Programming</a></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">2.1.</strong> CUDA Concepts</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="cuda/concepts/thread_coarsening.html"><strong aria-hidden="true">2.1.1.</strong> Thread Coarsening</a></li><li class="chapter-item expanded "><a href="cuda/concepts/reduction.html"><strong aria-hidden="true">2.1.2.</strong> Reduction</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.2.</strong> CUDA Kernels</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="cuda/kernels/attention_forward.html"><strong aria-hidden="true">2.2.1.</strong> Attention</a></li><li class="chapter-item expanded "><a href="cuda/kernels/encoder_forward.html"><strong aria-hidden="true">2.2.2.</strong> Encoder</a></li><li class="chapter-item expanded "><a href="cuda/kernels/layernorm_forward.html"><strong aria-hidden="true">2.2.3.</strong> LayerNorm</a></li><li class="chapter-item expanded "><a href="cuda/kernels/matmul_forward.html"><strong aria-hidden="true">2.2.4.</strong> Matrix Multiplication (MatMul)</a></li><li class="chapter-item expanded "><a href="cuda/kernels/softmax_forward.html"><strong aria-hidden="true">2.2.5.</strong> Softmax</a></li><li class="chapter-item expanded "><a href="cuda/kernels/trimat_forward.html"><strong aria-hidden="true">2.2.6.</strong> Triangular Matrix Multiplication (TriMat)</a></li></ol></li></ol></li></ol>';
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
