(function initContactForm() {
  const config = window.SITE_CONFIG || {};
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name || !data.email || !data.message) {
      status.textContent = "Completa nombre, email y mensaje.";
      status.classList.add("error");
      return;
    }

    if (config.apiUrl) {
      try {
        const response = await fetch(`${config.apiUrl.replace(/\/$/, "")}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "No se pudo enviar");

        form.reset();
        status.textContent = result.message || "Consulta enviada correctamente.";
        status.classList.add("success");
        return;
      } catch (error) {
        status.textContent = error.message || "Error al enviar. Proba por WhatsApp.";
        status.classList.add("error");
        return;
      }
    }

    if (config.whatsappUrl) {
      const text = [
        `Hola, soy ${data.name}.`,
        `Email: ${data.email}`,
        data.phone ? `Telefono: ${data.phone}` : "",
        `Consulta: ${data.message}`,
      ]
        .filter(Boolean)
        .join("\n");

      window.open(`${config.whatsappUrl}?text=${encodeURIComponent(text)}`, "_blank");
      form.reset();
      status.textContent = "Te redirigimos a WhatsApp con tu mensaje.";
      status.classList.add("success");
      return;
    }

    status.textContent = "Configura apiUrl o whatsappUrl en config.js.";
    status.classList.add("error");
  });
})();
