// Optional GA4 configuration. Set a real measurement ID after owner approval.
const measurementId = "";
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
if (/^G-[A-Z0-9]+$/.test(measurementId)) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
  const tracker = document.createElement("script");
  tracker.async = true;
  tracker.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
  document.head.appendChild(tracker);
  document.addEventListener("click", function (event) {
    const link = event.target.closest && event.target.closest('a[href^="tel:"]');
    if (link) window.gtag("event", "phone_click", { link_url: link.href, page_path: location.pathname });
  });
}

// Keep visitors on Birdie's while Formspree processes their inquiry.
const contactForm = document.getElementById("contact-form");
if (contactForm && window.fetch && window.FormData) {
  const status = document.getElementById("form-status");
  const button = contactForm.querySelector('button[type="submit"]');
  let sending = false;
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (sending || !contactForm.reportValidity()) return;
    sending = true;
    button.disabled = true;
    button.textContent = "Sending…";
    contactForm.setAttribute("aria-busy", "true");
    status.textContent = "Sending your message…";
    status.dataset.state = "pending";
    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Submission failed");
      contactForm.reset();
      status.textContent = "Thank you! Your message was sent to Birdie’s. We’ll contact you about your inquiry.";
      status.dataset.state = "success";
    } catch (error) {
      status.textContent = "We couldn’t confirm your message was sent. Your entries are still here. Please try again or call Tricia at 806-252-8877 or Sarah at 806-928-5880.";
      status.dataset.state = "error";
    } finally {
      sending = false;
      button.disabled = false;
      button.textContent = "Submit";
      contactForm.removeAttribute("aria-busy");
    }
  });
}

// Scroll reveals: content stays visible if animation is unsupported or disabled.
(() => {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motion.matches || !("IntersectionObserver" in window) ||
      !Element.prototype.animate) return;

  const active = new Map();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target;
      observer.unobserve(element);
      // Do not move an element a keyboard user is interacting with.
      if (motion.matches || element.contains(document.activeElement)) continue;
      const direction = element.dataset.revealDirection;
      const offset = direction === "left" ? "translateX(-28px)" :
        direction === "right" ? "translateX(28px)" : "translateY(26px)";
      const animation = element.animate([
        { opacity: 0, transform: offset },
        { opacity: 1, transform: "translate(0, 0)" }
      ], {
        duration: 650,
        delay: Number(element.dataset.revealDelay || 0),
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "backwards"
      });
      active.set(element, animation);
      animation.finished.catch(() => {}).finally(() => active.delete(element));
    }
  }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

  const targets = document.querySelectorAll(
    ".section-head, .hero-copy, .hero-card, .service, .step, " +
    ".grid3 > .card, .owners-bios > .card, .owners-image-wrap, " +
    ".owners-preview, .faq > details, .contact-grid > div, .cta, " +
    ".prose > h1, .prose > h2, .prose > p, .prose > ul, .prose > .hero-actions"
  );
  const height = window.innerHeight;
  for (const element of targets) {
    const parent = element.parentElement;
    const siblings = Array.from(parent.children);
    const grouped = parent.matches(".grid2, .grid3, .steps, .faq, .contact-grid, .owners-bios");
    element.dataset.revealDelay = grouped ? Math.min(siblings.indexOf(element) % 3 * 90, 180) : 0;
    element.dataset.revealDirection = element.matches(".owners-image-wrap, .hero-card") ? "right" :
      element.matches(".contact-grid > div:first-child, .owners-bios > .card") ? "left" : "up";
    // Initial content is immediately readable; reveals are for the scrolling journey.
    if (element.getBoundingClientRect().top >= height - 24) observer.observe(element);
  }
  document.addEventListener("focusin", (event) => {
    for (const [element, animation] of active) {
      if (element.contains(event.target)) animation.cancel();
    }
  });
  motion.addEventListener("change", () => {
    if (!motion.matches) return;
    observer.disconnect();
    for (const animation of active.values()) animation.cancel();
    active.clear();
  });
})();
