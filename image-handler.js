// Enhanced image loading handler
document.addEventListener('DOMContentLoaded', () => {
    // Handle image loading for better UX
    const images = document.querySelectorAll('img[src]');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
            img.parentElement?.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                img.parentElement?.classList.add('loaded');
            });
            
            img.addEventListener('error', () => {
                console.warn(`Failed to load image: ${img.src}`);
                img.style.display = 'none';
            });
        }
    });
    
    // Lazy loading for project images
    const projectImages = document.querySelectorAll('.project-img img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        projectImages.forEach(img => imageObserver.observe(img));
    }
});
