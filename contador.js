document.addEventListener('DOMContentLoaded', () => {
    const contadores = document.querySelectorAll('.contador-destino');
    let animacionIniciada = false; 
    const animarContador = (elemento) => {
        const valorFinal = parseInt(elemento.getAttribute('data-valor'));
        const duracion = 2000; 
        let inicio = 0;
        const paso = valorFinal / (duracion / 10); 
        let valorActual = 0;
        const descripcion = elemento.parentNode.querySelector('.stat-descripcion').textContent.toLowerCase();
        const necesitaPorcentaje = descripcion.includes('ahorro');
        const necesitaLitros = descripcion.includes('litros');
        const contadorIntervalo = setInterval(() => {
            valorActual += paso;
            if (valorActual >= valorFinal) {
                valorActual = valorFinal;
                clearInterval(contadorIntervalo);
            }
            let textoDisplay = Math.floor(valorActual).toLocaleString('es-MX');
            if (necesitaPorcentaje) {
                textoDisplay += '%';
            } else if (necesitaLitros) {
                textoDisplay = textoDisplay + ' L';
            }
            elemento.textContent = textoDisplay;
        }, 10);
    };
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.5 
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animacionIniciada) {
                contadores.forEach(animarContador); 
                animacionIniciada = true; 
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    const seccionEstadisticas = document.querySelector('.hero-estadisticas');
    if (seccionEstadisticas) {
        observer.observe(seccionEstadisticas);
    }
});