import React from 'react';
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import Gallery from './LandingPage/Gallery';
import Section from './LandingPage/Section';
import ScrollingAnnouncements from './LandingPage/ScrollingAnnouncements';
import DataAnalytics from './LandingPage/DataAnalytics';
import Features from './LandingPage/Features';
import Carousel from './LandingPage/Carousel';

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
    {/* <header class="landing-header"> */}
      {/* <div className='header-img-left'>
        <img src="/rguktLogo.png" alt="Logo"></img>
        <div className='left-text'>Stay Master</div>
      </div> */}
       
       {/* <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div> */}

      {/* Right Section (Nav Links) */}
      {/* <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav> */}

  
{/* </header> */}


   <ScrollingAnnouncements/>
   {/* <div className="flex justify-center items-center min-h-screen bg-gray-100"> */}
        
    {/* </div> */}
    <div className='image-container'>
        <img style={{width:"100%",opacity:"0.3"}} src='/two.png'></img>
        {/* <div class="image-text"> */}
        <div className='image-text'>
            Welcome to StayMaster
        </div>
        {/* </div> */}
      </div>
    <div className="landing-container">
    
      {/* Hostel Name & Tagline */}
      <div className="hero">
        <div className='hero-heading'>
            <div className='one'>
              <img className='' style={{width:"",height:'200px'}} src='/rguktLogo.png'></img>
            </div>
            <div className='two'>
              <h1>RGUKT Hostel <br></br> Management System</h1>
            </div>
            
        </div>
        <br></br>
        
        <p style={{fontSize:"20px"}}>Making Hostel Management and Outpass Approvals Effortless</p>
        <Link to="/home" className="cta-button">Get Started</Link>
      </div>
     
      <br></br>
      
      

      {/* Analytics Section */}
      {/* <div className="analytics">
        <div className="card">
          <h2>📅 Weekly Outpasses</h2>
          <p>120</p>
        </div>
        <div className="card">
          <h2>📆 Monthly Outpasses</h2>
          <p>450</p>
        </div>
        <div className="card">
          <h2>📊 Yearly Outpasses</h2>
          <p>5400</p>
        </div>
      </div> */}
       <div className="flex justify-center items-center min-h-screen ">
      <DataAnalytics/>
      <DataAnalytics/>
    </div>
    
      
      
    </div>
    <Features/>
    <div style={{height:"500px",display:"flex"}} className='landing-steps'>
        {/* <div style={{width:"50%",backgroundColor:"#8b1b1b"}}></div> */}
        <div  className='landing-sub'>
          <h1>How And When To Apply?</h1>
          <ul>
            <li>Application for admission to the hostel for the first year and renewal for subsequent years should be made online through https://sp.srmist.edu.in only.</li>
            <li>Application for admission to the hostel for the first year and renewal for subsequent years should be made online through https://sp.srmist.edu.in only.</li>
            <li>Application for admission to the hostel for the first year and renewal for subsequent years should be made online through https://sp.srmist.edu.in only.</li>
          </ul>
        </div>
        <div  className='landing-sub'>
        <h1>How And When To Apply?</h1>
          <ul>
            <li>Application for admission to the hostel for the first year and renewal for subsequent years should be made online through https://sp.srmist.edu.in only.</li>
            <li>Application for admission to the hostel for the first year and renewal for subsequent years should be made online through https://sp.srmist.edu.in only.</li>
            <li>Application for admission to the hostel for the first year and renewal for subsequent years should be made online through https://sp.srmist.edu.in only.</li>
          </ul>
        </div>
    </div>
    {/* <br></br>
    <br></br> */}
    
    <br></br>
    <Gallery/>
    <br>
    </br>
    
    <br></br>
    <h1 style={{fontWeight:"500",fontSize:"1.7rem",textAlign:"center"}}>Boys and Girls Hostel Contact Numbers</h1>
    <br></br>
    <div className='landingpage-contacts'>
      
      <Section/>
      
    </div>
    <br></br>
      <br></br>

    </>

  );
};

export default LandingPage;
