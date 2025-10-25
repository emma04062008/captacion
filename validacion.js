document.addEventListener('DOMContentLoaded', function() {
    const formularioSuscripcion = document.querySelector('#form-suscripcion'); 
    const campoNombre = document.querySelector('#nombre');
    const campoEmail = document.querySelector('#email');
    const campoTelefono = document.querySelector('#telefono'); 
    const campoMensaje = document.querySelector('#mensaje');
    const mensajeErrorEmail = document.querySelector('#email-error');
    const mensajeErrorTelefono = document.querySelector('#telefono-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const telefonoRegex = /^\d[\d\s-]{7,}\d$/; 
    /**  
      @returns {boolean} 
     */
    function validarEmail() {
        if (!campoEmail) return true;
        const emailValor = campoEmail.value.trim();
        let esValido = true;
        if (campoEmail.validity.valueMissing) {
            mensajeErrorEmail.textContent = "El correo electrónico es obligatorio.";
            campoEmail.classList.add('invalido');
            esValido = false;
        } else if (!emailRegex.test(emailValor)) {
            mensajeErrorEmail.textContent = "Introduce un formato de correo electrónico válido.";
            campoEmail.classList.add('invalido');
            esValido = false;
        } else {
            mensajeErrorEmail.textContent = "";
            campoEmail.classList.remove('invalido');
        }
        return esValido;
    }
    /**
     @returns {boolean} 
     */
    function validarTelefono() {
        if (!campoTelefono) return true; 
        const telefonoValor = campoTelefono.value.trim();
        let esValido = true;
        if (telefonoValor !== "" && !telefonoRegex.test(telefonoValor)) {
            mensajeErrorTelefono.textContent = "El formato del teléfono no es válido.";
            campoTelefono.classList.add('invalido');
            esValido = false;
        } else {
            mensajeErrorTelefono.textContent = "";
            campoTelefono.classList.remove('invalido');
        }
        return esValido;
    }
    if (formularioSuscripcion) {
        formularioSuscripcion.addEventListener('submit', function(evento) {
            evento.preventDefault(); 
            const emailOk = validarEmail();
            const telefonoOk = validarTelefono();
            const nombreOk = campoNombre && campoNombre.value.trim() !== "";
            if (campoNombre && !nombreOk) {
                alert("Por favor, introduce tu nombre.");
                campoNombre.classList.add('invalido');
                return;
            } else if(campoNombre) {
                campoNombre.classList.remove('invalido');
            }
            if (emailOk && telefonoOk && nombreOk) {
                const datosFormulario = {
                    nombre: campoNombre.value.trim(),
                    email: campoEmail.value.trim(),
                    telefono: campoTelefono.value.trim() || 'No proporcionado',
                    mensaje: campoMensaje.value.trim() || 'Sin mensaje'
                };
                console.log("Datos de Contacto Enviados:", datosFormulario);
                alert("Suscripción enviada con éxito");
                if(campoNombre) campoNombre.value = '';
                campoEmail.value = '';
                if(campoTelefono) campoTelefono.value = '';
                if(campoMensaje) campoMensaje.value = '';
            } else {
                alert("Por favor, revisa los campos marcados en rojo.");
            }
        });
        if(campoNombre) campoNombre.addEventListener('blur', () => { 
            if(campoNombre.value.trim() === "") campoNombre.classList.add('invalido'); 
            else campoNombre.classList.remove('invalido');
        });
        campoEmail.addEventListener('blur', validarEmail);
        campoEmail.addEventListener('input', validarEmail);
        if(campoTelefono) {
            campoTelefono.addEventListener('blur', validarTelefono);
            campoTelefono.addEventListener('input', validarTelefono);
        }
    }
});