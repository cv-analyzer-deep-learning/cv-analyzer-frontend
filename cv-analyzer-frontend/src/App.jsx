import { useEffect, useState } from 'react'
import './App.css'
import UploadForm from './components/UploadForm'
import Results from './components/Results'
import { analyzeCV } from './services/api'
import Spinner from './components/Spinner'
import SkeletonResults from './components/SkeletonResults'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { motion } from 'framer-motion'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = window.localStorage.getItem('theme')
  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  async function handleAnalyze(file, jobDesc) {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await analyzeCV(file, jobDesc)
      setResult(res)
    } catch (err) {
      setError(err?.message || 'Erreur lors de l\'analyse')
    } finally {
      setLoading(false)
    }
  }

  function clearError(nextError = null) {
    setError(nextError)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="app-shell flex-1 py-4 sm:py-6 lg:py-7">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.08fr_1.92fr] xl:gap-8">
          <div className="lg:sticky lg:top-6 self-start">
            <UploadForm
              onAnalyze={handleAnalyze}
              loading={loading}
              errorMessage={error}
              clearError={clearError}
            />
          </div>

          <div className="space-y-6 lg:pl-1">
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="app-card flex items-center gap-4 px-5 py-4 ring-1 ring-[color:var(--accent-border)]/50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-accent shadow-[0_0_24px_rgba(170,59,255,0.18)] dark:bg-[rgba(170,59,255,0.16)]">
                    <Spinner size={28} />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                      Analyse IA en cours
                    </div>
                    <div className="app-justify text-sm leading-6 text-[color:var(--text)]">
                      Extraction du CV, comparaison avec l’offre et génération du score.
                    </div>
                  </div>
                </div>

                <SkeletonResults />
              </motion.div>
            )}

            {error && !loading && !result && (
              <div className="app-card-strong border border-red-200 bg-red-50 px-4 py-4 text-red-800 shadow-[0_0_0_1px_rgba(248,113,113,0.08)]">
                {error}
              </div>
            )}

            {result && <Results result={result} theme={theme} />}

            {!loading && !result && (
              <div className="app-card px-4 py-4 text-[color:var(--text)]">
                <p className="app-justify leading-7">
                  Aucun résultat pour le moment. Chargez un CV PDF et collez une offre pour lancer la simulation.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
