import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function RadarChart({ data, theme = 'light' }) {
  const labels = [
    'Technical skills',
    'Domain knowledge',
    'Infrastructure',
    'Soft skills',
    'Experience',
  ]

  const values = [
    data?.technical_skills ?? 0,
    data?.domain_knowledge ?? 0,
    data?.infrastructure ?? data?.tooling_and_infrastructure ?? 0,
    data?.soft_skills ?? 0,
    data?.experience ?? data?.experience_level ?? 0,
  ]

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Compétences',
        data: values,
        backgroundColor: 'rgba(170, 59, 255, 0.18)',
        borderColor: 'rgba(170, 59, 255, 1)',
        borderWidth: 2.5,
        pointBackgroundColor: 'rgba(170,59,255,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(170,59,255,1)',
        pointRadius: 4,
        pointHoverRadius: 5,
      },
    ],
  }

  const isDark = theme === 'dark'
  const labelColor = isDark ? '#e2e8f0' : '#334155'
  const tickColor = isDark ? '#b8c0cf' : '#64748b'
  const gridColor = isDark ? 'rgba(214, 214, 226, 0.8)' : 'rgba(148, 163, 184, 0.7)'

  const options = {
    layout: {
      // increase padding so outer labels aren't clipped by the container
      padding: 28,
    },
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          color: tickColor,
        },
        grid: {
          color: gridColor,
        },
        angleLines: {
          color: gridColor,
        },
        pointLabels: {
          color: labelColor,
          padding: 20,
          font: {
            size: 14,
            family: 'Inter, system-ui, Segoe UI, Roboto, sans-serif',
            weight: '600',
          },
        },
      },
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="w-full h-full min-h-[300px]">
      <Radar key={theme} data={chartData} options={options} />
    </div>
  )
}
