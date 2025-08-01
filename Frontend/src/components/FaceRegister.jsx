import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

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

  return (
    <div>
      <h2>Face Registration</h2>
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <div>
        <video
          ref={videoRef}
          autoPlay
          muted
          width="400"
          height="300"
          style={{ border: '1px solid black' }}
        />
      </div>
      <button onClick={handleCapture}>Register Face</button>
      <p>{message}</p>
    </div>
  );
};

export default FaceRegister;
