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
 * Attach click handlers to the modal trigger buttons
 */
function setupOrbButtons() {
  const buttons = [
    { id: 'b-quien', modal: 'quien' },
    { id: 'b-hist', modal: 'historia' },
    { id: 'b-trad', modal: 'tradicion' },
    { id: 'b-foto', modal: 'foto' }
  ];

  buttons.forEach(({ id, modal }) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => showModal(modal));
    }
  });
}

// Make functions globally available for backwards compatibility
window.show = showModal;
window.hide = hideModal;
