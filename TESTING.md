# 🧪 Guía de Testing

## Verificación Rápida

### 1. Abre `index.html` en navegador
```
Espera a que cargue la página
Deberías ver:
  ✓ Fuego animado de fondo
  ✓ Header con título "Diablo Uma"
  ✓ Modelo 3D circular (Sketchfab) en el centro
  ✓ 4 botones orb alrededor
  ✓ Botón "Ver en Realidad Aumentada" abajo derecha
  ✓ Footer con información
```

## Testing de Módulos

### 📍 Fire Particles
```
✓ Verifica: Animación de partículas en fondo
✓ Cómo: Observa el fondo debe tener glows naranja/dorados
✓ Responsivo: Redimensiona ventana → debe reajustarse
```

### 📍 Modal System
```
Haz click en botón "¿Quién soy?" (ojo)
  ✓ Modal debe aparecer con efecto entrada
  ✓ Muestra emoji 👁️
  ✓ Muestra título "¿Quién soy?"
  ✓ Muestra contenido de texto
  ✓ Botón X en esquina funciona
  ✓ Presiona Escape → cierra
  ✓ Click en fondo gris → cierra
  ✓ Animación de salida suave

Repite con otros 3 botones:
  - 📖 "Mi historia"
  - 🏛️ "Tradición"
  - 📸 "Tomar foto"
```

### 📍 Camera Module
```
Haz click en "Tomar foto"
  ✓ Modal se abre
  ✓ Pide permiso de cámara
  ✓ Video en vivo aparece
  
Haz click "Capturar"
  ✓ Foto se congela
  ✓ Preview muestra tu foto
  ✓ Footer dorado con "Diablo Uma..."
  
Haz click "Descargar"
  ✓ Archivo "diablo-uma-riobamba.jpg" descarga
  
Haz click "Nueva foto"
  ✓ Vuelve a video en vivo
```

### 📍 AR Button
```
En dispositivo con soporte AR (móvil):
  ✓ Botón "Ver en Realidad Aumentada" funciona
  ✓ Abre vista AR
  ✓ Muestra modelo en espacio real
```

## Testing de Responsividad

### Desktop (1920x1080)
```
✓ Layout completo visible
✓ Texto legible
✓ Botones en posiciones correctas
```

### Tablet (768px)
```
✓ Modelo 3D se ajusta
✓ Botones orb reposicionados
✓ Modal cabe en pantalla
```

### Móvil (375px)
```
✓ Diseño stack vertical
✓ Modal toma 100% ancho con padding
✓ Botones orb más pequeños
✓ Cámara funciona en retrato
```

## Testing de Accesibilidad

### Navegación por Teclado
```
✓ Tab → selecciona botones
✓ Enter → activa botón
✓ Escape → cierra modal
```

### Screen Reader (NVDA/JAWS/VoiceOver)
```
✓ Header se lee como título
✓ Botones tienen labels descriptivos
✓ Modal tiene role="dialog"
✓ Contenido se lee en orden lógico
```

### Contraste
```
✓ Oro sobre negro: ✓ Pass WCAG AAA
✓ Crema sobre negro: ✓ Pass WCAG AAA
```

## Testing de Performance

### Carga Inicial
```
Abre DevTools → Network
✓ index.html: <100ms
✓ styles.css: <50ms
✓ main.js: <50ms
✓ Otros modulos: lazy-loaded
```

### Animaciones
```
Abre DevTools → Performance
✓ Fire particles: 60 FPS
✓ Modal transitions: 60 FPS
✓ Modelo 3D: 30-60 FPS
```

### Memoria
```
✓ Sin memory leaks
✓ stopCam() libera recursos
✓ Closing modal limpia listeners
```

## Testing de Contenido

### Modal "¿Quién soy?"
```
✓ Muestra 4 párrafos
✓ Contiene palabras clave:
  - "Diablo Uma"
  - "kichwa"
  - "máscara de lata"
  - "celebración"
```

### Modal "Mi historia"
```
✓ Muestra contexto colonial
✓ Menciona "resistencia cultural"
✓ Habla de "hojalate"
✓ Cita "Patrimonio Cultural Inmaterial"
```

### Modal "Tradición"
```
✓ Dice "Pase del Niño"
✓ Menciona "Riobamba"
✓ Habla de "artesanía"
```

## Testing Cruzado de Navegadores

| Navegador | Modal | 3D | AR | Cámara | Fire |
|-----------|-------|----|----|--------|------|
| Chrome | ✓ | ✓ | ✓ | ✓ | ✓ |
| Firefox | ✓ | ✓ | ✗ | ✓ | ✓ |
| Safari | ✓ | ✓ | ✓ | ✓ | ✓ |
| Edge | ✓ | ✓ | ✓ | ✓ | ✓ |

## Testing de Privacidad

### Cámara
```
✓ Abre DevTools → Network
✓ Toma foto
✓ Descarga archivo
✓ VERIFICAR: No hay POST requests
✓ Confirmar: Archivo está local
```

### localStorage
```
Abre DevTools → Application → localStorage
✓ No debe haber datos guardados
✓ GDPR compliant
```

## Checklist Final

```
FUNCIONALIDAD
  ☐ Fire particles animando
  ☐ Todos los 4 modales abren/cierran
  ☐ Cámara funciona
  ☐ AR button visible (si soportado)
  ☐ Contenido visible en todos los modales
  ☐ Botón X funciona
  ☐ Escape funciona
  ☐ Click fondo funciona

VISUAL
  ☐ Colores correctos (oro, crema, negro)
  ☐ Fuentes se ven bien (Playfair Display + Inter)
  ☐ Glows y sombras presentes
  ☐ Anillos rotando
  ☐ Transiciones suaves

RESPONSIVIDAD
  ☐ Funciona en desktop
  ☐ Funciona en tablet
  ☐ Funciona en móvil
  ☐ Orientación vertical
  ☐ Orientación horizontal

ACCESIBILIDAD
  ☐ Navegable por teclado
  ☐ Labels descriptivos
  ☐ Contraste suficiente
  ☐ Semántica HTML correcta

PERFORMANCE
  ☐ Carga rápido
  ☐ Animaciones smooth
  ☐ Sin lag
  ☐ Sin memory leaks

CALIDAD DE CÓDIGO
  ☐ No hay errores en console
  ☐ No hay warnings
  ☐ Módulos se importan correctamente
  ☐ Event listeners se limpian
```

## Herramientas de Testing

### Validación HTML
```bash
https://validator.w3.org/
# Sube index.html
```

### Validación CSS
```bash
https://jigsaw.w3.org/css-validator/
# Sube css/styles.css
```

### Análisis de Performance
```
DevTools → Lighthouse → Generate report
```

### Accesibilidad
```
DevTools → Lighthouse → Accesibilidad
# O usa: WAVE (web.dev/measure)
```

---

**Tip:** Si todo en este checklist pasa ✓, ¡tu página está lista para producción! 🚀
