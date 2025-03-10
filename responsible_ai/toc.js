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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><div>Awesome Responsible AI</div></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="part-title">Bias &amp; Fairness</li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.</strong> Introduction</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">1.1.</strong> Bias Taxonomy</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.2.</strong> Bias Detection</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.3.</strong> Bias Mitigation Techniques</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.4.</strong> Intersectional Fairness &amp; Multi-modal Biases</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.5.</strong> Harms in Generative AI</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Privacy &amp; Security</li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.</strong> Introduction</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">2.1.</strong> Differential Privacy</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.2.</strong> Federated Learning &amp; Privacy-Preserving AI</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.3.</strong> Membership Inference Attacks &amp; Defenses</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.4.</strong> Data Poisoning Attacks &amp; Defenses</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.5.</strong> AI and Cybersecurity</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.6.</strong> Secure Model Deployment</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.7.</strong> Synthetic Data Generation</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Green AI</li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> Introduction</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">3.1.</strong> Carbon Footprint of AI Training</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.2.</strong> Efficient Training Techniques</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.3.</strong> Energy-Efficient Inference</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.4.</strong> Sustainable Data Centres</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.5.</strong> AI for Climate Action</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Responsible AI Product Development</li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.</strong> Introduction</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">4.1.</strong> AI Governance Frameworks &amp; Risk Management</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.2.</strong> Safety Evaluation of AI Models</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.3.</strong> Explainability &amp; Interpretability</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.4.</strong> Human-in-the-Loop Systems</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.5.</strong> Ethical AI Policy &amp; Compliance</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.6.</strong> Transparency &amp; Model Cards</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.7.</strong> Continuous Monitoring &amp; Post-Deployment Oversight</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Multimodal AI</li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.</strong> Introduction</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">5.1.</strong> Vision-Language Model</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.2.</strong> Text-Image-Video Fusion Techniques</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.3.</strong> Cross-Modal Retrieval</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.4.</strong> Audio &amp; Speech Models</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.5.</strong> Multimodal Alignment Challenges</div></li></ol></li><li class="chapter-item expanded "><li class="part-title">Autonomous AI Systems &amp; Decision-Making</li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.</strong> Introduction</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">6.1.</strong> AI Agents</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.2.</strong> Planning &amp; Decision-Making</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.3.</strong> AI in Robotics &amp; Embodied AI</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.4.</strong> AI for Scientific Discovery</div></li></ol></li></ol>';
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
