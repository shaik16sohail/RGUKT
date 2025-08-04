import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import { Camera, User, Check, X, AlertCircle, Search } from 'lucide-react';

const FaceVerify = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const videoRef = useRef();
  const [studentId, setStudentId] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    startCamera();
    loadModels();
  }, []);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });
  };

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
  };

  const verifyFace = async () => {
    if (!studentId.trim()) {
      setResult('Please enter a valid student ID.');
      return;
    }

    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      setResult('Face not detected');
      return;
    }

    const descriptor = Array.from(detection.descriptor);

    const res = await axios.post(`${backendUrl}/api/verify-face`, {
      studentId,
      descriptor,
    });

    setResult(res.data.match ? '✅ Match Found' : '❌ Face Not Matched');
  };

  const getResultStyle = () => {
    if (result.includes('✅') || result.includes('Match Found')) {
      return 'text-green-400 bg-green-950 border-green-800';
    } else if (result.includes('❌') || result.includes('not detected') || result.includes('Not Matched')) {
      return 'text-red-400 bg-red-950 border-red-800';
    } else if (result.includes('Please enter')) {
      return 'text-yellow-400 bg-yellow-950 border-yellow-800';
    }
    return 'text-gray-400 bg-gray-800 border-gray-600';
  };

  const getResultIcon = () => {
    if (result.includes('✅') || result.includes('Match Found')) {
      return <Check className="w-5 h-5 text-green-400" />;
    } else if (result.includes('❌') || result.includes('not detected') || result.includes('Not Matched')) {
      return <X className="w-5 h-5 text-red-400" />;
    } else if (result.includes('Please enter')) {
      return <AlertCircle className="w-5 h-5 text-yellow-400" />;
    }
    return <Search className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-black to-gray-800 px-6 py-6 sm:px-8">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Verify Face</h2>
            </div>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">Verify your identity using facial recognition</p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Student ID Input */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                Student ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={studentId}
                  placeholder="Enter Student ID"
                  onChange={(e) => setStudentId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors duration-200 text-base sm:text-lg"
                />
              </div>
            </div>

            {/* Video Section */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                Camera Preview
              </label>
              <div className="relative bg-black rounded-lg overflow-hidden shadow-inner border border-gray-600">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  width="480" 
                  height="360"
                  className="w-full h-48 sm:h-64 md:h-72 object-cover"
                />
                <div className="absolute inset-0 border-4 border-dashed border-gray-500 pointer-events-none rounded-lg"></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 text-center">
                Position your face within the frame for verification
              </p>
            </div>

            {/* Verify Button */}
            <button 
              onClick={verifyFace}
              className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-base sm:text-lg border border-gray-600"
            >
              <Search className="w-5 h-5" />
              <span>Verify Face</span>
            </button>

            {/* Result */}
            {result && (
              <div className={`mt-6 p-4 rounded-lg border flex items-start space-x-3 ${getResultStyle()}`}>
                {getResultIcon()}
                <h3 className="text-sm font-medium flex-1 m-0">{result}</h3>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-900 px-6 py-4 border-t border-gray-700 sm:px-8">
            <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-400">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span>Secure • Real-time • Accurate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceVerify;