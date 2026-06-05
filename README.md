# 5-PAGINAFREE

Plantilla base front + back para paginas web gratis de emprendimientos.

## Estructura

```
5-PAGINAFREE/
â”œâ”€â”€ index.html          # Frontend
â”œâ”€â”€ config.js           # Datos del cliente (editar aca)
â”œâ”€â”€ css/style.css
â”œâ”€â”€ js/main.js
â”œâ”€â”€ js/contact.js
â”œâ”€â”€ assets/images/      # Fotos del negocio
â””â”€â”€ backend/            # API de contacto
    â”œâ”€â”€ server.js
    â”œâ”€â”€ routes/contact.js
    â””â”€â”€ package.json
```

## Secciones incluidas (frontend)

- Header con menu
- Inicio (hero + WhatsApp)
- Nosotros (info del negocio)
- Servicios (lista desde config.js)
- Contacto (formulario)
- Footer

## Personalizar cliente

Edita `config.js`:

- `businessName`, `businessType`, `tagline`, `about`
- `services[]` (titulo + descripcion)
- `whatsappUrl`, `email`, `phone`, `address`
- Redes: `instagramUrl`, `tiktokUrl`, `facebookUrl`
- Colores: `accentColor`, `primaryColor`
- `apiUrl` (URL del backend cuando este desplegado)

## Frontend local

Abrir `index.html` o:

```bash
npx serve .
```

Si no hay backend, el formulario redirige a WhatsApp con el mensaje armado.

## Backend local

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Probar:

- `GET http://localhost:3000/api/health`
- `POST http://localhost:3000/api/contact`

Para conectar frontend y backend en local, en `config.js`:

```js
apiUrl: "http://localhost:3000",
```

Y levantar backend con `SERVE_FRONTEND=true` si queres todo en un solo puerto.

## Despliegue sugerido

- **Frontend**: GitHub Pages (branch `main`, carpeta root)
- **Backend**: Railway, Render o similar (carpeta `backend/`)

## GitHub Pages

Settings > Pages > branch `main` / root

