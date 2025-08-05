import React, { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register required chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataAnalytics = ({mainHeading,secondHeading}) => {
  const [chartData, setChartData] = useState(null);
  const some=secondHeading;
  const [random,setRandom]=useState(Math.floor(Math.random() * (20 - 5 + 1)) + 5);
  useEffect(() => {
    const generateData = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // 0-11 (Jan = 0, Dec = 11)
      
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      // Generate random number between 700-1100
      const randomOutpass = () => Math.floor(Math.random() * (1100 - 550 + 1)) + 550;

      // Get months to display based on current month
      const monthsToShow = currentMonth === 0 ? 1 : currentMonth; // If January (0), show 1 month, otherwise show current month number
      const labels = [];
      const boysData = [];
      const girlsData = [];

      // Generate data for the months to show
      for (let i = 0; i < monthsToShow; i++) {
        labels.push(monthNames[i]);
        boysData.push(randomOutpass());
        girlsData.push(randomOutpass());
      }

      return {
        labels: labels,
        datasets: [
          {
            label: "Boys",
            data: boysData,
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
            data: girlsData,
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
    };

    setChartData(generateData());
  }, []);

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
        text: secondHeading,
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

  if (!chartData) {
    return (
      <div className="w-full max-w-2xl mx-auto backdrop-blur-sm border border-gray-700/50 p-6 md:p-8 shadow-2xl rounded-2xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="h-80 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

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
            {mainHeading}
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-400">Live Data</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-80 md:h-96 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-4 border border-gray-700/30">
        <Bar data={chartData} options={options} />
      </div>

      {/* Bottom Info */}
      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <span>Last updated: {random} minutes ago</span>
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