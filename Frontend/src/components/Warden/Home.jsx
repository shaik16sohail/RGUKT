import React from 'react'
import '../../style/warden.css'; 
const Home=()=>{
    const hostelInfo = {
        hostelName: "Sunrise Hostel",
        wardenName: "Mr. Rajesh Sharma",
        registeredStudents: 120,
        otherInfo: "Strict Discipline, 24/7 Security",
      };
    
      const caretakers = [
        {
          name: "Rahul Verma",
          issuesResolved: 45,
          outpassesApproved: 30,
          feedbackRating: 4.5,
        },
        {
          name: "Anita Mishra",
          issuesResolved: 38,
          outpassesApproved: 25,
          feedbackRating: 4.2,
        },
        {
          name: "Suresh Mehta",
          issuesResolved: 50,
          outpassesApproved: 40,
          feedbackRating: 4.7,
        },
        {
          name: "Priya Singh",
          issuesResolved: 42,
          outpassesApproved: 35,
          feedbackRating: 4.6,
        },
      ];
    
      return (
        <div className=" warden-homepage min-h-screen  p-6">
          {/* Hostel & Warden Info */}
          <div className="inner-divs warden-head  shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold  mb-2">{hostelInfo.hostelName}</h2>
            <p className="text-lg "><strong>Warden:</strong> {hostelInfo.wardenName}</p>
            <p className="text-lg "><strong>Students Registered:</strong> {hostelInfo.registeredStudents}</p>
            <p className="text-lg "><strong>Other Info:</strong> {hostelInfo.otherInfo}</p>
          </div>
        <h2 className='text-2xl text-center font-bold'>Caretaker's Info</h2>
          {/* Caretaker Grid */}
          <div className=" grid-layout grid grid-cols-1 md:grid-cols-2 gap-12">
            {caretakers.map((caretaker, index) => (
              <div key={index} className="inner-divs shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{caretaker.name}</h3>
                <p className=""><strong>Issues Resolved:</strong> {caretaker.issuesResolved}</p>
                <p className=""><strong>Outpasses Approved:</strong> {caretaker.outpassesApproved}</p>
                <p className=""><strong>Feedback Rating:</strong> ⭐ {caretaker.feedbackRating}</p>
              </div>
            ))}
          </div>
        </div>
      );
}
export default Home;