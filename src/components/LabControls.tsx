import { useState } from 'react';
import {
  resetAmbientPreset,
  saveAmbientPreset,
} from '../lib/ambientPreset';

interface StrudelEditorElement extends HTMLElement {
  editor?: {
    code?: string;
    evaluate?: () => Promise<unknown>;
    stop?: () => void;
  };
}

interface StrudelWindow extends Window {
  getAudioContext?: () => AudioContext;
}

type Status = { tone: 'idle' | 'ok' | 'error'; text: string };

function getEditor() {
  return document.querySelector<StrudelEditorElement>('strudel-editor')?.editor;
}

export default function LabControls() {
  const [status, setStatus] = useState<Status>({ tone: 'idle', text: '' });

  const play = async () => {
    const editor = getEditor();
    if (!editor?.evaluate) {
      setStatus({ tone: 'error', text: 'El REPL aún está cargando. Probá de nuevo en un momento.' });
      return;
    }
    try {
      const audioWindow = window as StrudelWindow;
      const context = audioWindow.getAudioContext?.();
      if (context?.state === 'suspended') await context.resume();
      await editor.evaluate();
      setStatus({ tone: 'ok', text: 'Reproduciendo el código del editor.' });
    } catch {
      setStatus({ tone: 'error', text: 'No se pudo evaluar. Revisá el código y la consola del REPL.' });
    }
  };

  const stop = () => {
    const editor = getEditor();
    if (!editor?.stop) {
      setStatus({ tone: 'error', text: 'El REPL aún está cargando.' });
      return;
    }
    editor.stop();
    setStatus({ tone: 'ok', text: 'Audio detenido.' });
  };

  const sync = () => {
    const code = getEditor()?.code;
    if (!code) {
      setStatus({ tone: 'error', text: 'No pude leer el código del editor.' });
      return;
    }
    const saved = saveAmbientPreset(code);
    if (!saved.audio) {
      setStatus({ tone: 'error', text: 'No encontré un bloque de audio con contenido.' });
      return;
    }
    setStatus({
      tone: 'ok',
      text: saved.visual
        ? 'Guardado: el ambiente del sitio usará tu versión de audio y visual.'
        : 'Guardado el audio. No encontré el bloque VISUAL, así que el fondo sigue siendo el original.',
    });
  };

  const reset = () => {
    resetAmbientPreset();
    setStatus({ tone: 'ok', text: 'Preset original restablecido.' });
  };

  return (
    <div className="mt-6 max-w-2xl brutal p-4">
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={play} className="rounded-full bg-acid text-ink px-4 py-2 text-[10px] uppercase tracking-[0.16em] hover:opacity-90">
          Reproducir
        </button>
        <button type="button" onClick={stop} className="rounded-full border border-grid px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-fg-muted hover:border-acid hover:text-acid">
          Detener
        </button>
        <button type="button" onClick={sync} className="rounded-full border border-glitch px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-fg hover:bg-glitch">
          Usar como ambiente
        </button>
        <button type="button" onClick={reset} className="rounded-full px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-fg-muted hover:text-acid">
          Restablecer
        </button>
      </div>
      <p role="status" aria-live="polite" className={`mt-3 text-[11px] leading-relaxed ${
        status.tone === 'error' ? 'text-glitch' : status.tone === 'ok' ? 'text-acid' : 'text-fg-muted'
      }`}>
        {status.text || 'Reproducir usa el código actual. “Usar como ambiente” guarda audio y fondo para el sitio.'}
      </p>
    </div>
  );
}