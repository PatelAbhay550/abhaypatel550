import { Howl } from 'howler';

export const playClick = new Howl({
  src: ['/click.wav'],
  volume: 0.5,
  preload: true,
});