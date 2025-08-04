import React from 'react';
import { Check, Building2, Users, CreditCard, ArrowRight } from 'lucide-react';

export default function RightFeature() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-bl from-black via-gray-900 to-red-900 min-h-[80vh] flex items-center">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-40 right-20 w-40 h-40 bg-red-600 rounded-full blur-3xl animate-pulse delay-300"></div>
                <div className="absolute bottom-20 left-20 w-56 h-56 bg-red-800 rounded-full blur-3xl animate-pulse delay-700"></div>
                <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-white rounded-full blur-2xl animate-pulse delay-1200"></div>
            </div>
            
            {/* Diagonal pattern overlay */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 50px,
                        rgba(255,255,255,0.1) 50px,
                        rgba(255,255,255,0.1) 51px
                    )`
                }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image Section - Right Side */}
                    <div className="relative group order-2 lg:order-2">
                        <div className="absolute inset-0 bg-gradient-to-l from-red-600/20 to-transparent rounded-3xl blur-2xl transform group-hover:scale-105 transition-transform duration-700"></div>
                        
                        <div className="relative bg-gradient-to-bl from-gray-800/60 to-gray-900/90 backdrop-blur-sm rounded-3xl p-6 border border-red-600/20 hover:border-red-500/40 transition-all duration-500">
                            {/* Floating elements */}
                            <div className="absolute top-6 left-6 flex space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            
                            <div className="absolute top-4 right-4 bg-red-500/20 backdrop-blur-sm rounded-full p-2">
                                <Check className="w-4 h-4 text-red-400" />
                            </div>
                            
                            <img 
                                src="/four.jpeg" 
                                alt="Hostel Management Interface"
                                className="w-full h-64 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
                            />
                            
                            {/* Overlay gradient */}
                            <div className="absolute inset-6 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
                            
                            {/* Badge */}
                            <div className="absolute bottom-10 left-10 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 border border-red-500/30">
                                <span className="text-red-300 text-sm font-medium">Live Preview</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section - Left Side */}
                    <div className="space-y-6 order-1 lg:order-1 lg:pl-12 xl:pl-16">
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600/10 to-red-800/10 border border-red-500/30 rounded-full px-5 py-2.5 backdrop-blur-sm">
                                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                                <span className="text-red-300 text-sm font-semibold tracking-wide">ADVANCED FEATURES</span>
                            </div>
                            
                            <h2 className="text-3xl lg:text-4xl font-black leading-tight">
                                <span className="bg-gradient-to-r from-red-400 via-red-300 to-white bg-clip-text text-transparent">
                                    Manage Hostel
                                </span>
                                <span className="block bg-gradient-to-r from-white via-gray-200 to-red-200 bg-clip-text text-transparent">
                                    Master Data
                                </span>
                            </h2>
                            
                            <div className="relative">
                                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                                    Digiicampus Hostel Management System is purpose-built for 
                                    <span className="text-red-300 font-semibold"> higher education institutions</span>. 
                                    It is an integrated solution to manage campus operations while 
                                    <span className="text-white font-medium"> saving your time!</span>
                                </p>
                                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-red-500 to-transparent rounded-full"></div>
                            </div>
                        </div>

                        {/* Enhanced Features List */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <span className="w-8 h-0.5 bg-red-500 mr-3 rounded-full"></span>
                                Key Features
                            </h3>
                            
                            {[
                                { 
                                    icon: Building2, 
                                    text: "Create Hostel Buildings with Unique IDs", 
                                    gradient: "from-blue-500 to-blue-600",
                                    description: "Streamlined building management" 
                                },
                                { 
                                    icon: Users, 
                                    text: "Allocate Rooms Individually or in Bulk", 
                                    gradient: "from-green-500 to-green-600",
                                    description: "Flexible room assignment" 
                                },
                                { 
                                    icon: CreditCard, 
                                    text: "Collect Fees Online with Dues Management", 
                                    gradient: "from-yellow-500 to-yellow-600",
                                    description: "Automated payment processing" 
                                }
                            ].map((feature, index) => (
                                <div key={index} className="group relative">
                                    <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-white/5 via-white/3 to-transparent hover:from-red-600/10 hover:via-red-600/5 hover:to-transparent transition-all duration-500 border border-gray-700/50 hover:border-red-500/30">
                                        <div className="flex-shrink-0 relative">
                                            <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                                                <feature.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/0 to-red-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-base font-bold text-white group-hover:text-red-100 transition-colors duration-300">
                                                {feature.text}
                                            </h4>
                                            <p className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors duration-300">
                                                {feature.description}
                                            </p>
                                        </div>
                                        
                                        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-red-400 transform group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Section */}
                        <div className="pt-4 flex items-center space-x-6">
                            {/* <button className="group relative px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-2xl font-bold text-white text-base shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105">
                                <span className="relative z-10 flex items-center space-x-2">
                                    <span>Learn More</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                            
                            <div className="flex items-center space-x-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full border-2 border-gray-800 flex items-center justify-center text-white text-sm font-bold">
                                            {i}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-gray-400 text-sm">Trusted by 500+ institutions</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}