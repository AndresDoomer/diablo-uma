/**
 * Camera System
 * AR-style photo: webcam background + interactive 3D model overlay
 */

let camStream = null;

export async function startCam() {
  const el = document.getElementById('camblock');
  if (!el) return;

  el.innerHTML = `
    <div id="ar-scene">
      <video id="vid" autoplay playsinline muted></video>
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
      <canvas id="cnv"></canvas>
      <img id="preview" alt="Tu foto con el Diablo Uma AR"/>
      <div id="ar-hint">Toca el modelo para moverlo · Pellizca para cambiar tamaño</div>
    </div>
    <div class="btn-row">
      <button class="pill primary" id="snap-btn" onclick="window.snapPhoto()">📷 Capturar</button>
      <button class="pill" id="dl-btn" style="display:none" onclick="window.downloadPhoto()">⬇ Descargar</button>
      <button class="pill" id="re-btn"  style="display:none" onclick="window.retryCamera()">↩ Nueva foto</button>
    </div>
    <p class="cam-note">Arrastra y pellizca el Diablo Uma para colocarlo como quieras</p>
  `;

  try {
    camStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false
    });
    document.getElementById('vid').srcObject = camStream;
  } catch (error) {
    console.error('Camera error:', error);
    el.innerHTML = `
      <p style="color:var(--primary);text-align:center;padding:24px 0;font-family:var(--sans);font-size:.85rem">
        No se pudo acceder a la cámara.<br>
        <span style="color:var(--text-muted);font-size:.75rem">Verifica los permisos del navegador.</span>
      </p>
    `;
  }
}

export function stopCam() {
  if (camStream) {
    camStream.getTracks().forEach((track) => track.stop());
    camStream = null;
  }
  const mv = document.getElementById('mv-ar');
  if (mv && mv.parentNode) mv.remove();
}

export async function snapPhoto() {
  const video = document.getElementById('vid');
  const canvas = document.getElementById('cnv');
  const preview = document.getElementById('preview');
  const mv = document.getElementById('mv-ar');

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

  // Composite model over photo
  try {
    const modelUrl = await mv.toDataURL({ idealAspect: true });
    const img = new Image();
    img.onload = () => {
      const modelW = w * 0.5;
      const modelH = (img.height / img.width) * modelW;
      const modelX = w - modelW - 12;
      const modelY = 12;

      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 24;
      ctx.drawImage(img, modelX, modelY, modelW, modelH);
      ctx.shadowBlur = 0;

      finishPhoto(ctx, canvas, w, h, preview);
    };
    img.src = modelUrl;
  } catch (e) {
    console.warn('Could not capture model:', e);
    finishPhoto(ctx, canvas, w, h, preview);
  }
}

function finishPhoto(ctx, canvas, w, h, preview) {
  // Hide video and model, show the composited preview
  document.getElementById('vid').style.display = 'none';
  const mv = document.getElementById('mv-ar');
  if (mv) mv.style.display = 'none';
  document.getElementById('ar-hint').style.display = 'none';
  const barH = 48;
  ctx.fillStyle = 'rgba(7,4,10,.72)';
  ctx.fillRect(0, h - barH, w, barH);
  ctx.font = 'bold 13px "Playfair Display",Georgia,serif';
  ctx.fillStyle = '#d4a83a';
  ctx.textAlign = 'center';
  ctx.fillText('Diablo Uma  ·  Pase del Niño  ·  Riobamba, Ecuador', w / 2, h - barH / 2 + 5);

  preview.src = canvas.toDataURL('image/jpeg', 0.92);
  preview.style.display = 'block';
  document.getElementById('snap-btn').style.display = 'none';
  document.getElementById('dl-btn').style.display = 'flex';
  document.getElementById('re-btn').style.display = 'flex';
}

export function downloadPhoto() {
  const canvas = document.getElementById('cnv');
  const a = document.createElement('a');
  a.download = 'diablo-uma-ar-riobamba.jpg';
  a.href = canvas.toDataURL('image/jpeg', 0.92);
  a.click();
}

export function retryCamera() {
  document.getElementById('preview').style.display = 'none';
  document.getElementById('vid').style.display = 'block';
  const mv = document.getElementById('mv-ar');
  if (mv) mv.style.display = 'block';
  const hint = document.getElementById('ar-hint');
  if (hint) hint.style.display = 'block';
  document.getElementById('snap-btn').style.display = 'flex';
  document.getElementById('dl-btn').style.display = 'none';
  document.getElementById('re-btn').style.display = 'none';
}
window.snapPhoto = snapPhoto;
window.downloadPhoto = downloadPhoto;
window.retryCamera = retryCamera;
