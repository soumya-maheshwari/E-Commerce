import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../Redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sm = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = {
    email,
    password,
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginUserThunk(userData))
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

          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);

          localStorage.setItem("userInfo", JSON.stringify(res.payload.data));
        } else {
          toast.error(`${res.payload.data.msg}`, {
            position: "top-right",
            theme: "DARK",
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
          <form action="" className="form-class" onSubmit={handleLogin}>
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
              Login
            </button>{" "}
            <p className="textt">
              Don't have an account?
              <span className="link">
                <Link to="/signup">Register</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
