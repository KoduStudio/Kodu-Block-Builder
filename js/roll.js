// Staggered text roll on hover (as on kodudesignlab.com).
// Splits each label into letters plus a copy underneath; CSS in base.css does the motion.
// Applies to every .btn, and to anything else marked data-roll.

const escape = ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch] || ch;
const chars = text => [...text].map((ch, i) => `<span class="char" style="--i:${i}">${escape(ch)}</span>`).join('');

document.querySelectorAll('.btn, [data-roll]').forEach(el => {
  const text = el.textContent.trim();
  (el.closest('a, button') || el).setAttribute('aria-label', text);
  el.innerHTML =
    `<span class="roll" aria-hidden="true">` +
      `<span class="roll__text">${chars(text)}</span>` +
      `<span class="roll__text roll__text--clone">${chars(text)}</span>` +
    `</span>`;
});
