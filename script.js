/**
 * Narayani Traders — site scripts
 * Form validation, smooth anchors, small UX helpers
 */

(function () {
  "use strict";

  var PHONE_E164 = "919763329439";
  var WHATSAPP_BASE = "https://wa.me/" + PHONE_E164;

  /** One fixed message for every WhatsApp enquiry (navbar, float, products, mobile bar). */
  var DEFAULT_WHATSAPP_MESSAGE =
    "नमस्कार! मला नारायणी ट्रेडर्स मध्ये उत्पादनांबद्दल चौकशी करायची आहे. कृपया माहिती द्या.";

  function openWhatsApp(message) {
    var url = WHATSAPP_BASE;
    if (message) {
      url += "?text=" + encodeURIComponent(message);
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openWhatsApp(DEFAULT_WHATSAPP_MESSAGE);
    });
  });

  /**
   * Contact form validation + mailto fallback (static site)
   */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      contactForm.classList.add("was-validated");

      if (!contactForm.checkValidity()) {
        return;
      }

      var name = document.getElementById("contactName");
      var phone = document.getElementById("contactPhone");
      var email = document.getElementById("contactEmail");
      var subject = document.getElementById("contactSubject");
      var message = document.getElementById("contactMessage");

      var body =
        "Name: " +
        (name && name.value) +
        "\nPhone: " +
        (phone && phone.value) +
        "\nEmail: " +
        (email && email.value) +
        "\n\n" +
        (message && message.value);

      var mailto =
        "mailto:narayani.plastic7796@gmail.com?subject=" +
        encodeURIComponent((subject && subject.value) || "Inquiry from website") +
        "&body=" +
        encodeURIComponent(body);

      window.location.href = mailto;
    });
  }

  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /** Product “चौकशी” uses the same WhatsApp message as everywhere else. */
  document.querySelectorAll("[data-inquiry-product]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openWhatsApp(DEFAULT_WHATSAPP_MESSAGE);
    });
  });
})();
