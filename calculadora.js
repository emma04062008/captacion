const COEFICIENTES = {
  lamina: 0.9,
  teja: 0.75,
  concreto: 0.85,
};
const TINACO_CAPACIDAD_L = 1100; 
const COSTO_ESTIMADO_L = 0.05; 
const DUCHA_CONSUMO_L = 60;   
const LAVADORA_CONSUMO_L = 50; 
const CLAVE_LOCALSTORAGE = 'resultadoAgua2025'; 
const MAX_LITROS_REF = 100000;
const MAX_DUCHAS_REF = Math.floor(MAX_LITROS_REF / DUCHA_CONSUMO_L); 
function calcularAgua(area, coeficiente, precipitacion) {
  const aguaCaptadaLitros = area * coeficiente * precipitacion;
  return Math.round(aguaCaptadaLitros);
}
function construirObjetoResultado(area, material, lluvia, costoSistema, ahorroMensual, aguaCaptada) {
    const roiMeses = costoSistema / ahorroMensual;
    const tinacosEquivalente = Math.floor(aguaCaptada / TINACO_CAPACIDAD_L); 
    const duchasAnuales = Math.floor(aguaCaptada / DUCHA_CONSUMO_L);
    const ahorroAnual = (aguaCaptada * COSTO_ESTIMADO_L).toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
    });
    let porcentajeAgua = (aguaCaptada / MAX_LITROS_REF) * 100;
    let porcentajeDuchas = (duchasAnuales / MAX_DUCHAS_REF) * 100;
    if (porcentajeAgua > 100) porcentajeAgua = 100;
    if (porcentajeDuchas > 100) porcentajeDuchas = 100;
    let equivalenciaMensaje = `¡Esto equivale a **${tinacosEquivalente} tinacos de 1,100L**!`;
    if (tinacosEquivalente >= 10) {
        equivalenciaMensaje += ` Suficiente para **${duchasAnuales.toLocaleString('es-MX')} duchas** o **${Math.floor(aguaCaptada / LAVADORA_CONSUMO_L).toLocaleString('es-MX')} cargas de lavadora** en un año.`;
    }
    let roiMensaje = `${roiMeses.toFixed(1)} meses`;
    if (roiMeses > 120) { roiMensaje += " (¡Más de 10 años! Considera sistemas más eficientes o costos más bajos.)"; }
    let consejo = '';
    if (aguaCaptada < 30000) {
        consejo = 'Buen inicio. Considera aumentar el área de captación o mejorar la infraestructura para un mayor impacto.';
    } else if (aguaCaptada < 80000) {
        consejo = '¡Excelente potencial! Tu sistema podría cubrir una parte significativa de tus necesidades anuales.';
    } else {
        consejo = '¡Potencial extraordinario! Estás listo para ser un líder en sostenibilidad hídrica en tu comunidad.';
    }
    return {
        area: area.toLocaleString('es-MX'),
        material: material,
        lluvia: lluvia.toLocaleString('es-MX'),
        agua: aguaCaptada.toLocaleString('es-MX'),
        tinacos: equivalenciaMensaje, 
        ahorro: ahorroAnual,
        usos: 'Riego de jardín, limpieza de pisos, lavado de autos o descarga de sanitarios.',
        consejo: consejo,
        roi: roiMeses.toFixed(1) + " meses", 
        graficoAgua: porcentajeAgua.toFixed(1),
        graficoDuchas: porcentajeDuchas.toFixed(1),
        labelAgua: aguaCaptada.toLocaleString('es-MX') + " litros",
        labelDuchas: duchasAnuales.toLocaleString('es-MX') + " duchas",
        aguaNum: aguaCaptada.toLocaleString('es-MX'), 
        ahorroNum: ahorroAnual,
        roiNum: roiMeses.toFixed(1)
    };
}
function mostrarResultados(resultadoObj, guardar = true) {
    const materialSelect = document.getElementById('material');
    let materialTexto = resultadoObj.material;
    if (materialSelect) {
        const option = materialSelect.querySelector(`option[value="${resultadoObj.material}"]`);
        if (option) {
            materialTexto = option.textContent;
        }
    }
    const resultadosDOM = {
        'res-area': resultadoObj.area,
        'res-material': materialTexto,
        'res-lluvia': resultadoObj.lluvia,
        'res-agua': resultadoObj.agua,
        'res-tinacos': resultadoObj.tinacos, 
        'res-ahorro': resultadoObj.ahorro,
        'res-usos': resultadoObj.usos,
        'res-consejo': resultadoObj.consejo,
        'res-roi': resultadoObj.roi,
        'label-agua': resultadoObj.labelAgua,
        'label-duchas': resultadoObj.labelDuchas
    };
    let erroresEncontrados = false;
    for (const [id, contenido] of Object.entries(resultadosDOM)) {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.innerHTML = contenido; 
        } else {
            console.error(`❌ ERROR DE ID: El ID de resultado '${id}' no se encontró en el HTML. Verifique la estructura de resultados o gráficos.`);
            erroresEncontrados = true;
        }
    }
    const barraAgua = document.getElementById('barra-agua');
    const barraDuchas = document.getElementById('barra-duchas');

    if (barraAgua && resultadoObj.graficoAgua) {
        barraAgua.style.width = `${resultadoObj.graficoAgua}%`;
    }
    if (barraDuchas && resultadoObj.graficoDuchas) {
        barraDuchas.style.width = `${resultadoObj.graficoDuchas}%`;
    }
    const resultadosSection = document.getElementById('resultados');
    if (resultadosSection) {
        resultadosSection.style.display = 'block';
    }
    if (guardar) {
        try {
            localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(resultadoObj));
            console.log("Resultados guardados en localStorage.");
        } catch (e) {
            console.warn("No se pudo guardar en localStorage.", e);
        }
    }
}
function compartirResultados() {
    const guardado = localStorage.getItem(CLAVE_LOCALSTORAGE);
    if (!guardado) {
        alert("Primero debes realizar un cálculo para poder compartir tus resultados.");
        return;
    }
    const resultado = JSON.parse(guardado);
    const agua = resultado.aguaNum;
    const ahorro = resultado.ahorroNum;
    const roi = resultado.roiNum;
    const mensajeBase = `¡Estimé mi potencial de captación de agua en Zinacantepec!
    💧 Puedo captar ${agua} litros anualmente.
    💰 Esto representa un ahorro de ${ahorro} al año.
    ⏱️ Recuperaré la inversión en ${roi} meses.
    ¡Únete a la sostenibilidad! Calcula tu potencial aquí: ${window.location.href}`;
    const mensajeCodificado = encodeURIComponent(mensajeBase);
    const urlWhatsapp = `https://wa.me/?text=${mensajeCodificado}`;
    const urlTwitter = `https://twitter.com/intent/tweet?text=${mensajeCodificado}`;
    const urlFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${mensajeCodificado}`; 
    const plataforma = prompt(`¿En qué plataforma deseas compartir tus resultados?
    1. WhatsApp
    2. Twitter
    3. Facebook
    Escribe el número (1, 2 o 3):`);
    let url;
    if (plataforma === '1') {
        url = urlWhatsapp;
    } else if (plataforma === '2') {
        url = urlTwitter;
    } else if (plataforma === '3') {
        url = urlFacebook;
    } else {
        alert("Opción no válida. Por favor, selecciona 1, 2 o 3.");
        return;
    }
    if (url) {
        window.open(url, '_blank');
    }
}
function borrarDatos() {
    const form = document.getElementById('form-calculadora');
    if (form) {
        form.reset();
    }
    const resultadosSection = document.getElementById('resultados');
    if (resultadosSection) {
        resultadosSection.style.display = 'none';
    }
    const mensajeExito = document.getElementById('calculadora-mensaje-exito');
    if (mensajeExito) {
        mensajeExito.textContent = "";
        mensajeExito.classList.remove('activo');
    }
    localStorage.removeItem(CLAVE_LOCALSTORAGE);
    const calculadoraSection = document.getElementById('calculadora');
    if(calculadoraSection) {
        calculadoraSection.scrollIntoView({ behavior: 'smooth' });
    }
}
function ejecutarCalculo(botonCalcular) {
    const areaInput = document.getElementById('area');
    const materialInput = document.getElementById('material');
    const lluviaInput = document.getElementById('lluvia');
    const costoSistemaInput = document.getElementById('costo-sistema');
    const ahorroMensualInput = document.getElementById('ahorro-mensual');
    if (!areaInput || !materialInput || !lluviaInput || !costoSistemaInput || !ahorroMensualInput) {
        console.error("ERROR CRÍTICO: Faltan campos de entrada en el formulario.");
        alert("Error de cálculo: Faltan campos en el formulario.");
        return;
    }
    const area = parseFloat(areaInput.value);
    const material = materialInput.value;
    const lluvia = parseFloat(lluviaInput.value);
    const costoSistema = parseFloat(costoSistemaInput.value);
    const ahorroMensual = parseFloat(ahorroMensualInput.value); 
    const textoBoton = botonCalcular.querySelector('.texto-boton');
    const estadoCarga = botonCalcular.querySelector('.estado-carga');
    const mensajeExito = document.getElementById('calculadora-mensaje-exito');
    if (!area || !material || !lluvia || area <= 0 || lluvia <= 0) {
        alert('Por favor, ingresa valores válidos para Área y Precipitación.');
        document.getElementById('resultados').style.display = 'none'; 
        if (mensajeExito) mensajeExito.classList.remove('activo');
        return;
    }
    if (!costoSistema || costoSistema <= 0 || !ahorroMensual || ahorroMensual <= 0) {
        alert('Por favor, ingresa valores mayores a cero para el Costo del Sistema y el Ahorro Mensual.');
        document.getElementById('resultados').style.display = 'none'; 
        if (mensajeExito) mensajeExito.classList.remove('activo');
        return;
    }
    botonCalcular.disabled = true;
    if (textoBoton) textoBoton.style.display = 'none';
    if (estadoCarga) estadoCarga.classList.add('activo');
    if (mensajeExito) mensajeExito.classList.remove('activo');
    setTimeout(() => {
        const coeficiente = COEFICIENTES[material];
        const aguaCaptada = calcularAgua(area, coeficiente, lluvia);
        const resultadoFinal = construirObjetoResultado(area, material, lluvia, costoSistema, ahorroMensual, aguaCaptada);
        mostrarResultados(resultadoFinal, true); 
        botonCalcular.disabled = false;
        if (textoBoton) textoBoton.style.display = 'inline-block';
        if (estadoCarga) estadoCarga.classList.remove('activo');
        if (mensajeExito) {
            mensajeExito.textContent = "✅ ¡Cálculo realizado con éxito! Ve tus resultados abajo."; 
            mensajeExito.classList.add('activo');
        }
    }, 300); 
}
function inicializarCalculadora() {
    const guardado = localStorage.getItem(CLAVE_LOCALSTORAGE);
    if (guardado) {
        try {
            const resultadoGuardado = JSON.parse(guardado);
            mostrarResultados(resultadoGuardado, false); 

            const mensajeExito = document.getElementById('calculadora-mensaje-exito');
            if (mensajeExito) {
                mensajeExito.textContent = "💾 ¡Resultado anterior cargado!"; 
                mensajeExito.classList.add('activo');
            }
        } catch (e) {
            console.error("Error al cargar o parsear el resultado de localStorage", e);
            localStorage.removeItem(CLAVE_LOCALSTORAGE); 
        }
    }
    const botonCalcular = document.getElementById('boton-calcular');
    if (botonCalcular) {
        botonCalcular.addEventListener('click', function(e) {
            e.preventDefault(); 
            ejecutarCalculo(botonCalcular);
        });
    }
    const botonBorrar = document.getElementById('boton-borrar');
    if (botonBorrar) {
        botonBorrar.addEventListener('click', borrarDatos);
    }
    const botonCompartir = document.getElementById('boton-compartir');
    if (botonCompartir) {
        botonCompartir.addEventListener('click', compartirResultados);
    }
}
inicializarCalculadora();