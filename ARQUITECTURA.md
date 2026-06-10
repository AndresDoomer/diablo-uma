# Diagrama de Arquitectura

## 🏗️ Estructura de Módulos

```
┌─────────────────────────────────────────────────────────────────┐
│                          index.html                             │
│  (HTML Semántico - Estructura & Accesibilidad)                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                    imports modules
                            │
        ┌───────────┬────────┼────────┬──────────────┐
        │           │        │        │              │
        ▼           ▼        ▼        ▼              ▼
    ┌──────────┐ ┌──────┐ ┌──────────┐ ┌────────┐ ┌──────────┐
    │ main.js  │ │ CSS  │ │modal-    │ │camera  │ │ fire-    │
    │          │ │      │ │system.js │ │.js     │ │particles │
    │ Orquesta │ │styles│ │          │ │        │ │.js       │
    │ módulos  │ │.css  │ │ Modales  │ │ Fotos  │ │          │
    └────┬─────┘ └──────┘ │ Open/    │ │ Web    │ │ Partícul.│
         │                │ Close    │ │ Cam    │ │ Canvas   │
         │                └────┬─────┘ └────────┘ └──────────┘
         │                     │
         │              imports data
         │                     │
         │             ┌───────▼────────┐
         │             │  modal-data.js │
         │             │                │
         │             │  Contenido de  │
         └─────────────┤  Modales       │
                       │                │
                       └────────────────┘

```

## 📊 Dependencias

```
main.js
├── fire-particles.js (inicializa fuego)
├── modal-system.js
│   ├── modal-data.js (obtiene contenido)
│   └── camera.js (inicia cámara)
└── Expone funciones globales
    └── window.show()
    └── window.hide()

camera.js
└── Expone funciones globales
    ├── window.snapPhoto()
    ├── window.downloadPhoto()
    └── window.retryCamera()
```

## 🔄 Flujo de Datos

### Apertura de Modal

```
Usuario hace click en botón orb
         │
         ▼
    showModal('quien')
         │
         ├─ Busca en MODAL_DATA
         │   ├─ emoji
         │   ├─ tag
         │   ├─ title
         │   └─ html
         │
         ├─ Rellena HTML del modal
         │
         ├─ Muestra overlay (display: flex)
         │
         ├─ Anima entrada (addClass 'open')
         │
         └─ Si es 'foto' → startCam()
```

### Captura de Foto

```
Usuario hace click "Capturar"
         │
         ▼
    snapPhoto()
         │
         ├─ Obtiene stream de cámara
         │
         ├─ Dibuja en canvas
         │   ├─ Espejo horizontal
         │   ├─ Footer con texto
         │   └─ JPEG 92% calidad
         │
         ├─ Muestra preview
         │
         └─ Cambia visibilidad de botones
```

## 🎯 Responsabilidad de Cada Módulo

| Módulo | Responsabilidad | Exporta | Depende de |
|--------|-----------------|---------|-----------|
| **main.js** | Orquestación | Funciones globales | Todos |
| **modal-data.js** | Contenido | MODAL_DATA | - |
| **modal-system.js** | Lógica de UI | show/hide/setup | modal-data, camera |
| **camera.js** | Fotos | snap/download/retry | - |
| **fire-particles.js** | Animación | initFire | - |
| **styles.css** | Presentación | - | - |

## 🔌 Puntos de Integración

### Botones Orb → showModal()
```html
<button id="b-quien" onclick="window.show('quien')">
```

### Botones de Cámara → Funciones globales
```html
<button onclick="window.snapPhoto()">Capturar</button>
```

## 🚀 Ciclo de Vida

```
1. CARGA
   ├─ Parse HTML
   ├─ Carga CSS
   ├─ Carga módulos JS (type="module")
   └─ DOMContentLoaded → main.js

2. INICIALIZACIÓN
   ├─ initFireParticles()
   ├─ setupModalEvents()
   ├─ setupOrbButtons()
   └─ Estado listo para interacción

3. RUNTIME
   ├─ Usuario interactúa
   ├─ Eventos disparan funciones
   ├─ Estado actualiza en tiempo real
   └─ Animaciones responden

4. LIMPIEZA (si navega away)
   ├─ stopCam() detiene streams
   ├─ Event listeners removidos
   └─ Memoria liberada
```

## 🔒 Aislamiento de Responsabilidades

```
PRESENTACIÓN (CSS)
├─ Variables globales
├─ Layouts
└─ Animaciones

DATOS (modal-data.js)
├─ Contenido
├─ Estructuras
└─ Constantes

LÓGICA (*.js)
├─ Event handlers
├─ State management
└─ API calls (si hubiera)

INTERACCIÓN (HTML)
├─ Estructura semántica
├─ Accesibilidad
└─ Metadata
```

## 📈 Escalabilidad

Para agregar nueva funcionalidad:

```
Nuevo Feature
     │
     ├─ ¿Necesita datos?
     │   └─ modal-data.js
     │
     ├─ ¿Necesita estilos?
     │   └─ styles.css
     │
     ├─ ¿Necesita lógica?
     │   └─ nuevo-modulo.js
     │
     └─ ¿Necesita coordinar?
         └─ main.js (import y setup)
```

## ⚡ Optimizaciones Futuras

```
AHORA                          POSIBLE
├─ ES6 modules                 → Bundler (Vite/Webpack)
├─ Contenido hardcoded         → CMS o JSON remoto
├─ Funciones globales          → Event emitter pattern
├─ Sin testing                 → Vitest + Coverage
└─ Sin build                   → CI/CD pipeline
```

---

**Visualización:** La arquitectura sigue el patrón de **Separation of Concerns** (SoC)

- **HTML** = Estructura
- **CSS** = Presentación
- **JavaScript** = Comportamiento
- **Datos** = Contenido

¡Limpio, mantenible y escalable! 🎯
