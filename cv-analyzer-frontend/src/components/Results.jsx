import { useEffect, useState } from 'react'
import { FaCircleCheck, FaTriangleExclamation, FaLightbulb } from 'react-icons/fa6'
import RadarChart from './RadarChart'

export default function Results({ result }) {
  const [displayScore, setDisplayScore] = useState(0)
  const d = result?.data

  useEffect(() => {
    if (!result) return undefined

    let frame = 0
    const target = d.compatibility_score
    const start = performance.now()

    function step(now) {
      const progress = Math.min((now - start) / 900, 1)
      setDisplayScore(Math.round(target * progress))
      if (progress < 1) frame = window.requestAnimationFrame(step)
    }

    frame = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frame)
  }, [result, d?.compatibility_score])

  if (!result) return null

  return (
    <section className="space-y-5 rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl font-semibold text-gray-800">Résultats</h3>
        <div className="rounded-2xl bg-accent-50 px-4 py-3 text-right">
          <div className="text-xs uppercase tracking-[0.2em] text-gray-500">Score</div>
          <div className="text-3xl font-bold leading-none text-accent">
            {displayScore}
            <span className="text-lg text-gray-500">/100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="h-[310px]">
            <RadarChart data={d.radar_chart_data} />
          </div>
        </div>

        <div className="space-y-4">
          <section className="rounded-3xl border border-green-100 bg-green-50/70 p-4 shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-green-800">
              <FaCircleCheck />
              Compétences validées
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {d.matching_entities.map((entity) => (
                <li
                  key={entity}
                  className="rounded-full border border-green-200 bg-green-100 px-3 py-1 text-sm font-medium text-green-800 shadow-sm"
                >
                  {entity}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-orange-100 bg-orange-50/70 p-4 shadow-sm">
            <div className="flex items-center gap-2 font-semibold text-orange-800">
              <FaTriangleExclamation />
              Compétences manquantes
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {d.missing_entities.map((entity) => (
                <li
                  key={entity}
                  className="rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800 shadow-sm"
                >
                  {entity}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h4 className="font-medium text-gray-700">Suggestions IA</h4>
            <div className="space-y-3">
              {d.actionable_feedback.map((tip, index) => (
                <article
                  key={index}
                  className="group flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent transition-transform group-hover:scale-105">
                    <FaLightbulb />
                  </div>
                  <p className="text-sm leading-6 text-gray-700">{tip}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
