import Link from "next/link";
import { FaGithub, FaHome, FaTerminal } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24">
      {/* Terminal window */}
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-800 bg-gray-950/95 font-mono text-sm shadow-2xl dark:border-white/10">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-4 py-3 dark:border-white/10">
          <span className="size-3 rounded-full bg-red-400" />
          <span className="size-3 rounded-full bg-yellow-400" />
          <span className="size-3 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-gray-400">abhay@portfolio — 404</span>
        </div>

        {/* Body */}
        <div className="space-y-2 px-5 py-6 text-gray-300">
          <p>
            <span className="text-emerald-400">$</span> cd ~/this-page
          </p>
          <p className="text-red-400">bash: cd: ~/this-page: No such file or directory</p>

          <p className="pt-3">
            <span className="text-emerald-400">$</span> ls ~/portfolio
          </p>
          <p className="text-blue-300">
            <span className="text-gray-300">/</span> <span className="text-gray-300">tech-stack/</span>{" "}
            <span className="text-gray-300">README.md</span> <span className="text-gray-300">sparrow.mp3</span>
          </p>

          <p className="pt-3">
            <span className="text-emerald-400">$</span> cat error.log
          </p>
          <p className="text-yellow-300">
            404 — command not found. The page is missing, but you're not! 🐦
          </p>

          <p className="pt-3">
            <span className="text-emerald-400">$</span>{" "}
            <span className="terminal-cursor text-emerald-400">▊</span>
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="main-btn flex items-center gap-2 text-base">
          <FaHome /> Take me home
        </Link>
        <Link
          href="/tech-stack"
          className="flex items-center gap-2 rounded-full border-2 border-gray-200 px-6 py-2 text-base font-bold tracking-widest text-gray-700 transition-all hover:border-blue-600 hover:text-blue-600 active:scale-95 dark:border-white/15 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
        >
          <FaTerminal /> View tech stack
        </Link>
        <a
          href="https://github.com/PatelAbhay550"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border-2 border-gray-200 px-6 py-2 text-base font-bold tracking-widest text-gray-700 transition-all hover:border-blue-600 hover:text-blue-600 active:scale-95 dark:border-white/15 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-400"
        >
          <FaGithub /> GitHub
        </a>
      </div>

      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        Tip: press <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono dark:bg-white/10">⌘K</kbd> to
        open the command palette from anywhere.
      </p>
    </main>
  );
}
