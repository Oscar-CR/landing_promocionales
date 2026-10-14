# Respuestas — Prueba Técnica Front-End Junior

### 1. Explica con un ejemplo la diferencia entre renderizado en el cliente (CSR), del lado del servidor (SSR) y sitios estáticos (SSG). ¿Para un sitio corporativo informativo cuál elegirías y por qué?
* CSR: El navegador se encarga de renderizar las aplicaciones, como las aplicaciones de react, donde en un documento html se inyecta el codigo js a través de la etiqueta root. 
* SSR: El servidor se encarga de proporcionar todo para renderizar la aplicación, como una aplicación de laravel, que mediante blade se encarga de llenar la información enviada por el servidor utilizando las vistas html.
* SSG: Se renderiza de una vez sin cambios, como páginas informativas y documentación.
* Para un  sitio corporativo informativo elegiría el SSG

### 2. Astro, Next.js y Svelte: elige uno con el que te sientas más cómodo y di en qué proyecto real lo usarías frente a los otros dos.
Depende directamente de lo que se requiere hacer, sin embargo elijo next.js por lo que nos ofrece, ya que es un framework, brindando más herramientas y estructura para proyectos con implementaciones robustas, como ecommerce.

### 3. ¿Cuándo recomendarías un CMS como WordPress y cuándo un sitio hecho a medida? Menciona una ventaja y una desventaja de cada camino.
Depende de las necesidades, el tiempo, diseño y tecnologías autorizadas del cliente. Ambos pueden ofrecer lo mismo, sin embargo un sitio Wordpress puede verse limitado por depender de su  estructura para realizar cambios, plugins para funcionalidades que se deben desarrollar o comprar, pero nos ofrece un desarrollo rápido con plantillas e integraciones con herramientas de ecommerce y pasarelas de pago. A diferencia de un sitio a la medida que requiere construir y tener el control de todo, lo que puede implicar más tiempo,  con ventaja en tamaño, optimización y seguridad. 

### 4. Para una tienda en línea, ¿qué preguntas le harías al cliente antes de decidir entre Shopify y Magento?
Le preguntaría sobre la cantidad de productos disponibles, el como se maneja el stock actualmente, la segmentación que se maneja (por zona, stock global). si se requiere acceder mediante multiples aplicaciones (como web, movil, catalogos), si cuenta con proveedores externos , si ellos alimentan el inventario, las reglas de negocio para una compra, cotizaciones, tipos de pago, los accesos que se requieren.

### 5. Describe, paso a paso y con tus palabras, cómo llevarías un cambio de código desde tu computadora hasta producción usando Git y GitHub. Menciona ramas (branches) y Pull Requests.
Suponiendo que existe una rama master, y existe un nuevo cambio.
* 1 crearía una rama que describa el nombre de la funcionalidad, empezando por el tipo, por ejemplo: git checkout -b fix-productos , este comando creará y nos cambiará a esta rama (siempre asegurándonos de traer todos los cambios previamente antes de crear la rama).
* 2 una vez que tenga completado el cambio,  realizó el guardado, siempre asegurándome de no subir datos sensibles (establecidos en el .gitignore) con el comando git add . , posteriormente el nombre del cambio siendo descriptivo mediante  git commit -m “fix bug visualizacion de producto” (depende del estandar y nomenclatura establecida por el equipo).
* 3 Con el comando git push -u origin fix-productos , subo los cambios a la rama y dependiendo del flujo de aprobacion y despliegue, se requerirá de una revisión mediante un pull request. 
* 4 Muchos proyectos tienen automatizado el proceso de despliegue a producción, estableciendo en un archivo yaml la ruta del servidor, comandos, asi como reglas. 


### 6. ¿Qué es un "build" y qué crees que pasa cuando conectas un repositorio de GitHub a un servicio como Vercel o Cloudflare Pages?
Es la compilación del proyecto, si existen cambios se deben reconstruir archivos de la build para que se actualice con los cambios.

### 7. Menciona 3 cosas que cuidarías para que una landing page cargue rápido y posicione bien (SEO/rendimiento).
* 1 Optimización de imágenes.
* 2 Uso correcto de etiquetas html.
* 3 Mapa del sitio y metadatos.

### 8. Cuéntanos de una tecnología que aún no dominas. ¿Cómo aprenderías a usarla si empezaras la próxima semana?
Quiero mejorar mis habilidades en tecnologías para frontend (nextjs, react, astro, etc), ya que me he centrado en gran medida en backend  y frontend móvil.