# M3LK0K093

Sitio web estático (GitHub Pages) para el proyecto musical **M3LK0K093** (live-coding · industrial · experimental · noise).

- Stack: Astro 5 + Tailwind CSS v4 + Content Collections
- Hosting: GitHub Pages (repo `Melkocore/mlkr-site`)
- URL pública: `https://melkocore.github.io/mlkr-site/`
-

## Estructura

- `Home` · `Música` · `Blog` · `Videos` · `Shows` · `Bio` · `Redes` · `Lab` (Strudel + Hydra) · `Legal`

## Desarrollo local

```bash
npm install
npm run dev          # http://localhost:4321/mlkr-site/
npm run build        # genera /dist
npm run preview      # sirve /dist
```

Requiere Node 22 (`.nvmrc`).

## Añadir contenido

- **Álbumes**: `src/content/albums/*.mdx`
- **Tracks/scripts**: `src/content/tracks/*.mdx` (campo `script`)
- **Blog**: `src/content/blog/*.mdx`
- **Shows**: `src/content/shows/*.mdx`

Editar los MDX y hacer push a `main`; GitHub Actions despliega automáticamente.

## Despliegue

Workflow: `.github/workflows/deploy.yml`

Pasos una sola vez en GitHub:
1. Repo → Settings → Pages → Source: **GitHub Actions**
2. (Opcional) Settings → Pages → Custom domain

## Placeholders pendientes

- Enlaces reales de Bandcamp/Spotify/YouTube/IG/etc. en `redes.astro` y `albums/coaxial-propeller.mdx`.
- Cover art del álbum (sustituir bloque `[ cover ]`).
- Bio real y email de contacto.
- Videoclips en `videos.astro`.
- Próximas fechas en `content/shows/`.

Ver `docs/PLAN.md` para el roadmap completo.
