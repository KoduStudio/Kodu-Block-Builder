// Dot field (as on the Tarlo site). Add data-dots to any section to turn it on;
// this adds the dot layer. The glow eases after the mouse instead of snapping,
// then settles back to a resting spot, and only runs while moving.
// Touch and reduced motion keep the still resting glow. CSS in base.css.

const dotsMotion = matchMedia('(prefers-reduced-motion: no-preference)').matches;

document.querySelectorAll('[data-dots]').forEach(el => {
  const layer = document.createElement('div');
  layer.className = 'dots';
  layer.setAttribute('aria-hidden', 'true');
  el.prepend(layer);

  if (!dotsMotion) return;

  const rest = { x: 0.5, y: 0.42 }; // resting spot (fraction of section)
  const cur = { x: 0, y: 0, g: 0.4 };
  const target = { x: 0, y: 0, g: 0.4 };
  let raf = 0;

  const paint = () => {
    el.style.setProperty('--mx', cur.x.toFixed(1) + 'px');
    el.style.setProperty('--my', cur.y.toFixed(1) + 'px');
    el.style.setProperty('--glow', cur.g.toFixed(3));
  };
  const toRest = () => {
    target.x = el.offsetWidth * rest.x;
    target.y = el.offsetHeight * rest.y;
    target.g = 0.4;
  };
  const tick = () => {
    cur.x += (target.x - cur.x) * 0.12; // follow speed: lower = floatier
    cur.y += (target.y - cur.y) * 0.12;
    cur.g += (target.g - cur.g) * 0.08;
    paint();
    const settled = Math.abs(target.x - cur.x) < 0.3 && Math.abs(target.y - cur.y) < 0.3 && Math.abs(target.g - cur.g) < 0.002;
    raf = settled ? 0 : requestAnimationFrame(tick);
  };
  const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };

  el.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    target.x = e.clientX - r.left;
    target.y = e.clientY - r.top;
    target.g = 1;
    wake();
  });
  el.addEventListener('pointerleave', () => { toRest(); wake(); });

  const init = () => { toRest(); Object.assign(cur, target); paint(); };
  addEventListener('resize', init);
  init();
});
