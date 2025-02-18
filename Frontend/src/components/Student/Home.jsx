import React from 'react'
import '../../style/student.css';

const Home=()=>{
    const dummyData=[
        { type: "Regular", status: "Pending", date: "2024-02-12" },
        { type: "Emergency", status: "Approved", date: "2024-02-12" },
        { type: "Regular", status: "Pending", date: "2024-02-12" },
        { type: "Emergency", status: "Approved", date: "2024-02-12" },
        { type: "Regular", status: "Pending", date: "2024-02-12" },
        { type: "Emergency", status: "Approved", date: "2024-02-12" },
        { type: "Regular", status: "Pending", date: "2024-02-12" },
    ];
    const dummyIssues=[
        {type:"Maintainance",status:"Solved",date:"2024-02-12"},
        {type:"Electricity",status:"Pending",date:"2024-02-12"},
        {type:"Sanitation",status:"solved",date:"2024-02-12"},
        {type:"Mess",status:"solved",date:"2024-02-12"},
        
    ];

    return(
        <div className='student-home'>
            <div className='student-outpasses overflow-x-auto'>
            <h1 className='text-center text-2xl font-bold home-h1'>My Outpasses</h1>
            <br></br>
            <br></br>
            <table className=' min-w-full'>
                <thead >
                    <tr className='table-heading text-gray-600 uppercase text-sm leading-normal'>
                    <th className="py-3 px-6 text-center">SNO</th>
              <th className="py-3 px-6 text-center">Type</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Cancel</th>
                    </tr>
                </thead>
                <tbody className='table-body text-white text-m font-light'>
                   {dummyData.map((outpass,index)=>{
                    return(
                        <tr className='border-b border-gray-200'>
                            <td className="py-3 px-6 text-center">{index+1}</td>
                            <td className="py-3 px-6 text-center">{outpass.type}</td>
                            <td className="py-3 px-6 text-center">{outpass.status}</td>
                            <td className="py-3 px-6 text-center">{outpass.date}</td>
                            <td className="py-3 px-6 text-center">{outpass.date}</td>
                        </tr>
                    );
                   })}
                </tbody>
            </table>
            </div>
            <br></br>
            <div className='student-issues overflow-x-auto'>
            <h1 className='text-center text-2xl font-bold home-h1'>My Issues</h1>
            <br></br><br></br>
            <table className='min-w-full'>
                <thead >
                    <tr className='table-heading text-gray-600 uppercase text-sm leading-normal'>
                    <th className="py-3 px-6 text-center">SNO</th>
              <th className="py-3 px-6 text-center">Type</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Cancel</th>
                    </tr>
                </thead>
                <tbody className='table-body text-white text-m font-light'>
                   {dummyIssues.map((outpass,index)=>{
                    return(
                        <tr className='border-b border-gray-200'>
                            <td className="py-3 px-6 text-center">{index+1}</td>
                            <td className="py-3 px-6 text-center">{outpass.type}</td>
                            <td className="py-3 px-6 text-center">{outpass.status}</td>
                            <td className="py-3 px-6 text-center">{outpass.date}</td>
                            <td className="py-3 px-6 text-center">{outpass.date}</td>
                        </tr>
                    );
                   })}
                </tbody>
            </table>
            </div>
        </div>
    )
}
export default Home;