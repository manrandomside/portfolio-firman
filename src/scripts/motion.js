import Lenis from "lenis";
import "lenis/dist/lenis.css";

export const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;

// an element counts as seen once its top passes 82% of the screen height, so on phones
// the motion plays where the reader is looking instead of at the very bottom edge
const SEEN = "0px 0px -18% 0px";

// Reveal on scroll, once: sections rise with their siblings staggered, headings slide up line by line.
// Content stays visible without JS because the hidden state only applies under html.js.
export function initReveal() {
  document.querySelectorAll(".s-head h2").forEach(h => {
    h.innerHTML = [...h.childNodes].filter(n => n.textContent.trim()).map(n => `<span class="ml"><span>${n.nodeType === 3 ? n.textContent.trim() : n.outerHTML}</span></span>`).join("");
    h.classList.add("mlw");
  });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("on");
    io.unobserve(e.target);
  }), { rootMargin: SEEN });
  document.querySelectorAll(".rv").forEach(el => {
    const sib = [...el.parentElement.children].filter(c => c.classList.contains("rv"));
    el.style.setProperty("--d", sib.indexOf(el) * .12 + "s");
    io.observe(el);
  });
  document.querySelectorAll(".mlw, .marks").forEach(h => io.observe(h));
  // a thin ink line under the nav shows how far down the page the reader is
  const bar = document.querySelector(".progress");
  if (bar && !REDUCE) {
    let raf = 0;
    const set = () => { raf = 0; bar.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`; };
    addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(set); }, { passive: true });
    set();
  }
}

// Eased scrolling for mouse wheel and touch, with smooth anchor links.
// syncTouch can feel off on iOS older than 16; those phones are rare enough to accept.
let lenis = null;
export function initSmoothScroll() {
  if (REDUCE) return;
  lenis = new Lenis({ autoRaf: true, anchors: true, syncTouch: true });
  if (import.meta.env.DEV) window.lenis = lenis; // lets dev tools scroll the page
}
export const scrollToEl = el => lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth" });


// Counts a number up from 0 once it is seen; reduced motion shows the final value straight away.
export function countUp(el) {
  const to = +el.dataset.to;
  if (REDUCE) { el.textContent = to; return; }
  el.textContent = 0;
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    const t0 = performance.now(), dur = 1400;
    const tick = now => {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { rootMargin: SEEN });
  io.observe(el);
}

// Freezes the page behind an open dialog.
export function lockScroll(on) {
  if (lenis) on ? lenis.stop() : lenis.start();
  document.documentElement.style.overflow = on ? "hidden" : "";
}
