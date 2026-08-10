export function openPalette() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-palette'));
  }
}
