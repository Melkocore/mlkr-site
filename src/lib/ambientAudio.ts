import { readStoredAudio } from './ambientPreset';

const PATTERN = `setcpm(80/4)
$: sound("bd hh sd*2? hh").bank("dr550").room(0.7).color("yellow")
$: note("c4 d3 a3 e3").fast(3).sound("sawtooth").room(0.3).gain(0.8)`;

type StrudelWeb = typeof import('@strudel/web');

let modulePromise: Promise<StrudelWeb> | null = null;
let loaded: StrudelWeb | null = null;
let initialized = false;

async function loadStrudel(): Promise<StrudelWeb> {
  if (!modulePromise) {
    modulePromise = import('@strudel/web');
  }
  const strudel = await modulePromise;

  if (!initialized) {
    await strudel.initStrudel();
    initialized = true;
  }

  loaded = strudel;
  return strudel;
}

export async function startAmbient(): Promise<void> {
  const strudel = await loadStrudel();
  const stored = readStoredAudio();
  await strudel.evaluate(stored?.trim() ? stored : PATTERN);
}

export function stopAmbient(): void {
  loaded?.hush();
}