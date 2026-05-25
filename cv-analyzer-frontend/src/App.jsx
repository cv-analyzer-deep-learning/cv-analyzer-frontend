import { useState } from 'react'
import './App.css'
import UploadForm from './components/UploadForm'
import Results from './components/Results'
import { analyze } from './api/mockApi'

function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleAnalyze(file, jobDesc) {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await analyze(file, jobDesc)
      setResult(res)
    } catch (err) {
      setError('Erreur lors de l\'analyse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UploadForm onAnalyze={handleAnalyze} loading={loading} />
        </div>

        <div className="md:col-span-2">
          {loading && (
            <div className="p-4 bg-white rounded shadow text-center">Analyse en cours…</div>
          )}

          {error && (
            <div className="p-4 bg-red-100 text-red-800 rounded mb-4">{error}</div>
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
