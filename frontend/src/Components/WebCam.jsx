import React, { useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { usesDispatch } from "react-redux";

// Set up face-api.js
faceapi.nets.tinyFaceDetector.loadFromUri("/models");
faceapi.nets.faceLandmark68Net.loadFromUri("/models");
faceapi.nets.faceRecognitionNet.loadFromUri("/models");

const WebCam = () => {
  const [webcamRef, setWebcamRef] = useState(null);

  const dipatch = usesDispatch();
  const [registeredFace, setRegisteredFace] = useState(null);
  const [isMatching, setIsMatching] = useState(false);

  const capture = async () => {
    if (webcamRef) {
      const image = webcamRef.getScreenshot();

      // Load the captured image for face recognition
      const img = await faceapi.bufferToImage(image);

      // Detect faces in the captured image
      const detections = await faceapi
        .detectAllFaces(img)
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length === 0) {
        alert("No face detected. Please try again.");
        return;
      }

      // Compare the detected face with the registered face
      const faceMatcher = new faceapi.FaceMatcher([
        new faceapi.LabeledFaceDescriptors("user", [registeredFace]),
      ]);
      const match = faceMatcher.findBestMatch(detections[0].descriptor);

      // Check if the match is successful
      if (match._label === "user" && match._distance < 0.6) {
        // Log the date and time of attendance (you can send this data to your backend)
        const currentDate = new Date().toLocaleString();
        console.log(`Attendance logged at ${currentDate}`);
        setIsMatching(true);
      } else {
        alert("Face does not match the registered face.");
      }
    }
  };

  return (
    <>
      <div className="dashboard">
        <h1>DASHBOARD</h1>
        <Webcam
          audio={false}
          ref={(webcam) => setWebcamRef(webcam)}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
        />
        <button onClick={capture}>Capture Photo</button>
        {isMatching && <p>Attendance logged successfully!</p>}
      </div>
    </>
  );
};

export default WebCam;
