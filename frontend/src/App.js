import "./App.css";
import AttendancePage from "./Components/AttendancePage";
import Cart from "./Components/Cart";
import Dashboard from "./Components/Dashboard";
import Loading from "./Components/Loading";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import WebCam from "./Components/WebCam";
import "./Components/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/Task" exact element={<Login />} />

        <Route path="/signup" exact element={<Signup />} />
        <Route path="/webCam" exact element={<WebCam />} />
        <Route path="/loading" exact element={<Loading />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/attendance" exact element={<AttendancePage />} />
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
