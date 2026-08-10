import { Howl, Howler } from 'howler';

let muted = false;

// Apply persisted mute preference on first load (client only)
try {
  if (typeof window !== 'undefined') {
    muted = localStorage.getItem('sound-muted') === 'true';
    Howler.mute(muted);
  }
} catch (e) {
  /* ignore storage errors */
}

export const playClick = new Howl({
  src: ['/click.wav'],
  volume: 0.5,
  preload: true,
});

export const playSparrow = new Howl({
  src: ['/sparrow.mp3'],
  volume: 0.5,
  preload: true,
});

export const isSoundMuted = () => muted;

export const setSoundMuted = (m) => {
  muted = !!m;
  try {
    localStorage.setItem('sound-muted', String(muted));
  } catch (e) {
    /* ignore storage errors */
  }
  Howler.mute(muted);
};
