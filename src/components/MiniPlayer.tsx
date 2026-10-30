import { useEffect, useRef, useState } from 'react';
import { PLAYER_TRACKS } from '../lib/tracks';
import { evaluateCode, stopAudio } from '../lib/strudelClient';

type AudioState = 'idle' | 'loading' | 'playing' | 'error';

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export default function MiniPlayer() {
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<AudioState>('idle');
  const shouldPlayRef = useRef(false);

  const track = PLAYER_TRACKS[index];

  useEffect(() => {
    if (!shouldPlayRef.current) return;
    shouldPlayRef.current = false;
    setState('loading');
    evaluateCode(track.code)
      .then(() => setState('playing'))
      .catch(() => setState('error'));
  }, [index, track.code]);

  const play = async () => {
    setState('loading');
    try {
      await evaluateCode(track.code);
      setState('playing');
    } catch {
      setState('error');
    }
  };

  const stop = () => {
    stopAudio();
    setState('idle');
  };

  const shuffle = () => {
    let next = index;
    while (PLAYER_TRACKS.length > 1 && next === index) {
      next = Math.floor(Math.random() * PLAYER_TRACKS.length);
    }
    if (state === 'playing') shouldPlayRef.current = true;
    else shouldPlayRef.current = false;
    if (state === 'playing') stopAudio();
    setIndex(next);
  };

  const coverSrc = track.cover ? `${BASE}images/${track.cover}` : null;

  return (
    <div className="flex items-center gap-2 rounded-full border border-grid bg-ink-2/90 px-2 py-1 shadow-lg shadow-black/40 backdrop-blur">
      {coverSrc ? (
        <a href={`${BASE}musica`} title="Escuchar" className="block">
          <img src={coverSrc} alt={track.title} className="h-7 w-7 rounded-sm object-cover border border-grid hover:border-acid" />
        </a>
      ) : (
        <a href={`${BASE}musica`} title="Escuchar" className="block">
          <div className="h-7 w-7 rounded-sm bg-ink-3 flex items-center justify-center font-mono text-[8px] text-fg-muted hover:border-acid">[ ]</div>
        </a>
      )}
      <div className="hidden sm:flex flex-col leading-tight min-w-[110px] max-w-[140px]">
        <span className="text-[9px] uppercase tracking-[0.16em] text-fg-muted truncate">{track.title}</span>
        <span className="font-mono text-[9px] text-acid truncate">{state === 'playing' ? 'playing' : state === 'loading' ? 'loading' : 'idle'}</span>
      </div>
      <button
        type="button"
        onClick={state === 'playing' ? stop : play}
        className="rounded-full bg-acid text-ink px-2 py-1 text-[9px] uppercase tracking-[0.12em] hover:opacity-90"
      >
        {state === 'loading' ? '...' : state === 'playing' ? 'Stop' : 'Play'}
      </button>
      <button
        type="button"
        onClick={shuffle}
        title="Shuffle de scripts"
        className="rounded-full border border-grid px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-fg-muted hover:border-acid hover:text-acid"
      >
        ⇄
      </button>
    </div>
  );
}