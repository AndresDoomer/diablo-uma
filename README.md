# Diablo Uma - Página Web Interactiva

Experiencia digital inmersiva sobre el **Diablo Uma**, patrimonio cultural inmaterial del Ecuador.

## 📁 Estructura del Proyecto

```
diablo-uma/
├── index.html              # Archivo HTML principal (limpio y semántico)
├── diablo-uma.html         # Archivo original (para referencia)
├── css/
│   └── styles.css          # Estilos centralizados (variables CSS, layouts, animaciones)
├── js/
│   ├── main.js             # Punto de entrada (inicializa módulos)
│   ├── fire-particles.js   # Sistema de animación de partículas de fuego
│   ├── modal-system.js     # Gestión de modales (abrir/cerrar)
│   ├── modal-data.js       # Contenido de modales (separado de lógica)
│   └── camera.js           # Sistema de captura de fotos
└── README.md               # Este archivo
```

## 🎯 Características Principales

### 1. **Visualizador 3D con AR**
- Modelo 3D interactivo con rotación automática
- Soporte para Realidad Aumentada (AR)
- Fallback a Sketchfab embed
- Anillos dorados animados

### 2. **Sistema Modal**
- 4 secciones interactivas:
  - 👁️ **¿Quién soy?** - Identidad del Diablo Uma
  - 📖 **Mi historia** - Contexto histórico y cultural
  - 🏛️ **Tradición** - Información sobre la festividad
  - 📸 **Tomar foto** - Captura de fotos con cámara

### 3. **Animaciones**
- Partículas de fuego en el fondo (canvas)
- Gradientes radiales y glows
- Respiración de botones orb
- Transiciones suaves de modales

### 4. **Cámara Web**
- Captura de fotos
- Espejo horizontal automático
- Footer con branding
- Descarga local (sin servidor)
- Privacidad garantizada

## 📦 Módulos JavaScript

### `main.js`
- Inicializa todos los módulos
- Configura eventos de botones orb
- Punto central de la aplicación

### `fire-particles.js`
- Generador de partículas de fuego
- Canvas animado de fondo
- Responsivo a cambios de tamaño

### `modal-system.js`
- Abre/cierra modales
- Maneja eventos de teclado (Escape)
- Click en fondo para cerrar
- Integración con sistema de cámara

### `modal-data.js`
- Contenido centralizado de modales
- Estructura de datos reutilizable
- Facilita actualizaciones de contenido

### `camera.js`
- Acceso a cámara web
- Captura y procesamiento de fotos
- Descarga de archivos locales
- Control de stream

## 🎨 Sistema de Colores

```css
--black: #07040a           /* Fondo principal */
--deep: #0f0812            /* Profundidad */
--crimson: #9b1c1c         /* Carmesí */
--ember: #c8360a           /* Ascua */
--fire: #e8621a            /* Fuego */
--gold: #d4a83a            /* Oro principal */
--gold-light: #f0cc6a      /* Oro claro */
--cream: #f5ede0           /* Crema (texto) */
--muted: #8a7560           /* Mutado (detalles) */
```

## 🚀 Cómo Usar

### Desarrollo Local
1. Abre `index.html` en un navegador moderno
2. Los módulos se cargan automáticamente
3. Todos los assets externos están CDN

### Modificar Contenido
- Edita `js/modal-data.js` para cambiar textos
- Modifica `css/styles.css` para estilos
- Agrega nuevas funciones en módulos específicos

### Agregar Nuevas Secciones
1. Añade entrada en `MODAL_DATA` (modal-data.js)
2. Crea botón orb en HTML
3. Registra en `setupOrbButtons()` (main.js)

## ♿ Accesibilidad

- Etiquetas semánticas (`<header>`, `<footer>`, `role="dialog"`)
- Atributos `aria-label` en botones interactivos
- `aria-modal="true"` en modales
- Navegación por teclado (Escape para cerrar)
- Alto contraste de colores

## 📱 Responsive

Diseño adaptativo para:
- Desktop (1920x1080+)
- Tablet (768px+)
- Móvil (<500px)

Media queries específicos en `styles.css`

## 🔒 Privacidad

- Fotos se guardan **SOLO** en el dispositivo
- No se envían a servidores
- Acceso a cámara bajo consentimiento del usuario
- Cumple GDPR

## 🌐 Navegadores Soportados

- Chrome/Chromium 90+
- Firefox 88+
- Safari 15+
- Edge 90+
- WebXR para AR (dispositivos soportados)

## 📄 Licencia

Patrimonio Cultural Inmaterial del Ecuador - Pase del Niño Riobamba

---

**Última actualización:** Junio 2024  
**Versión:** 2.0 (Modularizado)
