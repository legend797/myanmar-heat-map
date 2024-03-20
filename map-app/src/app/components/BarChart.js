import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => 10),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const customLabels = ['100', '200', '300', '400', '500', '600', '700'];

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
    datalabels: {
      display: true,
      color: 'black',
      align: 'end',
      anchor: 'end',
      formatter: (value, context) => {
        return customLabels[context.dataIndex];
      },
    },
  },
  scales: {
    y: {
      position: 'right',
    },
    x: {
      display: false,
    },
  },
};

export default function HorizonBarChart() {
  return <Bar options={options} data={data} />;
}