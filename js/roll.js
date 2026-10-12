// Staggered text roll on hover (as on kodudesignlab.com).
// Splits the label into letters plus a copy underneath; CSS in base.css does the motion.
// Applies to every .btn, and to anything else marked data-roll. Only the text
// label rolls, so icons inside a button are left alone.

const escapeHtml = ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch] || ch;
const chars = text => [...text].map((ch, i) => `<span class="char" style="--i:${i}">${escapeHtml(ch)}</span>`).join('');

document.querySelectorAll('.btn, [data-roll]').forEach(el => {
  const label = [...el.childNodes].find(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
  if (!label) return;
  const text = label.textContent.trim();
  (el.closest('a, button') || el).setAttribute('aria-label', text);

  const roll = document.createElement('span');
  roll.className = 'roll';
  roll.setAttribute('aria-hidden', 'true');
  roll.innerHTML =
    `<span class="roll__text">${chars(text)}</span>` +
    `<span class="roll__text roll__text--clone">${chars(text)}</span>`;
  label.replaceWith(roll);
});
