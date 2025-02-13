import React from 'react'
import '../../style/caretaker.css';
import PaginatedTable from './PaginatedTable';
export default function Outpasses(){
    return(
        <div className='outpasses'>
            {/* <div className='outpasses-table'> */}
                <PaginatedTable/>
            {/* </div> */}
        </div>
    );
}