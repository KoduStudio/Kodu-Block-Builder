// Load-in reveals. CSS in base.css does the motion (transform + opacity only).
//   data-reveal          element fades up when it scrolls into view
//   data-reveal-stagger  its children fade up one after another
//   data-reveal-words    heading words slide up out of a mask

document.querySelectorAll('[data-reveal-words]').forEach(el => {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = '';
  words.forEach((word, i) => {
    const mask = document.createElement('span');
    const inner = document.createElement('span');
    mask.className = 'word';
    inner.textContent = word;
    inner.style.setProperty('--word-i', i);
    mask.append(inner);
    el.append(mask, i < words.length - 1 ? ' ' : '');
  });
});

document.querySelectorAll('[data-reveal-stagger]').forEach(el => {
  [...el.children].forEach((child, i) => child.style.setProperty('--reveal-i', i));
});

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    io.unobserve(entry.target);
  });
}, { rootMargin: '0px 0px -10% 0px' });

const targets = document.querySelectorAll(
  '[data-reveal], [data-reveal-stagger], [data-reveal-words]:not([data-reveal-stagger] > *)'
);

// Wait for web fonts (max 800ms) so text doesn't swap font mid-animation
Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 800))])
  .then(() => targets.forEach(el => io.observe(el)));
