import { motion } from 'framer-motion'
import { FaMoon, FaSun } from 'react-icons/fa6'

export default function Navbar({ theme, onToggleTheme }) {
  const isDark = theme === 'dark'

  return (
    <header className="app-shell pt-4 sm:pt-5">
      <div className="app-card relative overflow-hidden flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(170,59,255,0.7)] to-transparent" />
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-[0.34em] text-accent">
            Analyseur de CV
          </div>
          <div className="text-lg font-semibold text-[color:var(--text-h)] sm:text-xl">
            matching d’offres
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex items-center gap-3 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-2 text-sm font-medium text-[color:var(--text-h)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
        >
          <motion.span
            key={theme}
            initial={{ rotate: -20, scale: 0.9, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
          </motion.span>
          <span className="hidden sm:inline transition-all duration-300">{isDark ? 'Light mode' : 'Dark mode'}</span>
        </button>
      </div>
    </header>
  )
}
