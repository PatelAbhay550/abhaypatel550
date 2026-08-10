'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FaGithub,
  FaMoon,
  FaSun,
  FaVolumeUp,
  FaVolumeMute,
  FaTerminal,
  FaLayerGroup,
} from 'react-icons/fa';
import { playClick, isSoundMuted, setSoundMuted } from '../../utils/sounds';
import { applyTheme, getInitialTheme } from '../../utils/theme';
import { openPalette } from '../../utils/palette';

const links = [
  { href: '/', label: 'Home' },
  { href: '/tech-stack', label: 'Tech Stack' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState('light');
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMuted(isSoundMuted());
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
    setTheme(next);
    if (playClick) playClick.play();
  };

  const toggleSound = () => {
    const next = !muted;
    setSoundMuted(next);
    setMuted(next);
    if (playClick) playClick.play();
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Scroll progress */}
      <div
        className="absolute left-0 top-0 h-[3px] bg-blue-600 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />

      <nav className="border-b border-gray-200/70 bg-white/75 backdrop-blur-md dark:border-white/10 dark:bg-gray-950/70">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-4 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => { if (playClick) playClick.play(); }}
            className="group flex items-center gap-2.5"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-blue-600 text-sm font-black text-white transition-transform group-hover:scale-105">
              AP
            </span>
            <span className="hidden text-sm font-bold text-gray-900 sm:block dark:text-white">
              Abhay Patel
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => { if (playClick) playClick.play(); }}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <Link
              href="/tech-stack"
              onClick={() => { if (playClick) playClick.play(); }}
              aria-label="Tech stack"
              className="grid size-9 place-items-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-white/10"
            >
              <FaLayerGroup />
            </Link>
            <a
              href="https://github.com/PatelAbhay550"
              target="_blank"
              rel="noreferrer"
              onClick={() => { if (playClick) playClick.play(); }}
              aria-label="GitHub"
              className="grid size-9 place-items-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
            >
              <FaGithub />
            </a>
            <button
              onClick={toggleSound}
              aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
              className="grid size-9 place-items-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
            >
              {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="grid size-9 place-items-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
            <button
              onClick={() => { if (playClick) playClick.play(); openPalette(); }}
              aria-label="Open command palette (Cmd K)"
              className="flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-2.5 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-100 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10"
            >
              <FaTerminal />
              <span className="hidden sm:inline">⌘K</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
