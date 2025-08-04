import React from 'react';
import { useState } from 'react'
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-[rgb(137,24,26)]">
      {/* Scrolling Announcements */}
      {/* <ScrollingAnnouncements/> */}
      
      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[rgb(137,24,26)]/20 to-black/90 animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(137,24,26,0.3)_0%,transparent_50%)]"></div>
        </div>
        

        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 z-2">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[rgb(137,24,26)] rounded-full animate-ping opacity-30"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-40"></div>
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-[rgb(137,24,26)] rounded-full animate-bounce opacity-20"></div>
        </div>
        
        {/* Welcome Text Overlay */}
        
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6">
          {/* Logo and Title Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 mb-8 sm:mb-12">
            <div className="flex-shrink-0 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(137,24,26)] to-red-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img 
                src="/rguktLogo.png" 
                alt="RGUKT Logo" 
                className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain filter drop-shadow-2xl hover:scale-110 transition-all duration-500 hover:drop-shadow-[0_0_30px_rgba(137,24,26,0.8)]"
              />
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="text-white drop-shadow-lg">RGUKT Hostel</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(137,24,26)] via-red-400 to-[rgb(137,24,26)] animate-gradient-x">
                  Management System
                </span>
              </h1>
            </div>
          </div>
          
          {/* Tagline with Enhanced Styling */}
          <div className="relative mb-8 sm:mb-12">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 font-light max-w-4xl mx-auto leading-relaxed relative z-10">
              Making Hostel Management and 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(137,24,26)] to-red-300 font-medium"> Outpass Approvals </span>
              Effortless
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(137,24,26)]/5 to-transparent rounded-lg"></div>
          </div>
          
          {/* Enhanced CTA Button */}
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(137,24,26)] to-red-600 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse"></div>
            <Link 
              to="/login" 
              className="relative inline-flex items-center justify-center bg-gradient-to-r from-[rgb(137,24,26)] to-red-700 hover:from-red-700 hover:to-[rgb(137,24,26)] text-white font-semibold text-base sm:text-lg md:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-full shadow-2xl border-2 border-[rgb(137,24,26)]/50 hover:border-white/30 transform hover:scale-105 transition-all duration-300 hover:shadow-[0_0_40px_rgba(137,24,26,0.6)] overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Data Analytics Section */}
      <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-gray-900 via-black to-[rgb(137,24,26)]/20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(137,24,26) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Analytics <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(137,24,26)] to-red-400">Overview</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[rgb(137,24,26)] to-red-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center justify-center">
            <div className="group transform hover:scale-105 transition-all duration-500 hover:shadow-[0_0_30px_rgba(137,24,26,0.3)] rounded-2xl">
              <div className="bg-gradient-to-br from-gray-800/30 to-[rgb(137,24,26)]/10 backdrop-blur-sm rounded-2xl border border-[rgb(137,24,26)]/20 hover:border-[rgb(137,24,26)]/40 transition-all duration-300 overflow-hidden">
                <DataAnalytics/>
              </div>
            </div>
            <div className="group transform hover:scale-105 transition-all duration-500 hover:shadow-[0_0_30px_rgba(137,24,26,0.3)] rounded-2xl">
              <div className="bg-gradient-to-bl from-gray-800/30 to-[rgb(137,24,26)]/10 backdrop-blur-sm rounded-2xl border border-[rgb(137,24,26)]/20 hover:border-[rgb(137,24,26)]/40 transition-all duration-300 overflow-hidden">
                <DataAnalytics/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className=" bg-gradient-to-l from-[rgb(137,24,26)]/10 via-black to-[rgb(137,24,26)]/10 relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(137,24,26)] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgb(137,24,26)] to-transparent"></div>
        
        <Features/>
      </div>

      

      {/* Gallery Section */}
      <div className="py-5 sm:py-3 md:py-2 lg:py-1 bg-gradient-to-b from-gray-900 via-black to-[rgb(137,24,26)]/10 relative">
        {/* Decorative Background */}
       
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="group transform hover:scale-[1.02] transition-all duration-700 hover:shadow-[0_0_50px_rgba(137,24,26,0.3)] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800/20 to-[rgb(137,24,26)]/5 backdrop-blur-sm border border-[rgb(137,24,26)]/20">
            <Gallery/>
          </div>
          
          
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-[rgb(137,24,26)]/15 via-black to-[rgb(137,24,26)]/15 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[rgb(137,24,26)]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[rgb(137,24,26)]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Boys and Girls Hostel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(137,24,26)] to-red-400">Contact Numbers</span>
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-[rgb(137,24,26)] to-red-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/30 to-[rgb(137,24,26)]/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-12 border border-[rgb(137,24,26)]/30 shadow-2xl hover:shadow-[0_0_50px_rgba(137,24,26,0.2)] transition-all duration-500 hover:border-[rgb(137,24,26)]/50 relative overflow-hidden">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[rgb(137,24,26)]/20 to-transparent rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[rgb(137,24,26)]/15 to-transparent rounded-tl-full"></div>
            
            <div className="relative z-10">
              <Section/>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer Spacing */}
      {/* <div className="h-12 sm:h-16 bg-gradient-to-t from-black via-[rgb(137,24,26)]/10 to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgb(137,24,26)]/20 to-transparent"></div>
      </div> */}
    </div>
  );
};

export default LandingPage;