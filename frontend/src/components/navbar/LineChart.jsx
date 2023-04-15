import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
<style>
  @import url('https://fonts.googleapis.com/css2?family=Gloock&display=swap');
</style>

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const data = {
  labels: labels,
  datasets: [
    {
      //label: 'My First Dataset',
      //backgroundColor: "#171616",
      borderColor: "#E635E4",
      data: [0, 10, 5, 2, 20, 30, 45, -1, -10, 50, 111, 12],
      tension: 0.5
    },
  ],
};
const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
  aspectRatio: 2,
  maintainAspectRatio: false,
  scales: {
    x:{
      ticks:{
        font: {
          color: '#171616',
          size: 14,
          family: "'Gloock', serif",
        }
     }
    },
    y:{
      ticks:{
        font: {
          color: '#171616',
          size: 14,
          family: "'Gloock', serif",
        }
     }
    }
  }
};


const LineChart = () => {
  return (
    <div>
      <Line data={data} options={options} width={"100px"} height={"320px"}/>
    </div>
  );
};

export default LineChart;