import React from 'react';
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
        backgroundColor: "rgba(139, 24, 26, 0.8)",
        borderColor: "rgba(139, 24, 26, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: "rgba(139, 24, 26, 1)",
        hoverBorderColor: "rgba(139, 24, 26, 1)",
      },
      {
        label: "Girls",
        data: [1500, 2500, 2800, 4800, 3000],
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: "rgba(239, 68, 68, 1)",
        hoverBorderColor: "rgba(239, 68, 68, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: "top",
        labels: {
          color: '#f3f4f6',
          font: {
            size: 14,
            weight: '600'
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20
        }
      },
      title: { 
        display: true, 
        text: "Monthly Outpass Statistics",
        color: '#f3f4f6',
        font: {
          size: 16,
          weight: '700'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#f3f4f6',
        bodyColor: '#f3f4f6',
        borderColor: 'rgba(139, 24, 26, 1)',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} outpasses`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        },
        ticks: {
          color: '#d1d5db',
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
        },
        ticks: {
          color: '#d1d5db',
          font: {
            size: 12,
            weight: '500'
          },
          callback: function(value) {
            return value >= 1000 ? (value/1000) + 'k' : value;
          }
        }
      },
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <div 
      className="w-full max-w-2xl mx-auto backdrop-blur-sm border border-gray-700/50 p-6 md:p-8 shadow-2xl rounded-2xl hover:border-red-600/50 transition-all duration-300 group"
      style={{
        background: '#000000'
      }}
    >
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Outpasses By Gender
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Live Data</span>
          </div>
        </div>
        {/* <p className="text-gray-400 text-sm md:text-base">
          Monthly comparison of outpass applications
        </p> */}
      </div>

      {/* Stats Summary */}
      {/* <div className="grid grid-cols-2 gap-4 mb-6"> */}
        {/* <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm rounded-xl p-4 border border-red-600/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-300 text-sm font-medium">Total Boys</p>
              <p className="text-2xl font-bold text-white">13.5k</p>
            </div>
            <div className="w-8 h-8 bg-red-600/30 rounded-lg flex items-center justify-center">
              <span className="text-red-400 text-lg">👨</span>
            </div>
          </div>
        </div> */}
        {/* <div className="bg-gradient-to-r from-pink-600/20 to-pink-700/20 backdrop-blur-sm rounded-xl p-4 border border-pink-600/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-300 text-sm font-medium">Total Girls</p>
              <p className="text-2xl font-bold text-white">16.6k</p>
            </div>
            <div className="w-8 h-8 bg-pink-600/30 rounded-lg flex items-center justify-center">
              <span className="text-pink-400 text-lg">👩</span>
            </div>
          </div>
        </div> */}
      {/* </div> */}

      {/* Chart Container */}
      <div className="relative h-80 md:h-96 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-4 border border-gray-700/30">
        <Bar data={data} options={options} />
      </div>

      {/* Bottom Info */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <span>Last updated: 2 minutes ago</span>
          <div className="flex items-center mt-2 sm:mt-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-600 rounded mr-2"></div>
                <span>Boys Hostel</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded mr-2"></div>
                <span>Girls Hostel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalytics;