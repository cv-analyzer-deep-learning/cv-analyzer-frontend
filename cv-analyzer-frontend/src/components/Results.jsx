import RadarChart from './RadarChart'

export default function Results({ result }) {
  if (!result) return null

  const d = result.data

  return (
    <section className="space-y-4 p-4 bg-white rounded shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Résultats</h3>
        <div className="text-sm text-gray-600">Score: <strong>{d.compatibility_score}</strong>/100</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <RadarChart data={d.radar_chart_data} />
        </div>
        <div className="space-y-3">
          <div>
            <h4 className="font-medium">Matching entities</h4>
            <ul className="flex flex-wrap gap-2 mt-2">
              {d.matching_entities.map((e) => (
                <li key={e} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">{e}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Missing entities</h4>
            <ul className="flex flex-wrap gap-2 mt-2">
              {d.missing_entities.map((e) => (
                <li key={e} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">{e}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Suggestions</h4>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
              {d.actionable_feedback.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
