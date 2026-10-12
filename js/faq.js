// FAQ accordion: smooth open/close in every browser (incl. iPhone Safari).
// Animates each <details> height with the Web Animations API, and handles the
// "one open at a time" itself so the previous answer glides shut instead of
// snapping (which made the page jump). Without JS, native <details> still works.

const FAQ_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const faqDuration = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450;

document.querySelectorAll('.faq-split__item').forEach(item => {
  const group = item.getAttribute('name');
  item.removeAttribute('name'); // we handle exclusivity, animated
  if (group) item.dataset.group = group;

  const summary = item.querySelector('summary');
  const answer = item.querySelector('.faq-split__a');

  const animate = (from, to, done) => {
    item._anim?.cancel();
    item.style.overflow = 'clip';
    const anim = item.animate({ height: [`${from}px`, `${to}px`] }, { duration: faqDuration, easing: FAQ_EASE });
    item._anim = anim;
    anim.finished
      .then(() => { item.style.overflow = ''; item._anim = null; done?.(); })
      .catch(() => {}); // cancelled: the next animation takes over
  };

  item.openSmooth = () => {
    const from = item.getBoundingClientRect().height;
    item.classList.remove('is-closing');
    item.open = true;
    item._anim?.cancel();
    animate(from, item.getBoundingClientRect().height);
    answer.animate({ opacity: [0, 1] }, { duration: faqDuration, easing: FAQ_EASE });
  };

  item.closeSmooth = () => {
    if (!item.open || item.classList.contains('is-closing')) return;
    const from = item.getBoundingClientRect().height; // may be mid-animation
    item._anim?.cancel();
    const closed = item.getBoundingClientRect().height - answer.offsetHeight; // full height minus answer
    item.classList.add('is-closing');
    animate(from, closed, () => {
      item.open = false;
      item.classList.remove('is-closing');
    });
  };

  summary.addEventListener('click', e => {
    e.preventDefault();
    if (item.open && !item.classList.contains('is-closing')) {
      item.closeSmooth();
      return;
    }
    if (item.dataset.group) {
      document.querySelectorAll(`.faq-split__item[data-group="${item.dataset.group}"]`).forEach(other => {
        if (other !== item) other.closeSmooth();
      });
    }
    item.openSmooth();
  });
});
