import React from 'react'
import '../../style/caretaker.css';
import PaginatedTable from './PaginatedTable';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
export default function Outpasses(){
    const [outpasses,setOutpasses]=useState([]);
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await axios.get('http://localhost:8080/caretaker/outpasses',{
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