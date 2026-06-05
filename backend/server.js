require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const contactRouter = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "paginafree-backend",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/contact", contactRouter);

if (process.env.SERVE_FRONTEND === "true") {
  const frontendPath = path.join(__dirname, "..");
  app.use(express.static(frontendPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Backend PAGINAFREE en http://localhost:${PORT}`);
});
