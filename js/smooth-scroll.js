// Lenis smooth scroll — same feel as kodudesignlab.com.
// Wheel/trackpad only; touch keeps native scrolling. Off for reduced motion.

if (window.Lenis && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
    anchors: true,
    autoRaf: true,
  });
}
