import React from 'react'
import { useEffect, useState } from "react";

export default function ScrollingAnnouncements(){
    const [announcements] = useState([
        "🚀 Exciting updates coming soon! New features launching next week",
        "📢 Join our community of 10,000+ users and get exclusive benefits",
        "🎉 Limited time offer: 50% off premium plans until month end",
        "⚡ Performance improvements: 3x faster loading times now live",
        "🔥 Trending now: AI-powered tools that boost productivity by 200%",
        "💡 Pro tip: Use keyboard shortcuts to navigate 10x faster"
    ]);

    return(
        <div className="relative w-full bg-gradient-to-r from-black via-[rgb(137,24,26)] to-black overflow-hidden shadow-lg border-t border-b border-red-900/30">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/10 to-transparent animate-pulse"></div>
            
            {/* Main scrolling content */}
            <div className="relative flex items-center py-3 px-4">
                <div className="flex items-center space-x-3 mr-8 flex-shrink-0">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 font-bold text-sm tracking-wide uppercase">
                        Live Updates
                    </span>
                </div>
                
                <div className="flex space-x-12 animate-scroll-smooth text-white">
                    {announcements.map((announcement, index) => (
                        <div key={index} className="flex items-center space-x-3 whitespace-nowrap">
                            <span className="text-red-300 text-lg">•</span>
                            <span className="font-medium text-sm md:text-base text-gray-100 hover:text-red-100 transition-colors duration-300">
                                {announcement}
                            </span>
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {announcements.map((announcement, index) => (
                        <div key={`duplicate-${index}`} className="flex items-center space-x-3 whitespace-nowrap">
                            <span className="text-red-300 text-lg">•</span>
                            <span className="font-medium text-sm md:text-base text-gray-100 hover:text-red-100 transition-colors duration-300">
                                {announcement}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-purple-900 to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-indigo-900 to-transparent pointer-events-none"></div>
            
            <style jsx>{`
                @keyframes scroll-smooth {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                .animate-scroll-smooth {
                    animation: scroll-smooth 60s linear infinite;
                }
                
                .animate-scroll-smooth:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}