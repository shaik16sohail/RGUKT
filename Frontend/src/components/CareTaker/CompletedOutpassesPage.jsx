import React from 'react'
import '../../style/caretaker.css';
import PaginatedTable from './PaginatedTable';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
export default function CompletedOutpassesPage(){
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [outpasses,setOutpasses]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await axios.get(`${backendUrl}/caretaker/outpasses/completed`,{
                    withCredentials: true // Important if cookies are involved
                });
                const data=response.data;
                console.log(data);
                setOutpasses(data.outpassesData);
            }catch(err){
                console.log('error',err);
            }
        }
        fetchData();
    },[]);
    return(
        <div className=''>
            {/* <div className='outpasses-table'> */}
                <PaginatedTable outpasses={outpasses}/>
            {/* </div> */}
        </div>
    );
}