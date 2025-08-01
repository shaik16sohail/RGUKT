import React from 'react'
import IssuesPage from './IssuesPage';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const Issues=()=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [issues,setIssues]=useState([]);
    const fetchData=async()=>{
            try{
                const response=await axios.get(`${backendUrl}/caretaker/issues`,{
                    withCredentials:true
                });
                const data=response.data;
                console.log(data.issuesData);
                setIssues(data.issuesData);

            }catch(err){
                console.log(err);
            }
        };
    useEffect(()=>{
        
        fetchData();
    },[]);
    return(
        <>
            <IssuesPage issuesData={issues} fetchData={fetchData}/>
        </>
    );
}
export default Issues;