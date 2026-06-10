import { initFireParticles } from './fire-particles.js';
import { showModal, hideModal, setupModalEvents } from './modal-system.js';

document.addEventListener('DOMContentLoaded', () => {
  initFireParticles();
  setupModalEvents();
  setupOrbButtons();
});

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

  const arBtn = document.getElementById('b-ar');
  if (arBtn) {
    arBtn.addEventListener('click', startFullscreenAR);
  }
}

async function startFullscreenAR() {
  const body = document.body;

  // Create fullscreen AR container
  const container = document.createElement('div');
  container.id = 'ar-fullscreen-container';

  container.innerHTML = `
    <video id="ar-cam" autoplay playsinline muted></video>
    <model-viewer
      id="mv-ar"
      src="models/diablo.glb"
      alt="Diablo Uma AR"
      shadow-intensity="0.6"
      shadow-softness="0.5"
      environment-image="neutral"
      exposure="1.0"
      camera-controls
      auto-rotate
      auto-rotate-delay="0"
      rotation-per-second="12deg"
      style="--poster-color:transparent;background:transparent;width:100%;height:100%"
    ></model-viewer>
    <canvas id="ar-canvas"></canvas>
    <img id="ar-preview" style="display:none" alt="Foto AR"/>
    <div id="ar-close-btn" aria-label="Cerrar">✕</div>
    <button id="ar-capture-btn">📷</button>
    <div class="btn-row" id="ar-actions" style="display:none">
      <button class="pill" id="ar-dl-btn">⬇ Descargar</button>
      <button class="pill" id="ar-retry-btn">↩ Repetir</button>
    </div>
    <div id="ar-hint">Arrastra el modelo para moverlo · Pellizca para cambiar tamaño</div>
  `;

  body.appendChild(container);

  // Start camera
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false
    });
    document.getElementById('ar-cam').srcObject = stream;
    window._arStream = stream;
  } catch (e) {
    container.innerHTML = `<p style="color:var(--primary);text-align:center;padding:40px;font-family:var(--sans)">No se pudo acceder a la cámara.</p>`;
    return;
  }

  // Close button
  document.getElementById('ar-close-btn').addEventListener('click', () => exitAR(container));

  // Capture button
  document.getElementById('ar-capture-btn').addEventListener('click', () => captureAR());

  // Download & retry
  document.getElementById('ar-dl-btn').addEventListener('click', downloadAR);
  document.getElementById('ar-retry-btn').addEventListener('click', () => retryAR(container));
}

function exitAR(container) {
  if (window._arStream) {
    window._arStream.getTracks().forEach(t => t.stop());
    window._arStream = null;
  }
  if (container) container.remove();
}

async function captureAR() {
  const video = document.getElementById('ar-cam');
  const mv = document.getElementById('mv-ar');
  const canvas = document.getElementById('ar-canvas');
  const preview = document.getElementById('ar-preview');

  if (!video || !video.srcObject) return;

  const w = video.videoWidth || 640;
  const h = video.videoHeight || 480;
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');

  // Mirror webcam
  ctx.translate(w, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  try {
    const modelUrl = await mv.toDataURL({ idealAspect: true });
    const img = new Image();
    img.onload = () => {
      const mw = w * 0.5;
      const mh = (img.height / img.width) * mw;
      const mx = w - mw - 12;
      const my = 12;

      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 24;
      ctx.drawImage(img, mx, my, mw, mh);
      ctx.shadowBlur = 0;

      finishCapture(ctx, canvas, w, h, preview);
    };
    img.src = modelUrl;
  } catch (e) {
    finishCapture(ctx, canvas, w, h, preview);
  }
}

function finishCapture(ctx, canvas, w, h, preview) {
  const barH = 48;
  ctx.fillStyle = 'rgba(7,4,10,.72)';
  ctx.fillRect(0, h - barH, w, barH);
  ctx.font = 'bold 13px "Playfair Display",Georgia,serif';
  ctx.fillStyle = '#d4a83a';
  ctx.textAlign = 'center';
  ctx.fillText('Diablo Uma · Andres Guerrero · 097 890 6950', w / 2, h - barH / 2 + 5);

  preview.src = canvas.toDataURL('image/jpeg', 0.92);
  preview.style.display = 'block';
  document.getElementById('ar-capture-btn').style.display = 'none';
  document.getElementById('ar-actions').style.display = 'flex';
  document.getElementById('ar-cam').style.display = 'none';
  document.getElementById('mv-ar').style.display = 'none';
  document.getElementById('ar-hint').style.display = 'none';
}

function downloadAR() {
  const canvas = document.getElementById('ar-canvas');
  const a = document.createElement('a');
  a.download = 'diablo-uma-ar.jpg';
  a.href = canvas.toDataURL('image/jpeg', 0.92);
  a.click();
}

function retryAR(container) {
  document.getElementById('ar-preview').style.display = 'none';
  document.getElementById('ar-capture-btn').style.display = 'flex';
  document.getElementById('ar-actions').style.display = 'none';
  document.getElementById('ar-cam').style.display = 'block';
  document.getElementById('mv-ar').style.display = 'block';
  document.getElementById('ar-hint').style.display = 'block';
}

window.show = showModal;
window.hide = hideModal;
