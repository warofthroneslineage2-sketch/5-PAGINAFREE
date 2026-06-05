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
  setText("business-name", config.businessName);
  setText("footer-business", config.businessName);
  setText("business-type", config.businessType);
  setText("hero-tagline", config.tagline);
  setText("about-text", config.about);
  setText("hero-note", config.contactNote);
  setText("whatsapp-label", config.whatsappLabel);
  setText("project-id", `#${config.userId}`);
  setText("footer-id", String(config.userId));

  setLink("btn-whatsapp", config.whatsappUrl);
  setLink("footer-whatsapp", config.whatsappUrl);
  setLink("btn-instagram", config.instagramUrl);
  setLink("btn-tiktok", config.tiktokUrl);
})();
