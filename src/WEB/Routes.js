import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/WebHome";
import MyAppointments from "./Routes/MyAppointments";
import Login from "./Routes/Login";
import Register from "./Routes/Register";

function WebRoutes() {
  return (
  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="MyAppointments" element={<MyAppointments />} />
        <Route path="Home" element={<Home />} />
        <Route path="Register" element={<Register />} />
      </Routes>
  
  );
}

export default WebRoutes;
