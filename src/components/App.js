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
    <Navigate to='/sign-in'/>
  }

  function moveToLogup() {
    console.log(321);
    <Navigate to='/sign-up'/>
  }

  return (
    <>
      <Routes>
         <Route path="/content" element={<Header handleEvent={handleExit} title={'Выход'}/>}/>
         <Route path="/sign-up" element={<Header handleEvent={moveToLogin} title={'Войти'}/>}/>
         <Route path="/sign-in" element={<Header handleEvent={moveToLogup} title={'Регистрация'}/>}/>
      </Routes>
      <Routes>
        <Route path="/content" element={<ProtectedRoute element={Content} loggedIn={loggedIn} />} />
        <Route path="/sign-in" element={
          <div className="signinContainer">
            <Signin handleLogin={handleLogin}/>
          </div>} />
        <Route path="/sign-up" element={
          <div className="signupContainer">
            <Signup />
          </div>} />
        <Route path="/" element={loggedIn ? <Navigate to='/content' /> : <Navigate to='/sign-in' replace />} />
      </Routes>
    </>
  )
}

export default App;