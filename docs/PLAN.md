# Plan de implementación — M3LK0K093

## Objetivo

Plataforma "todo en uno" para el proyecto musical M3LK0K093 con perfil C (control total, hosting gratuito en GitHub Pages, sin servidor). Prioridad MVP: publicar el primer álbum **Coaxial Propeller** y crear la base del **Lab** (Strudel + Hydra). Resto de secciones como placeholders.

## Stack

Astro 5 + Tailwind v4 + Content Collections (glob loader) + MDX.
Hosting: GitHub Pages vía GitHub Actions. Node 22.

## Estructura del sitio

Home, Música, Blog, Videos, Shows, Bio, Redes, Lab (Strudel / Hydra), Legal (privacidad, cookies, licencia).

## Roadmap por milestones

- M1 Scaffold + GitHub Pages deploy — hecho
- M2 Home + tema industrial + navegación — hecho
- M3 Música: álbum + embed Bandcamp + tracklist con scripts — hecho (1 track)
- M4 Blog (index + 1 post) + RSS opcional — hecho
- M5 Shows/Bio/Redes/Videos placeholders — hecho
- M6 Lab v1: Strudel iframe + Hydra iframe + cargador de scripts — hecho
- M7 Legal (privacidad/cookies/licencia) — hecho
- M8 SEO (sitemap, OG, meta, Lighthouse, a11y) — pendiente
- M9 Contenido real (covers, más tracks, fechas, vídeos, enlaces) — pendiente
- M10 Lab v2: audio-reactivo local + snippets guardados — pendiente
- M11 Lab v3: integración profunda Strudel+Hydra self-hosted — pendiente

## Integración Strudel / Hydra

v1 usa iframes a los REPLs oficiales + bloques copiables + "Abrir en Strudel/Hydra". El audio no hace autoplay (requiere gesto). Lazy-load de iframes. Plan v3 evaluará self-host del bundle de Strudel con un canvas Hydra compartiendo el AudioContext.

Consideraciones:

- Autoplay bloqueado → botón Play explícito.
- Rendimiento móvil → `client:visible`, desactivar visuales en `prefers-reduced-motion`.
- Dependencias externas: sin ellas el Lab degrada a enlaces + copia de código.
- Bandwidth: mover previews de audio a Bandcamp, no al repo.

## Contenido: álbum Coaxial Propeller

- Primer álbum only. Track 01 incluye el script Strudel aportado.
- Enlaces Bandcamp placeholder con comentarios.
- Cover art pendiente (bloque `[ cover ]`).

## Despliegue pendiente (acción manual en GitHub)

1. Activar Pages source: GitHub Actions.
2. Hacer push de la rama main.

## Decisiones tomadas

- Repo: `Melkocore/mlkr-site`
- Dominio: `https://melkocore.github.io/mlkr-site/` (proyecto).
- Idioma principal: español (textos).
- Comentarios: no.
- Editor: MDX en git (simple).
- Placeholders para enlaces aún no creados.