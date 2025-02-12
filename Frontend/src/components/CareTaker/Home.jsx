import React from 'react'
import '../../style/caretaker.css'
import ChartComponent from './ChartComponent';
export default function Home(){
    return (
        // <div className="min-h-screen bg-black-100 p-6">
        //   <div className="max-w-5xl mx-auto">
        //     {/* Header */}
        //     <h1 className="text-3xl font-bold mb-6 text-gray-800">🏠 Warden Dashboard</h1>
            
        //     {/* Quick Stats Section */}
        //     <div className="grid grid-cols-3 gap-4 mb-6">
        //       <div className="bg-white p-4 rounded-lg shadow-md text-center">
        //         <h2 className="text-xl font-semibold">✅ Pending Outpasses</h2>
        //         <p className="text-2xl text-blue-600 font-bold">5</p>
        //       </div>
        //       <div className="bg-white p-4 rounded-lg shadow-md text-center">
        //         <h2 className="text-xl font-semibold">🛠️ Unresolved Issues</h2>
        //         <p className="text-2xl text-red-600 font-bold">3</p>
        //       </div>
        //       <div className="bg-white p-4 rounded-lg shadow-md text-center">
        //         <h2 className="text-xl font-semibold">👥 Students Outside</h2>
        //         <p className="text-2xl text-green-600 font-bold">12</p>
        //       </div>
        //     </div>
    
        //     {/* Urgent Actions */}
        //     <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        //       <h2 className="text-2xl font-semibold mb-3">🚨 Urgent Actions</h2>
        //       <ul className="list-disc pl-6 text-gray-700">
        //         <li>🔴 2 Outpasses Expiring Soon</li>
        //         <li>🔧 1 Critical Issue: Mess Food Complaint</li>
        //       </ul>
        //     </div>
    
        //     {/* Live Status */}
        //     <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        //       <h2 className="text-2xl font-semibold mb-3">📍 Live Status (Last 24 Hours)</h2>
        //       <p className="text-gray-700">⏳ Pending Approvals: 5 | Unresolved Issues: 3</p>
        //       <p className="text-gray-700">🌐 Real-time Tracking Enabled</p>
        //     </div>
    
        //     {/* Navigation Buttons */}
        //     <div className="flex gap-4">
        //       <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
        //         Go to Approvals
        //       </button>
        //       <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-700">
        //         Go to Issues
        //       </button>
        //       <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700">
        //         Go to Live Tracking
        //       </button>
        //     </div>
        //   </div>
        // </div>
        <>
            <div className='caretaker-home'>
                <div className='home-outpasses'>
                    <div className='home-outpasses-first'>
                        <div className='home-outpasses-firstIn'>

                        </div>
                    </div>
                    <div className='home-outpasses-first'>
                    <div className='home-outpasses-firstIn'>

</div>
                    </div>
                    <div className='home-outpasses-first'>
                    <div className='home-outpasses-firstIn'>

</div>
                    </div>

                </div>
                {/* <div className='home-stats'> */}
                    <ChartComponent/>
                {/* </div> */}

                <br>
                </br>
                <br></br>
                <br></br>
            </div>
        </>
      );
}