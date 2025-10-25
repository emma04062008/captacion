document.addEventListener('DOMContentLoaded', function() {
    const puntos = document.querySelectorAll('.punto-interactivo');
    const detalles = document.querySelectorAll('.detalle-zona');
    puntos.forEach(punto => {
        const zona = punto.getAttribute('data-zona'); 
        punto.addEventListener('click', function(e) {
            e.stopPropagation();
            puntos.forEach(p => {
                p.classList.remove('active');
            });
            detalles.forEach(d => {
                d.classList.remove('active');
            });
            if (this.classList.contains('activo-anterior')) {
                this.classList.remove('activo-anterior');
                document.getElementById('detalle-instruccion').classList.add('active');
                return;
            }
            this.classList.add('active');
            const detalleActivo = document.getElementById(`detalle-${zona}`);
            if (detalleActivo) {
                detalleActivo.classList.add('active');
            }
            puntos.forEach(p => p.classList.remove('activo-anterior'));
            this.classList.add('activo-anterior');
        });
        const botonCerrar = punto.querySelector('.tooltip-cerrar');
        if (botonCerrar) {
            botonCerrar.addEventListener('click', function(e) {
                e.stopPropagation(); 
                punto.classList.remove('active');
                punto.classList.remove('activo-anterior');
                detalles.forEach(d => d.classList.remove('active'));
                document.getElementById('detalle-instruccion').classList.add('active');
            });
        }
    });
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.punto-interactivo') && !e.target.closest('.mapa-sidebar')) {
            puntos.forEach(punto => {
                punto.classList.remove('active');
                punto.classList.remove('activo-anterior');
            });
            detalles.forEach(detalle => {
                detalle.classList.remove('active');
            });
            document.getElementById('detalle-instruccion').classList.add('active');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault(); 
            e.stopPropagation(); 
            const isActive = this.classList.contains('active-touch');
            document.querySelectorAll('.tooltip-trigger.active-touch').forEach(t => {
                if (t !== this) {
                    t.classList.remove('active-touch');
                }
            });
            if (!isActive) {
                this.classList.add('active-touch');
            } else {
                this.classList.remove('active-touch');
            }
        });
    });
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.tooltip-trigger')) {
            document.querySelectorAll('.tooltip-trigger.active-touch').forEach(t => {
                t.classList.remove('active-touch');
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault(); 
            e.stopPropagation(); 
            const isActive = this.classList.contains('active-touch');
            document.querySelectorAll('.tooltip-trigger.active-touch').forEach(t => {
                if (t !== this) {
                    t.classList.remove('active-touch');
                }
            });
            if (!isActive) {
                this.classList.add('active-touch');
            } else {
                this.classList.remove('active-touch');
            }
        });
    });
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.tooltip-trigger')) {
            document.querySelectorAll('.tooltip-trigger.active-touch').forEach(t => {
                t.classList.remove('active-touch');
            });
        }
    });
    const botonesAbrir = document.querySelectorAll('.boton-modal');
    const botonesCerrar = document.querySelectorAll('.modal-cerrar');
    const overlays = document.querySelectorAll('.modal-overlay');
    function abrirModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('activo');
            document.body.style.overflow = 'hidden'; 
        }
    }
    function cerrarModal(modalElement) {
        modalElement.classList.remove('activo');
        document.body.style.overflow = 'auto'; 
    }
    botonesAbrir.forEach(boton => {
        boton.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            abrirModal(targetId);
        });
    });
    botonesCerrar.forEach(boton => {
        boton.addEventListener('click', function() {
            const modalElement = boton.closest('.modal-overlay');
            cerrarModal(modalElement);
        });
    });
    overlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                cerrarModal(this);
            }
        });
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            const modalAbierto = document.querySelector('.modal-overlay.activo');
            if (modalAbierto) {
                cerrarModal(modalAbierto);
            }
        }
    });

});