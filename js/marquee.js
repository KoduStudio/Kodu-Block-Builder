// Marquee: copies the first group until the track covers the screen plus one
// group, then slides by exactly one group width at a constant speed, so the
// loop is seamless on any screen size. Re-measures on width change.

const MARQUEE_SPEED = 40; // px per second

document.querySelectorAll('[data-marquee]').forEach(marquee => {
  const track = marquee.querySelector('.marquee__track');
  const group = track.querySelector('.marquee__group');

  const setup = () => {
    track.querySelectorAll('[data-clone]').forEach(c => c.remove());
    const w = group.getBoundingClientRect().width;
    if (!w) return;
    const copies = Math.ceil(innerWidth / w) + 1;
    for (let i = 0; i < copies; i++) {
      const clone = group.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.dataset.clone = '';
      track.append(clone);
    }
    track.style.setProperty('--marquee-shift', `-${w}px`);
    track.style.setProperty('--marquee-dur', `${(w / MARQUEE_SPEED).toFixed(2)}s`);
    marquee.classList.add('is-ready');
  };

  let lastW = innerWidth, timer;
  addEventListener('resize', () => {
    if (innerWidth === lastW) return; // ignore mobile address-bar height changes
    lastW = innerWidth;
    clearTimeout(timer);
    timer = setTimeout(setup, 150);
  });

  document.fonts.ready.then(setup);
});
