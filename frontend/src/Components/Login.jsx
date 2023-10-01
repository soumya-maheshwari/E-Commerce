import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};
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
                {/* <Link to="/signup">SIGNUP</Link> */}
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
