(function applyConfig() {
  const config = window.SITE_CONFIG;
  if (!config) return;

  const root = document.documentElement;
  if (config.accentColor) root.style.setProperty("--accent", config.accentColor);
  if (config.liveColor) root.style.setProperty("--live", config.liveColor);

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };

  document.title = `${config.streamerName} · Live TikTok`;
  setText("page-title", `${config.streamerName} · Live TikTok`);
  setText("streamer-name", config.streamerName);
  setText("hero-tagline", config.tagline);
  setText("hero-schedule", config.schedule);
  setText("topbar-game", config.gameName);
  setText("card-game", config.gameName);
  setText("btn-username", config.tiktokUsername);
  setText("project-id", `#${config.userId}`);
  setText("footer-id", String(config.userId));

  ["btn-watch", "btn-follow", "footer-link"].forEach((id) => {
    const link = document.getElementById(id);
    if (link) link.href = config.tiktokUrl;
  });
})();
