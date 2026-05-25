import { useState } from 'react'
import './App.css'
import UploadForm from './components/UploadForm'
import Results from './components/Results'
import { analyzeCV } from './services/api'
import Spinner from './components/Spinner'
import SkeletonResults from './components/SkeletonResults'

function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

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
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UploadForm
            onAnalyze={handleAnalyze}
            loading={loading}
            errorMessage={error}
            clearError={clearError}
          />
        </div>

        <div className="md:col-span-2">
          {loading && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-indigo-100 bg-white/90 shadow-sm px-5 py-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-accent">
                  <Spinner size={28} />
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
                    Analyse IA en cours
                  </div>
                  <div className="text-sm text-gray-500">
                    Extraction du CV, comparaison avec l’offre et génération du score.
                  </div>
                </div>
              </div>

              <SkeletonResults />
            </div>
          )}

          {error && !loading && !result && (
            <div className="p-4 bg-red-100 text-red-800 rounded-2xl mb-4 border border-red-200 shadow-sm">
              {error}
            </div>
          )}

          {result && <Results result={result} />}

          {!loading && !result && (
            <div className="p-4 text-gray-600">Aucun résultat — lancez une analyse avec votre CV et la description de l'offre.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
