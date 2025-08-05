// [locale]/progression/components/EvolutionChart.js
"use client"; // Nécessaire pour les bibliothèques de graphiques côté client
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { min: 60, max: 100, ticks: { stepSize: 10 } },
    x: { grid: { display: false } }
  }
};

const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'];
const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Progression',
      data: [65, 70, 75, 78, 82, 85],
      borderColor: 'rgb(251, 146, 60)',
      backgroundColor: 'rgba(251, 146, 60, 0.2)',
      tension: 0.4,
    },
  ],
};

const EvolutionChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-80">
      <Line options={options} data={data} />
    </div>
  );
};

export default EvolutionChart;