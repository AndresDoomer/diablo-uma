# ⚡ Cheat Sheet - Referencia Rápida

Encuentra rápidamente qué editar para cada tarea.

## 🎯 Tareas Comunes

### ✏️ Cambiar Contenido de Modales

**¿Dónde?** `js/modal-data.js`

```javascript
export const MODAL_DATA = {
  quien: {
    emoji: '👁️',
    tag: 'Identidad',
    title: 'Mi nuevo título',              // ← Cambia aquí
    html: `<p>Mi nuevo contenido</p>`      // ← Y aquí
  }
};
```

---

### 🎨 Cambiar Colores

**¿Dónde?** `css/styles.css` (líneas 18-30)

```css
:root {
  --black: #07040a;         /* Fondo */
  --fire: #e8621a;          /* Fuego */
  --gold: #d4a83a;          /* Oro */
  --cream: #f5ede0;         /* Texto */
  /* Cambia valores hex aquí */
}
```

---

### 🔤 Cambiar Tipografía

**¿Dónde?** `css/styles.css` (líneas 25-26)

```css
--serif: 'Playfair Display', Georgia, serif;
--sans: 'Inter', system-ui, sans-serif;
```

---

### ➕ Agregar Nueva Sección Modal

**Paso 1:** `js/modal-data.js`
```javascript
export const MODAL_DATA = {
  // ... existentes
  miSeccion: {           // ← Nombre único
    emoji: '🎭',
    tag: 'Mi Tag',
    title: 'Mi Título',
    html: `<p>Contenido aquí</p>`
  }
};
```

**Paso 2:** `index.html`
```html
<button class="orb" id="b-miseccion" aria-label="Mi sección">
  <div class="orb-disc">🎭</div>
  <span class="orb-label">Mi<br/>Sección</span>
</button>
```

**Paso 3:** `js/main.js`
```javascript
const buttons = [
  // ... existentes
  { id: 'b-miseccion', modal: 'miSeccion' }
];
```

---

### 🏗️ Cambiar Estructura HTML

**¿Dónde?** `index.html`

Estructura general:
```html
<header>...</header>
<div id="stage">
  <div id="viewer-wrap">
    <!-- Modelo 3D y botones orb aquí -->
  </div>
</div>
<footer>...</footer>
<div id="overlay"><!-- Modal --></div>
```

---

### 🎬 Cambiar Animaciones

**¿Dónde?** `css/styles.css`

**Fire particles:** Línea ~60
**Ring rotation:** Línea ~200
**Modal transition:** Línea ~280
**Orb breathe:** Línea ~165

```css
@keyframes orb-breathe {
  0%, 100% { filter: drop-shadow(0 0 8px rgba(...)); }
  50% { filter: drop-shadow(0 0 22px rgba(...)); }
}
```

---

### ⚙️ Cambiar Funcionalidad JavaScript

**Lógica de modales:** `js/modal-system.js`  
**Animación de fuego:** `js/fire-particles.js`  
**Captura de fotos:** `js/camera.js`  
**Coordinación:** `js/main.js`

---

## 🔍 Búsqueda por Sección

### Header
- Título: `index.html` + `css/styles.css` (línea 76)
- Descripción: `index.html` (línea 47)
- Ubicación: `index.html` (línea 50)

### Viewer 3D
- Modelo: `index.html` (línea 75)
- Propiedades: `index.html` (línea 75-82)
- Estilos: `css/styles.css` (línea 132-149)

### Botones Orb
- Posiciones: `css/styles.css` (línea 193-203)
- Eventos: `js/main.js` (línea 26-35)
- Estilos: `css/styles.css` (línea 160-193)

### Modales
- Contenido: `js/modal-data.js`
- Lógica: `js/modal-system.js`
- Estilos: `css/styles.css` (línea 280-350)

### Cámara
- Funcionalidad: `js/camera.js`
- Integración: `js/modal-system.js` (línea 30)

### Animaciones
- Fuego: `js/fire-particles.js`
- Canvas: `css/styles.css` (línea 48)

### Footer
- Contenido: `index.html` (línea 119-124)
- Estilos: `css/styles.css` (línea 256-275)

---

## 📝 Snippets Útiles

### Crear nuevo objeto modal
```javascript
const nuevaSeccion = {
  emoji: '🎭',
  tag: 'Categoría',
  title: 'Título de la sección',
  html: `
    <p>Párrafo 1</p>
    <div class="highlight"><p>Destaque</p></div>
    <p>Párrafo 2</p>
  `
};
```

### Nuevo color CSS
```css
/* Agregar en :root {} */
--color-nuevo: #123456;

/* Usar en selectores */
color: var(--color-nuevo);
```

### Nuevo keyframe
```css
@keyframes mi-animacion {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.elemento {
  animation: mi-animacion 0.3s ease-in-out;
}
```

### Nuevo botón orb
```html
<button class="orb" id="b-nombre" aria-label="Descripción">
  <div class="orb-disc">🎭</div>
  <span class="orb-label">Texto<br/>aquí</span>
</button>
```

---

## 🧪 Testing Rápido

### Verificar que funciona
```
1. Abre index.html en navegador
2. Presiona F12 (DevTools)
3. Ve a Console
4. No debe haber errores rojos
5. Haz click en botones
6. Prueba la cámara
```

### Verificar cambios
```
1. Edita archivo
2. Guarda (Ctrl+S)
3. Recarga navegador (F5)
4. Verifica cambios
5. Si no ves cambios: Ctrl+Shift+R (caché)
```

---

## 🔗 Archivos Relacionados

```
main.js
├── Importa: fire-particles.js
├── Importa: modal-system.js
│   ├── Importa: modal-data.js
│   └── Importa: camera.js
└── Expone funciones globales

CSS separa en secciones:
├── Variables
├── Canvas & Background
├── Header
├── Stage & Viewer
├── Ring System
├── Orb Buttons
├── AR Pill
├── Footer
├── Modal System
└── Camera
```

---

## 📊 Importancia de Archivos

| Archivo | Editas | Refencia | Nunca |
|---------|--------|----------|-------|
| modal-data.js | ✓ | - | - |
| styles.css | ✓ | ✓ | - |
| index.html | ✓ | ✓ | - |
| main.js | - | ✓ | - |
| modal-system.js | - | - | ✓ |
| camera.js | - | - | ✓ |
| fire-particles.js | - | - | ✓ |

---

## ⏱️ Tiempo Estimado

| Tarea | Tiempo |
|-------|--------|
| Cambiar contenido | 2 min |
| Cambiar color | 5 min |
| Agregar sección | 15 min |
| Nueva funcionalidad | 30+ min |

---

## 🆘 Si Algo Falla

```
Error en console
    │
    ├─ "Cannot find module"
    │   └─ Verifica rutas en js/main.js
    │
    ├─ "is not a function"
    │   └─ Verifica export en el módulo
    │
    ├─ "undefined"
    │   └─ Verifica id="..." en HTML
    │
    └─ "Style not applied"
        └─ Verifica selector en CSS + caché
```

---

## 🎯 Checklist Pre-Deploy

- [ ] Modal-data.js actualizado
- [ ] Colores correctos (css/styles.css)
- [ ] Estructura HTML correcta (index.html)
- [ ] No hay errores en console
- [ ] Tested en móvil
- [ ] Tested en desktop
- [ ] Cámara funciona
- [ ] AR button visible
- [ ] Footer actualizado
- [ ] README actualizado

---

**Guarda este archivo como referencia rápida** 🚀

*Última actualización: Junio 2024*
