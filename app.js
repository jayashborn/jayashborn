/**
 * JAYASHBORN LANDING PAGE INTERACTIONS (V2 - CONSERVATIVE)
 * Developer: Antigravity AI
 * Creator: Coach J / เจตื่นแล้ว
 */

document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 1. LEAD CAPTURE & CTA CENTRAL CONFIGURATION
    // =========================================================================
    const CONFIG = {
        freeEbook: "https://harmless-range-d77.notion.site/From-Zero-to-Hero-b7c2fe65e45b4dc9b756ba11da06ae3b?source=copy_link",
        paymentLink: "https://buy.stripe.com/8x200jdSccIWdtd8SDdby00", // Stripe checkout — Full Action Plan 299.-
        oneOnOneLink: "https://line.me/ti/p/BoRihbqWbj" // 1:1 Coaching contact (LINE)
    };

    // Route Free E-book CTA Triggers
    const freeCtaButtons = document.querySelectorAll('[href="FREE_EBOOK_LINK"], .cta-free-trigger');
    freeCtaButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(`Routing user to Free E-book: ${CONFIG.freeEbook}`);
            window.open(CONFIG.freeEbook, "_blank", "noopener,noreferrer");
        });
    });

    // Route Paid Action Plan CTA Triggers
    const paidCtaButtons = document.querySelectorAll('[href="PAYMENT_LINK"], .cta-paid-trigger');
    paidCtaButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(`Routing user to Checkout Page: ${CONFIG.paymentLink}`);
            window.open(CONFIG.paymentLink, "_blank", "noopener,noreferrer");
        });
    });

    // Route 1:1 Coaching CTA Triggers
    const coachingCtaButtons = document.querySelectorAll('[href="ONE_ON_ONE_LINK"], .cta-coaching-trigger');
    coachingCtaButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            console.log(`Routing user to 1:1 Coaching contact: ${CONFIG.oneOnOneLink}`);
            window.open(CONFIG.oneOnOneLink, "_blank", "noopener,noreferrer");
        });
    });

    // Route Smooth Scroll Triggers
    const scrollCtaButtons = document.querySelectorAll('[href^="#"], .cta-action-plan-scroll-trigger');
    scrollCtaButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const targetId = button.getAttribute("href");
            if (targetId && targetId.startsWith("#") && targetId !== "#") {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    console.log(`Scrolling smoothly to ${targetId}`);
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                    
                    // Close mobile dropdown if open
                    const mobileDropdown = document.querySelector(".mobile-dropdown-nav");
                    const mobileToggle = document.querySelector(".mobile-menu-toggle");
                    if (mobileDropdown && mobileDropdown.classList.contains("open")) {
                        mobileDropdown.classList.remove("open");
                        mobileToggle.classList.remove("active");
                    }
                }
            }
        });
    });

    // =========================================================================
    // 2. MOBILE NAVIGATION DROPDOWN MENU
    // =========================================================================
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileDropdownNav = document.querySelector(".mobile-dropdown-nav");

    if (mobileMenuToggle && mobileDropdownNav) {
        mobileMenuToggle.addEventListener("click", () => {
            const isOpen = mobileDropdownNav.classList.contains("open");
            mobileDropdownNav.classList.toggle("open", !isOpen);
            mobileMenuToggle.classList.toggle("active", !isOpen);
            
            // Adjust Hamburger lines visual
            const bars = mobileMenuToggle.querySelectorAll(".bar");
            if (!isOpen) {
                bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
                bars[1].style.opacity = "0";
                bars[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
            } else {
                bars[0].style.transform = "none";
                bars[1].style.opacity = "1";
                bars[2].style.transform = "none";
            }
        });
    }

    // =========================================================================
    // 3. ACCORDION TOGGLE INTERACTION (FAQ Accordion)
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

            // Close other accordions in the same FAQ parent container
            const parent = header.closest(".faq-accordion");
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
    // 4. HEADER SCROLL EFFECT & STICKY BOTTOM MOBILE CTA
    // =========================================================================
    const header = document.querySelector(".main-header");
    const heroSection = document.getElementById("hero");
    const stickyMobileCta = document.querySelector(".sticky-mobile-cta");
    
    const handleScrollEffects = () => {
        const scrollY = window.scrollY;
        
        // 4a. Header background solid styling on scroll
        if (scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // 4b. Sticky bottom CTA bar toggle (scrolled past hero)
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
    // 5. PROGRESSIVE ENHANCEMENT: SCROLL REVEAL FALLBACK
    // =========================================================================
    const supportsScrollTimeline = CSS.supports("(animation-timeline: view()) and (animation-range: entry)");

    if (!supportsScrollTimeline) {
        console.log("Native CSS Scroll Timeline not supported. Loading IntersectionObserver fallback...");
        
        const revealElements = document.querySelectorAll(".scroll-reveal");
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
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
    // 6. MOUSE SPOTLIGHT EFFECT FOR CARDS (Glassmorphism highlight)
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
