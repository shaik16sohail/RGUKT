import React from 'react'
import '../../App.css';
import LeftFeature from './LeftFeature';
import RightFeature from './RightFeature';
export default function Features(){
    return(
        <div className=''>
            
            <LeftFeature/>
            <RightFeature/>
            {/* <LeftFeature/>
            <RightFeature/> */}
        </div>
    );
}