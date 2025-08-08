import React from 'react';

const Nope = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center p-4">
            {/* Main Container */}
            <div className="max-w-4xl w-full mx-auto">
                {/* Content Card */}
                <div className="bg-gradient-to-br from-gray-800/60 to-red-900/40 backdrop-blur-sm rounded-3xl border border-red-500/30 shadow-2xl p-8 sm:p-12 lg:p-16 text-center hover:shadow-red-500/20 transition-all duration-500">
                    
                    {/* Decorative Elements */}
                    <div className="flex justify-center mb-8">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-3 h-3 bg-red-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-8 sm:mb-12 leading-tight">
                        <span className="text-red-400">Ch*d Gaye</span>
                        <br className="sm:hidden" />
                        <span className="sm:ml-4">Guru</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 sm:mb-16 font-light leading-relaxed max-w-2xl mx-auto">
                        Oops! Looks like something went wrong on our end
                    </p>

                    {/* Image Container */}
                    <div className="relative mb-12 sm:mb-16">
                        <div className="relative inline-block">
                            {/* Glow Effect Background */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 via-red-500/30 to-red-600/20 rounded-3xl blur-xl"></div>
                            
                            {/* Image */}
                            <img 
                                src="/ch*d.jpeg" 
                                alt="Error Illustration"
                                className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md h-64 sm:h-80 lg:h-96 object-cover rounded-2xl border-2 border-red-500/30 shadow-2xl hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                        <button onClick={() => window.location.reload()} className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300 border border-red-500/30 hover:border-red-400/50 w-full sm:w-auto">
                            Try Again
                        </button>
                        
                        <button onClick={() => window.history.back()} className="bg-transparent hover:bg-red-500/10 text-red-400 hover:text-red-300 font-semibold px-8 py-4 rounded-full border border-red-500/50 hover:border-red-400/70 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                            Go Back
                        </button>
                    </div>

                    {/* Bottom Decorative Line */}
                    <div className="mt-12 sm:mt-16">
                        <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"></div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-1/4 left-4 sm:left-8 opacity-20">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                </div>
                <div className="absolute top-1/3 right-4 sm:right-8 opacity-20">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute bottom-1/4 left-8 sm:left-16 opacity-20">
                    <div className="w-2 h-2 bg-red-300 rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
};

export default Nope;