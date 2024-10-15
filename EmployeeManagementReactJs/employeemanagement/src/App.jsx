import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/Home"
import UserAuth from "./components/UserAuth";

function App() {
  return (
<Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home/:value" element={<Home />} />
        <Route path="/login" element={<UserAuth />} />
        <Route path="/signup" element={<UserAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
