import { useState } from 'react'

export default function UploadForm({ onAnalyze, loading }) {
  const [file, setFile] = useState(null)
  const [jobDesc, setJobDesc] = useState('')

  function handleFile(e) {
    const f = e.target.files && e.target.files[0]
    setFile(f)
  }

  function submit(e) {
    e.preventDefault()
    if (!file || !jobDesc) return
    onAnalyze(file, jobDesc)
  }

  return (
    <form className="space-y-4 p-4 bg-white rounded shadow" onSubmit={submit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload CV (PDF)</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFile}
          className="mt-2"
        />
        {file && <div className="text-xs text-gray-500 mt-1">{file.name}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Job description</label>
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          rows={5}
          placeholder="Collez ici la description de l'offre"
          className="mt-2 w-full border rounded p-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading || !file || !jobDesc}
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? 'Analyse en cours…' : "Lancer l'analyse"}
        </button>
        <div className="text-sm text-gray-500">Le traitement peut prendre quelques secondes.</div>
      </div>
    </form>
  )
}
