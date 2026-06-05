const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();
const dataDir = path.join(__dirname, "..", "data");
const dataFile = path.join(dataDir, "contacts.json");

async function saveContact(entry) {
  await fs.mkdir(dataDir, { recursive: true });

  let contacts = [];
  try {
    const raw = await fs.readFile(dataFile, "utf8");
    contacts = JSON.parse(raw);
  } catch {
    contacts = [];
  }

  contacts.push(entry);
  await fs.writeFile(dataFile, JSON.stringify(contacts, null, 2), "utf8");
}

router.post("/", async (req, res) => {
  const { name, email, phone = "", message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan campos obligatorios: name, email, message" });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
  if (!emailOk) {
    return res.status(400).json({ error: "Email invalido" });
  }

  const entry = {
    id: Date.now(),
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    await saveContact(entry);
    return res.status(201).json({
      ok: true,
      message: "Consulta recibida. Te contactaremos pronto.",
      id: entry.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "No se pudo guardar la consulta" });
  }
});

module.exports = router;
