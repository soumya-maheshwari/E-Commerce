import React, { useState } from "react";
import Webcam from "react-webcam";

const WebCam = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user);

  const [faceImageURL, setFaceImageURL] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = React.useRef(null);
  const [imageClicked, setImageClicked] = useState(false);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setFaceImageURL(imageSrc);
      setShowWebcam(false);
      setImageClicked(false);
    }
  };

  const handleCaptureButtonClick = () => {
    setShowWebcam(true);
    capture();
  };
  return (
    <>
      <div className="web-cam-page">
        {showWebcam ? (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="capture"
          />
        ) : null}

        {faceImageURL ? (
          <img
            src={faceImageURL}
            alt="Captured Face"
            className="captured-image"
          />
        ) : null}
        {!showWebcam && !faceImageURL ? (
          <button onClick={handleCaptureButtonClick} className="capture">
            Capture Image
          </button>
        ) : (
          !imageClicked && (
            <button onClick={handleCaptureButtonClick} className="">
              Click
            </button>
          )
        )}

        <div className="name">
          <p>Welcome, {user.user.name}</p>
        </div>
      </div>
    </>
  );
};

export default WebCam;
