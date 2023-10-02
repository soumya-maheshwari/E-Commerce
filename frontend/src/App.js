import "./App.css";
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
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/webCam" exact element={<WebCam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
