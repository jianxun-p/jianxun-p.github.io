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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="Introduction.html">Introduction</a></li><li class="chapter-item expanded "><a href="personalized-notes/personalized-notes.html"><strong aria-hidden="true">1.</strong> Personalized Notes</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="personalized-notes/fourier-transform/fourier-transform.html"><strong aria-hidden="true">1.1.</strong> Fourier Transform</a></li><li class="chapter-item expanded "><a href="personalized-notes/stat/statistics.html"><strong aria-hidden="true">1.2.</strong> Statistics</a></li><li class="chapter-item expanded "><a href="personalized-notes/lambda-calculus.html"><strong aria-hidden="true">1.3.</strong> Lambda Calculus</a></li><li class="chapter-item expanded "><a href="personalized-notes/crypto/crypto.html"><strong aria-hidden="true">1.4.</strong> Cryptography</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="personalized-notes/crypto/algebra.html"><strong aria-hidden="true">1.4.1.</strong> Algebra</a></li><li class="chapter-item expanded "><a href="personalized-notes/crypto/ecc.html"><strong aria-hidden="true">1.4.2.</strong> Elliptic Curve Cryptography</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="http-proxy/http-proxy.html"><strong aria-hidden="true">2.</strong> HTTP Proxy</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="http-proxy/principles.html"><strong aria-hidden="true">2.1.</strong> Principles</a></li><li class="chapter-item expanded "><a href="http-proxy/implementation.html"><strong aria-hidden="true">2.2.</strong> Implementation</a></li><li class="chapter-item expanded "><a href="http-proxy/issues.html"><strong aria-hidden="true">2.3.</strong> Issues</a></li></ol></li><li class="chapter-item expanded "><a href="wifi-controlled-robot/wifi-controlled-robot.html"><strong aria-hidden="true">3.</strong> WiFi Controlled Robot</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="wifi-controlled-robot/engineering-log.html"><strong aria-hidden="true">3.1.</strong> Engineering Log</a></li><li class="chapter-item expanded "><a href="wifi-controlled-robot/issues.html"><strong aria-hidden="true">3.2.</strong> Issues</a></li></ol></li><li class="chapter-item expanded "><a href="racketx.html"><strong aria-hidden="true">4.</strong> racketx</a></li><li class="chapter-item expanded "><a href="tls/tls.html"><strong aria-hidden="true">5.</strong> TLS</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tls/stage1.html"><strong aria-hidden="true">5.1.</strong> Stage 1</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
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
