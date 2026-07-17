# Convenciones de assets · SOCIEM-UNA

## Regla de oro: los nombres están acoplados a Google Sheets

Las hojas de **SOCIEM-DB** referencian imágenes por ruta local. Si agregas una
fila nueva en Sheets con `imagen_url`/`flyer_url`/`imagen_portada`, crea el
archivo con **ese nombre exacto** aquí, o usa una URL de Google Drive
("Compartir → Copiar enlace"; el frontend la normaliza a thumbnail).

| Carpeta | Lo referencia | Ejemplos actuales |
|---|---|---|
| `tienda/` | hoja `productos` (`imagen_url`, `imagenes_extra`) | `polo.jpg`, `tomatodo.jpg`, `kit.jpg`, `banner-tienda.jpg` |
| `eventos/` | hoja `eventos` (`flyer_url`) | `scope-aoa.jpg`, `pasantias.jpg`, `donacion-sangre.jpg`, `evento-default.jpg` |
| `noticias/` | hoja `noticias` (`imagen_portada`) | `club-altura.jpg`, `convocatoria-2026.jpg`, `aniversario.jpg`, `noticia-default.jpg` |
| `forms/` | hoja `formularios` (`imagen_url`) | `inscripcion.jpg` |
| `hero/` | código del frontend | `hero-altiplano.jpg`, `nosotros-identidad.jpg` |
| `fondos/` | código del frontend | `fondo-textil.jpg`, `fondo-constelacion.jpg` |
| `logos/` | logos OFICIALES (no tocar) | `logo_SOCIEM-UNA.png` + 15 logos de comité |
| `miembros/` | fotos reales de miembros (fallback estático) | `*.jpg` |
| `mascota/` | código del frontend (12 poses del búho) | `mascota-hero.png`, `mascota-404.png`, … |

`*-default.jpg` son los fallbacks que usa el frontend cuando una fila no tiene
imagen propia.

## Mascota (búho académico) — pipeline

Las 12 poses PNG con transparencia real se generan con Codex CLI (`image_gen`)
y se limpian con Python, porque `image_gen` **no produce alpha real** (pinta un
tablero de ajedrez falso y suele añadir una tarjeta blanca detrás del
personaje):

1. Generar pidiendo *"fondo verde chroma sólido #00FF00, sin tarjeta ni panel
   detrás del personaje"* → guardar en `_generadas/verde/`.
2. Ejecutar `quitar_chroma.py` (rampa de alpha sobre el verde + de-spill +
   flood-fill del blanco conectado al exterior + recorte + 512 px).
3. El resultado cae directo en `mascota/`.

**Nunca** proceses las mascotas con el post-procesador general de portadas:
ese script pisó las mascotas transparentadas con las fuentes viejas (bug del
16-jul-2026, ya corregido).

## Caché

El HTML referencia los `.jsx` con `?v=<fecha>` y las mascotas con `?v=N`.
**Después de cambiar cualquier asset o componente, sube la versión
correspondiente en `SOCIEM-UNA.html` o en las referencias de imagen** — si no,
los navegadores que ya visitaron el sitio seguirán mostrando lo viejo.

## `_generadas/`

Carpeta de trabajo del pipeline (fuentes crudas de Codex + `log.txt`). No se
referencia desde el sitio; puede limpiarse, salvo `verde/` si planeas
regenerar mascotas.
