# Guía de diseño UX/UI — PROMOSTORE

Documento de referencia con las decisiones de diseño, la aplicación de las
**10 heurísticas de usabilidad de Jakob Nielsen**, los **principios de diseño de
Don Norman**, el sistema de color/tipografía y sugerencias de mejora.

> **Última revisión:** **paleta clara** (se reduce el azul oscuro), header con logo
> **sans bicolor**, **hero** con texto + collage de imágenes a la derecha, sección
> **"Producto destacado"** con las letras **PROMOSTORE rellenas de tus imágenes**
> (`background-clip: text`), **beneficios** con imagen + texto (sin iconos),
> **contacto** con foto de persona a la izquierda y formulario a la derecha (botón a
> ancho completo), y **formas uniformes** (sin recortes en todas las secciones).

---

## 1. Principios de diseño

- **Claro y luminoso**: predominan blancos y azules suaves; el color de marca se
  usa como acento, no como fondo dominante.
- **Mobile-first**: layout base de una columna; se enriquece a partir de 640 px y
  900 px.
- **Orientado a conversión**: cada sección conduce al formulario mediante CTA
  visibles y consistentes.
- **Formas contenidas**: radios uniformes; sin `clip-path` repetido en cada sección.
- **Accesible por defecto**: contraste AA, foco visible, teclado y
  `prefers-reduced-motion`.

---

## 2. Sistema de color

El azul `#2C4596` es el color de marca y se aplica como **acento** (botones,
enlaces, foco). Las superficies son claras; el único bloque oscuro es el pie de
página en un **neutro carbón** (no azul marino).

| Token          | Hex       | Uso principal                                  |
| -------------- | --------- | ---------------------------------------------- |
| `--azul-600`   | `#2C4596` | **Color base de marca** (botones, enlaces, foco). |
| `--azul-500`   | `#3a58b8` | Hover de botones primarios.                    |
| `--azul-400`   | `#5b78d6` | Iconos, foco.                                  |
| `--azul-200`   | `#c3cff5` | Contorno de la marca de agua, bordes suaves.   |
| `--azul-100`   | `#e8edfb` | Etiquetas, fondos suaves.                      |
| `--azul-50`    | `#f2f5fd` | Fondos de sección muy claros.                  |
| `--tinta`      | `#1c2130` | Texto principal (neutro, no azulado).          |
| `--gris-600`   | `#5b6270` | Texto secundario.                              |
| `--gris-200`   | `#e6e9f0` | Bordes.                                        |
| `--gris-100`   | `#f6f7fb` | Fondos de tarjeta claros.                      |
| `--blanco`     | `#ffffff` | Fondo base.                                    |
| `--oro`        | `#c9a227` | Estrellas de puntuación y microdetalles.       |
| `--carbon`     | `#15171c` | Pie de página (neutro oscuro, **no azul**).    |

> **Contraste**: azul 600 sobre blanco ≈ 7:1 (AA/AAA). Tinta sobre blanco ≈ 14:1.
> El dorado se usa solo como detalle gráfico, nunca para texto de lectura.

## 3. Tipografía y escala

- **Una sola familia sans** (*Inter*) para texto, titulares y logotipo: transmite
  modernidad y limpieza (se eliminó la serif del header).
- **Logotipo**: Inter 800, bicolor (`PROMO` en azul 600 + `STORE` en tinta).
- Escala fluida con `clamp()` en titulares; `letter-spacing` negativo sutil en
  títulos grandes.
- Interlineado 1.65 en párrafos.

## 4. Espaciado y forma

- Escala de espaciado en múltiplos de 4 px (`--esp-1` … `--esp-9`).
- **Radios uniformes**: `0.625rem` (campos), `1rem` (tarjetas), `1.5rem` (bloques),
  `999px` (píldoras/botones). No se usan esquinas asimétricas ni recortes por sección.
- Sombras suaves; halo azul en el botón primario.

---

## 5. Componentes clave

### 5.1 Header
Fondo blanco translúcido con desenfoque, borde inferior sutil y enlaces en gris
que pasan a azul con subrayado animado. El logotipo es texto (sans, bicolor), no
una imagen, por lo que escala y se lee mejor.

### 5.2 Hero (texto + collage de imágenes)
Dos columnas: a la izquierda el texto (titular, promesa, CTA y señales de
confianza) y a la **derecha un collage de 4 imágenes** en cuadrícula 2×2 con un
leve desplazamiento vertical para dar dinamismo. Cada imagen es un slot que
reemplazas por tus fotos (`img/hero-1…4`). En móvil el collage se apila bajo el
texto.

### 5.3 Producto destacado (letras rellenas con tu imagen)
La palabra **PROMOSTORE** llena el panel y se **rellena con tu(s) imagen(es)**
mediante `background-clip: text` + `color: transparent`: el fondo
(`img/relleno-promostore.svg`) solo se ve **dentro** de las letras. Un fino contorno
(`-webkit-text-stroke`) las perfila. Sustituye esa imagen por un collage de tus
productos y la marca se dibujará con ellos. Incluye `@supports` *fallback* (texto
azul) por si el navegador no soporta el recorte.

### 5.4 Carrusel de catálogo
Mosaico claro con un **icono** por categoría (termo, cargador, libreta, bolígrafo);
cada mosaico es un slot para tu `<img>`. Navegación por botones, puntos, teclado y
gestos; autoplay que respeta `prefers-reduced-motion`.

### 5.5 Beneficios (imagen + texto)
Tarjetas **sin icono**: **imagen arriba (16:10) + texto abajo**. La imagen escala
suavemente al pasar el cursor, de modo que destacan tanto la imagen como el texto.
Cada tarjeta usa una imagen tuya (`img/beneficio-1…4`) que represente el beneficio.

### 5.6 Testimonios
Marcas en píldoras de texto, puntuación con estrellas doradas y tarjetas con
**avatar de iniciales** (sin fotos). Cada avatar usa un color distinto.

### 5.7 Contacto (persona + formulario)
Dos columnas: a la **izquierda**, el espacio para una **foto de persona de cuerpo
completo** (`img/persona.svg`, ~3:4) con los datos de contacto debajo; a la
**derecha**, la tarjeta del formulario. Esta mantiene la franja superior en
degradado, campos en dos columnas y el **botón "Enviar solicitud" a ancho
completo**. Validación accesible por campo y trampa anti-spam (honeypot).

---

## 6. Heurísticas de Nielsen aplicadas

| # | Heurística | Cómo se aplica en la página |
| - | ---------- | --------------------------- |
| 1 | **Visibilidad del estado del sistema** | Enlace activo subrayado; encabezado con sombra al hacer scroll; carrusel con puntos que marcan la posición; botón que muestra "Enviando…" y mensaje de estado. |
| 2 | **Relación con el mundo real** | Lenguaje del cliente y metáforas claras en lugar de jerga técnica. |
| 3 | **Control y libertad** | Menú móvil que cierra con `Escape` y clic fuera; carrusel navegable en ambas direcciones; campos editables y revalidados. |
| 4 | **Consistencia y estándares** | Un único sistema de botones, radios uniformes y patrones repetidos en todas las secciones. |
| 5 | **Prevención de errores** | Campos con `type` adecuado (`email`, `tel`), etiquetas visibles, validación al salir del campo y campo trampa anti-spam. |
| 6 | **Reconocer antes que recordar** | Navegación siempre visible; etiquetas sobre los inputs; ayudas ("Cuéntanos cantidades…"). |
| 7 | **Flexibilidad y eficiencia** | CTA repetidos, carrusel con teclado/gestos y enlaces de salto. |
| 8 | **Diseño estético y minimalista** | Fondos claros, mucho aire, una marca de agua como único gesto decorativo. |
| 9 | **Ayuda a reconocer y recuperarse de errores** | Mensajes específicos junto al campo (`role="alert"`, `aria-invalid`); el foco va al primer campo con error. |
| 10 | **Ayuda y documentación** | Datos de contacto visibles, sección de beneficios que resuelve dudas y esta guía. |

## 7. Principios de Don Norman aplicados

- **Affordances**: los botones se ven pulsables, las tarjetas de beneficio muestran
  su imagen de forma prominente y la foto de la persona en contacto humaniza el CTA.
- **Signifiers**: puntos del carrusel, subrayado en enlaces y placeholder
  "Selecciona una opción".
- **Feedback**: cambios al hacer hover, mensajes del formulario y estado de envío.
- **Mapping**: los controles del carrusel (←/→) corresponden con el movimiento.
- **Constraints**: `type="email"`/`type="tel"` y validación; el hueco guía el
  formato/tamaño recomendado de la imagen.
- **Modelo conceptual**: flujo "promesa → producto → catálogo → pruebas → acción".

---

## 8. Accesibilidad (WCAG 2.1 AA)

- Un solo `h1` y jerarquía de encabezados coherente.
- **Enlace "Saltar al contenido"** para usuarios de teclado.
- `alt` descriptivos en imágenes informativas y elementos decorativos con
  `aria-hidden` (marca de agua, iconos, avatares de iniciales).
- Estados con `aria-*`: `aria-expanded`, `aria-invalid`, `aria-selected`,
  `role="alert"`, `role="img"` en valoraciones.
- Foco visible (`:focus-visible`) y contraste suficiente en la paleta clara.
- Respeto de `prefers-reduced-motion` (se desactivan animaciones y autoplay).

---

## 9. Mejoras que puedes incluir (roadmap)

**Conversión**
- Botón flotante de **WhatsApp** y CTA "sticky" en móvil.
- **Prueba social**: contador de proyectos, sellos de certificación.
- **Sección "Cómo trabajamos"** en 3 pasos (cotiza → aprueba arte → recibe).

**Contenido**
- **Preguntas frecuentes (FAQ)** con `<details>`/`<summary>` accesible.
- **Configurador de producto** (color, cantidad, técnica) con precio estimado.
- **Blog o casos de éxito** para SEO.

**Confianza**
- Logos de certificaciones (ISO, FSC) y aviso legal completo.
- Política de datos y banner de consentimiento de cookies.

**Técnico / SEO**
- `srcset` + formatos **WebP/AVIF** para las fotos reales.
- `sitemap.xml`, `robots.txt` y metadatos por sección.
- Analítica (GA4) y eventos de conversión en el envío del formulario.
- Integración del formulario con CRM/correo transaccional.

---

## 10. Checklist de lanzamiento

- [ ] Reemplazar logotipo (texto), datos de contacto y textos por los reales.
- [ ] **Colocar tu imagen** en la sección "Producto destacado" (clase `showcase__img`).
- [ ] Sustituir los iconos del carrusel por fotos reales de los productos.
- [ ] Conectar `sendForm()` de `js/main.js` a un backend/CRM real.
- [ ] Verificar en móvil real (iOS y Android) y en los navegadores objetivo.
- [ ] Pasar auditoría de accesibilidad (Lighthouse / axe DevTools).
- [ ] Añadir política de privacidad real y enlazarla desde el formulario.
