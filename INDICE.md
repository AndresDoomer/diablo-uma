# 📚 Índice de Documentación

## 🎯 Elige Por Dónde Empezar

### Si eres nuevo en el proyecto
```
1. RESUMEN.md .................... ← Empieza aquí (5 min)
2. README.md ..................... Descripción general (10 min)
3. index.html .................... Abre en navegador (5 min)
```

### Si quieres entender la estructura
```
1. ESTRUCTURA.md ................. Qué hace cada archivo (15 min)
2. ARQUITECTURA.md ............... Diagrama de conexiones (10 min)
3. js/main.js .................... Revisar código (5 min)
```

### Si quieres modificar contenido
```
1. ESTRUCTURA.md → "Agregar Nueva Sección Modal"
2. js/modal-data.js .............. Editar aquí el contenido
3. css/styles.css ................ Personalizar estilos
```

### Si quieres verificar que funciona
```
1. TESTING.md .................... Checklist completo (20 min)
2. Navega por cada modal
3. Prueba captura de fotos
4. Verifica en móvil
```

### Si quieres agregar funcionalidad nueva
```
1. ARQUITECTURA.md ............... Entiende el flujo
2. js/main.js .................... Ver cómo coordina
3. Crea nuevo módulo si es necesario
4. Integra en main.js
```

---

## 📖 Archivo por Archivo

### 🎯 RESUMEN.md
**Qué es:** Resumen ejecutivo de la reorganización  
**Para quién:** Todos, especialmente nuevos  
**Tiempo de lectura:** 5 minutos  
**Contenido:**
- Transformación realizada
- Estructura nueva
- Cómo comenzar
- Beneficios obtenidos
- Personalización básica

**Lee esto si:** Quieres entender qué cambió y cómo empezar

---

### 📄 README.md
**Qué es:** Documentación principal del proyecto  
**Para quién:** Desarrolladores  
**Tiempo de lectura:** 15 minutos  
**Contenido:**
- Descripción del proyecto
- Características principales
- Módulos JavaScript
- Sistema de colores
- Cómo usar localmente
- Cómo modificar contenido
- Accesibilidad
- Navegadores soportados

**Lee esto si:** Necesitas referencia completa del proyecto

---

### 🏗️ ESTRUCTURA.md
**Qué es:** Explicación detallada de cada archivo  
**Para quién:** Desarrolladores que quieren mantener el código  
**Tiempo de lectura:** 20 minutos  
**Contenido:**
- Cambios realizados (antes/después)
- Beneficios de la reorganización
- Propósito de cada archivo
- Flujo de ejecución
- Cómo extender (paso a paso)
- Cómo agregar funcionalidad

**Lee esto si:** Vas a modificar o extender el proyecto

---

### 🏛️ ARQUITECTURA.md
**Qué es:** Diagrama visual de la arquitectura  
**Para quién:** Desarrolladores visuales  
**Tiempo de lectura:** 15 minutos  
**Contenido:**
- Estructura de módulos (diagrama ASCII)
- Dependencias
- Flujo de datos
- Responsabilidad de cada módulo
- Ciclo de vida
- Aislamiento de responsabilidades
- Escalabilidad futura

**Lee esto si:** Necesitas entender cómo funcionan los módulos

---

### 🧪 TESTING.md
**Qué es:** Guía completa de testing  
**Para quién:** QA, desarrolladores, usuarios finales  
**Tiempo de lectura:** 25 minutos  
**Contenido:**
- Verificación rápida
- Testing de cada módulo
- Testing de responsividad
- Testing de accesibilidad
- Testing de performance
- Testing cruzado de navegadores
- Testing de privacidad
- Checklist final

**Lee esto si:** Quieres verificar que todo funciona

---

### 📝 index.html
**Qué es:** Archivo HTML principal  
**Para quién:** Desarrolladores (referencia)  
**Contenido:**
- Estructura HTML limpia
- Meta tags
- Enlaces a CSS y scripts
- Semántica correcta
- Accesibilidad integrada

**Edita esto si:** Necesitas cambiar la estructura HTML

---

### 🎨 css/styles.css
**Qué es:** Todos los estilos de la página  
**Para quién:** Desarrolladores frontend, diseñadores  
**Contenido:**
- Variables CSS (colores, fuentes)
- Estilos por sección
- Animaciones
- Media queries (responsive)
- Estados de UI

**Edita esto si:** Quieres cambiar colores, fuentes o estilos

---

### ⚙️ js/main.js
**Qué es:** Punto de entrada de la aplicación  
**Para quién:** Desarrolladores  
**Contenido:**
- Importa todos los módulos
- Inicializa funcionalidades
- Configura event listeners
- Expone funciones globales

**Edita esto si:** Necesitas agregar nuevas inicializaciones

---

### 🔥 js/fire-particles.js
**Qué es:** Animación de partículas de fuego  
**Para quién:** Desarrolladores  
**Contenido:**
- Generador de partículas
- Canvas animado
- Responsividad

**Edita esto si:** Quieres cambiar la animación de fondo

---

### 📋 js/modal-system.js
**Qué es:** Lógica de modales  
**Para quién:** Desarrolladores  
**Contenido:**
- showModal()
- hideModal()
- Eventos de teclado y click
- Setup

**Edita esto si:** Necesitas cambiar cómo funcionan los modales

---

### 📦 js/modal-data.js
**Qué es:** Contenido centralizado de modales  
**Para quién:** Editores de contenido, desarrolladores  
**Contenido:**
- MODAL_DATA objeto
- 4 secciones: quien, historia, tradicion, foto

**Edita esto si:** Quieres cambiar texto, emojis o contenido HTML

---

### 📷 js/camera.js
**Qué es:** Sistema de captura de fotos  
**Para quién:** Desarrolladores  
**Contenido:**
- startCam()
- snapPhoto()
- downloadPhoto()
- retryCamera()
- stopCam()

**Edita esto si:** Quieres modificar la funcionalidad de cámara

---

## 🗺️ Mapa Mental

```
Quiero...

├─ Entender qué cambió
│  └─ RESUMEN.md
│
├─ Usar la página
│  ├─ Abre index.html
│  └─ Lee TESTING.md para verificar
│
├─ Modificar contenido
│  ├─ Edita js/modal-data.js
│  └─ Mira ESTRUCTURA.md → "Archivo por archivo"
│
├─ Cambiar estilos/colores
│  ├─ Edita css/styles.css
│  └─ Busca :root { } para variables
│
├─ Agregar nueva sección
│  ├─ Lee ESTRUCTURA.md → "Cómo extender"
│  ├─ Modifica 3 archivos
│  └─ Prueba con TESTING.md
│
├─ Entender la arquitectura
│  ├─ Lee ARQUITECTURA.md
│  └─ Revisa diagramas ASCII
│
├─ Agregar funcionalidad nueva
│  ├─ Lee ARQUITECTURA.md
│  ├─ Crea nuevo js/mi-modulo.js
│  ├─ Importa en js/main.js
│  └─ Inicializa en setup
│
└─ Verificar que todo funciona
   ├─ Usa TESTING.md
   ├─ Sigue el checklist
   └─ Abre DevTools (F12)
```

---

## 📌 Lectura Recomendada por Rol

### 👤 Usuario Final
1. ✓ Abre index.html
2. ✓ Interactúa con botones
3. ✓ Toma fotos
4. ✓ ¡Disfruta!

### 🔧 Desarrollador (Mantenimiento)
1. RESUMEN.md (5 min)
2. ESTRUCTURA.md (20 min)
3. Revisa los archivos necesarios
4. TESTING.md para verificar

### 🏗️ Desarrollador (Extensión)
1. RESUMEN.md (5 min)
2. ARQUITECTURA.md (15 min)
3. ESTRUCTURA.md (20 min)
4. Crea el módulo nuevo
5. TESTING.md para verificar

### 🎨 Diseñador
1. README.md (10 min)
2. css/styles.css (referencia)
3. Personaliza colores y fuentes
4. TESTING.md visual

### 🧪 QA/Testing
1. TESTING.md (25 min)
2. Sigue el checklist
3. Reporta issues
4. Valida fixes

### 📚 Documentador
1. Todos los archivos .md
2. Entiende el flujo
3. Mantén documentación actualizada
4. Agrega ejemplos

---

## 🔍 Búsqueda Rápida

**¿Cómo cambio...?**

| Quiero cambiar | Archivo | Sección |
|---|---|---|
| Contenido de modales | js/modal-data.js | MODAL_DATA |
| Colores | css/styles.css | :root {} |
| Tipografía | css/styles.css | --serif, --sans |
| Estructura HTML | index.html | HTML body |
| Evento de botón | js/main.js | setupOrbButtons() |
| Animación de fuego | js/fire-particles.js | initFireParticles() |
| Lógica de modal | js/modal-system.js | showModal() |
| Funcionalidad cámara | js/camera.js | startCam() |

---

## 📞 Flujo de Soporte

```
Tengo un problema
    │
    ├─ ¿Cómo usar?
    │   └─ RESUMEN.md + README.md
    │
    ├─ ¿Cómo modificar?
    │   └─ ESTRUCTURA.md + archivo específico
    │
    ├─ ¿Por qué no funciona?
    │   └─ TESTING.md + abrir DevTools (F12)
    │
    ├─ ¿Cómo agregar feature?
    │   └─ ARQUITECTURA.md + ESTRUCTURA.md
    │
    └─ ¿Veo error en browser?
        └─ DevTools Console (F12) → buscar error
```

---

## ✅ Checklist de Lectura

### Lectura Mínima (para empezar)
- [ ] RESUMEN.md (5 min)
- [ ] Abre index.html (5 min)
- [ ] Interactúa (5 min)
- **Total: 15 minutos** ✓

### Lectura Recomendada (para entender)
- [ ] RESUMEN.md
- [ ] README.md
- [ ] ESTRUCTURA.md
- [ ] TESTING.md
- **Total: 50 minutos** ✓

### Lectura Completa (para dominar)
- [ ] Toda la documentación
- [ ] Revisa el código
- [ ] TESTING.md completo
- [ ] Haz modificaciones de prueba
- **Total: 2-3 horas** ✓

---

## 🎓 Orden de Aprendizaje Sugerido

```
Semana 1: Entender
  ├─ Lunes:  RESUMEN.md + README.md
  ├─ Martes: ESTRUCTURA.md
  └─ Miércoles: ARQUITECTURA.md

Semana 2: Practicar
  ├─ Jueves: Modifica modal-data.js
  ├─ Viernes: Personaliza css/styles.css
  └─ Sábado: Intenta agregar sección

Semana 3: Dominar
  ├─ Crea nuevo módulo
  ├─ Integra en main.js
  └─ ¡Listo para extender!
```

---

**¡Bienvenido a la documentación de Diablo Uma!** 📚

*Recuerda: La mejor forma de aprender es practicando. Abre los archivos y experimenta.*

---

*Última actualización: Junio 2024*
