// Parallax fallback for browsers without CSS scroll-driven animations (Firefox).
// Chrome, Edge, Arc and Safari 26+ use the CSS version in base.css and skip this.
// Only images on screen are updated, at most once per frame.

if (!CSS.supports('animation-timeline: view()') && matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const visible = new Set();
  let queued = false;

  const update = () => {
    queued = false;
    const vh = innerHeight;
    visible.forEach(img => {
      const r = img.parentElement.getBoundingClientRect(); // frame, so the transform doesn't feed back
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      img.style.transform = `translateY(${-8 + 16 * p}%)`;
    });
  };
  const queue = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
    queue();
  });
  document.querySelectorAll('[data-parallax] > img').forEach(img => io.observe(img));

  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
}
