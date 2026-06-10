/**
 * Main Application
 * Initializes all modules and sets up event listeners
 */

import { initFireParticles } from './fire-particles.js';
import { showModal, hideModal, setupModalEvents } from './modal-system.js';

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize fire particles effect
  initFireParticles();

  // Setup modal events
  setupModalEvents();

  // Setup orb button listeners
  setupOrbButtons();
});

/**
 * Setup Orb Button Events
 * Attach click handlers to the modal trigger buttons and AR button
 */
function setupOrbButtons() {
  const buttons = [
    { id: 'b-quien', modal: 'quien' },
    { id: 'b-hist', modal: 'historia' },
    { id: 'b-trad', modal: 'tradicion' }
  ];

  buttons.forEach(({ id, modal }) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => showModal(modal));
    }
  });

  // AR orb button: native AR on mobile, fullscreen 3D on desktop
  const arBtn = document.getElementById('b-ar');
  if (arBtn) {
    arBtn.addEventListener('click', async () => {
      const mv = document.getElementById('mv');
      const trigger = document.getElementById('ar-trigger');

      // Check if WebXR AR is supported
      const arSupported = navigator.xr && await navigator.xr.isSessionSupported('immersive-ar').catch(() => false);

      if (arSupported && trigger) {
        trigger.click();
      } else {
        // Desktop fallback: fullscreen 3D viewer
        const wrap = document.getElementById('viewer-wrap');
        if (!wrap) return;

        wrap.classList.add('ar-fullscreen');
        mv.removeAttribute('auto-rotate');
        mv.setAttribute('camera-controls', '');
        mv.setAttribute('interaction-prompt', 'none');
        mv.setAttribute('reveal', 'auto');

        const exitFs = () => {
          wrap.classList.remove('ar-fullscreen');
          mv.setAttribute('auto-rotate', '');
          mv.setAttribute('rotation-per-second', '15deg');
          const cb = document.getElementById('ar-capture');
          if (cb) cb.remove();
          const cl = document.getElementById('ar-close');
          if (cl) cl.remove();
        };

        const escHandler = (e) => {
          if (e.key === 'Escape') exitFs();
        };
        document.addEventListener('keydown', escHandler);

        const closeBtn = document.createElement('button');
        closeBtn.id = 'ar-close';
        closeBtn.innerHTML = '✕';
        closeBtn.setAttribute('aria-label', 'Cerrar');
        closeBtn.addEventListener('click', exitFs);
        wrap.appendChild(closeBtn);

        const capBtn = document.createElement('button');
        capBtn.id = 'ar-capture';
        capBtn.innerHTML = '📷';
        capBtn.setAttribute('aria-label', 'Capturar foto');
        capBtn.addEventListener('click', async () => {
          try {
            const url = await mv.toDataURL({ idealAspect: true });
            const a = document.createElement('a');
            a.download = 'diablo-uma-3d.jpg';
            a.href = url;
            a.click();
          } catch (_) {}
        });
        wrap.appendChild(capBtn);

        try {
          await wrap.requestFullscreen?.();
        } catch (_) {}

        document.addEventListener('fullscreenchange', () => {
          if (!document.fullscreenElement) exitFs();
        }, { once: true });
      }
    });
  }
}

// Make functions globally available for backwards compatibility
window.show = showModal;
window.hide = hideModal;
