// Header Script - Professional Navigation & Interactions

class ProfessionalHeader {
    constructor() {
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.initScrollEffects();
        this.initMobileMenu();
        this.initCurrentTime();
    }

    cacheElements() {
        this.header = document.querySelector('.main-header');
        this.navItems = document.querySelectorAll('.nav-item');
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        this.mobileMenuClose = document.querySelector('.mobile-menu-close');
        this.backToTop = document.querySelector('.back-to-top');
        this.pageProgress = document.querySelector('.page-progress');
        this.progressBar = document.querySelector('.progress-bar');
        this.scrollTopBtn = document.querySelector('.scroll-top');
        this.currentTimeEl = document.getElementById('currentTime');
        this.headerCta = document.getElementById('headerCta');
        this.contactModal = document.getElementById('contactModal');
        this.modalClose = document.querySelector('.modal-close');
        this.testimonialPrev = document.querySelector('.testimonial-prev');
        this.testimonialNext = document.querySelector('.testimonial-next');
        this.testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.tabPanes = document.querySelectorAll('.tab-pane');
        this.submenuToggles = document.querySelectorAll('.has-submenu > a');
    }

    bindEvents() {
        // Navigation hover effects
        this.navItems.forEach(item => {
            item.addEventListener('mouseenter', () => this.handleNavHover(item));
            item.addEventListener('mouseleave', () => this.handleNavLeave(item));
        });

        // Mobile menu
        this.mobileMenuToggle?.addEventListener('click', () => this.toggleMobileMenu());
        this.mobileMenuClose?.addEventListener('click', () => this.closeMobileMenu());
        this.mobileMenuOverlay?.addEventListener('click', () => this.closeMobileMenu());

        // Back to top
        this.backToTop?.addEventListener('click', () => this.scrollToTop());

        // Scroll to top button in breadcrumb
        this.scrollTopBtn?.addEventListener('click', () => this.scrollToTop());

        // Header CTA
        this.headerCta?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openContactModal();
        });

        // Modal close
        this.modalClose?.addEventListener('click', () => this.closeContactModal());
        this.contactModal?.addEventListener('click', (e) => {
            if (e.target === this.contactModal) this.closeContactModal();
        });

        // Testimonials slider
        this.testimonialPrev?.addEventListener('click', () => this.prevTestimonial());
        this.testimonialNext?.addEventListener('click', () => this.nextTestimonial());
        this.testimonialDots?.forEach((dot, index) => {
            dot.addEventListener('click', () => this.showTestimonial(index));
        });

        // Tabs
        this.tabBtns?.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn));
        });

        // Mobile submenu toggles
        this.submenuToggles?.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.toggleSubmenu(toggle);
                }
            });
        });

        // Close dropdowns on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-item')) {
                this.closeAllDropdowns();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
                this.closeContactModal();
            }
        });
    }

    initScrollEffects() {
        let lastScroll = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Header scroll effect
            if (currentScroll > scrollThreshold) {
                this.header.classList.add('scrolled');
                this.backToTop?.classList.add('visible');
            } else {
                this.header.classList.remove('scrolled');
                this.backToTop?.classList.remove('visible');
            }

            // Page progress
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (currentScroll / scrollHeight) * 100;
            
            if (this.progressBar) {
                this.progressBar.style.width = `${scrollPercent}%`;
                this.pageProgress?.classList.add('visible');
            }

            // Hide/show header on scroll direction
            if (currentScroll > lastScroll && currentScroll > 200) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }

    handleNavHover(item) {
        const dropdown = item.querySelector('.nav-dropdown');
        if (dropdown) {
            gsap.to(dropdown, {
                opacity: 1,
                visibility: 'visible',
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }

    handleNavLeave(item) {
        const dropdown = item.querySelector('.nav-dropdown');
        if (dropdown) {
            gsap.to(dropdown, {
                opacity: 0,
                visibility: 'hidden',
                y: 10,
                duration: 0.2,
                ease: 'power2.in'
            });
        }
    }

    closeAllDropdowns() {
        document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
            gsap.to(dropdown, {
                opacity: 0,
                visibility: 'hidden',
                y: 10,
                duration: 0.2,
                ease: 'power2.in'
            });
        });
    }

    initMobileMenu() {
        if (!this.mobileMenuToggle) return;

        // Close mobile menu on link click
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (!link.classList.contains('has-submenu')) {
                    this.closeMobileMenu();
                }
            });
        });
    }

    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('active');
        this.mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        this.mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggleSubmenu(toggle) {
        const submenu = toggle.nextElementSibling;
        const isActive = submenu.classList.contains('active');
        
        // Close all other submenus
        document.querySelectorAll('.submenu.active').forEach(menu => {
            if (menu !== submenu) menu.classList.remove('active');
        });
        
        // Toggle current submenu
        submenu.classList.toggle('active');
        
        // Rotate arrow icon if present
        const icon = toggle.querySelector('i[class*="arrow"]');
        if (icon) {
            icon.style.transform = isActive ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    initCurrentTime() {
        if (!this.currentTimeEl) return;

        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            this.currentTimeEl.textContent = timeString;
        };

        updateTime();
        setInterval(updateTime, 60000); // Update every minute
    }

    openContactModal() {
        this.contactModal?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeContactModal() {
        this.contactModal?.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Testimonials Slider
    currentTestimonial = 0;
    testimonials = document.querySelectorAll('.testimonial-card');

    showTestimonial(index) {
        this.testimonials.forEach(card => card.classList.remove('active'));
        this.testimonialDots?.forEach(dot => dot.classList.remove('active'));
        
        this.currentTestimonial = index;
        this.testimonials[index].classList.add('active');
        this.testimonialDots[index].classList.add('active');
    }

    prevTestimonial() {
        let newIndex = this.currentTestimonial - 1;
        if (newIndex < 0) newIndex = this.testimonials.length - 1;
        this.showTestimonial(newIndex);
    }

    nextTestimonial() {
        let newIndex = this.currentTestimonial + 1;
        if (newIndex >= this.testimonials.length) newIndex = 0;
        this.showTestimonial(newIndex);
    }

    switchTab(btn) {
        const tabId = btn.getAttribute('data-tab');
        
        // Update active tab button
        this.tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active tab pane
        this.tabPanes.forEach(pane => pane.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const header = new ProfessionalHeader();
    
    // Auto-rotate testimonials
    setInterval(() => {
        if (header.testimonialNext) {
            header.nextTestimonial();
        }
    }, 5000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="ri-loader-4-line spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success
            submitBtn.innerHTML = '<i class="ri-check-line"></i> Message Sent!';
            submitBtn.style.background = '#10b981';
            
            // Reset form after 2 seconds
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                
                // Show notification
                showNotification('Message sent successfully! We\'ll get back to you within 24 hours.');
            }, 2000);
        }, 1500);
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="ri-checkbox-circle-fill"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        z-index: 3000;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for spinner
const style = document.createElement('style');
style.textContent = `
    .spin {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-content i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(style);
