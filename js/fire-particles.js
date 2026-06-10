/**
 * Fire Particles
 * Generates animated fire particles in the background
 */

export function initFireParticles() {
  const canvas = document.getElementById('fire-canvas');
  const ctx = canvas.getContext('2d');

  let width, height;

  const resize = () => {
    canvas.width = width = innerWidth;
    canvas.height = height = innerHeight;
  };

  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['#00d4ff', '#00f0ff', '#ff006e', '#fb5607', '#a100f2', '#00ff88'];
  const PARTICLE_COUNT = 25; // Optimizado: reducido para mejor rendimiento

  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random(),
    bx: Math.random() * 0.3 - 0.15,
    y: Math.random(),
    r: Math.random() * 2.2 + 0.6,
    sp: Math.random() * 0.008 + 0.003,
    op: 0,
    phase: Math.random() * Math.PI * 2,
    col: COLORS[Math.floor(Math.random() * COLORS.length)]
  }));

  let time = 0;

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    time += 0.016;

    particles.forEach((p) => {
      p.y -= p.sp;

      if (p.y < 0) {
        p.y = 1;
        p.x = Math.random();
        p.phase = Math.random() * Math.PI * 2;
      }

      const life = p.y > 0.85 ? 0 : p.y > 0.75 ? (1 - p.y) * 10 : 1;
      const wx = p.x * width + Math.sin(time * 1.2 + p.phase) * 22;
      const wy = p.y * height;

      ctx.globalAlpha = life * 0.4;
      ctx.fillStyle = p.col;
      ctx.beginPath();
      ctx.arc(wx, wy, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  };

  draw();
}
