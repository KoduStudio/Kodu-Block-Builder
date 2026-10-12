// Header: scrolls away as you scroll down, slides back down (with a blurred
// backdrop) as soon as you scroll up, and settles back to normal at the top.
// Only toggles a class; the motion is CSS (css/blocks/header.css).

const siteHeader = document.querySelector('.header');

if (siteHeader) {
  let lastY = scrollY;

  addEventListener('scroll', () => {
    const y = scrollY;
    if (y <= 0) siteHeader.classList.remove('is-pinned');          // back at the top
    else if (y < lastY - 2) siteHeader.classList.add('is-pinned');  // scrolling up
    else if (y > lastY + 2) siteHeader.classList.remove('is-pinned'); // scrolling down
    lastY = y;
  }, { passive: true });
}
