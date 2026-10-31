# FigCraft source and workflow

This folder stores FigCraft source files (.figcraft) and manually curated exports.

## Conventions

- Source naming: `m3lk0k093-[section]-[variant].figcraft`
- Exports: `public/images/figcraft/[component]/[state].svg|png|webp`
- Scales: use `@1x`, `@2x`, or explicit scale in filenames.

## Current status

- FigCraft CLI is not installed yet.
- Source folder is ready; add your first `.figcraft` file here.
- Tokens are in `design/tokens/tokens.json`.

## Manual workflow

1. Open a `.figcraft` source in FigCraft desktop.
2. Edit frames/components/variants.
3. Save source here.
4. Export finalists to `design/exports/`.
5. Copy/optimise to `public/images/figcraft/`.
6. Verify in `npm run dev`.

## Agent workflow (future)

Use `figcraft-cli mcp` in headless mode, confined with:
- `--automation-read-root design`
- `--automation-write-root design/exports`

Always validate visual output before committing.