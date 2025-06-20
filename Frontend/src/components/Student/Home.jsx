import React, { useEffect, useState } from 'react'
import '../../style/student.css';
import axios from 'axios';
const Home=()=>{
    const [outpasses,setOutpasses]=useState([]);
    const [issues,setIssues]=useState([]);
    
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await axios.get('http://localhost:8080/student/home',{
                    withCredentials: true // Important if cookies are involved
                });
                const data = response.data;
                console.log(data.message);
                setOutpasses(data.Outpasses);
                setIssues(data.Issues);

            }catch(err){
                console.log('error',err);
            }
        };
        fetchData();
    },[]);
    const cancelOutpass= async(id)=>{
        try{
            const response=await axios.delete(`http://localhost:8080/student/outpass/${id}`,{
                withCredentials:true,
            });
            setOutpasses(prev => prev.filter(outpass => outpass.id !== id));
        }catch(err){
            console.log('error at outpass deletion',err);
        }
    }
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
                   {outpasses.map((outpass,index)=>{
                    return(
                        <tr className='border-b border-gray-200'>
                            <td className="py-3 px-6 text-center">{index+1}</td>
                            <td className="py-3 px-6 text-center">{outpass.type}</td>
                            <td className="py-3 px-6 text-center">{outpass.status}</td>
                            <td className="py-3 px-6 text-center">{outpass.date}</td>
                            <td className="py-3 px-6 text-center"><button onClick={()=> cancelOutpass(outpass.id)}>Cancel</button></td>
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
                   {issues.map((outpass,index)=>{
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