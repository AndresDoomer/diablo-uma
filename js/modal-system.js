/**
 * Modal System
 * Manages opening/closing of modal dialogs
 */

import { MODAL_DATA } from './modal-data.js';
import { startCam, stopCam } from './camera.js';

export function showModal(key) {
  const data = MODAL_DATA[key];
  if (!data) return;

  document.getElementById('memoji').textContent = data.emoji;
  document.getElementById('mtag').textContent = data.tag;
  document.getElementById('mtitle').innerHTML = data.title;
  document.getElementById('mbody').innerHTML = data.html;

  const overlay = document.getElementById('overlay');
  overlay.style.display = 'flex';

  // Trigger animation
  requestAnimationFrame(() =>
    requestAnimationFrame(() => overlay.classList.add('open'))
  );

  // Start camera if it's the foto modal
  if (key === 'foto') {
    startCam();
  }
}

export function hideModal() {
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('open');

  setTimeout(() => {
    overlay.style.display = 'none';
    stopCam();
  }, 350);
}

export function closeOnBackground(event) {
  if (event.target === document.getElementById('overlay')) {
    hideModal();
  }
}

export function setupModalEvents() {
  // Close on background click
  document
    .getElementById('overlay')
    ?.addEventListener('click', closeOnBackground);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideModal();
  });

  // Close button
  document.getElementById('modal-close')?.addEventListener('click', hideModal);
}

// Make functions globally available for backwards compatibility
window.bgClose = closeOnBackground;
