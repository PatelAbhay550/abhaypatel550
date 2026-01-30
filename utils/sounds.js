import { Howl } from 'howler';
// i have added sparrow.mp3 in public folder
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