// Main Animations with GSAP and Locomotive Scroll

class MainAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initLocomotiveScroll();
        this.initAnimations();
        this.initScrollTriggers();
        this.initHoverEffects();
    }

    initLocomotiveScroll() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Initialize Locomotive Scroll
        this.locoScroll = new LocomotiveScroll({
            el: document.querySelector("#main"),
            smooth: true,
            multiplier: 1,
            smartphone: { smooth: true },
            tablet: { smooth: true }
        });

        // Update ScrollTrigger on scroll
        this.locoScroll.on("scroll", ScrollTrigger.update);

        // Tell ScrollTrigger to use these proxy methods for the "#main" element
        ScrollTrigger.scrollerProxy("#main", {
            scrollTop(value) {
                return arguments.length 
                    ? this.locoScroll.scrollTo(value, 0, 0) 
                    : this.locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return { 
                    top: 0, 
                    left: 0, 
                    width: window.innerWidth, 
                    height: window.innerHeight 
                };
            },
            pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
        });

        // Refresh ScrollTrigger and update Locomotive Scroll
        ScrollTrigger.addEventListener("refresh", () => this.locoScroll.update());
        ScrollTrigger.refresh();

        return this.locoScroll;
    }

    initAnimations() {
        // Hero section animations
        this.animateHero();
        
        // Orbital animation
        this.animateOrbital();
        
        // Marquee animation for clients
        this.animateMarquee();
        
        // Case study card animations
        this.animateCaseStudies();
        
        // Service card animations
        this.animateServices();
        
        // Process step animations
        this.animateProcessSteps();
    }

    animateHero() {
        const tl = gsap.timeline();
        
        tl.from(".hero-badge", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out"
        })
        .from(".hero-title span", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.4")
        .from(".hero-description", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.2")
        .from(".hero-actions", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.2")
        .from(".hero-stats", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.2")
        .from(".scroll-indicator", {
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.4");
    }

    animateOrbital() {
        const orbitalItems = document.querySelectorAll('.orbital-item');
        
        orbitalItems.forEach((item, index) => {
            gsap.to(item, {
                rotation: 360,
                duration: 20 + index * 5,
                repeat: -1,
                ease: "none"
            });
        });
        
        // Center glow animation
        gsap.to('.center-glow', {
            scale: 1.2,
            opacity: 0.5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }

    animateMarquee() {
        // If you want to animate client logos in a marquee
        const clients = document.querySelector('.clients-grid');
        if (clients) {
            gsap.to(clients, {
                xPercent: -100,
                duration: 20,
                repeat: -1,
                ease: "none"
            });
        }
    }

    animateCaseStudies() {
        const cards = document.querySelectorAll('.case-study-card');
        
        cards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    scroller: "#main",
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power2.out"
            });
        });
    }

    animateServices() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    scroller: "#main",
                    start: "top 85%",
                    end: "top 40%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: index * 0.1,
                ease: "power2.out"
            });
        });
    }

    animateProcessSteps() {
        const steps = document.querySelectorAll('.process-step');
        
        steps.forEach((step, index) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    scroller: "#main",
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                x: -30,
                duration: 0.8,
                delay: index * 0.2,
                ease: "power2.out"
            });
        });
    }

    initScrollTriggers() {
        // Section reveal animations
        this.revealSections();
        
        // Parallax effects
        this.initParallax();
    }

    revealSections() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    scroller: "#main",
                    start: "top 90%",
                    end: "top 50%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out"
            });
        });
    }

    initParallax() {
        // Add parallax to hero background if needed
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            gsap.to(heroSection, {
                scrollTrigger: {
                    trigger: heroSection,
                    scroller: "#main",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                },
                backgroundPosition: "50% 100px",
                ease: "none"
            });
        }
    }

    initHoverEffects() {
        // Card hover effects
        this.initCardHovers();
        
        // Button hover effects
        this.initButtonHovers();
        
        // Image hover effects
        this.initImageHovers();
    }

    initCardHovers() {
        const cards = document.querySelectorAll('.case-study-card, .service-card, .client-logo');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    initButtonHovers() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .header-cta');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    }

    initImageHovers() {
        const images = document.querySelectorAll('.case-image img');
        
        images.forEach(img => {
            const parent = img.closest('.case-study-card');
            
            parent.addEventListener('mouseenter', () => {
                gsap.to(img, {
                    scale: 1.1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
            
            parent.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });
    }

    // Cleanup on destroy
    destroy() {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        this.locoScroll?.destroy();
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    const animations = new MainAnimations();
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
            animations.locoScroll?.update();
        }, 250);
    });
    
    // Handle page load
    window.addEventListener('load', () => {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.body.style.overflow = '';
            ScrollTrigger.refresh();
        }, 1000);
    });
});

// Add utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}