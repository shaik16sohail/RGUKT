import React from 'react'

export default function RightFeature(){
    return(
        <div className='feature'>
           
           <div className='feature-text'>
                <div className='feature-someheading'>
                    <h4>Manage Hostel Master Data</h4>
                    <p>
                    
Digiicampus Hostel Management System is purpose-built for higher education institutions.
It is as an integrated solution to manage campus operations while saving your time!
                    </p>
                </div>
                <div className='feature-lists'> 
                    <ul>
                        <li>Create Hostel Buildings with Unique IDs</li>
                        <li>Allocate Rooms Individually or in Bulk</li>
                        <li>Collect Fees Online with Dues Management</li>
                    


                    </ul>
                </div>
            </div>

            <div className='feature-img'>
                <img style={{height:"340px"}} src='/one.png'></img>
            </div>
        </div>
    );
}