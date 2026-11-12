# Noche Altiplánica — Sistema de diseño de SOCIEM-UNA

## Overview
Noche Altiplánica es el sistema visual de la Sociedad Científica de Estudiantes de Medicina
de la UNA Puno. Está pensado primero para fondo oscuro: el sitio se siente como mirar el
cielo del altiplano a 3 827 msnm, profundo, estrellado y en silencio, con la ciencia
encendida encima. El violeta del escudo hace de luz de interacción y el oro de las
estrellas marca lo valioso (certificados, destacados, logros). La interfaz se retira hacia
la oscuridad para que el contenido, es decir eventos, personas, comités e investigación,
ocupe el primer plano.

Hereda de la identidad anterior la serif editorial en cursiva ("*desde el altiplano*"), el
búho mascota y los logos de comité. De Green Deck toma la disciplina: la elevación se marca
con la luminosidad de la superficie y no con bordes, los botones son píldoras con
*scale* al hover, los labels van en versales con tracking y siempre hay una barra
persistente de contexto (aquí, el **próximo evento**).

**Principio rector:** oscuro, cálido y sobrio. Nada de neón ni de gradientes por todos
lados. El color es un acento, y la luz (los halos y las estrellas) es lo que se lleva
la vista.

## Colors

### Marca
- **Primary** (`#A46BE0`): acentos interactivos, botón primario, estados activos. Es el
  "Violeta Aurora", un violeta de marca aclarado para que alcance contraste AA sobre negro.
- **Primary Hover** (`#B987F0`): hover de elementos violeta.
- **Primary Deep** (`#6B2D9E`): el violeta institucional del escudo. Va en fondos de
  bandas CTA, en el certificado impreso y en el modo claro.
- **Gold** (`#E2B84E`): estrellas, destacados, certificados, badge "Filial oficial",
  números de logro. Nunca en superficies grandes.
- **Gold Soft** (`#F1D58A`): texto dorado sobre oscuro y hover del oro.

### Superficies (elevación por luminosidad)
- **Void** (`#0B0811`): fondo de la app y del sidebar admin. Es la noche.
- **Background** (`#0E0A14`): fondo principal de las páginas.
- **Surface 1** (`#16111F`): tarjetas, nav en scroll y footer.
- **Surface 2** (`#1E1729`): hover de tarjeta, inputs, dropdowns y chips.
- **Surface 3** (`#272033`): modales, barra del próximo evento y tooltips.
- **Surface 4** (`#312940`): hover sobre Surface 3 y filas seleccionadas.
- **Border** (`#2A2238`): divisores sutiles. Úsalo solo cuando la diferencia de superficie no alcance.

### Texto
- **Text Primary** (`#FFFFFF`): titulares, nombres y cifras.
- **Text Secondary** (`#B9B1C8`): cuerpo y descripciones.
- **Text Muted** (`#8A8199`): metadatos, fechas y captions.
- **Text Disabled** (`#5B5468`)

### Semánticos
- **Success** (`#3FB97A`): inscrito, pagado, certificado válido.
- **Warning** (`#F59B23`): cupos por agotarse, pendiente.
- **Error** (`#E5484D`): errores, certificado anulado, cierre de inscripción hoy.
- **Info** (`#5BB5D5`): avisos neutros.

### Comités (identidad de cada comité, solo en puntos, chips y filetes)
SCOME `#C9C2D6` · SCOPH `#E07A1F` · SCORP `#2D8F4C` · SCORA `#E04A60` · SCOPE `#5BB5D5` ·
SCORE `#4F7FD9` · CPC `#A46BE0` · CPPC `#B888DC` · CPA `#E2B84E` · CPAIS `#3FB97A` ·
CPDII `#E07A1F` · CPRII `#E04A60`.

### Luz (efectos)
- **Halo violeta**: `radial-gradient(closest-side, rgba(164,107,224,.28), transparent)` detrás de héroes.
- **Halo dorado**: `radial-gradient(closest-side, rgba(226,184,78,.18), transparent)` en logros.
- **Campo estelar**: capa fija de puntos blancos al 3–8 % de opacidad, muy lenta.
- **Grano**: ruido SVG al 4 % sobre las imágenes hero.

## Typography
- **Display / UI**: **DM Sans** (Google Fonts), pesos 400, 500, 700 y 800.
- **Editorial**: **Cormorant Garamond** en *cursiva* 500/600, solo para la palabra o frase
  emocional de un titular ("*desde el altiplano*", "*generación*") y para citas.
- **Mono / datos**: **JetBrains Mono** 400/500 para fechas, códigos de certificado, DNI,
  cifras de tablas y overlines.

Los titulares van en DM Sans 700/800 con tracking cerrado; la cursiva serif entra como
contrapunto dentro del mismo titular, en violeta o dorado. El cuerpo usa 400/500 con
line-height 1.6 para leer cómodo sobre oscuro. En la interfaz oscura no hay texto oscuro.

| Rol | Spec |
|---|---|
| Hero | DM Sans 800 · clamp(44px, 7vw, 92px) / 0.98 · tracking -0.035em |
| Page Title | DM Sans 800 · clamp(36px, 5vw, 60px) / 1.02 · -0.03em |
| Section Title | DM Sans 700 · clamp(28px, 3.4vw, 40px) / 1.1 · -0.02em |
| Card Title | DM Sans 700 · 17px / 24px · -0.01em |
| Body | DM Sans 400 · 15px / 24px |
| Body Large (lede) | DM Sans 400 · 18px / 29px · Text Secondary |
| Body Small | DM Sans 400 · 13px / 20px |
| Label (overline) | DM Sans 700 · 11px / 16px · 0.14em · MAYÚSCULAS |
| Caption | DM Sans 400 · 12px / 16px · Text Muted |
| Cifra | DM Sans 800 · 56px · tabular-nums |
| Code / dato | JetBrains Mono 13px / 20px |
| Acento editorial | Cormorant Garamond 500 *italic*, 1.08× el tamaño del titular |

## Elevation
Sobre oscuro las sombras casi no se ven, así que la altura se comunica con la luminosidad
de la superficie:

| Nivel | Superficie | Uso |
|---|---|---|
| 0 | `#0E0A14` | fondo de página |
| 1 | `#16111F` | tarjetas, footer, nav al hacer scroll |
| 2 | `#1E1729` | hover de tarjeta, inputs, chips, dropdowns |
| 3 | `#272033` | modales, barra de próximo evento, tooltips, toasts |
| 4 | `#312940` | hover dentro de nivel 3 |

El hover sube un nivel. Los modales y la barra persistente llevan además
`0 -8px 24px rgba(0,0,0,.5)` (barra) o `0 24px 64px rgba(0,0,0,.6)` (modal) y un borde
superior de 1px `rgba(255,255,255,.06)` que hace de filo de luz.

## Components

- **Buttons**: píldora (9999px), alto 44px (40px compacto), padding 0 24px, DM Sans
  700 14px, tracking 0.02em.
  - *Primary*: fondo `#A46BE0` y texto `#0E0A14`. Al hover pasa a `#B987F0` con
    `scale(1.04)`.
  - *Gold*: fondo `#E2B84E` y texto `#0E0A14`. Es el CTA de mayor jerarquía ("Únete",
    "Inscríbete") y va como máximo uno por vista.
  - *Secondary*: 1px `#5B5468`, transparente, texto blanco; el hover lleva el borde a blanco.
  - *Ghost*: solo texto `#B9B1C8`, que pasa a blanco al hover.
  - *Action circle*: 48px, circular, `#A46BE0`, flecha ↗ negra. Aparece sobre las
    tarjetas al hover (equivale al *play button*).
- **Cards**: `#16111F`, radio 12px, sin borde. La imagen llena la parte superior con
  radio 12px arriba y el contenido lleva 16–20px de padding. Título en blanco 17px/700 y
  meta en `#8A8199`. Al hover el fondo pasa a `#1E1729` en 200ms, la imagen hace
  `scale(1.04)` y aparece el action circle abajo a la derecha de la imagen.
- **Feature card** (misión/visión, comités): `#16111F`, con un halo del color del comité
  en la esquina superior derecha al 18 % y el logo del comité en un círculo de 56px.
- **Inputs**: 44px, `#1E1729`, radio 8px, padding 0 14px, sin borde visible, placeholder
  `#8A8199`. En focus llevan anillo de 2px `#A46BE0` más `0 0 0 4px rgba(164,107,224,.18)`.
  Las labels usan el estilo Label. El buscador mide 48px, es píldora y lleva lupa.
- **Chips**: píldora, `#1E1729`, texto blanco 13px/500, padding 6px 14px. Seleccionado:
  fondo blanco y texto `#0E0A14`. Los filtros (comités, tipos de evento, categorías)
  van en una fila con scroll horizontal y llevan un punto con el color del comité.
- **Badges**: 11px/700 en versales, tracking 0.08em, radio 9999px, fondo con el color
  semántico al 14 % y texto en ese color aclarado.
- **Lists / tablas (admin)**: filas de 56px con padding 16px y miniatura de 40px
  (radio 6px). La cabecera usa el estilo Label en `#8A8199` sobre `#0E0A14`. El hover de
  fila pasa a `#1E1729` y la fila activa lleva un filete izquierdo de 2px `#A46BE0`.
  Las cifras van en mono tabular, alineadas a la derecha.
- **Checkboxes / toggles**: checkbox de 18px con radio 4px; marcado lleva fondo
  `#A46BE0` y check negro. El toggle mide 36×20 y su pista activa es `#A46BE0`.
- **Tooltips / toasts**: `#272033`, texto blanco 12–13px, radio 8px y sombra
  `0 4px 12px rgba(0,0,0,.4)`. Los toasts van abajo al centro, encima de la barra de
  evento.
- **Navigation pública**: barra superior de 72px, transparente sobre el hero y
  `rgba(14,10,20,.8)` con blur de 20px al hacer scroll. Lleva logo y wordmark a la
  izquierda, links en `#B9B1C8` 14px/500 y el link activo en blanco con un punto violeta
  debajo. A la derecha van el botón de tema y el CTA dorado "Únete". En móvil el menú es
  a pantalla completa sobre `#0B0811`, con links grandes en DM Sans 800.
- **Barra de próximo evento** (el "now playing" del sitio): persistente abajo en las
  páginas públicas, píldora flotante en `#272033` con máximo 720px de ancho y centrada.
  Muestra una miniatura del flyer, el título, la cuenta regresiva en mono y un botón
  "Inscribirme". Se puede cerrar (se recuerda en sessionStorage) y se oculta si no hay
  evento próximo.
- **Admin shell**: sidebar de 248px en `#0B0811`, con logo arriba y las secciones
  agrupadas con labels en versales. Los links van en `#B9B1C8` 14px/500 y el activo en
  blanco sobre `#1E1729` con una barra violeta de 3px a la izquierda. La topbar es
  sticky, de 64px, con buscador y avatar. El contenido va sobre `#0E0A14` con KPI cards
  en `#16111F`, donde la cifra mide 32px/800 y lleva una tendencia en verde o rojo.
- **Hero**: ocupa como mínimo 92vh, con la imagen nocturna a sangre, un degradado
  `linear-gradient(90deg, #0E0A14 0%, rgba(14,10,20,.6) 45%, transparent)` y un campo
  estelar encima. Contiene overline, titular con acento en cursiva, lede, dos CTAs y una
  fila de 3 datos en mono. La mascota aparece flotando en una esquina.
- **Mascota (búho)**: se usa en estados vacíos, en errores, en el 404, en el CTA de
  unirse y en el login. Mide entre 120 y 200px y siempre flota (4.5s). Nunca va más de una
  por vista.

## Spacing
- Unidad base de 8px. Escala: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128.
- Padding de componente: 16px estándar y 24px en cabeceras de sección.
- Entre secciones: 96px en desktop, 64px en tablet y 48px en móvil. Entre grupos
  relacionados: 16–24px.
- El contenedor mide como máximo 1280px, con 32px de margen (16px en móvil). El admin no
  lleva tope: es fluido y deja 32px de margen.
- Rejilla de tarjetas: gap de 24px y `repeat(auto-fill, minmax(260px, 1fr))`; para
  miembros, 200px de mínimo.

## Border Radius
- 4px: badges pequeños, miniaturas en tablas, checkbox.
- 8px: inputs, tooltips, dropdowns, menús contextuales.
- 12px: tarjetas, modales e imágenes de tarjeta.
- 20px: imágenes hero, bandas CTA y paneles grandes.
- 9999px: botones, chips, buscador, avatares, la barra de próximo evento y el action circle.

## Motion
- Duraciones: 150ms en micro (hover de color), 200ms en tarjetas y 400ms en entradas.
  Curva `cubic-bezier(.2,.8,.2,1)`.
- Al hover, botones y action circle hacen `scale(1.04)` y las imágenes de tarjeta
  `scale(1.04)`.
- Las secciones aparecen con `rise-in` (opacidad más 18px) al entrar en viewport,
  escalonadas cada 60ms.
- El campo estelar tiene un parallax muy lento y las cifras usan un contador animado.
- Con `prefers-reduced-motion` todo esto se desactiva.

## Light mode (secundario)
Existe por accesibilidad y se elige con el botón de tema. Invierte las superficies
(`#FAF9FB`, `#FFFFFF`, `#F2F0F5`), usa `#6B2D9E` como primario con texto blanco y mantiene
el oro solo en acentos. El modo por defecto es siempre el oscuro.

## Excepción: el certificado
La lámina A4 del certificado (`.cert-hoja`) es papel: fondo blanco, violeta institucional
`#6B2D9E` y oro `#C9A24A`, con medidas en mm. No hereda los tokens oscuros.

## Imágenes
- Set "Noche Altiplánica" generado con Codex `image_gen` en **3D animado estilo Pixar**: el
  mismo universo visual del búho mascota, con personajes caricaturescos y materiales suaves, y
  **nunca fotorrealista** (las personas "reales" rompían el tono del sitio). Paleta `#0E0A14` /
  `#6B2D9E` / `#A46BE0` / `#E2B84E`, iluminación de película animada y sin texto. Las fuentes
  crudas están en `assets/_generadas/noche/` y las optimizadas (JPG/WebP ≤ 300 KB) en
  `assets/hero/`, `assets/banners/` y `assets/fondos/`.
- Toda imagen sobre la que va texto lleva un degradado oscuro de legibilidad.
- Las fotos de miembros van en cuadrado con radio de 12px, `object-position: center 25%`
  y un borde interior de luz de 1px `rgba(255,255,255,.06)`.

## Do's and Don'ts
- **Sí:** diseñar primero en oscuro. El claro es secundario y nunca va por defecto.
- **Sí:** usar blanco puro para titulares y cifras sobre oscuro.
- **No:** usar violeta ni oro en superficies grandes. El violeta es para la interacción y
  el oro para lo valioso. La única excepción es la banda CTA, en `#6B2D9E` profundo con
  halo.
- **Sí:** escalar al hover (1.04) para que la respuesta se sienta viva.
- **No:** definir contenedores con bordes. Se separan por diferencia de superficie.
- **Sí:** mantener visible el contexto del próximo evento.
- **No:** escribir bloques largos de texto en las tarjetas. Cópialo corto y escaneable.
- **Sí:** reservar las versales con tracking para overlines y labels.
- **No:** poner más de un CTA dorado por vista (sin contar el "Únete" persistente de la nav)
  ni más de una mascota por vista.
- **Sí:** respetar los logos oficiales de comité. No se recolorean ni se deforman.
- **No:** usar estilos inline para colores. Todo pasa por tokens CSS (`var(--…)`).
