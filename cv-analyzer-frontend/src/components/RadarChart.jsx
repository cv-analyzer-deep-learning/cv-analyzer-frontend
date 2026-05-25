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

  const options = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          color: '#8b8b98',
        },
        grid: {
          color: 'rgba(214, 214, 226, 0.8)',
        },
        angleLines: {
          color: 'rgba(214, 214, 226, 0.8)',
        },
        pointLabels: {
          color: '#6b6375',
          font: {
            size: 12,
            family: 'Inter, system-ui, Segoe UI, Roboto, sans-serif',
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
    <div className="w-full h-64">
      <Radar data={chartData} options={options} />
    </div>
  )
}
