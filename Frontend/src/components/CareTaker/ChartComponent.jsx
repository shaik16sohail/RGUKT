import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ChartComponent = () => {
  // Data for Pie Chart
  const pieData = {
    labels: ["Pending", "Approved", "Emergency"],
    datasets: [
      {
        data: [5, 12, 3], // Sample data
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Data for Bar Graph
  const barData = {
    labels: ["Pending", "Approved", "Emergency"],
    datasets: [
      {
        label: "Outpasses",
        data: [5, 12, 3], // Sample data
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="flex flex-wrap justify-center  p-6">
      {/* Pie Chart */}
      <div className=" p-4 rounded-lg shadow-md  sm:w-1/2">
        <h2 className="text-xl font-semibold text-center mb-4">Outpasses Distribution</h2>
        <Pie data={pieData} />
      </div>

      {/* Bar Graph */}
      <div className=" p-4 rounded-lg shadow-md w-full sm:w-1/2">
        <h2 className="text-xl font-semibold text-center mb-4">Outpasses Summary</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default ChartComponent;
