/**
 * Camera System
 * AR-style photo/video: webcam background + interactive 3D model overlay
 */

let camStream = null;
let recording = false;
let recorder = null;
let recorderChunks = [];
let recordCanvas = null;
let recordCtx = null;
let rafId = null;
let modelImgCache = null;

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
      <div id="rec-indicator"><span class="rec-dot"></span> Grabando</div>
      <video id="vid-preview" controls style="display:none;width:100%;border-radius:16px;z-index:10;position:absolute;inset:0;background:#000"></video>
      <div id="ar-hint">Toca el modelo para moverlo · Pellizca para cambiar tamaño</div>
    </div>
    <div class="btn-row">
      <button class="pill primary" id="snap-btn">📷 Capturar</button>
      <button class="pill" id="dl-btn" style="display:none" onclick="window.downloadPhoto()">⬇ Descargar foto</button>
      <button class="pill" id="dlv-btn" style="display:none" onclick="window.downloadVideo()">⬇ Descargar video</button>
      <button class="pill" id="re-btn"  style="display:none" onclick="window.retryCamera()">↩ Nueva toma</button>
    </div>
    <p class="cam-note">Toca para foto · Mantén presionado para grabar video</p>
  `;

  // Show native AR button if supported
  (async () => {
    const nativeBtn = document.getElementById('native-ar-btn');
    if (nativeBtn) {
      const arOk = navigator.xr && await navigator.xr.isSessionSupported('immersive-ar').catch(() => false);
      if (arOk) nativeBtn.style.display = 'block';
    }
  })();

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

  // Long-press for video recording
  const snapBtn = document.getElementById('snap-btn');
  if (snapBtn) {
    let holdTimer = null;
    let isHolding = false;

    const startHold = (e) => {
      if (recording) return;
      e.preventDefault();
      isHolding = false;
      holdTimer = setTimeout(async () => {
        isHolding = true;
        await startRecording();
      }, 400);
    };

    const endHold = (e) => {
      if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
      if (isHolding) {
        isHolding = false;
        if (recording) stopRecording();
      } else if (!recording) {
        snapPhoto();
      }
    };

    snapBtn.addEventListener('pointerdown', startHold);
    snapBtn.addEventListener('pointerup', endHold);
    snapBtn.addEventListener('pointerleave', endHold);
  }
}

function startRecording() {
  const video = document.getElementById('vid');
  const mv = document.getElementById('mv-ar');
  if (!video || !video.srcObject || !mv) return;

  const w = video.videoWidth || 640;
  const h = video.videoHeight || 480;

  recordCanvas = document.getElementById('cnv');
  recordCanvas.width = w;
  recordCanvas.height = h;
  recordCtx = recordCanvas.getContext('2d');

  // Cache model screenshot once at start of recording
  modelImgCache = null;
  mv.toDataURL({ idealAspect: true }).then(url => {
    const img = new Image();
    img.onload = () => { modelImgCache = img; };
    img.src = url;
  }).catch(() => {});

  // Start compositing loop
  recording = true;
  recorderChunks = [];
  document.getElementById('rec-indicator').classList.add('active');
  document.getElementById('snap-btn').textContent = '⏹ Detener';

  const stream = recordCanvas.captureStream(15);
  recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  recorder.ondataavailable = (e) => { if (e.data.size > 0) recorderChunks.push(e.data); };
  recorder.start();

  let modelStamp = 0;
  function composite() {
    if (!recording) return;
    const v = document.getElementById('vid');
    if (!v || !v.videoWidth) { rafId = requestAnimationFrame(composite); return; }

    // Re-cache model every 500ms to catch user interactions
    const now = Date.now();
    if (now - modelStamp > 500 && mv) {
      modelStamp = now;
      mv.toDataURL({ idealAspect: true }).then(url => {
        const img = new Image();
        img.onload = () => { modelImgCache = img; };
        img.src = url;
      }).catch(() => {});
    }

    recordCtx.setTransform(1, 0, 0, 1, 0, 0);
    recordCtx.clearRect(0, 0, w, h);

    // Mirror webcam
    recordCtx.translate(w, 0);
    recordCtx.scale(-1, 1);
    recordCtx.drawImage(v, 0, 0);
    recordCtx.setTransform(1, 0, 0, 1, 0, 0);

    // Overlay model
    if (modelImgCache) {
      const mw = w * 0.5;
      const mh = (modelImgCache.height / modelImgCache.width) * mw;
      const mx = w - mw - 12;
      const my = 12;
      recordCtx.shadowColor = 'rgba(0,0,0,0.5)';
      recordCtx.shadowBlur = 24;
      recordCtx.drawImage(modelImgCache, mx, my, mw, mh);
      recordCtx.shadowBlur = 0;
    }

    // Watermark
    const barH = 32;
    recordCtx.fillStyle = 'rgba(7,4,10,.6)';
    recordCtx.fillRect(0, h - barH, w, barH);
    recordCtx.font = 'bold 11px "Playfair Display",Georgia,serif';
    recordCtx.fillStyle = '#d4a83a';
    recordCtx.textAlign = 'center';
    recordCtx.fillText('Diablo Uma · Andres Guerrero · 097 890 6950', w / 2, h - barH / 2 + 4);

    rafId = requestAnimationFrame(composite);
  }
  rafId = requestAnimationFrame(composite);
}

function stopRecording() {
  recording = false;
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  if (recorder && recorder.state !== 'inactive') {
    recorder.stop();
    recorder.onstop = () => {
      const blob = new Blob(recorderChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const preview = document.getElementById('vid-preview');
      preview.src = url;
      preview.style.display = 'block';
      window._recordingBlob = blob;
      document.getElementById('rec-indicator').classList.remove('active');
      document.getElementById('snap-btn').style.display = 'none';
      document.getElementById('dlv-btn').style.display = 'flex';
      document.getElementById('re-btn').style.display = 'flex';
      // Hide camera/modal
      const vid = document.getElementById('vid');
      if (vid) vid.style.display = 'none';
      const mv = document.getElementById('mv-ar');
      if (mv) mv.style.display = 'none';
      const hint = document.getElementById('ar-hint');
      if (hint) hint.style.display = 'none';
    };
  }
  document.getElementById('snap-btn').textContent = '📷 Capturar';
}

export function stopCam() {
  recording = false;
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  if (recorder && recorder.state !== 'inactive') {
    try { recorder.stop(); } catch (_) {}
  }
  if (camStream) {
    camStream.getTracks().forEach((track) => track.stop());
    camStream = null;
  }
  const mv = document.getElementById('mv-ar');
  if (mv && mv.parentNode) mv.remove();
  modelImgCache = null;
}

export async function snapPhoto() {
  const video = document.getElementById('vid');
  const canvas = document.getElementById('cnv');
  const preview = document.getElementById('vid-preview');
  const mv = document.getElementById('mv-ar');

  if (!video || !video.srcObject) return;

  const w = video.videoWidth || 640;
  const h = video.videoHeight || 480;
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');

  ctx.translate(w, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

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

      finishPhoto(ctx, canvas, w, h);
    };
    img.src = modelUrl;
  } catch (e) {
    finishPhoto(ctx, canvas, w, h);
  }
}

function finishPhoto(ctx, canvas, w, h) {
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
  ctx.fillText('Diablo Uma · Andres Guerrero · 097 890 6950', w / 2, h - barH / 2 + 5);

  const preview = document.getElementById('vid-preview');
  preview.src = canvas.toDataURL('image/jpeg', 0.92);
  preview.style.display = 'block';
  document.getElementById('snap-btn').style.display = 'none';
  document.getElementById('dl-btn').style.display = 'flex';
  document.getElementById('re-btn').style.display = 'flex';
}

export function downloadPhoto() {
  const canvas = document.getElementById('cnv');
  const a = document.createElement('a');
  a.download = 'diablo-uma-ar.jpg';
  a.href = canvas.toDataURL('image/jpeg', 0.92);
  a.click();
}

export function downloadVideo() {
  const blob = window._recordingBlob;
  if (!blob) return;
  const a = document.createElement('a');
  a.download = 'diablo-uma-ar.webm';
  a.href = URL.createObjectURL(blob);
  a.click();
}

export function retryCamera() {
  document.getElementById('vid-preview').style.display = 'none';
  document.getElementById('vid').style.display = 'block';
  const mv = document.getElementById('mv-ar');
  if (mv) mv.style.display = 'block';
  const hint = document.getElementById('ar-hint');
  if (hint) hint.style.display = 'block';
  document.getElementById('snap-btn').style.display = 'flex';
  document.getElementById('dl-btn').style.display = 'none';
  document.getElementById('dlv-btn').style.display = 'none';
  document.getElementById('re-btn').style.display = 'none';
  window._recordingBlob = null;
}
window.snapPhoto = snapPhoto;
window.downloadPhoto = downloadPhoto;
window.downloadVideo = downloadVideo;
window.retryCamera = retryCamera;
