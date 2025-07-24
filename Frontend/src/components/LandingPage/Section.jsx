import React from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, Mail, User, Building } from 'lucide-react';

export default function Section() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleSection = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const sections = [
    {
      title: "Boys Hostel-I",
      icon: "👨‍🎓",
      color: "from-red-600/20 to-red-700/20",
      borderColor: "border-red-600/30",
      details: [
        {
          role: "Director, Men's Hostel",
          name: "Dr. Mohanasundaram R",
          email: "director.mh@vit.ac.in",
          phone: "0416 – 220 2520",
        },
        {
          role: "Chief Warden, Men's Hostel",
          name: "Dr. Sathiavelu A",
          email: "cw.mh@vit.ac.in",
          phone: "0416 – 220 2521",
        },
      ],
    },
    {
      title: "Boys Hostel-II",
      icon: "🏢",
      color: "from-red-600/20 to-red-700/20",
      borderColor: "border-red-600/30",
      details: [
        {
          role: "Director, Men's Hostel",
          name: "Dr. Mohanasundaram R",
          email: "director.mh@vit.ac.in",
          phone: "0416 – 220 2520",
        },
        {
          role: "Chief Warden, Men's Hostel",
          name: "Dr. Sathiavelu A",
          email: "cw.mh@vit.ac.in",
          phone: "0416 – 220 2521",
        },
      ],
    },
    {
      title: "Girls Hostel-I",
      icon: "👩‍🎓",
      color: "from-pink-600/20 to-pink-700/20",
      borderColor: "border-pink-600/30",
      details: [
        {
          role: "Director, Ladies Hostel",
          name: "Dr. Anitha R",
          email: "director.lh@vit.ac.in",
          phone: "0416 – 220 2530",
        },
        {
          role: "Chief Warden, Ladies Hostel",
          name: "Dr. Sunitha K",
          email: "cw.lh@vit.ac.in",
          phone: "0416 – 220 2531",
        },
      ],
    },
    {
      title: "Girls Hostel-II",
      icon: "🏨",
      color: "from-pink-600/20 to-pink-700/20",
      borderColor: "border-pink-600/30",
      details: [
        {
          role: "Director, Ladies Hostel",
          name: "Dr. Anitha R",
          email: "director.lh@vit.ac.in",
          phone: "0416 – 220 2530",
        },
        {
          role: "Chief Warden, Ladies Hostel",
          name: "Dr. Sunitha K",
          email: "cw.lh@vit.ac.in",
          phone: "0416 – 220 2531",
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 p-4">
      {sections.map((section, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl hover:border-red-600/50 transition-all duration-300"
        >
          {/* Section Header */}
          <div
            className={`bg-gradient-to-r ${section.color} ${section.borderColor} border-b cursor-pointer p-6 hover:bg-opacity-80 transition-all duration-300 group`}
            onClick={() => toggleSection(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-2xl border border-gray-600/50">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-red-300 transition-colors duration-300">
                    {section.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Click to view contact details
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-400">
                  <Building size={16} />
                  <span>{section.details.length} contacts</span>
                </div>
                <div className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-600/50 group-hover:border-red-500/50 transition-all duration-300">
                  {expandedIndex === index ? (
                    <ChevronUp className="text-red-400" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400 group-hover:text-red-400" size={20} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          {expandedIndex === index && (
            <div className="p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 animate-fadeIn">
              <div className="space-y-4">
                {section.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-red-600/30 transition-all duration-300 group"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Role Section */}
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600/30 to-red-700/30 rounded-lg flex items-center justify-center border border-red-600/20">
                          <User className="text-red-400" size={20} />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm font-medium">Position</p>
                          <p className="text-white font-semibold text-sm md:text-base leading-tight">
                            {detail.role}
                          </p>
                        </div>
                      </div>

                      {/* Contact Info Section */}
                      <div className="md:col-span-2 space-y-4">
                        {/* Name */}
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center">
                            <User className="text-gray-400" size={16} />
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Name</p>
                            <p className="text-white font-bold text-lg">{detail.name}</p>
                          </div>
                        </div>

                        {/* Contact Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Email */}
                          <div className="flex items-center space-x-3 group/email">
                            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center border border-blue-600/30">
                              <Mail className="text-blue-400" size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-400 text-xs">Email</p>
                              <a
                                href={`mailto:${detail.email}`}
                                className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors duration-300 truncate block group-hover/email:underline"
                              >
                                {detail.email}
                              </a>
                            </div>
                          </div>

                          {/* Phone */}
                          <div className="flex items-center space-x-3 group/phone">
                            <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center border border-green-600/30">
                              <Phone className="text-green-400" size={16} />
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-400 text-xs">Phone</p>
                              <a
                                href={`tel:${detail.phone}`}
                                className="text-green-400 hover:text-green-300 font-medium text-sm transition-colors duration-300 group-hover/phone:underline"
                              >
                                {detail.phone}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}