import React from 'react'
import '../../style/caretaker.css'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Pie, Bar } from "react-chartjs-2";
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Home () {
  const [outpasses, setOutpasses] = useState([])
  const [issues, setIssues] = useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/caretaker/home`, {
        withCredentials: true
      })
      console.log(res.data)
      console.log(res.data.outpass)
      setOutpasses(res.data.outpass)
      setIssues(res.data.issue)
    } catch (err) {
      console.log(err)
      alert('something gone wrong')
    }
  }

  // Enhanced Chart Component with dynamic data
  const ChartComponent = () => {
    const pendingOutpasses = outpasses.filter(outpass => outpass.status === "pending").length;
    const completedOutpasses = outpasses.filter(outpass => outpass.status === "completed").length;
    const pendingIssues = issues.filter(issue => issue.status === "pending").length;

    // Data for Pie Chart
    const pieData = {
      labels: ["Pending Outpasses", "Completed Outpasses", "Pending Issues"],
      datasets: [
        {
          data: [pendingOutpasses, completedOutpasses, pendingIssues],
          backgroundColor: ["#FF6B6B", "rgba(139, 24, 26, 0.8)", "rgba(239, 68, 68, 0.8)"],
          borderColor: ["#FF5252", "rgba(139, 24, 26, 0.8)", "rgba(239, 68, 68, 0.8)"],
          borderWidth: 2,
          hoverBackgroundColor: ["#FF8A80", "rgba(139, 24, 26, 0.8)", "rgba(239, 68, 68, 0.8)"],
        },
      ],
    };

    // Data for Bar Graph
    const barData = {
      labels: ["Pending Outpasses", "Completed Outpasses", "Pending Issues"],
      datasets: [
        {
          label: "Count",
          data: [pendingOutpasses, completedOutpasses, pendingIssues],
          backgroundColor: ["#FF6B6B", "rgba(139, 24, 26, 0.8)", "rgba(239, 68, 68, 0.8)"],
          borderColor: ["#FF5252", "rgba(139, 24, 26, 0.8)", "rgba(239, 68, 68, 0.8)"],
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: ["#FF8A80", "rgba(139, 24, 26, 0.8)", "rgba(239, 68, 68, 0.8)"],
        },
      ],
    };

    // Chart Options for dark theme
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#ffffff',
            font: {
              size: 12,
              family: 'Arial, sans-serif'
            }
          }
        },
        tooltip: {
          backgroundColor: '#2d2d2d',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#555555',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#ffffff',
            font: {
              size: 11
            }
          },
          grid: {
            color: '#404040'
          }
        },
        y: {
          ticks: {
            color: '#ffffff',
            font: {
              size: 11
            }
          },
          grid: {
            color: '#404040'
          }
        }
      }
    };

    return (
      <div className="home-charts">
        {/* Pie Chart */}
        <div className="chart-container">
          <div className="chart-header">
            <h2>Distribution Overview</h2>
          </div>
          <div className="chart-content">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>

        {/* Bar Graph */}
        <div className="chart-container">
          <div className="chart-header">
            <h2>Summary Statistics</h2>
          </div>
          <div className="chart-content">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='caretaker-home'>
        <div className='home-outpasses'>
          <div className='home-outpasses-first'>
            <div className='home-outpasses-firstIn'>
              <div className="stat-content">
                <div className="stat-icon">📋</div>
                <h1>{outpasses.filter(outpass => outpass.status === "pending").length}</h1>
                <p>Pending Outpasses</p>
              </div>
            </div>
          </div>
          <div className='home-outpasses-first'>
            <div className='home-outpasses-firstIn'>
              <div className="stat-content">
                <div className="stat-icon">⚠️</div>
                <h1>{issues.filter(issue => issue.status === "pending").length}</h1>
                <p>Pending Issues</p>
              </div>
            </div>
          </div>
          <div className='home-outpasses-first'>
            <div className='home-outpasses-firstIn'>
              <div className="stat-content">
                <div className="stat-icon">✅</div>
                <h1>{outpasses.filter(outpass => outpass.status === "completed").length}</h1>
                <p>Completed Outpasses</p>
              </div>
            </div>
          </div>
        </div>
        
        <ChartComponent />

        <br></br>
        <br></br>
        <br></br>
      </div>
    </>
  )
}