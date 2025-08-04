import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import { Camera, User, Check, AlertCircle } from 'lucide-react';

const FaceRegister = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const videoRef = useRef();
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');

  // Load models from /public/models/
  const loadModels = async () => {
    // const MODEL_URL = process.env.PUBLIC_URL + '/models';
    const MODEL_URL = '/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    ]);
  };

  // Start webcam
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Error accessing webcam:', err));
  };

  // Register face
  const handleCapture = async () => {
    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detections) {
      setMessage('Face not detected. Please try again.');
      return;
    }

    const faceDescriptor = Array.from(detections.descriptor); // Convert Float32Array to regular array

    try {
      await axios.post(`${backendUrl}/api/register-face`, {
        studentId,
        descriptor: faceDescriptor,
      });
      setMessage('Face registered successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to register face.');
    }
  };

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  const getMessageStyle = () => {
    if (message.includes('successfully')) {
      return 'text-green-600 bg-green-50 border-green-200';
    } else if (message.includes('not detected') || message.includes('Failed')) {
      return 'text-red-600 bg-red-50 border-red-200';
    }
    return 'text-blue-600 bg-blue-50 border-blue-200';
  };

  const getMessageIcon = () => {
    if (message.includes('successfully')) {
      return <Check className="w-5 h-5 text-green-600" />;
    } else if (message.includes('not detected') || message.includes('Failed')) {
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
    return <AlertCircle className="w-5 h-5 text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-black to-gray-800 px-6 py-6 sm:px-8">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Face Registration</h2>
            </div>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">Register your face for secure authentication</p>
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
                  placeholder="Enter Student ID"
                  value={studentId}
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
                  width="400"
                  height="300"
                  className="w-full h-48 sm:h-64 md:h-72 object-cover"
                />
                <div className="absolute inset-0 border-4 border-dashed border-gray-500 pointer-events-none rounded-lg"></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 text-center">
                Position your face within the frame and ensure good lighting
              </p>
            </div>

            {/* Register Button */}
            <button
              onClick={handleCapture}
              className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-base sm:text-lg border border-gray-600"
            >
              <Camera className="w-5 h-5" />
              <span>Register Face</span>
            </button>

            {/* Message */}
            {message && (
              <div className={`mt-6 p-4 rounded-lg border flex items-start space-x-3 ${getMessageStyle()}`}>
                {getMessageIcon()}
                <p className="text-sm font-medium flex-1">{message}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-900 px-6 py-4 border-t border-gray-700 sm:px-8">
            <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-400">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span>Secure • Private • Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceRegister;