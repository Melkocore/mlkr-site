# Plan de implementación — M3LK0K093

## Estado actual

Stack: Astro + React (`@astrojs/react`) + Tailwind + Content Collections (glob). Hosting: GitHub Pages. Astro 7 mantenido (no downgrade), con `vite.define = { global: 'globalThis' }`.

Dominio público: `https://melkocore.github.io/mlkr-site/`

## Arquitectura

- Sitio estático SSG.
- Contenido tipado: albums, tracks, blog, shows.
- Strudel/Hydra embebidos directamente con `<strudel-editor>` (web component desde unpkg) y React controls.
- Ambient (audio/visual) disponible en todas las páginas salvo Lab, con toggle manual.

## Páginas

Home, Música, Blog, Videos, Shows, Bio, Redes, Lab (index/strudel/hydra), Legal.

## Integración Strudel/Hydra directa

- Dependencias: `@strudel/web`, `hydra-synth`, React.
- Types: `src/types/strudel-web.d.ts`, `src/types/hydra-synth.d.ts`.
- `src/components/StrudelLab.astro`: renderiza `LabControls` + `<strudel-editor code=...>`.
- Marcadores de código:
  - `// ===== VISUAL =====`
  - `// ===== AUDIO =====`
- Visual primero, audio al final (REPL reproduce la última expresión).
- Lab controls: Reproducir (`evaluate`), Detener (`stop`), Usar como ambiente, Restablecer.
- `src/lib/ambientPreset.ts` separa VISUAL/AUDIO y guarda en localStorage.

## Ambient (al inicio)

- `src/lib/ambientAudio.ts`: carga `@strudel/web`, inicializa e evalúa audio almacenado o patrón por defecto.
- `src/lib/ambientVisual.ts`: Hydra canvas fijo con sketch industrial + tick loop, respeta `prefers-reduced-motion`.
- `src/components/AmbientDock.tsx`: toggles de audio/visual + enlace al Lab.
- Incluido en `BaseLayout` salvo en Lab (`isLab`).

## Roadmap

- M1 Scaffold + Pages deploy — hecho
- M2 Home + tema industrial — hecho
- M3 Música + álbum + embed Bandcamp + scripts — hecho
- M4 Blog — hecho
- M5 Placeholders — hecho
- M6 Lab directo (Strudel/Hydra embebidos) — hecho
- M7 Ambient dock — hecho
- M8 SEO/OG/a11y/perf — pendiente
- M9 Contenido real (cover restante, enlaces, más tracks) — pendiente
- M10 Chunk splitting para bundle grande — pendiente

## Pendiente

- Enlaces reales (Bandcamp, redes).
- Más tracks con scripts.
- Fechas y videos reales.
- Dominio propio opcional.

## Notas técnicas

- Astro 7 se mantuvo; se añadió `global: 'globalThis'` en Vite.
- Iframes de Strudel/Hydra anteriores quedaron como fallback histórico (pueden limpiarse).
- `lab` excluye AmbientDock para evitar interferencias.