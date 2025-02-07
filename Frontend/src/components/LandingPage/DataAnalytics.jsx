import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataAnalytics = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Boys",
        data: [1200, 1900, 3000, 5000, 2400],
        backgroundColor: "white",
        borderColor: "#8b181b",
        borderWidth: 1,
      },
      {
        label: "Girls",
        data: [1500, 2500, 2800, 4800, 3000],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Boys vs Girls" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto  p-4 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Outpasses By Gender</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DataAnalytics;
