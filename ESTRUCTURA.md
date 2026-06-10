# Guía de Estructura

## Cambios Realizados

Tu página ha sido reorganizada de un **monolito de 700+ líneas** a una **estructura modular y mantenible**.

### Antes ❌
```
diablo-uma.html (todo mezclado: HTML + CSS + JavaScript)
├── HTML: estructura
├── CSS: +500 líneas inline
└── JavaScript: +800 líneas inline
```

### Después ✅
```
diablo-uma/
├── index.html (limpio, solo estructura HTML)
├── css/
│   └── styles.css (toda la presentación)
├── js/
│   ├── main.js (coordinador central)
│   ├── fire-particles.js (animación de fuego)
│   ├── modal-system.js (lógica de modales)
│   ├── modal-data.js (contenido de modales)
│   └── camera.js (sistema de cámara)
└── README.md (documentación)
```

## Beneficios

| Aspecto | Antes | Después |
|---------|-------|---------|
| **Mantenibilidad** | Difícil buscar en 700 líneas | Módulos específicos |
| **Reutilización** | Imposible compartir código | Importación modular |
| **Colaboración** | Conflictos de merge | Archivos independientes |
| **Performance** | Todo cargado al inicio | Módulos tree-shaken |
| **Testing** | No es posible | Cada módulo es testeable |
| **Escalabilidad** | Limitada | Agregar features es fácil |

## Archivos y su Propósito

### 📄 `index.html`
**Responsabilidad:** Estructura semántica pura

```html
<!-- Importa CSS -->
<link rel="stylesheet" href="css/styles.css">

<!-- HTML limpio y bien organizado -->
<header>...</header>
<div id="stage">...</div>
<footer>...</footer>
<div id="overlay">...</div>

<!-- Importa scripts módulos -->
<script type="module" src="js/main.js"></script>
```

### 🎨 `css/styles.css`
**Responsabilidad:** Presentación y animaciones

- Variables CSS (colores, tipografías)
- Layouts (flexbox, grid)
- Animaciones (fire, rings, modales)
- Responsive design
- Temas y estados UI

### 🎮 `js/main.js`
**Responsabilidad:** Orquestador de la aplicación

```javascript
import { initFireParticles } from './fire-particles.js';
import { showModal, setupModalEvents } from './modal-system.js';

// Inicializa todos los módulos
// Configura event listeners
// Expone funciones globales
```

### 🔥 `js/fire-particles.js`
**Responsabilidad:** Animación de fondo

- Generador de partículas en canvas
- Control de colores y velocidades
- Responsivo a redimensionamiento

```javascript
initFireParticles(); // Una línea para activarlo
```

### 📋 `js/modal-data.js`
**Responsabilidad:** Contenido centralizado

```javascript
export const MODAL_DATA = {
  quien: { emoji, tag, title, html },
  historia: { ... },
  tradicion: { ... },
  foto: { ... }
};
```

Fácil actualizar contenido sin tocar lógica.

### 🗂️ `js/modal-system.js`
**Responsabilidad:** Lógica de modales

```javascript
export function showModal(key) { ... }
export function hideModal() { ... }
export function setupModalEvents() { ... }
```

Importa `modal-data.js` para obtener contenido.
Coordina con `camera.js` para fotos.

### 📷 `js/camera.js`
**Responsabilidad:** Captura de fotos

```javascript
export async function startCam() { ... }
export function snapPhoto() { ... }
export function downloadPhoto() { ... }
export function stopCam() { ... }
```

Expone funciones globales para botones.

## Flujo de Ejecución

```
Usuario abre index.html
    ↓
Carga CSS y scripts módulos
    ↓
DOMContentLoaded
    ↓
main.js ejecuta:
  1. initFireParticles() → fondo animado
  2. setupModalEvents() → listeners de modal
  3. setupOrbButtons() → listeners de botones
    ↓
Usuario interactúa
    ↓
Botón orb → showModal(clave)
    ↓
modal-system busca en modal-data
    ↓
Muestra modal con contenido
    ↓
Si es 'foto' → inicia cámara
```

## Cómo Extender

### Agregar Nueva Sección Modal

1. **Añade en `modal-data.js`:**
```javascript
export const MODAL_DATA = {
  // ... existentes
  nuevaSeccion: {
    emoji: '🎭',
    tag: 'Nueva',
    title: 'Mi Nueva Sección',
    html: `<p>Contenido aquí</p>`
  }
};
```

2. **Añade botón en `index.html`:**
```html
<button class="orb" id="b-nueva" aria-label="Nueva sección">
  <div class="orb-disc">🎭</div>
  <span class="orb-label">Nueva</span>
</button>
```

3. **Registra en `main.js`:**
```javascript
const buttons = [
  // ... existentes
  { id: 'b-nueva', modal: 'nuevaSeccion' }
];
```

### Agregar Nueva Funcionalidad

Crea nuevo módulo (ej: `js/analytics.js`):

```javascript
// js/analytics.js
export function trackEvent(name, data) {
  // Implementación
}

// js/main.js
import { trackEvent } from './analytics.js';

// Usar en eventos
button.addEventListener('click', () => {
  trackEvent('modal_opened', { modal: 'quien' });
  showModal('quien');
});
```

## Variables de Entorno (Próximo Paso)

Para hacer aún más modular, podrías agregar:

```javascript
// js/config.js
export const CONFIG = {
  PARTICLE_COUNT: 70,
  MODAL_ANIMATION_DURATION: 350,
  AR_ENABLED: true,
  DEBUG_MODE: false
};
```

Y usarla en módulos:

```javascript
import { CONFIG } from './config.js';

const PARTICLE_COUNT = CONFIG.PARTICLE_COUNT;
```

---

## Resumen

✅ HTML limpio y semántico  
✅ CSS centralizado y mantenible  
✅ JavaScript modularizado con ES6 modules  
✅ Separación de responsabilidades  
✅ Fácil de extender y mantener  
✅ Mejor performance y UX  
✅ Preparado para testing

**¡Tu página está lista para crecer!** 🚀
