type StrudelWeb = typeof import('@strudel/web');

let modulePromise: Promise<StrudelWeb> | null = null;
let loaded: StrudelWeb | null = null;
let initialized = false;

export async function loadStrudel(): Promise<StrudelWeb> {
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

export async function evaluateCode(code: string): Promise<void> {
  const strudel = await loadStrudel();
  const audioWindow = window as Window & { getAudioContext?: () => AudioContext };
  const context = audioWindow.getAudioContext?.();
  if (context?.state === 'suspended') await context.resume();
  await strudel.evaluate(code);
}

export function stopAudio(): void {
  loaded?.hush();
}