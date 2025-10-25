document.addEventListener('DOMContentLoaded', function() {
    const botonHamburguesa = document.querySelector('.menu-hamburguesa');
    const menuPrincipal = document.querySelector('.menu-principal');
    const headerContenedor = document.querySelector('.header-contenedor');
    botonHamburguesa.addEventListener('click', () => {
        menuPrincipal.classList.toggle('active');
        headerContenedor.classList.toggle('menu-abierto');
    });
    const enlacesMenu = document.querySelectorAll('.menu-principal a');
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', () => {
            if (menuPrincipal.classList.contains('active')) {
                menuPrincipal.classList.remove('active');
                headerContenedor.classList.remove('menu-abierto');
            }
        });
    });
});