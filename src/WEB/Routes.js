import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/WebHome";
import MyAppointments from "./Routes/MyAppointments";
import Login from "./Routes/Login";

function WebRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="MyAppointments" element={<MyAppointments/>}/>
        <Route path="Login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default WebRoutes;
