import React,{useState} from 'react'
import '../../style/student.css';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const RequestOutpass=()=>{
    const [normalOutpasses, setNormalOutpasses] = useState(1000); // Example: Remaining normal outpasses
    const [emergencyOutpasses, setEmergencyOutpasses] = useState(3000); // Example: Remaining emergency outpasses
    return(
        <div className='request-outpass'>
            <div className='request-outpassIn'>
                <h1 className='font-bold mb-3 text-center text-3xl'>Instructions</h1>
                <ol className="list-decimal ml-5 text-justify">
                    <li className='mt-3'>aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer</li>
                    <li className='mt-2'>aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer</li>
                    <li className='mt-2'>aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer</li>
                    <li className='mt-2'>aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer</li>
                    <li className='mt-2'>aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer</li>
                    <li className='mt-2'>aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer</li>
                    <li className='mt-2'>aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer aspernatur aut odit aut fugit, sed quia  minima veniam, quis nostrum exer</li>
                </ol>
            </div>
            <div className="flex justify-center gap-6 mt-10">
      {/* Normal Outpass */}
      <Link to='/student/normal' className="w-64 p-6 text-center bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition cursor-pointer">
        <h2 className="text-xl font-bold">Normal Outpass</h2>
        <p className="text-sm">Apply for a regular outpass.</p>
        {/* Animated Counter */}
        <CountUp start={0} end={normalOutpasses} duration={1.5} className="text-4xl font-bold mt-2" />
        <p className="text-xs">Remaining Outpasses</p>
      </Link>

      {/* Emergency Outpass */}
      <div  className="w-64 p-6 text-center bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition cursor-pointer">
        <h2 className="text-xl font-bold">Emergency Outpass</h2>
        <p className="text-sm">Request an emergency outpass.</p>
        {/* Animated Counter */}
        <CountUp start={0} end={emergencyOutpasses} duration={1.5} className="text-4xl font-bold mt-2" />
        <p className="text-xs">Remaining Outpasses</p>
      </div>
    </div>
            
        </div>
    );
}

export default RequestOutpass;

// import { Link } from "react-router-dom";
// import CountUp from "react-countup";
// import { useState, useEffect } from "react";

// const OutpassOptions = () => {
//   const [normalOutpasses, setNormalOutpasses] = useState(5); // Example: Remaining normal outpasses
//   const [emergencyOutpasses, setEmergencyOutpasses] = useState(2); // Example: Remaining emergency outpasses

//   return (
//     <div className="flex justify-center gap-6 mt-10">
//       {/* Normal Outpass */}
//       <Link to="/normal-outpass" className="w-64 p-6 text-center bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition cursor-pointer">
//         <h2 className="text-xl font-bold">Normal Outpass</h2>
//         <p className="text-sm">Apply for a regular outpass.</p>
//         {/* Animated Counter */}
//         <CountUp start={0} end={normalOutpasses} duration={1.5} className="text-4xl font-bold mt-2" />
//         <p className="text-xs">Remaining Outpasses</p>
//       </Link>

//       {/* Emergency Outpass */}
//       <Link to="/emergency-outpass" className="w-64 p-6 text-center bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition cursor-pointer">
//         <h2 className="text-xl font-bold">Emergency Outpass</h2>
//         <p className="text-sm">Request an emergency outpass.</p>
//         {/* Animated Counter */}
//         <CountUp start={0} end={emergencyOutpasses} duration={1.5} className="text-4xl font-bold mt-2" />
//         <p className="text-xs">Remaining Outpasses</p>
//       </Link>
//     </div>
//   );
// };

// export default OutpassOptions;
