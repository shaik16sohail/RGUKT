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

  // Chart Options for Scaling
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows manual size control
  };

  return (
    <div className="flex flex-wrap justify-around items-center p-6">
      {/* Pie Chart */}
      <div className=" p-6 rounded-lg shadow-md w-full sm:w-1/3 h-80 w-40">
        <h2 className="text-xl font-semibold text-center mb-4">Outpasses Distribution</h2>
        <div className="h-80"> {/* Adjust chart height */}
          <Pie data={pieData} options={chartOptions} />
        </div>
      </div>

      {/* Bar Graph */}
      <div className=" p-6 rounded-lg shadow-md w-full sm:w-1/3 h-80 w-40">
        <h2 className="text-xl font-semibold text-center mb-4">Outpasses Summary</h2>
        <div className="h-80"> {/* Adjust chart height */}
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
