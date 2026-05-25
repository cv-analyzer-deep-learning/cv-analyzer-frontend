export default function Footer() {
  return (
    <footer className="app-shell mt-auto pb-4 sm:pb-5 pt-3 sm:pt-4 opacity-80">
      <div className="rounded-2xl border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm text-[color:var(--text)] sm:flex sm:items-center sm:justify-between sm:px-6">
        <p className="app-justify max-w-2xl leading-6">
          Interface frontend indépendante, pensée pour simuler le backend, tester le loading et préparer la bascule vers
          l’API réelle sans casser l’expérience utilisateur.
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[color:var(--text-h)] sm:mt-0">
          CV Analyzer Frontend
        </p>
      </div>
    </footer>
  )
}
