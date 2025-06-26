// Modern Portfolio JavaScript - 2025
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Initialize variables
    const preloader = document.getElementById('preloader');
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');
    const progressBar = document.querySelector('.progress-bar');
    const skillProgress = document.querySelectorAll('.skill-progress');
    const levelBars = document.querySelectorAll('.level-bar');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const statNumbers = document.querySelectorAll('.stat-number');
    const contactForm = document.getElementById('contactForm');
    const dynamicTextElement = document.getElementById('dynamicText');
    const lastUpdatedElement = document.getElementById('lastUpdated');
    
    // Update last updated date
    if (lastUpdatedElement) {
        lastUpdatedElement.textContent = 'June 26, 2025';
    }
    
    // Preloader
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.classList.add('loaded');
            
            // Start animations after preloader
            setTimeout(function() {
                initSkillBars();
                animateStatNumbers();
            }, 500);
        }, 1000);
    });
    
    // Custom cursor (desktop only)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.addEventListener('mousemove', function(e) {
            gsapCursor(e);
        });
        
        document.addEventListener('mousedown', function() {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
        
        document.addEventListener('mouseup', function() {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        document.querySelectorAll('a, button, [role="button"]').forEach(item => {
            item.addEventListener('mouseenter', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.borderColor = 'transparent';
                cursorDot.style.backgroundColor = 'var(--white)';
            });
            
            item.addEventListener('mouseleave', function() {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'var(--primary-color)';
                cursorDot.style.backgroundColor = 'var(--primary-color)';
            });
        });
    }
    
    // Use GSAP for smoother cursor movement
    function gsapCursor(e) {
        if (cursorDot && cursorOutline) {
            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            
            gsap.to(cursorOutline, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        }
    }
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        
        // Sticky navbar
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Scroll progress bar
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
        
        // Show/hide back to top button
        if (scrollTop > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        
        // Active section in navigation
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
            if (navLink.getAttribute('data-section') === currentSection) {
                navLink.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Theme toggle
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Use system preference if no saved preference
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Back to top button
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Skill categories filter
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            const skillCards = document.querySelectorAll('.skill-card');
            
            skillCards.forEach(card => {
                card.style.display = 'none';
                
                if (card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                }
            });
            
            // Re-initialize level bars for visible cards
            setTimeout(() => {
                initLevelBars();
            }, 100);
        });
    });
    
    // Project filter
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Initialize skill progress bars
    function initSkillBars() {
        skillProgress.forEach(progress => {
            const width = progress.getAttribute('data-width') + '%';
            progress.style.width = width;
        });
    }
    
    // Initialize level bars
    function initLevelBars() {
        levelBars.forEach(bar => {
            const level = bar.getAttribute('data-level') + '%';
            bar.style.width = level;
        });
    }
    
    // Animate stat numbers
    function animateStatNumbers() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // ms
            const startTime = Date.now();
            const startValue = 0;
            
            function updateNumber() {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smoother animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
                
                stat.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            }
            
            updateNumber();
        });
    }
    
    // Typing effect for hero subtitle
    function typeEffect() {
        const words = ["Web Developer", "ML Enthusiast", "Problem Solver", "Software Engineer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                dynamicTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                dynamicTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before starting new word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        if (dynamicTextElement) {
            setTimeout(type, 1000);
        }
    }
    
    // Initialize typing effect
    typeEffect();
    
    // Smooth scroll to section
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    };
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!contactForm.action.includes('formspree.io')) {
                e.preventDefault();
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Show sending state
                submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual form handling)
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                    submitBtn.classList.add('success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('success');
                    }, 3000);
                }, 2000);
            }
        });
    }
});

// GSAP minimal implementation
const gsap = {
    to: function(element, props) {
        const { x, y, duration } = props;
        if (element) {
            element.style.transition = `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`;
            element.style.transform = `translate(${x}px, ${y}px)`;
        }
    }
};
