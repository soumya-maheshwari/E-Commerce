import React, { useState } from "react";
// import user from "../assets/avatar.svg";
import Webcam from "react-webcam";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Products from "./Products";

const Dashboard = () => {
  const [faceImageURL, setFaceImageURL] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [imageClicked, setImageClicked] = useState(false);
  const [open, setOpen] = React.useState(false);

  const webcamRef = React.useRef(null);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setFaceImageURL(imageSrc);
      setShowWebcam(false);
      setImageClicked(false);
    }
  };

  const handleCaptureButtonClick = (e) => {
    e.preventDefault();
    setShowWebcam(true);
    capture();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleSubmit = () => {};

  return (
    <>
      <div className="dashboard">
        <h1>welocme, user</h1>
        <button className="login-btn" onClick={handleClickOpen}>
          Add Attendance
        </button>

        <Dialog open={open} onClose={handleClose}>
          <div className="dialog-class">
            <DialogTitle fontSize={"30px"}>Add Attendance</DialogTitle>
            <form className="form-class" onSubmit={handleSubmit}>
              <label className="label-class">Photo</label>
              <div className="form-group">
                {showWebcam ? (
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="web-cam"
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
                  <button
                    onClick={handleCaptureButtonClick}
                    className="login-btn2"
                  >
                    Capture Image
                  </button>
                ) : (
                  !imageClicked && (
                    <button
                      onClick={handleCaptureButtonClick}
                      className="login-btn2"
                    >
                      Click
                    </button>
                  )
                )}
                {/* {!showWebcam && faceImageURL ? (
                <button
                  type="button"
                  onClick={handleCaptureButtonClick}
                  className="login-btn2"
                >
                  Recapture
                </button>
              ) : null} */}
              </div>
              <button type="submit" className="add">
                ADD
              </button>
            </form>
          </div>
        </Dialog>

        <Products />
      </div>
    </>
  );
};

export default Dashboard;
