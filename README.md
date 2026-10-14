# PROMOSTORE — Landing page de artículos promocionales

Landing page premium para una empresa de **artículos promocionales personalizados**.
Construida con **HTML, CSS y JavaScript vanilla** (sin frameworks ni build). Diseño
**claro y luminoso** (poco azul oscuro), responsive, accesible y orientado a conversión.

> El nombre **PROMOSTORE**, los textos y las marcas son de ejemplo. Cámbialos por los
> de tu empresa. **Tú colocas las imágenes** de tus productos en los slots previstos.

## Estructura del proyecto

```
prueba-tecnica/
├── index.html            # Página única (versión actual)
├── css/
│   └── styles.css        # Estilos (tokens, componentes, responsive)
├── js/
│   └── main.js           # Interacciones (nav, carrusel, formulario)
├── img/                  # Imágenes de EJEMPLO (claras) — reemplázalas por las tuyas
│   ├── logo.svg              # Logotipo (monograma "P"), también favicon
│   ├── hero-1…4.svg          # Collage del hero (derecha)
│   ├── relleno-promostore.svg# Imagen que RELLENA las letras PROMOSTORE
│   ├── beneficio-1…4.svg     # Imagen de cada tarjeta de Beneficios
│   └── persona.svg           # Persona de cuerpo completo (Contacto, izquierda)
├── README.md             # Este archivo
└── GUIA-UX-UI.md         # Guía de diseño, heurísticas y sugerencias
```

> Las imágenes incluidas son **placeholders ligeros en tonos claros** para que el
> sitio se vea completo. Reemplázalas por tus fotos reales (ver abajo). Avatares,
> marcas y el mosaico del catálogo usan **iniciales, texto e iconos**.

## Cómo ver el sitio

No requiere instalación ni compilación. Abre `index.html` en el navegador, o levanta
un servidor local (recomendado):

```bash
python3 -m http.server 8080
# o la extensión "Live Server" de VS Code -> botón "Go Live"
```

Luego visita `http://localhost:8080`.

## Secciones de la página

| Sección             | Ancla        | Propósito                                                         |
| ------------------- | ------------ | ----------------------------------------------------------------- |
| Hero                | `#inicio`    | Texto a la izquierda + **collage de imágenes a la derecha**.      |
| Producto destacado  | `#producto`  | Letras **PROMOSTORE rellenas con tus imágenes** (recorte al texto).|
| Catálogo            | `#catalogo`  | **Carrusel** de categorías (termos, tecnología, escritura…).      |
| Beneficios          | `#beneficios`| Cuatro tarjetas con **imagen arriba + texto abajo**.              |
| Clientes            | `#clientes`  | Marcas + **puntuación 5 estrellas** y testimonios.                |
| Contacto            | `#contacto`  | **Persona (izquierda) + formulario (derecha)**, botón full-width. |
| Pie de página       | —            | Enlaces, redes y aviso legal (neutro oscuro).                     |

## Dónde colocar tus imágenes

El sitio está pensado para que agregues tus fotos con cambios mínimos. Cada zona
tiene un placeholder claro y un comentario en el HTML indicando qué reemplazar:

1. **Hero (derecha)** — 4 imágenes de producto en collage. Reemplaza los `src`:
   `img/hero-1.svg` … `img/hero-4.svg` (o apunta a tus archivos).

2. **Producto destacado** — las letras **PROMOSTORE** se rellenan con una imagen
   mediante `background-clip: text`. Edita la imagen de relleno en
   `css/styles.css` (`.showcase__word { background-image: … }`) o sustituye
   `img/relleno-promostore.svg` por un collage horizontal de tus productos
   (recomendado ~1600×360 px).

3. **Beneficios** — cada tarjeta lleva una imagen arriba. Reemplaza
   `img/beneficio-1.svg` … `img/beneficio-4.svg` por imágenes que representen cada
   beneficio (calidad, entregas, personalización, asesoría).

4. **Contacto (izquierda)** — la foto de una persona de cuerpo completo. Reemplaza
   `img/persona.svg` (formato vertical, ~3:4).

5. **Catálogo (carrusel)** — cada `.carousel__media` trae un icono. Sustitúyelo por
   tu foto: `<img src="img/termo.jpg" alt="…" width="800" height="600" />`.

6. **Logotipo** — reemplaza `img/logo.svg` o edita el texto `PROMO<em>STORE</em>`.

**Recomendaciones**: usa `.webp` o `.jpg` optimizados, añade `width`/`height` para
evitar saltos de layout (CLS) y nombres de archivo claros.

## Funcionalidades (JavaScript)

- **Carrusel accesible**: botones, puntos, teclado (flechas) y gestos táctiles;
  autoplay que respeta `prefers-reduced-motion` y se pausa al interactuar.
- **Menú móvil**: `aria-expanded`, cierre con `Escape` y clic fuera.
- **Formulario**: validación por campo con mensajes accesibles (`aria-invalid` +
  `role="alert"`), trampa anti-spam (honeypot) y estado de envío. El botón de envío
  ocupa el **ancho completo** de la tarjeta.
- **Encabezado** con sombra al hacer scroll y **año dinámico** en el pie.

### Conectar el formulario a un backend real

La función `sendForm()` de `js/main.js` simula el envío. Reemplázala por una petición
real, por ejemplo:

```js
async function sendForm() {
  const data = Object.fromEntries(new FormData(form));
  const response = await fetch('/api/contacto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  // Muestra el mensaje de éxito o error según la respuesta
}
```

## Decisiones de diseño (resumen)

- **Paleta clara**: blancos y azules suaves; el azul `#2C4596` solo como acento. El
  único bloque oscuro es el pie de página en neutro carbón.
- **Tipografía única** (*Inter*) también en el logotipo (sans, bicolor).
- **Formas uniformes**: radios consistentes, sin recortes (`clip-path`) por sección.
- **Marca de agua transparente** "PROMOSTORE" como gesto premium en la sección de
  producto.

## Calidad y buenas prácticas aplicadas

- **HTML semántico**: `header`, `main`, `section`, `nav`, `footer`, `figure`,
  `blockquote`, jerarquía correcta de encabezados (un solo `h1`).
- **Accesibilidad (WCAG 2.1 AA)**: enlace "saltar al contenido", foco visible,
  `alt`/`aria-hidden` correctos, regiones `aria`, contraste AA y `prefers-reduced-motion`.
- **CSS**: variables de diseño, mobile-first, sin `!important` innecesarios y
  utilidades reutilizables (`.container`, `.btn`, `.visually-hidden`).
- **JS**: modular, en modo estricto, sin dependencias, eventos `passive` y sin
  variables globales.

## Navegadores soportados

Navegadores modernos con soporte de CSS Grid, variables CSS e `IntersectionObserver`
(Chrome, Edge, Firefox, Safari actuales).

## Roadmap sugerido

- Conectar el formulario a un CRM o correo transaccional (SendGrid, Mailgun, HubSpot).
- Añadir FAQ, botón flotante de WhatsApp y sección "Cómo trabajamos".
- Incorporar analítica y eventos de conversión (GA4, Meta Pixel).
- Optimizar las fotos reales a WebP/AVIF con `srcset`.

Para el detalle de decisiones de diseño y las heurísticas aplicadas, consulta
[`GUIA-UX-UI.md`](GUIA-UX-UI.md).
