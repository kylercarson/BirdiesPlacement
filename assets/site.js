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
