import { useMemo, useState } from 'react'

function isPdfFile(file) {
  if (!file) return false
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
}

export default function UploadForm({ onAnalyze, loading, errorMessage, clearError }) {
  const [file, setFile] = useState(null)
  const [jobDesc, setJobDesc] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const fileLabel = useMemo(() => {
    if (!file) return 'Aucun fichier sélectionné'
    return file.name
  }, [file])

  function handleFile(e) {
    const f = e.target.files && e.target.files[0]
    if (f && !isPdfFile(f)) {
      clearError?.('❌ Le fichier PDF est invalide.')
      setFile(null)
      return
    }
    clearError?.('')
    setFile(f)
  }

  function submit(e) {
    e.preventDefault()
    if (!file) {
      clearError?.('❌ Le fichier PDF est invalide.')
      return
    }
    if (!jobDesc.trim()) {
      clearError?.('❌ La description de poste est vide.')
      return
    }
    onAnalyze(file, jobDesc)
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files && e.dataTransfer.files[0]
    if (droppedFile && !isPdfFile(droppedFile)) {
      clearError?.('❌ Le fichier PDF est invalide.')
      return
    }
    clearError?.('')
    setFile(droppedFile)
  }

  return (
    <form className="space-y-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100" onSubmit={submit}>
      <div>
        <label className="block text-sm font-semibold text-gray-700">Upload CV (PDF)</label>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          className={`mt-2 rounded-2xl border-2 border-dashed px-4 py-5 text-center transition-all ${
            isDragging ? 'border-accent bg-accent-50 shadow-[0_10px_40px_rgba(170,59,255,0.12)]' : 'border-gray-200 bg-gray-50'
          }`}
        >
          <div className="text-sm text-gray-600">
            Glissez-déposez votre PDF ici ou
            <label className="ml-1 inline-flex items-center font-semibold text-accent cursor-pointer hover:underline">
              choisissez un fichier
              <input type="file" accept=".pdf" onChange={handleFile} className="sr-only" />
            </label>
          </div>
          <div className="mt-2 text-sm text-gray-500">{fileLabel}</div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Job description</label>
        <textarea
          value={jobDesc}
          onChange={(e) => {
            setJobDesc(e.target.value)
            clearError?.('')
          }}
          rows={5}
          placeholder="Collez ici la description de l'offre"
          className="mt-2 w-full min-h-[10rem] rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent-50"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading || !file || !jobDesc}
          className="rounded-2xl bg-gradient-to-r from-accent to-fuchsia-500 px-5 py-3 text-white font-semibold shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {loading ? "Analyse en cours…" : "Lancer l'analyse"}
        </button>
        <div className="text-sm text-gray-500">Le traitement peut prendre quelques secondes.</div>
      </div>

      {errorMessage ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
          {errorMessage}
        </div>
      ) : null}
    </form>
  )
}
