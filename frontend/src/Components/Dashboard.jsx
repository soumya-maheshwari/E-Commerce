import React, { useState } from "react";
// import user from "../assets/avatar.svg";
import Webcam from "react-webcam";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Products from "./Products";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch } from "react-redux";
import { logAttendanceThunk } from "../Redux/attendanceSlice";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const userData = {};

  const handleCart = () => {
    navigate("/cart");
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logAttendanceThunk(userData))
      .then((res) => {
        console.log(res);
        if (res.payload.data.success) {
          toast.success(`${res.payload.data.msg}`, {
            position: "top-right",
            theme: "dark",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  };

  const handleNavigate = () => {
    navigate("/attendance");
  };
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <>
      <div className="dashboard">
        <h1
          style={{
            textAlign: "center",
            fontFamily: "cursive",
          }}
        >
          Welcome {user.user.name}
        </h1>

        <div className="btnss">
          <button className="login-btn" onClick={handleClickOpen}>
            Add Attendance
          </button>
          <button className="log" onClick={handleNavigate}>
            View Attendance Log
          </button>
          <button className="logg" onClick={handleCart}>
            Cart
          </button>
        </div>

        <Search />
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
      <ToastContainer />
    </>
  );
};

export default Dashboard;
