document.addEventListener('DOMContentLoaded', () => {
    const elementosAnimados = document.querySelectorAll('.imagen-animada');
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible'); 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    elementosAnimados.forEach(elemento => {
        observer.observe(elemento);
    });
});