import React, { useState } from "react";
import { registerUserThunk } from "../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Webcam from "react-webcam";

const Signup = () => {
  const dispatch = useDispatch();
  const sm = useSelector((state) => state.auth);
  console.log(sm);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [faceImageURL, setFaceImageURL] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [imageClicked, setImageClicked] = useState(false);

  const userData = {
    name,
    email,
    password,
    faceImageURL,
  };

  console.log(userData);

  const webcamRef = React.useRef(null);
  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setFaceImageURL(imageSrc);
      setShowWebcam(false); // Hide the webcam component after capturing
      setImageClicked(false);
    }
  };
  const handleCaptureButtonClick = () => {
    setShowWebcam(true); // Show the webcam when the button is
    capture();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(registerUserThunk(userData))
      .then((res) => {
        if (res.payload.data.success) {
          // Handle success
        } else {
          // Handle error
        }
      })
      .catch((err) => {
        // Handle error
      });
  };

  return (
    <>
      <div className="container">
        <div className="centered-form">
          <form action="" className="form-class" onSubmit={handleSignup}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Full Name
              </label>{" "}
              <input
                type="text"
                value={name}
                className="input-field"
                id="name"
                placeholder="Full Name"
                name="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>{" "}
              <input
                type="text"
                value={email}
                className="input-field"
                id="email"
                placeholder="Email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Password
              </label>{" "}
              <input
                type="password"
                className="input-field"
                id="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
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
            <button type="submit" className="login-btn">
              Register
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
