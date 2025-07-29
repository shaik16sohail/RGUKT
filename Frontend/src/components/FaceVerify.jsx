import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

const FaceVerify = () => {
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

    const res = await axios.post('http://localhost:8080/api/verify-face', {
      studentId,
      descriptor,
    });

    setResult(res.data.match ? '✅ Match Found' : '❌ Face Not Matched');
  };

  return (
    <div>
      <h2>Verify Face</h2>
      <input
        type="text"
        value={studentId}
        placeholder="Enter Student ID"
        onChange={(e) => setStudentId(e.target.value)}
      />
      <br /><br />
      <video ref={videoRef} autoPlay muted width="480" height="360" />
      <br />
      <button onClick={verifyFace}>Verify Face</button>
      <h3>{result}</h3>
    </div>
  );
};

export default FaceVerify;
