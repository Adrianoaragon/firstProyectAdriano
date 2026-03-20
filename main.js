// ============================================================
//  main.js — Portal de Ingeniería 4.0
//  Autor: Adriano Aragon — Universidad Simón Bolívar
//  Bloque 2: JavaScript — Ejercicio final
// ============================================================

// ------------------------------------------------------------
// 1. COLECCIONES DE DATOS
//    Aquí almacenamos toda la información de la página.
//    Usamos Array, Map y Set como exige la actividad.
// ------------------------------------------------------------

// ARRAY: secciones de la barra de navegación
const secciones = ['inicio', 'tablas', 'multimedia', 'formulario'];

// MAP: etiquetas visibles para cada sección del nav
const etiquetasNav = new Map([
    ['inicio',      'Inicio'],
    ['tablas',      'Matriz 4.0'],
    ['multimedia',  'Multimedia'],
    ['formulario',  'Alta de Usuario']
]);

// MAP: datos de la tabla de Pilares 4.0
// Cada clave es un pilar; el valor es un objeto con IaaS, PaaS y SaaS
const pilares = new Map([
    ['Robótica Colaborativa', {
        iaas: 'Equinix Metal',
        paas: 'AWS RoboRunner',
        saas: 'Formic RaaS'
    }],
    ['IoT Industrial', {
        iaas: 'Soracom',
        paas: 'Ayla Networks',
        saas: 'Samsara'
    }],
    ['Big Data', {
        iaas: 'AWS EC2 + S3',
        paas: 'Google Dataflow',
        saas: 'Tableau'
    }],
    ['Inteligencia Artificial', {
        iaas: 'Azure VMs GPU',
        paas: 'AWS SageMaker',
        saas: 'DataRobot'
    }],
    ['Cloud Computing', {
        iaas: 'Amazon EC2',
        paas: 'Heroku',
        saas: 'Microsoft 365'
    }],
    ['Ciberseguridad', {
        iaas: 'Bare Metal Servers',
        paas: 'IBM Security QRadar',
        saas: 'CrowdStrike Falcon'
    }]
]);

// SET: tecnologías destacadas (sin duplicados, estructura Set)
const tecnologiasDestacadas = new Set([
    'AWS SageMaker',
    'Google Dataflow',
    'Samsara',
    'CrowdStrike Falcon',
    'Tableau',
    'AWS RoboRunner'
]);

// ARRAY DE OBJETOS: campos del formulario de alta de usuario
const camposFormulario = [
    { label: 'Nombre',          name: 'nom',    type: 'text',  placeholder: 'Ej: Adriano',         required: true  },
    { label: 'Primer Apellido', name: 'ape1',   type: 'text',  placeholder: 'Ej: Aragon',          required: true  },
    { label: 'Correo electrónico', name: 'correo', type: 'email', placeholder: 'Ej: a@usb.edu.co', required: true  },
    { label: 'Teléfono',        name: 'tel',    type: 'tel',   placeholder: 'Ej: 300 000 0000',    required: false }
];

// OBJETO: configuración del mapa y del video embebido
const multimedia = {
    mapa: {
        titulo: 'Universidad Simón Bolívar — Barranquilla',
        src: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.488319692484!2d-74.7904359!3d11.0019283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef42d140e6917db%3A0xc3c92f155f9a6913!2sUniversidad%20Sim%C3%B3n%20Bol%C3%ADvar!5e0!3m2!1ses!2sco!4v1700000000000'
    },
    video: {
        titulo: 'Industria 4.0 — Introducción',
        src: 'https://www.youtube.com/embed/1HZLAPyjW6w'
    }
};

// ------------------------------------------------------------
// 2. ESTADO DE LA APLICACIÓN
//    Variable que guarda cuál sección está activa
// ------------------------------------------------------------
let seccionActiva = 'inicio';

// ------------------------------------------------------------
// 3. GENERADORES DE HTML
//    Cada función devuelve un string de HTML para su sección.
//    El contenido se crea desde JS, no desde el HTML.
// ------------------------------------------------------------

// --- SECCIÓN: INICIO ---
function generarInicio() {
    // Usamos un WHILE para construir la lista de tecnologías destacadas del Set
    let listaTecnologias = '';
    const iterador = tecnologiasDestacadas.values();
    let siguiente = iterador.next();

    while (!siguiente.done) {
        listaTecnologias += `<li class="tag-tec">${siguiente.value}</li>`;
        siguiente = iterador.next();
    }

    return `
    <section class="seccion-inicio">
      <div class="inicio-hero">
        <div class="inicio-badge">Industria 4.0</div>
        <h2 class="inicio-titulo">Portal de<br><span>Ingeniería 4.0</span></h2>
        <p class="inicio-sub">
          Explora los pilares tecnológicos de la cuarta revolución industrial:
          IoT, Big Data, Robótica, IA, Cloud Computing y Ciberseguridad.
        </p>
        <div class="inicio-acciones">
          <button class="btn-primary" onclick="navegarA('tablas')">Ver Matriz 4.0</button>
          <button class="btn-secondary" onclick="navegarA('multimedia')">Multimedia</button>
        </div>
      </div>

      <div class="inicio-cards">
        <div class="card-stat">
          <span class="stat-num">6</span>
          <span class="stat-label">Pilares tecnológicos</span>
        </div>
        <div class="card-stat">
          <span class="stat-num">3</span>
          <span class="stat-label">Modelos de servicio</span>
        </div>
        <div class="card-stat">
          <span class="stat-num">18</span>
          <span class="stat-label">Tecnologías mapeadas</span>
        </div>
      </div>

      <div class="inicio-tec">
        <h3>Tecnologías destacadas</h3>
        <ul class="lista-tec">
          ${listaTecnologias}
        </ul>
      </div>
    </section>
  `;
}

// --- SECCIÓN: TABLA / MATRIZ 4.0 ---
function generarTabla() {
    // Usamos FOR...OF sobre el Map de pilares para generar las filas
    let filas = '';

    for (const [pilar, servicios] of pilares) {
        // IF: si la tecnología SaaS está en el Set de destacadas, marcamos la celda
        const saasDestacado   = tecnologiasDestacadas.has(servicios.saas)  ? 'class="celda-destacada"' : '';
        const paasDestacado   = tecnologiasDestacadas.has(servicios.paas)  ? 'class="celda-destacada"' : '';

        filas += `
      <tr>
        <td class="celda-pilar"><strong>${pilar}</strong></td>
        <td>${servicios.iaas}</td>
        <td ${paasDestacado}>${servicios.paas}</td>
        <td ${saasDestacado}>${servicios.saas}</td>
      </tr>
    `;
    }

    return `
    <section class="seccion-tabla">
      <div class="seccion-header">
        <h2>Matriz de Pilares 4.0</h2>
        <p>Clasificación de tecnologías según modelo de servicio cloud para cada pilar de la Industria 4.0.
           Las celdas <span class="leyenda-destacada">resaltadas</span> corresponden a tecnologías destacadas.</p>
      </div>

      <div class="tabla-wrap">
        <table class="tabla-pilares">
          <thead>
            <tr>
              <th>Pilar</th>
              <th>IaaS</th>
              <th>PaaS</th>
              <th>SaaS</th>
            </tr>
          </thead>
          <tbody>
            ${filas}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

// --- SECCIÓN: MULTIMEDIA ---
function generarMultimedia() {
    return `
    <section class="seccion-multimedia">
      <div class="seccion-header">
        <h2>Contenido Multimedia</h2>
        <p>Ubicación del campus y video de referencia sobre Industria 4.0.</p>
      </div>

      <div class="multimedia-grid">
        <div class="media-card">
          <h3>${multimedia.mapa.titulo}</h3>
          <div class="iframe-wrap">
            <iframe
              src="${multimedia.mapa.src}"
              width="100%" height="320"
              style="border:0; border-radius: 12px;"
              allowfullscreen loading="lazy">
            </iframe>
          </div>
        </div>

        <div class="media-card">
          <h3>${multimedia.video.titulo}</h3>
          <div class="iframe-wrap">
            <iframe
              width="100%" height="320"
              src="${multimedia.video.src}"
              title="${multimedia.video.titulo}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen style="border-radius: 12px;">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  `;
}

// --- SECCIÓN: FORMULARIO DE ALTA ---
function generarFormulario() {
    // Usamos FOR para recorrer el array de campos y generar cada fila
    let camposHTML = '';

    for (let i = 0; i < camposFormulario.length; i++) {
        const campo = camposFormulario[i];
        const obligatorio = campo.required ? '<span class="obligatorio">*</span>' : '';

        camposHTML += `
      <div class="campo-grupo">
        <label for="${campo.name}">${campo.label} ${obligatorio}</label>
        <input
          type="${campo.type}"
          id="${campo.name}"
          name="${campo.name}"
          placeholder="${campo.placeholder}"
          ${campo.required ? 'required' : ''}
        >
      </div>
    `;
    }

    return `
    <section class="seccion-formulario">
      <div class="seccion-header">
        <h2>Alta de Usuario</h2>
        <p>Registro en el portal de Ingeniería 4.0. Los campos marcados con
           <span class="obligatorio">*</span> son obligatorios.</p>
      </div>

      <form id="form-alta" class="formulario" action="#" method="POST" onsubmit="manejarEnvio(event)">
        ${camposHTML}
        <div class="form-footer">
          <button type="submit" class="btn-primary">Enviar Datos</button>
          <button type="reset"  class="btn-secondary">Limpiar</button>
        </div>
      </form>

      <!-- Mensaje de confirmación (oculto inicialmente) -->
      <div id="msg-confirmacion" class="msg-ok" style="display:none;"></div>
    </section>
  `;
}

// ------------------------------------------------------------
// 4. FUNCIÓN DE NAVEGACIÓN
//    Usa SWITCH para decidir qué sección renderizar.
//    Actualiza el estado y re-renderiza el contenido.
// ------------------------------------------------------------
function navegarA(seccion) {
    // Actualizamos la sección activa
    seccionActiva = seccion;

    // SWITCH: elegimos el generador correspondiente a la sección
    let contenidoHTML = '';

    switch (seccion) {
        case 'inicio':
            contenidoHTML = generarInicio();
            break;
        case 'tablas':
            contenidoHTML = generarTabla();
            break;
        case 'multimedia':
            contenidoHTML = generarMultimedia();
            break;
        case 'formulario':
            contenidoHTML = generarFormulario();
            break;
        default:
            // Si la sección no existe, mostramos inicio por defecto
            contenidoHTML = generarInicio();
            console.warn(`Sección desconocida: ${seccion}. Redirigiendo a inicio.`);
    }

    // Inyectamos el HTML generado en el contenedor principal
    document.getElementById('main-content').innerHTML = contenidoHTML;

    // Actualizamos los links activos del nav
    actualizarNavActivo();

    // Scroll al inicio del contenido
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ------------------------------------------------------------
// 5. CONSTRUCCIÓN DEL HEADER (nav + título)
//    Usamos FOR para recorrer el array de secciones y
//    el Map de etiquetas para generar los botones del nav.
// ------------------------------------------------------------
function construirHeader() {
    let navLinks = '';

    // FOR: generamos un botón por cada sección del array
    for (let i = 0; i < secciones.length; i++) {
        const id     = secciones[i];
        const label  = etiquetasNav.get(id); // obtenemos la etiqueta del Map
        navLinks += `
      <button
        class="nav-btn"
        id="nav-${id}"
        onclick="navegarA('${id}')">
        ${label}
      </button>
    `;
    }

    document.getElementById('site-header').innerHTML = `
    <div class="header-inner">
      <div class="header-brand">
        <span class="brand-tag">USB · 2026-1</span>
        <h1 class="brand-title">Portal <span>4.0</span></h1>
      </div>
      <nav class="nav-bar">
        ${navLinks}
      </nav>
    </div>
  `;
}

// ------------------------------------------------------------
// 6. ACTUALIZAR NAV ACTIVO
//    Resalta el botón de la sección activa.
//    Usa IF para comparar y asignar clases.
// ------------------------------------------------------------
function actualizarNavActivo() {
    // Recorremos las secciones con FOR para gestionar la clase activa
    for (let i = 0; i < secciones.length; i++) {
        const btn = document.getElementById(`nav-${secciones[i]}`);

        if (btn) {
            // IF: si es la sección activa, añadimos clase; si no, la quitamos
            if (secciones[i] === seccionActiva) {
                btn.classList.add('nav-activo');
            } else {
                btn.classList.remove('nav-activo');
            }
        }
    }
}

// ------------------------------------------------------------
// 7. CONSTRUCCIÓN DEL FOOTER
// ------------------------------------------------------------
function construirFooter() {
    document.getElementById('site-footer').innerHTML = `
    <div class="footer-inner">
      <p>© 2026 <strong>Adriano Aragon</strong> — Universidad Simón Bolívar</p>
      <a href="https://github.com/danieldelarosaUSB" target="_blank" class="footer-link">
        Profe GitHub ↗
      </a>
    </div>
  `;
}

// ------------------------------------------------------------
// 8. MANEJO DEL FORMULARIO
//    Valida campos con IF y muestra mensaje de confirmación.
// ------------------------------------------------------------
function manejarEnvio(event) {
    event.preventDefault(); // Evitamos que recargue la página

    const nombre = document.getElementById('nom').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const msg    = document.getElementById('msg-confirmacion');

    // IF: validamos que los campos obligatorios estén completos
    if (nombre === '' || correo === '') {
        msg.textContent  = '⚠️ Por favor completa todos los campos obligatorios.';
        msg.className    = 'msg-error';
        msg.style.display = 'block';
    } else {
        msg.textContent  = `✅ ¡Registro exitoso! Bienvenido, ${nombre}. Te contactaremos en ${correo}.`;
        msg.className    = 'msg-ok';
        msg.style.display = 'block';

        // Limpiamos el formulario después de 3 segundos
        setTimeout(() => {
            document.getElementById('form-alta').reset();
            msg.style.display = 'none';
        }, 3000);
    }

    console.log(`Formulario enviado — Nombre: ${nombre}, Correo: ${correo}`);
}

// ------------------------------------------------------------
// 9. INICIALIZACIÓN
//    Se ejecuta al cargar la página.
// ------------------------------------------------------------
function init() {
    console.log('🚀 Portal Ingeniería 4.0 — iniciando...');

    // Construimos header y footer (estructura fija)
    construirHeader();
    construirFooter();

    // Cargamos la sección de inicio por defecto
    navegarA('inicio');

    console.log(`✅ Portal listo. Sección activa: ${seccionActiva}`);
    console.log(`📦 Pilares cargados: ${pilares.size}`);
    console.log(`⭐ Tecnologías destacadas: ${tecnologiasDestacadas.size}`);
}

// Llamamos a init cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
