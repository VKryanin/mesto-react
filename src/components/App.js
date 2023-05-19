import React from "react";
import Content from "./Content";
import { Routes, Route, Navigate } from "react-router-dom";
import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { ProtectedRoute } from "./ProtectedRoute";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  }


  return (
    <Routes>
      <Route path="/content" element={<ProtectedRoute element={Content} loggedIn={loggedIn} />} />
      <Route path="/signin" element={
        <div className="signinContainer">
          <Signin handleLogin={handleLogin} />
        </div>} />
      <Route path="/signup" element={
        <div className="signupContainer">
          <Signup />
        </div>} />
      <Route path="/" element={loggedIn ? <Navigate to='/content' /> : <Navigate to='/signin' replace />} />
    </Routes>

  )
}

export default App;