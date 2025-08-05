import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const RequestOutpass = () => {
  const [normalOutpasses] = useState(6);
  const [emergencyOutpasses] = useState(2);

  const { ref: normalRef, inView: normalVisible } = useInView({ triggerOnce: true });
  const { ref: emergencyRef, inView: emergencyVisible } = useInView({ triggerOnce: true });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="request-outpass px-4 py-12 max-w-7xl mx-auto">
        {/* Instructions Section */}
        <div
          className="border border-gray-800 p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl mb-12"
          style={{
            background: 'linear-gradient(90deg, hsla(351, 100%, 25%, 1) 0%, hsla(9, 59%, 7%, 1) 100%)'
          }}
        >
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-3 sm:mr-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Instructions
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left instructions */}
            <div className="space-y-3 sm:space-y-4">
              {[
                "Follow all hostel rules and regulations strictly.",
                "Outpasses are approved only after valid justification.",
                "Always carry your student ID along with outpass.",
                "Do not misuse emergency outpass option for normal needs."
              ].map((text, i) => (
                <div key={i} className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 bg-black rounded-lg border-l-4 border-red-500">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{text}</p>
                </div>
              ))}
            </div>

            {/* Right instructions */}
            <div className="space-y-3 sm:space-y-4">
              {[
                "Return to campus before the mentioned time to avoid penalties.",
                "Emergency requests should have supporting proof (like medical/emergency letter).",
                "Misuse of the outpass system can lead to suspension of privileges."
              ].map((text, i) => (
                <div key={i + 4} className="flex items-start space-x-2 sm:space-x-3 p-3 sm:p-4 bg-black rounded-lg border-l-4 border-red-500">
                  <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    {i + 5}
                  </span>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outpass Cards Section */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 sm:gap-6">
          {/* Normal Outpass - Black/Gray Theme with Blue Accents */}
          <Link
            to="/student/general-outpass"
            className="group flex-1 max-w-xs mx-auto sm:mx-0 p-4 sm:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-600 hover:border-blue-400 text-white rounded-2xl shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300"
            ref={normalRef}
          >
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-100">Normal Outpass</h2>
              <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">Apply for a regular outpass request</p>
              <div className="mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">
                  {normalVisible && <CountUp start={0} end={normalOutpasses} duration={2} />}
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000"
                    style={{ width: `${(normalOutpasses / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3 sm:mb-4">
                Remaining Outpasses
              </p>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center group-hover:shadow-lg">
                <span className="mr-2">Apply Now</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Emergency Outpass - Black/Gray Theme with Red Accents */}
          <Link
            to="/student/emergency-outpass"
            className="group flex-1 max-w-xs mx-auto sm:mx-0 p-4 sm:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-600 hover:border-red-400 text-white rounded-2xl shadow-xl hover:shadow-red-500/20 transform hover:scale-105 transition-all duration-300"
            ref={emergencyRef}
          >
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-100">Emergency Outpass</h2>
              <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">Request an urgent emergency outpass</p>
              <div className="mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl font-bold mb-2 text-white">
                  {emergencyVisible && <CountUp start={0} end={emergencyOutpasses} duration={2} />}
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all duration-1000"
                    style={{ width: `${(emergencyOutpasses / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3 sm:mb-4">
                Remaining Outpasses
              </p>
              <div className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center group-hover:shadow-lg">
                <span className="mr-2">Apply Now</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer / Help Info */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-full">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300 text-xs sm:text-sm">
              Need help? Contact hostel administration for assistance
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestOutpass;