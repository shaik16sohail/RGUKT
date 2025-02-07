import React from 'react';
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import Gallery from './LandingPage/Gallery';
import Section from './LandingPage/Section';

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
    <header class="landing-header">
      <div className='header-img-left'>
        <img src="/rguktLogo.png" alt="Logo"></img>
        <div className='left-text'>Stay Master</div>
      </div>
       {/* Mobile Menu Icon */}
       <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Right Section (Nav Links) */}
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>

  
</header>

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
      <div className="analytics">
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
      </div>

      {/* Footer */}
      
    </div>
    <Gallery/>
    <br>
    </br>
    
    <br></br>
    <h1>Men's and ladies hostel administration</h1>
    <br></br>
    <div className='landingpage-contacts'>
      
      <Section/>
    </div>
    

    </>

  );
};

export default LandingPage;
