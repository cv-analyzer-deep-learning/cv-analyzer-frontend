import axios from 'axios'
import { analyze as mockAnalyze } from './mockApi'

// analyze: wrapper that currently uses the mock in dev, but shows the
// axios.post usage to make it easy to switch to a real backend later.
export async function analyze(file, jobDescription) {
  // Build form data (same format as the real backend expects)
  const formData = new FormData()
  formData.append('cv_file', file)
  formData.append('job_description', jobDescription)

  // For now we simulate the network call by returning the mock result.
  // If you want to call a real backend, replace the next line with the
  // axios.post call shown below.
  // const res = await axios.post('/api/v1/analyze', formData)
  // return res.data

  return mockAnalyze(file, jobDescription)
}
