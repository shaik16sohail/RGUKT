import React from 'react';
import { Check, Building2, Users, CreditCard } from 'lucide-react';

export default function LeftFeature() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-red-900 min-h-[80vh] flex items-center">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-40 right-20 w-48 h-48 bg-red-800 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-12 h-full">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="border-r border-white/20"></div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image Section */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent rounded-3xl blur-2xl transform group-hover:scale-105 transition-transform duration-700"></div>
                        <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-red-600/20 hover:border-red-500/40 transition-all duration-500">
                            <div className="absolute top-4 right-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                                <div className="w-3 h-3 bg-red-500 rounded-full absolute top-0"></div>
                            </div>
                            <img 
                                src="/one.png" 
                                alt="Hostel Management Dashboard"
                                className="w-full h-64 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl"></div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6 lg:pr-12 xl:pr-16">
                        {/* Header */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center space-x-2 bg-red-600/10 border border-red-500/20 rounded-full px-4 py-2">
                                <Building2 className="w-4 h-4 text-red-400" />
                                <span className="text-red-300 text-sm font-medium">Hostel Management</span>
                            </div>
                            
                            <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-gray-200 to-red-300 bg-clip-text text-transparent leading-tight">
                                Hostel
                                <span className="block text-red-400">Management System</span>
                            </h2>
                            
                            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                                StayMaster is a smart hostel management system that streamlines outpass requests and issue reporting for students.
                                <span className="text-red-300 font-medium"> An integrated solution</span> to manage campus operations while saving your time!
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-3">
                            {[
                                { icon: Building2, text: "Raise Outpass Requests", color: "text-blue-400" },
                                { icon: Users, text: "Issue Reporting System", color: "text-green-400" },
                                { icon: CreditCard, text: "Caretaker Approval Workflow", color: "text-yellow-400" }
                            ].map((feature, index) => (
                                <div key={index} className="group flex items-center space-x-3 p-3 rounded-2xl bg-gradient-to-r from-white/5 to-transparent hover:from-red-600/10 hover:to-transparent transition-all duration-300 border border-transparent hover:border-red-500/20">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center border border-gray-600 group-hover:border-red-500/50 transition-all duration-300 group-hover:scale-110">
                                            <feature.icon className={`w-5 h-5 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                                        </div>
                                    </div>
                                    <span className="text-gray-200 text-base font-medium group-hover:text-white transition-colors duration-300">
                                        {feature.text}
                                    </span>
                                    <Check className="w-4 h-4 text-red-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-3">
                            {/* <button className="group relative px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-2xl font-bold text-white text-base shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105">
                                <span className="relative z-10">Get Started Today</span>
                                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}