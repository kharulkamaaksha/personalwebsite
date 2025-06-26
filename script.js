document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

const handleScroll = () => {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollProgress = document.querySelector('.scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / docHeight) * 100;

    scrollProgress.style.width = `${scrollPercent}%`;

    if (scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 80) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', handleScroll);

const backToTop = document.getElementById('back-to-top');
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.innerHTML = body.classList.contains('dark-mode')
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

const revealElements = document.querySelectorAll('.section-header, .about-content, .skills-content, .services-grid, .project-card, .testimonials-slider, .contact-content');
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < windowHeight - 100) {
            el.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

const tabButtons = document.querySelectorAll('.tab-btn');
const skillsPanels = document.querySelectorAll('.skills-panel');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        skillsPanels.forEach(panel => panel.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(button.getAttribute('data-tab')).classList.add('active');
    });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.getAttribute('data-filter');
        projectCards.forEach(card => {
            card.classList.remove('visible');
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.add('visible');
            }
        });
    });
});

const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevButton = document.querySelector('.slider-arrow.prev');
const nextButton = document.querySelector('.slider-arrow.next');
let currentTestimonial = 0;

const updateTestimonial = () => {
    testimonialCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === currentTestimonial) {
            card.classList.add('active');
        }
    });
};

prevButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestimonial();
});

nextButton.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateTestimonial();
});

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let valid = true;

    document.querySelectorAll('.error-message').forEach(error => error.textContent = '');

    if (!name.value.trim()) {
        name.nextElementSibling.textContent = 'Name is required';
        valid = false;
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.nextElementSibling.textContent = 'Valid email is required';
        valid = false;
    }
    if (!message.value.trim()) {
        message.nextElementSibling.textContent = 'Message is required';
        valid = false;
    }

    if (valid) {
        alert(`Thank you, ${name.value}! Your message has been sent.`);
        contactForm.reset();
    }
});

const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.15 - 0.075;
            this.speedY = Math.random() * 0.15 - 0.075;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}
