import axios from 'axios'
import { mockResponse } from '../data/mockData'

export const analyzeCV = (file, jobText) => {
  const formData = new FormData()
  formData.append('cv_file', file)
  formData.append('job_description', jobText)

  if (import.meta.env.VITE_USE_REAL_BACKEND === 'true') {
    return axios.post('/api/v1/analyze', formData).then((response) => response.data)
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!file) {
        reject(new Error('❌ Le fichier PDF est invalide.'))
        return
      }

      if (!jobText || !jobText.trim()) {
        reject(new Error('❌ La description de poste est vide.'))
        return
      }

      if (file.type !== 'application/pdf') {
        reject(new Error('❌ Le fichier PDF est invalide.'))
        return
      }

      resolve(mockResponse)
    }, 3000)
  })
}
