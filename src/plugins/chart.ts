import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

// Register all chart essentials here ONCE
ChartJS.register(
  CategoryScale, // X axis
  LinearScale, // Y axis
  PointElement, // Dot points
  LineElement, // Line charts
  BarElement, // Bar charts support
  Title,
  Tooltip,
  Legend,
  Filler // For area charts (optional but useful)
)

// You can also export ChartJS if needed
export default ChartJS
