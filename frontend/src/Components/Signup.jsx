import React, { useState } from "react";
import { registerUserThunk } from "../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const sm = useSelector((state) => state.auth);
  console.log(sm);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const userData = {
    name,
    email,
    password,
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(registerUserThunk(userData))
      .then((res) => {
        // console.log(res);
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

          // setTimeout(() => {
          //   navigate("/");
          // }, 3000);

          localStorage.setItem("userInfo", JSON.stringify(sm.profile));
        } else {
          toast.error(`${res.payload.data.msg}`, {
            position: "top-right",
            // theme: "DARK",
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
        // console.log(err);
        return err.reponse;
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
            <p className="text-forgot">
              <span className="link">
                {/* <Link to="/forgotPassword"> Forogt Password ?</Link> */}
              </span>
            </p>
            <button type="submit" className="login-btn">
              Register
            </button>{" "}
            <p className="textt">
              Already have an account?
              <span className="link">
                {/* <Link to="/signup">SIGNUP</Link> */}
              </span>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
