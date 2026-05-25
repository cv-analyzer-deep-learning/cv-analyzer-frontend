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

export default function RadarChart({ data }) {
  const labels = [
    'Technical skills',
    'Domain knowledge',
    'Tooling & infra',
    'Soft skills',
    'Experience',
  ]

  const values = [
    data?.technical_skills ?? 0,
    data?.domain_knowledge ?? 0,
    data?.tooling_and_infrastructure ?? 0,
    data?.soft_skills ?? 0,
    data?.experience_level ?? 0,
  ]

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Compétences',
        data: values,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99,102,241,1)'
      },
    ],
  }

  const options = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: { stepSize: 1 },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="w-full h-64">
      <Radar data={chartData} options={options} />
    </div>
  )
}
