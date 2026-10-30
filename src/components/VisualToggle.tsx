import { useEffect, useRef, useState } from 'react';
import type { AmbientVisual } from '../lib/ambientVisual';
import { startAmbientVisual } from '../lib/ambientVisual';

export default function VisualToggle() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [on, setOn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!on) return;
    const canvas = canvasRef.current;
    if (!canvas) {
      setOn(false);
      return;
    }
    let alive = true;
    let visual: AmbientVisual | null = null;
    setLoading(true);

    startAmbientVisual(canvas)
      .then((instance) => {
        if (!alive) {
          instance.destroy();
          return;
        }
        visual = instance;
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setLoading(false);
        setOn(false);
      });

    return () => {
      alive = false;
      visual?.destroy();
    };
  }, [on]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-0 h-full w-full object-cover transition-opacity duration-700 ${
          on && !loading ? 'opacity-20' : 'opacity-0'
        }`}
      />
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className={`rounded-full border border-grid px-3 py-2 text-[10px] uppercase tracking-[0.16em] transition-colors ${
          on ? 'bg-glitch text-fg' : 'text-fg-muted hover:border-acid hover:text-acid'
        }`}
      >
        {loading ? 'Cargando' : 'Visual'}
      </button>
    </>
  );
}