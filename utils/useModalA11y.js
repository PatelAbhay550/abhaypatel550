import { useEffect, useRef, useState } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Shared modal accessibility hook used by ProjectModal, FaqModal and the ⌘K palette.
 *
 * - mount flag (so createPortal can safely render client-side)
 * - Escape closes the modal
 * - body scroll lock while open (saves/restores previous styles)
 * - focus trap: focuses the first *visible* focusable, wraps Tab, restores focus on close
 *
 * NOTE: all effects live in this hook, so call it before any early return.
 */
export default function useModalA11y(open, onClose) {
  const nodeRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      width: body.style.width,
    };
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.width = '100%';
    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.width = prev.width;
    };
  }, [open]);

  // Focus trap + restore
  useEffect(() => {
    if (!open) return;
    const dialog = nodeRef.current;
    if (!dialog) return;
    const previouslyFocused = document.activeElement;

    // Only count focusables that are actually visible (modals render
    // separate mobile + desktop views in the same tree).
    const visibleFocusables = () =>
      Array.from(dialog.querySelectorAll(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);

    const first = visibleFocusables()[0];
    if (first) first.focus();

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const items = visibleFocusables();
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    dialog.addEventListener('keydown', onKeyDown);
    return () => {
      dialog.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [open]);

  return { nodeRef, mounted };
}
