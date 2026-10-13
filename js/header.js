// Header: scrolls away as you scroll down, slides back down as soon as you
// scroll up, and settles back to normal at the top.
//   .is-pinned  slid down into view (scrolling up anywhere below the top)
//   .is-solid   blurred backdrop on, only once you're a screen height down,
//               so it never sits as a white blur over the hero
// Only toggles classes; the motion is CSS (css/blocks/header.css).

const SOLID_FROM = 1; // screen heights from the top

const siteHeader = document.querySelector('.header');

if (siteHeader) {
  let lastY = scrollY;

  addEventListener('scroll', () => {
    const y = scrollY;
    if (y <= 0 || y > lastY + 2) siteHeader.classList.remove('is-pinned'); // at the top, or scrolling down
    else if (y < lastY - 2) siteHeader.classList.add('is-pinned');        // scrolling up
    siteHeader.classList.toggle('is-solid', y >= innerHeight * SOLID_FROM);
    lastY = y;
  }, { passive: true });
}
