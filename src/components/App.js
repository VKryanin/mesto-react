import React, { useEffect } from "react";
import Content from "./Content";
import { Header } from "./Header";
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
  function handleExit() {
    localStorage.clear()
    setLoggedIn(false)
  }

  function moveToLogin() {
    console.log(123);
    return <Navigate to='/sign-in'/>
  }

  return (
    <>
      <Routes>
        <Route path="/content" element={<ProtectedRoute element={Content} loggedIn={loggedIn} handleExit={handleExit} title={"Выйти"} />} />
        <Route path="/sign-in" element={
          <div className="signinContainer">
            < Header title={"Регистрация"} />
            <Signin />
          </div>} />
        <Route path="/sign-up" element={
          <div className="signupContainer">
            < Header title={"Войти"} handleEvent={moveToLogin} />
            <Signup />
          </div>} />
        <Route path="/" element={loggedIn ? <Navigate to='/content' /> : <Navigate to='/sign-in' replace />} />
      </Routes>
    </>
  )
}

export default App;