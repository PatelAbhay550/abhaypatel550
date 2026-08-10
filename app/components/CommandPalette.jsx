'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import useModalA11y from '../../utils/useModalA11y';
import { isSoundMuted, setSoundMuted } from '../../utils/sounds';
import { applyTheme, getCurrentTheme } from '../../utils/theme';
import { FaTerminal } from 'react-icons/fa';

const COMMANDS = [
  { name: 'help', desc: 'Show available commands' },
  { name: 'about', desc: 'Who is Abhay?' },
  { name: 'projects', desc: 'List my projects' },
  { name: 'techstack', desc: 'Open the tech stack page' },
  { name: 'github', desc: 'Open my GitHub profile' },
  { name: 'email', desc: 'Copy my email to clipboard' },
  { name: 'resume', desc: 'Fetch the CLI resumé' },
  { name: 'theme', desc: 'theme dark | light | toggle' },
  { name: 'sound', desc: 'sound on | off | toggle' },
  { name: 'clear', desc: 'Clear the terminal' },
  { name: 'home', desc: 'Go to the home page' },
  { name: 'exit', desc: 'Close the palette (Esc works too)' },
];

const stripAnsi = (s) => s.replace(/\u001b\[[0-9;]*m/g, '');

/**
 * ⌘K command palette — a terminal-style overlay.
 * Global ⌘K / Ctrl+K opens it from anywhere (Navbar button too).
 */
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState([]);
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const { nodeRef, mounted } = useModalA11y(open, () => setOpen(false));

  // Global ⌘K/Ctrl+K + Navbar event
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-palette', onOpenEvent);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-palette', onOpenEvent);
    };
  }, []);

  // Reset per open + focus the input
  useEffect(() => {
    if (open) {
      setInput('');
      setHistIndex(-1);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Auto-scroll output to bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  if (!mounted || !open) return null;

  const push = (line) => setLines((prev) => [...prev, line]);
  const close = () => setOpen(false);

  const run = async (raw) => {
    const cmdText = raw.trim();
    if (!cmdText) return;
    push({ type: 'cmd', text: cmdText });
    setHistory((h) => [...h, cmdText]);
    setHistIndex(-1);

    const [name, ...args] = cmdText.toLowerCase().split(/\s+/);
    const arg = args.join(' ');

    switch (name) {
      case 'help': {
        push({ type: 'out', text: 'Available commands:' });
        COMMANDS.forEach((c) => push({ type: 'out', text: `  ${c.name.padEnd(12)} ${c.desc}` }));
        break;
      }
      case 'about':
      case 'whoami': {
        push({ type: 'out', text: 'Abhay Raj Patel — full-stack developer in Lucknow, India.' });
        push({ type: 'out', text: 'Next.js · React · Tailwind · TypeScript · ~5 years of experience.' });
        break;
      }
      case 'projects': {
        push({ type: 'out', text: '1. ExamRankCheck — https://examrankcheck.in/' });
        push({ type: 'out', text: '2. CricketDen — https://cricketden.live/' });
        push({ type: 'out', text: '3. IndiaElects — https://indiaelects.vercel.app/' });
        break;
      }
      case 'techstack':
      case 'tech': {
        push({ type: 'ok', text: 'Opening /tech-stack …' });
        close();
        router.push('/tech-stack');
        break;
      }
      case 'home': {
        push({ type: 'ok', text: 'Heading home …' });
        close();
        router.push('/');
        break;
      }
      case 'github': {
        push({ type: 'out', text: 'Opening https://github.com/PatelAbhay550 …' });
        window.open('https://github.com/PatelAbhay550', '_blank', 'noopener');
        break;
      }
      case 'email':
      case 'contact': {
        try {
          await navigator.clipboard.writeText('patelabhay550@gmail.com');
          push({ type: 'ok', text: 'patelabhay550@gmail.com copied to clipboard ✓' });
        } catch (e) {
          push({ type: 'err', text: 'Could not copy — email: patelabhay550@gmail.com' });
        }
        break;
      }
      case 'resume':
      case 'cli': {
        push({ type: 'dim', text: 'Fetching resumé …' });
        try {
          const res = await fetch('/api/cli');
          const txt = stripAnsi(await res.text());
          txt.split('\n').forEach((line) => push({ type: 'block', text: line }));
        } catch (e) {
          push({ type: 'err', text: 'Failed to fetch resumé.' });
        }
        break;
      }
      case 'theme': {
        const choice = arg || 'toggle';
        if (choice === 'dark') applyTheme('dark');
        else if (choice === 'light') applyTheme('light');
        else applyTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
        push({ type: 'ok', text: `Theme set to ${getCurrentTheme()}.` });
        break;
      }
      case 'sound': {
        const choice = arg || 'toggle';
        if (choice === 'on') setSoundMuted(false);
        else if (choice === 'off') setSoundMuted(true);
        else setSoundMuted(!isSoundMuted());
        push({ type: 'ok', text: `Sound ${isSoundMuted() ? 'muted' : 'on'}.` });
        break;
      }
      case 'clear':
        setLines([]);
        break;
      case 'exit':
      case 'q':
        close();
        break;
      default: {
        push({ type: 'err', text: `bash: ${name}: command not found` });
        push({ type: 'dim', text: "Type 'help' to see available commands." });
        break;
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      run(input);
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation(); // don't let the modal focus-trap intercept Tab autocomplete
      const match = COMMANDS.find((c) => c.name.startsWith(input.trim().toLowerCase()));
      if (match) setInput(match.name + ' ');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistIndex((i) => {
        const next = i < 0 ? history.length - 1 : Math.max(0, i - 1);
        if (history[next]) setInput(history[next]);
        return next;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistIndex((i) => {
        if (i < 0) return i;
        const next = i + 1;
        if (next >= history.length) {
          setInput('');
          return -1;
        }
        setInput(history[next]);
        return next;
      });
    }
  };

  const query = input.trim().toLowerCase();
  const suggestions = query
    ? COMMANDS.filter((c) => c.name.startsWith(query) || c.name.includes(query))
    : COMMANDS.slice(0, 6);

  return createPortal(
    <div
      ref={nodeRef}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={close}
      className="fixed inset-0 z-[10000] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-gray-950/95 font-mono text-sm shadow-2xl"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-gray-900/80 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-yellow-400" />
          <span className="size-2.5 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-gray-400">
            <FaTerminal className="mr-1 inline" />
            abhay@portfolio — command palette
          </span>
        </div>

        {/* Output */}
        <div
          ref={scrollRef}
          className="custom-scrollbar max-h-60 space-y-1 overflow-y-auto px-4 py-3 text-[13px] leading-relaxed"
        >
          {lines.length === 0 && (
            <p className="text-gray-500">
              Type a command. Try <span className="text-emerald-400">help</span> or{' '}
              <span className="text-emerald-400">resume</span>.
            </p>
          )}
          {lines.map((l, i) => {
            if (l.type === 'cmd')
              return (
                <p key={i} className="text-gray-200">
                  <span className="text-emerald-400">$ </span>
                  {l.text}
                </p>
              );
            if (l.type === 'block')
              return (
                <pre key={i} className="whitespace-pre-wrap text-[12px] leading-relaxed text-emerald-300/90">
                  {l.text}
                </pre>
              );
            if (l.type === 'err') return <p key={i} className="text-red-400">{l.text}</p>;
            if (l.type === 'ok') return <p key={i} className="text-emerald-300">{l.text}</p>;
            if (l.type === 'dim') return <p key={i} className="text-gray-500">{l.text}</p>;
            return <p key={i} className="text-gray-300">{l.text}</p>;
          })}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-white/10 bg-gray-900/60 px-4 py-3">
          <span className="text-emerald-400">➜</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command… (try: resume, projects, theme dark)"
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent text-emerald-300 outline-none placeholder:text-emerald-800/70"
            aria-label="Command input"
          />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="border-t border-white/5 bg-gray-900/40 px-2 py-1.5">
            {suggestions.map((s) => (
              <button
                key={s.name}
                onClick={() => {
                  run(s.name);
                  setInput('');
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-[13px] text-gray-300 transition-colors hover:bg-white/5 hover:text-emerald-300"
              >
                <span>{s.name}</span>
                <span className="text-xs text-gray-500">{s.desc}</span>
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-white/5 px-4 py-2 text-[11px] text-gray-500">
          Tab autocomplete · ↑/↓ history · Esc close
        </div>
      </div>
    </div>,
    document.body
  );
}
