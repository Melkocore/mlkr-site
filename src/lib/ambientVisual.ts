import { readStoredVisual } from './ambientPreset';

export interface AmbientVisual {
  destroy: () => void;
}

function stripHydraSetup(code: string): string {
  let result = code;
  let index = result.search(/\binitHydra\s*\(/);

  while (index !== -1) {
    const open = result.indexOf('(', index);
    let depth = 0;
    let end = open;

    for (let i = open; i < result.length; i += 1) {
      if (result[i] === '(') depth += 1;
      if (result[i] === ')') {
        depth -= 1;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }

    let start = index;
    const lineStart = result.lastIndexOf('\n', start) + 1;
    if (/^\s*(?:await\s)?$/.test(result.slice(lineStart, start))) {
      start = lineStart;
    }

    let after = end;
    while (after < result.length && /[;\s]/.test(result[after])) {
      if (result[after] === '\n') {
        after += 1;
        break;
      }
      after += 1;
    }
    if (result[after] === '\n') after += 1;

    result = result.slice(0, start) + result.slice(after);
    index = result.search(/\binitHydra\s*\(/);
  }

  return result;
}

export async function startAmbientVisual(
  canvas: HTMLCanvasElement,
): Promise<AmbientVisual> {
  const { default: Hydra } = await import('hydra-synth');

  const scale = Math.min(1, 960 / Math.max(window.innerWidth, 1));
  const width = Math.max(320, Math.round(window.innerWidth * scale));
  const height = Math.max(240, Math.round(window.innerHeight * scale));

  canvas.width = width;
  canvas.height = height;

  const hydra = new Hydra({
    canvas,
    width,
    height,
    autoLoop: false,
    makeGlobal: false,
    detectAudio: false,
    precision: 'mediump',
  });

  const synth = hydra.synth as Record<string, (...args: unknown[]) => any>;
  const { osc, noise, o0 } = synth;

  const runDefaultSketch = () => {
    osc(6, 0.1, 1.2)
      .color(0.12, 0.9, 0.25)
      .modulate(noise(3, 0.1), 0.22)
      .rotate(0.06, 0.01)
      .blend(osc(4, 0.02, 0.8).color(0.15, 0.2, 0.1), 0.35)
      .posterize(10)
      .out(o0);
  };

  const custom = readStoredVisual()?.trim();

  if (custom) {
    try {
      const AsyncFunction = Object.getPrototypeOf(async function () {})
        .constructor as new (
        ...args: string[]
      ) => (...args: unknown[]) => Promise<unknown>;
      const run = new AsyncFunction(
        'hydra',
        `with (hydra.synth) {\n${stripHydraSetup(custom)}\n}`,
      );
      await run(hydra);
    } catch {
      runDefaultSketch();
    }
  } else {
    runDefaultSketch();
  }

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  let raf = 0;
  let last = 0;

  const tick = (time: number) => {
    if (!last) last = time;
    const dt = Math.min(time - last, 64);
    last = time;
    hydra.tick(dt);
    raf = window.requestAnimationFrame(tick);
  };

  if (reduceMotion) {
    for (let i = 0; i < 4; i += 1) hydra.tick(16);
  } else {
    raf = window.requestAnimationFrame(tick);
  }

  const onVisibilityChange = () => {
    if (document.hidden) {
      window.cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      return;
    }

    if (!reduceMotion && !raf) {
      last = 0;
      raf = window.requestAnimationFrame(tick);
    }
  };

  document.addEventListener('visibilitychange', onVisibilityChange);

  return {
    destroy: () => {
      window.cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      document.removeEventListener('visibilitychange', onVisibilityChange);
      hydra.hush();
    },
  };
}