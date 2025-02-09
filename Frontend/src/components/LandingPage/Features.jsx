import React from 'react'
import '../../App.css';
import LeftFeature from './LeftFeature';
import RightFeature from './RightFeature';
export default function Features(){
    return(
        <div className='landing-features'>
            <h2>Key Features & Characteristics of Hostel
Management System
</h2>
            <LeftFeature/>
            <RightFeature/>
            <LeftFeature/>
            <RightFeature/>
        </div>
    );
}