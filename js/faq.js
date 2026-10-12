// FAQ accordion: smooth open/close in every browser (incl. iPhone Safari).
// Animates each <details> height with the Web Animations API, and handles the
// "one open at a time" itself so the previous answer glides shut instead of
// snapping (which made the page jump). Without JS, native <details> still works.

const ease = getComputedStyle(document.documentElement).getPropertyValue('--ease').trim();
const duration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450;
const accordions = new Map(); // <details> -> { group, close }

document.querySelectorAll('.faq-split__item').forEach(item => {
  const group = item.getAttribute('name');
  item.removeAttribute('name'); // exclusivity is handled below, animated
  const answer = item.querySelector('.faq-split__a');
  let anim = null;

  const closing = () => item.classList.contains('is-closing');

  const animateHeight = (from, to, done) => {
    item.style.overflow = 'clip';
    anim = item.animate({ height: [`${from}px`, `${to}px`] }, { duration, easing: ease });
    anim.finished
      .then(() => { item.style.overflow = ''; anim = null; done?.(); })
      .catch(() => {}); // cancelled: the next animation takes over
  };

  const open = () => {
    const from = item.getBoundingClientRect().height; // may be mid-animation
    anim?.cancel();
    item.classList.remove('is-closing');
    item.open = true;
    animateHeight(from, item.getBoundingClientRect().height);
    answer.animate({ opacity: [0, 1] }, { duration, easing: ease });
  };

  const close = () => {
    if (!item.open || closing()) return;
    const from = item.getBoundingClientRect().height; // may be mid-animation
    anim?.cancel();
    const to = item.getBoundingClientRect().height - answer.offsetHeight;
    item.classList.add('is-closing');
    animateHeight(from, to, () => {
      item.open = false;
      item.classList.remove('is-closing');
    });
  };

  accordions.set(item, { group, close });

  item.querySelector('summary').addEventListener('click', e => {
    e.preventDefault();
    if (item.open && !closing()) return close();
    if (group) accordions.forEach((a, other) => { if (other !== item && a.group === group) a.close(); });
    open();
  });
});
