(function applyConfig() {
  const config = window.SITE_CONFIG;
  if (!config) return;

  const root = document.documentElement;
  if (config.accentColor) root.style.setProperty("--accent", config.accentColor);
  if (config.primaryColor) root.style.setProperty("--primary", config.primaryColor);

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };

  const setLink = (id, url, label) => {
    const el = document.getElementById(id);
    if (!el || !url) return;
    el.href = url;
    el.classList.remove("hidden");
    if (label) el.textContent = label;
  };

  document.title = `${config.businessName} · PAGINAFREE`;
  setText("nav-business-name", config.businessName);
  setText("nav-business-type", config.businessType);
  setText("business-name", config.businessName);
  setText("footer-business", config.businessName);
  setText("hero-tagline", config.tagline);
  setText("about-text", config.about);
  setText("hero-note", config.contactNote);
  setText("whatsapp-label", config.whatsappLabel);
  setText("info-phone", config.phone);
  setText("info-address", config.address);
  setText("footer-id", String(config.userId));

  const emailLink = document.getElementById("info-email-link");
  if (emailLink && config.email) {
    emailLink.textContent = config.email;
    emailLink.href = `mailto:${config.email}`;
  }

  setLink("btn-whatsapp", config.whatsappUrl);
  setLink("footer-whatsapp", config.whatsappUrl);
  setLink("footer-email", config.email ? `mailto:${config.email}` : "");
  setLink("btn-instagram", config.instagramUrl);
  setLink("btn-tiktok", config.tiktokUrl);
  setLink("btn-facebook", config.facebookUrl);

  const servicesGrid = document.getElementById("services-grid");
  if (servicesGrid && Array.isArray(config.services)) {
    servicesGrid.innerHTML = config.services
      .map(
        (service) => `
          <article class="service-card">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
          </article>
        `
      )
      .join("");
  }

  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
