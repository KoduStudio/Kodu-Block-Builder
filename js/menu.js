// Mobile menu: the header's "Menu" button opens the <dialog>; Close, Esc or
// tapping a link closes it. Pauses Lenis while open. CSS in css/blocks/menu.css.

const menu = document.querySelector('[data-menu]');
const openBtn = document.querySelector('[data-menu-open]');

if (menu && openBtn) {
  [...menu.querySelectorAll('.menu__nav a, .menu__contact')].forEach((el, i) => el.style.setProperty('--reveal-i', i));

  const opened = () => {
    openBtn.setAttribute('aria-expanded', 'true');
    window.lenis?.stop();
  };
  const closed = () => {
    openBtn.setAttribute('aria-expanded', 'false');
    window.lenis?.start();
  };
  const closeMenu = () => { menu.close(); closed(); };

  openBtn.addEventListener('click', () => { menu.showModal(); opened(); });
  menu.querySelector('[data-menu-close]').addEventListener('click', closeMenu);
  menu.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  menu.addEventListener('cancel', closed); // Esc
  menu.addEventListener('close', closed);  // any other way it closes

  // Close if the screen grows past mobile while open
  matchMedia('(min-width: 768px)').addEventListener('change', e => { if (e.matches && menu.open) closeMenu(); });
}
