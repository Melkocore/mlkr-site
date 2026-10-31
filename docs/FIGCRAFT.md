# FigCraft integration (M3LK0K093)

## Purpose

FigCraft is used for occasional visual adjustments, component variants, cover/asset work, and agent-driven design experiments. The final outputs are static assets in `public/images/figcraft/`; the `.figcraft` sources are versioned for reproducibility.

## Installation and verification

```bash
figcraft-cli --version
figcraft-cli commands --filter autoLayout
```

If the command is not found, install the FigCraft desktop package and expose `figcraft-cli` in your `PATH`.

## Folders

```text
design/figcraft/source/    editable .figcraft files
design/figcraft/scripts/   command JSON scripts
design/tokens/            design token JSON
design/exports/           temporary/curated exports, mostly ignored
public/images/figcraft/    production assets
```

## Token mapping

Source of truth: `design/tokens/tokens.json`

Astro target: `src/styles/global.css` (`@theme` variables).

Minimum mapped tokens:
- `colors.ink` -> `--color-ink`
- `colors.ink-2` -> `--color-ink-2`
- `colors.ink-3` -> `--color-ink-3`
- `colors.fg` -> `--color-fg`
- `colors.fg-muted` -> `--color-fg-muted`
- `colors.acid` -> `--color-acid`
- `colors.glitch` -> `--color-glitch`
- `colors.grid` -> `--color-grid`
- `typography.fontSans` -> `--font-sans`
- `typography.fontMono` -> `--font-mono`

## Manual workflow

1. Open or create `design/figcraft/source/m3lk0k093-portal.figcraft`.
2. Adjust screens, frames, components, variants.
3. Save the source file.
4. Export finalists to `design/exports/`.
5. Copy optimised assets to `public/images/figcraft/`.
6. Run `npm run dev` and verify on desktop/mobile.
7. Commit only source, approved exports, and Astro changes.

## Agent workflow

Headless:

```bash
figcraft-cli mcp --automation-read-root design --automation-write-root design/exports
```

Attached to the running app:

```bash
figcraft --control 7979
figcraft-cli mcp --attach 7979
```

Rules:
- Confine file access with automation roots.
- Keep exported finals in `design/exports/` until human validation.
- Do not let agents write directly to `public/` without review.
- Prefer SVG for icons and flat graphics; PNG/WebP for covers and illustrations.

## Git policy

The following should be ignored:
- `design/exports/`
- `design/cache/`
- `*.tmp`
- `figcraft-cli.log`

Version:
- `.figcraft` source files
- curated exports used by the site
- token JSON and documentation

## Compatibility notes

- Keep Astro base as `/mlkr-site/`.
- Export sizes should remain mobile-friendly.
- Do not add FigCraft runtime dependencies to the Astro bundle.
- Typical FigCraft outputs are visual assets only.

## Rollback

If FigCraft becomes unusable:
1. Keep the approved exported assets.
2. Remove MCP/CLI assumptions from docs only if needed.
3. Continue editing Astro manually or migrate to another tool using the approved assets.
4. Tokens in `src/styles/global.css` remain stable.