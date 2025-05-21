import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OutpassDetails = () => {
  const navigate=useNavigate();
  const [outpassData,setOutpassData]=useState({});
  const {id}=useParams();
  useEffect(()=>{
    const fetchData=async()=>{
        try{
        const response=await axios.get(`http://localhost:8080/caretaker/outpasses/${id}`,{
          withCredentials:true
        });
        // console.log(response.data.outpassData);
        setOutpassData(response.data.outpassData);
        // alert("success");
        console.log(outpassData);
        // console.log(id);

      }catch(err){
        console.log(err);
        alert("chud gaye guru");
      }
    };
    fetchData();
    
  },[id]);
  const handleStatusUpdate=async(newStatus)=>{
    try{
      const response=await axios.patch(`http://localhost:8080/caretaker/outpasses/${id}`,{status:newStatus},{
        withCredentials:true,
      });
      navigate('/caretaker/outpasses');
    }catch(err){
      console.log(err);
      alert("Failed to update");
    }
  }
  
  if (!outpassData) return <p>No data found</p>;
  if (!outpassData.studentId) return <p>Loading...</p>;


  return (
    <div className=" outpass-details">
        <div className="outpass-detailsIn">
            <h1 className="text-3xl font-bold text-center">Outpass Details</h1>
            <br></br>
            <br></br>
            <div className="outpass-info">
            <p><strong>ID:</strong> {outpassData.studentId.email.substring(1,2).toUpperCase()+outpassData.studentId.email.substring(2,8)}</p>
            <p><strong>Name:</strong> {outpassData.studentId.name}</p>
            <p><strong>Date:</strong> {outpassData.date}</p>
            <p><strong>Mobile No:</strong> {outpassData.mobileNo}</p>
            <p><strong>Expected Return:</strong> {outpassData.date}</p>
            </div>
           
            
            
            <div className="outpass-reason">
            <p><strong>Reason:</strong> </p>
                {outpassData.reason}
            </div>
            <div className="outpass-call">
                <button><i class="fa-solid fa-phone"></i>  call to student</button>
                <button>call to parent <i class="fa-solid fa-phone"></i> </button>
            </div>
            <div className="outpass-final">
            <button type="button" onClick={() => handleStatusUpdate("rejected")} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"><i class="fa-regular fa-circle-xmark"></i> Reject</button>
            <button type="button" onClick={()=> handleStatusUpdate("approved")} class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approve <i class="fa-solid fa-check"></i></button>
            </div>

        </div>
      
    </div>
  );
};

export default OutpassDetails;
