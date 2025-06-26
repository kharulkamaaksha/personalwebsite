// Enhanced JavaScript with better animations and interactions

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced mobile navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Enhanced scroll handler with performance optimization
const handleScroll = debounce(() => {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');
    const scrollY = window.scrollY;
    const scrollProgress = document.querySelector('.scroll-progress');
    
    // Update scroll progress
    if (scrollProgress) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollY / docHeight) * 100, 100);
        scrollProgress.style.width = `${scrollPercent}%`;
    }

    // Navbar scroll effect
    if (navbar) {
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Back to top button
    if (backToTop) {
        if (scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // Active navigation highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}, 16); // ~60fps

window.addEventListener('scroll', handleScroll);

// Back to top functionality
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
}

// Enhanced theme toggle with smooth transition
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update icon with animation
        const icon = themeToggle.querySelector('i');
        icon.style.transform = 'scale(0)';
        
        setTimeout(() => {
            if (body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
            icon.style.transform = 'scale(1)';
        }, 150);
        
        // Save theme preference
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    const icon = themeToggle?.querySelector('i');
    if (icon) icon.className = 'fas fa-sun';
}

// Enhanced reveal animations with Intersection Observer
const revealElements = document.querySelectorAll('.section, .project-card, .service-card, .skill-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Add staggered animation for children
            const children = entry.target.querySelectorAll('.reveal-child');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('active');
                }, index * 100);
            });
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Skills tabs functionality with smooth transitions
const tabBtns = document.querySelectorAll('.tab-btn');
const skillsPanels = document.querySelectorAll('.skills-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        
        // Remove active class from all tabs and panels
        tabBtns.forEach(tab => tab.classList.remove('active'));
        skillsPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        
        // Show target panel with animation
        const targetPanel = document.getElementById(target);
        if (targetPanel) {
            setTimeout(() => {
                targetPanel.classList.add('active');
            }, 150);
        }
    });
});

// Project filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        
        // Update active filter button
        filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter projects with animation
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Enhanced form validation and submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.remove();
        });

        // Validation with better UX
        const showError = (input, message) => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = 'var(--secondary-color)';
            errorDiv.style.fontSize = 'var(--small-size)';
            errorDiv.style.marginTop = '0.5rem';
            input.parentNode.appendChild(errorDiv);
            input.style.borderColor = 'var(--secondary-color)';
            isValid = false;
        };

        // Reset input styles
        [name, email, subject, message].forEach(input => {
            input.style.borderColor = 'var(--border-color)';
        });

        // Validate inputs
        if (!name.value.trim()) {
            showError(name, 'Name is required');
        }

        if (!email.value.trim()) {
            showError(email, 'Email is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showError(email, 'Please enter a valid email');
        }

        if (!subject.value.trim()) {
            showError(subject, 'Subject is required');
        }

        if (!message.value.trim()) {
            showError(message, 'Message is required');
        }

        if (isValid) {
            // Simulate form submission with loading state
            const submitBtn = contactForm.querySelector('.btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'var(--accent-color)';
                
                // Show success message
                const successDiv = document.createElement('div');
                successDiv.className = 'success-message';
                successDiv.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    Thank you, ${name.value}! Your message has been sent successfully.
                `;
                successDiv.style.cssText = `
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid var(--accent-color);
                    color: var(--accent-color);
                    padding: 1rem;
                    border-radius: var(--radius-md);
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                `;
                
                contactForm.appendChild(successDiv);
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    successDiv.remove();
                }, 3000);
            }, 2000);
        }
    });
}

// Enhanced particle animation
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 20 : 40; // Reduce particles on mobile

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
            if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;

            // Keep particles in bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color');
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections between nearby particles
        particles.forEach((particle1, index) => {
            particles.slice(index + 1).forEach(particle2 => {
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.globalAlpha = (100 - distance) / 100 * 0.1;
                    ctx.strokeStyle = getComputedStyle(document.documentElement)
                        .getPropertyValue('--primary-color');
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particle1.x, particle1.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            });
        });

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// Typing animation for hero section
const typeText = (element, text, speed = 100) => {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize typing animation
window.addEventListener('load', () => {
    const roleElement = document.querySelector('.role');
    if (roleElement) {
        const originalText = roleElement.textContent;
        roleElement.textContent = '';
        setTimeout(() => {
            typeText(roleElement, originalText, 80);
        }, 1000);
    }
});

// Add scroll progress bar
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
});

// Enhanced testimonial slider (if testimonials exist)
const testimonialCards = document.querySelectorAll('.testimonial-card');
const sliderDots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-arrow.prev');
const nextBtn = document.querySelector('.slider-arrow.next');

if (testimonialCards.length > 0) {
    let currentTestimonial = 0;

    const showTestimonial = (index) => {
        testimonialCards.forEach(card => card.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
        }
        if (sliderDots[index]) {
            sliderDots[index].classList.add('active');
        }
    };

    const nextTestimonial = () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    };

    const prevTestimonial = () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    };

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto-play testimonials
    setInterval(nextTestimonial, 5000);
}

// Initialize all animations when page loads
window.addEventListener('load', () => {
    // Trigger initial scroll handler
    handleScroll();
    
    // Add entrance animations to hero elements
    const heroElements = document.querySelectorAll('.header-text > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200 + 500);
    });
});

// Performance optimization: Pause animations when not in viewport
const pauseAnimationsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const animations = entry.target.querySelectorAll('.animate');
        if (entry.isIntersecting) {
            animations.forEach(el => el.style.animationPlayState = 'running');
        } else {
            animations.forEach(el => el.style.animationPlayState = 'paused');
        }
    });
});

document.querySelectorAll('.section').forEach(section => {
    pauseAnimationsObserver.observe(section);
});
