document.addEventListener('DOMContentLoaded', () => {
    const botonesPunto = document.querySelectorAll('.mapa-punto');
    const detallesZona = document.querySelectorAll('.detalle-zona');
    const manejarClickPunto = function() {
        const zonaId = this.getAttribute('data-zona');
        detallesZona.forEach(detalle => {
            detalle.classList.remove('active');
        });
        botonesPunto.forEach(btn => {
            btn.classList.remove('active');
        });
        const detalleActivo = document.getElementById(`detalle-${zonaId}`);
        if (detalleActivo) {
            detalleActivo.classList.add('active');
            this.classList.add('active');
        }
    };
    botonesPunto.forEach(boton => {
        boton.addEventListener('click', manejarClickPunto);
    });
    const primerPunto = document.querySelector('.mapa-punto');
    if (primerPunto) {
        primerPunto.click();
    }
});