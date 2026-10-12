// Header: scrolls away as you scroll down, slides back down (with a blurred
// backdrop) when you scroll up, and settles back to normal at the top.
// It only slides back once you're at least 1.5 screen heights down, so it
// never pops in over the hero; nearer the top it just reappears naturally.
// Only toggles a class; the motion is CSS (css/blocks/header.css).

const PIN_FROM = 1.5; // screen heights from the top

const siteHeader = document.querySelector('.header');

if (siteHeader) {
  let lastY = scrollY;

  addEventListener('scroll', () => {
    const y = scrollY;
    const farEnough = y >= innerHeight * PIN_FROM;
    if (!farEnough || y > lastY + 2) siteHeader.classList.remove('is-pinned'); // near the top, or scrolling down
    else if (y < lastY - 2) siteHeader.classList.add('is-pinned');             // scrolling up, far enough down
    lastY = y;
  }, { passive: true });
}
