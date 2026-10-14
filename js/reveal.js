// Load-in reveals. CSS in base.css does the motion (transform + opacity only).
//   data-reveal          element fades up when it scrolls into view
//   data-reveal-stagger  its children fade up one after another
//   data-reveal-words    heading words slide up out of a mask
//   data-reveal-lines    same, line by line (inline images ride along)

// Wrap each word (and any inline image) in a mask; images are kept as they are
document.querySelectorAll('[data-reveal-words], [data-reveal-lines]').forEach(el => {
  let i = 0;
  const mask = node => {
    const outer = document.createElement('span');
    const inner = document.createElement('span');
    outer.className = 'word';
    inner.style.setProperty('--word-i', i++);
    node.replaceWith(outer);
    inner.append(node);
    outer.append(inner);
  };
  [...el.childNodes].forEach(node => {
    if (node.nodeType !== 3) return mask(node);
    const parts = node.data.split(/(\s+)/).filter(Boolean)
      .map(part => document.createTextNode(/\s/.test(part) ? ' ' : part));
    node.replaceWith(...parts);
    parts.forEach(part => part.data !== ' ' && mask(part));
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
  '[data-reveal], [data-reveal-stagger], :is([data-reveal-words], [data-reveal-lines]):not([data-reveal-stagger] > *)'
);

// Wait for web fonts (max 800ms) so text doesn't swap font mid-animation,
// then number each line (lines are only known once the font has laid out)
Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 800))]).then(() => {
  document.querySelectorAll('[data-reveal-lines]').forEach(el => {
    let line = -1, top = -Infinity;
    el.querySelectorAll('.word').forEach(word => {
      if (word.offsetTop > top + 4) { line++; top = word.offsetTop; }
      word.firstChild.style.setProperty('--word-i', line);
    });
  });
  targets.forEach(el => io.observe(el));
});
