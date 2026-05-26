import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaCircleCheck, FaTriangleExclamation, FaLightbulb } from 'react-icons/fa6'
import RadarChart from './RadarChart'

const cardMotion = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay },
  }),
}

export default function Results({ result, theme = 'light' }) {
  const [displayScore, setDisplayScore] = useState(0)
  const d = result?.data ?? result
  if (!d) return null
  const scoreTone = d.compatibility_score >= 75 ? 'text-emerald-500' : d.compatibility_score >= 50 ? 'text-amber-500' : 'text-rose-500'
  const scoreLabel = d.compatibility_score >= 75 ? 'Excellent matching' : d.compatibility_score >= 50 ? 'Matching moyen' : 'À améliorer'

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
    <motion.section
      initial="hidden"
      animate="visible"
      variants={cardMotion}
      className="app-card-strong space-y-6 p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold text-[color:var(--text-h)]">Résultats</h3>
          <p className="text-sm text-[color:var(--text)]">Lecture détaillée du CV, score, radar et recommandations.</p>
        </div>
        <div className="rounded-2xl bg-[color:var(--accent-bg)] px-4 py-3 text-right ring-1 ring-[color:var(--accent-border)]/60">
          <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--text)]">Score</div>
          <div className={`text-3xl font-bold leading-none ${scoreTone}`}>
            {displayScore}
            <span className="text-lg text-[color:var(--text)]">/100</span>
          </div>
          <div className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-h)]">
            {scoreLabel}
          </div>
        </div>
      </div>

      <motion.div
        variants={cardMotion}
        custom={0.05}
        className="app-card-strong overflow-visible rounded-3xl bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(255,255,255,0.92))] p-4 dark:bg-[linear-gradient(180deg,rgba(17,24,39,0.95),rgba(15,23,42,0.82))]"
      >
        <div className="rounded-2xl border border-[color:var(--border)]/70 bg-[radial-gradient(circle_at_center,rgba(170,59,255,0.08),transparent_60%)] p-3 shadow-inner sm:p-4">
            <div className="h-[320px] sm:h-[360px] lg:h-[390px]">
              <RadarChart data={d.radar_chart_data} theme={theme} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <motion.section
            variants={cardMotion}
            custom={0.12}
            className="rounded-3xl border border-green-200 bg-green-50/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-[rgba(34,197,94,0.12)]"
          >
            <div className="flex items-center gap-2 font-semibold text-green-800 dark:text-emerald-300">
              <FaCircleCheck />
              Compétences validées
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {d.matching_entities.map((entity) => (
                <li
                  key={entity}
                  className="rounded-full border border-green-200 bg-green-100 px-3.5 py-1.5 text-sm font-medium text-green-800 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] dark:border-green-400/30 dark:bg-green-400/15 dark:text-emerald-200"
                >
                  {entity}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            variants={cardMotion}
            custom={0.18}
            className="rounded-3xl border border-orange-200 bg-orange-50/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:bg-[rgba(249,115,22,0.12)]"
          >
            <div className="flex items-center gap-2 font-semibold text-orange-800 dark:text-orange-200">
              <FaTriangleExclamation />
              Compétences manquantes
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {d.missing_entities.map((entity) => (
                <li
                  key={entity}
                  className="rounded-full border border-orange-200 bg-orange-100 px-3.5 py-1.5 text-sm font-medium text-orange-800 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] dark:border-orange-400/30 dark:bg-orange-400/15 dark:text-orange-200"
                >
                  {entity}
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        <motion.section variants={cardMotion} custom={0.24} className="space-y-3">
          <h4 className="text-lg font-semibold text-[color:var(--text-h)]">Suggestions IA</h4>
          <div className="space-y-3">
            {d.actionable_feedback.map((tip, index) => (
              <article
                key={index}
                className="group flex gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(170,59,255,0.12)] dark:bg-[rgba(17,24,39,0.88)]"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent transition-transform group-hover:scale-105 dark:bg-[rgba(170,59,255,0.16)]">
                  <FaLightbulb />
                </div>
                <p className="app-justify text-[15px] leading-7 text-[color:var(--text)]">{tip}</p>
              </article>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.section>
  )
}
