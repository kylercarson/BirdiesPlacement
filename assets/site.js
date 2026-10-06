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
