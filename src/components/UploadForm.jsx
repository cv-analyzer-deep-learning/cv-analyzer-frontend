import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FaFilePdf } from 'react-icons/fa6'

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
    <motion.form
      layout
      className={`app-card-strong space-y-5 p-5 sm:p-6 transition-opacity duration-300 ${loading ? 'opacity-70 pointer-events-none select-none' : ''}`}
      onSubmit={submit}
      animate={{ boxShadow: loading ? '0 0 0 1px rgba(170,59,255,0.12), 0 24px 55px -22px rgba(15,23,42,0.18)' : undefined }}
    >
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[color:var(--text-h)]">
          <FaFilePdf className="text-accent" />
          Upload CV (PDF)
          <span className="rounded-full border border-[color:var(--border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--text)]">
            PDF uniquement
          </span>
        </label>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          className={`mt-2 rounded-2xl border-2 border-dashed px-4 py-5 text-center transition-all duration-300 ${
            isDragging
              ? 'border-accent bg-[color:var(--accent-bg)] shadow-[0_0_0_1px_rgba(170,59,255,0.1),0_16px_38px_rgba(170,59,255,0.12)] translate-y-[-1px]'
              : 'border-[color:var(--border)] bg-[color:var(--surface-strong)] hover:border-accent/60 hover:shadow-[0_0_0_1px_rgba(170,59,255,0.05)]'
          }`}
        >
          <div className="app-justify text-sm leading-6 text-[color:var(--text-h)] transition-all duration-300">
            Glissez-déposez votre PDF ici ou
            <label className="ml-1 inline-flex items-center font-semibold text-accent cursor-pointer hover:underline">
              choisissez un fichier
              <input type="file" accept=".pdf" onChange={handleFile} className="sr-only" />
            </label>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1.5 text-sm text-[color:var(--text-h)] shadow-sm transition-all duration-300">
            <FaFilePdf className="text-accent" />
            <span className="max-w-full truncate">{fileLabel}</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[color:var(--text-h)]">Job description</label>
        <textarea
          value={jobDesc}
          onChange={(e) => {
            setJobDesc(e.target.value)
            clearError?.('')
          }}
          rows={5}
          placeholder="Collez ici la description de l'offre"
          className="mt-2 w-full min-h-[10rem] rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-3 text-[color:var(--text-h)] shadow-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent-50"
        />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={loading || !file || !jobDesc}
          className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#8b5cf6] via-accent to-fuchsia-500 px-6 text-base font-semibold text-white shadow-[0_12px_28px_rgba(170,59,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(170,59,255,0.34)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 sm:min-w-[220px]"
        >
          <span>{loading ? 'Analyse en cours…' : '✨ Analyser le CV'}</span>
        </button>
        <div className="app-justify w-full text-center text-[13px] leading-5 text-[color:var(--text)] sm:whitespace-nowrap sm:text-sm sm:leading-6">
          Le traitement peut prendre quelques secondes.
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
          {errorMessage}
        </div>
      ) : null}
    </motion.form>
  )
}
