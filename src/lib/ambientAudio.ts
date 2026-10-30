import { readStoredAudio } from './ambientPreset';
import { evaluateCode, stopAudio } from './strudelClient';

const PATTERN = `setcpm(80/4)
$: sound("bd hh sd*2? hh").bank("dr550").room(0.7).color("yellow")
$: note("c4 d3 a3 e3").fast(3).sound("sawtooth").room(0.3).gain(0.8)`;

export async function startAmbient(): Promise<void> {
  const stored = readStoredAudio();
  await evaluateCode(stored?.trim() ? stored : PATTERN);
}

export function stopAmbient(): void {
  stopAudio();
}