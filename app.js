/**
 * JAYASHBORN LANDING PAGE INTERACTIONS (V1)
 * Developer: Antigravity AI
 * Creator: Coach J / เจตื่นแล้ว
 */

document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 1. LEAD CAPTURE & CTA CENTRAL CONFIGURATION
    // =========================================================================
    // CLIENT REVIEW: Change this URL to your Notion, PDF, Google Form, or Instagram DM link.
    // Example Options:
    // - Notion: "https://notion.so/jayashborn/ebook-pull-up-fundamentals"
    // - Instagram DM: "https://ig.me/m/jayashborn"
    // - Google Form: "https://forms.gle/your-form-id"
    // - PDF Direct: "assets/pull-up-zero-to-hero.pdf"
    const CONFIG = {
        ctaLink: "https://harmless-range-d77.notion.site/From-Zero-to-Hero-b7c2fe65e45b4dc9b756ba11da06ae3b?source=copy_link"
    };

    const ctaButtons = document.querySelectorAll(".cta-button-trigger");
    ctaButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            // If the link starts with # and is an internal anchor, let default behavior handle scroll
            const targetHref = button.getAttribute("href");
            if (targetHref && targetHref.startsWith("#") && targetHref !== "#") {
                return;
            }
            
            // Otherwise, route to central config link
            e.preventDefault();
            console.log(`Routing user to CTA: ${CONFIG.ctaLink}`);
            window.open(CONFIG.ctaLink, "_blank", "noopener,noreferrer");
        });
    });

    // =========================================================================
    // 2. ACCORDION TOGGLE INTERACTION (Table of Contents & FAQ)
    // =========================================================================
    const accordions = document.querySelectorAll(".accordion-header");

    accordions.forEach(header => {
        header.addEventListener("click", () => {
            const isExpanded = header.getAttribute("aria-expanded") === "true";
            const content = header.nextElementSibling;

            // Toggle state
            header.setAttribute("aria-expanded", !isExpanded);

            if (!isExpanded) {
                // Open content
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                // Close content
                content.style.maxHeight = "0px";
            }

            // Optional: Close other accordions in the SAME parent container
            const parent = header.closest(".preview-accordion") || header.closest(".faq-accordion");
            if (parent) {
                const siblingItems = parent.querySelectorAll(".accordion-item");
                siblingItems.forEach(item => {
                    const siblingHeader = item.querySelector(".accordion-header");
                    const siblingContent = item.querySelector(".accordion-content");
                    
                    if (siblingHeader && siblingHeader !== header) {
                        siblingHeader.setAttribute("aria-expanded", "false");
                        siblingContent.style.maxHeight = "0px";
                    }
                });
            }
        });
    });

    // =========================================================================
    // 3. HEADER SCROLL EFFECT & STICKY BOTTOM CTA
    // =========================================================================
    const header = document.querySelector(".main-header");
    const heroSection = document.getElementById("hero");
    const stickyMobileCta = document.querySelector(".sticky-mobile-cta");
    
    // Check scroll position
    const handleScrollEffects = () => {
        const scrollY = window.scrollY;
        
        // 3a. Header background solid styling on scroll
        if (scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // 3b. Sticky bottom CTA bar toggle (scrolled past hero)
        if (heroSection && stickyMobileCta) {
            const heroHeight = heroSection.offsetHeight;
            if (scrollY > heroHeight - 100) {
                stickyMobileCta.classList.add("visible");
            } else {
                stickyMobileCta.classList.remove("visible");
            }
        }
    };

    window.addEventListener("scroll", handleScrollEffects, { passive: true });
    handleScrollEffects(); // Trigger once on load to set initial state

    // =========================================================================
    // 4. PROGRESSIVE ENHANCEMENT: SCROLL REVEAL FALLBACK
    // =========================================================================
    // If browser DOES NOT support native scroll timelines, we fall back to IntersectionObserver
    const supportsScrollTimeline = CSS.supports("(animation-timeline: view()) and (animation-range: entry)");

    if (!supportsScrollTimeline) {
        console.log("Native CSS Scroll Timeline not supported. Loading IntersectionObserver fallback...");
        
        const revealElements = document.querySelectorAll(".scroll-reveal");
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    // Once animated, we don't need to observe it anymore
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // =========================================================================
    // 5. MOUSE SPOTLIGHT EFFECT FOR CARDS (Glassmorphism highlight)
    // =========================================================================
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
});
