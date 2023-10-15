import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Routes/Login";
import AdminDashboard from "./Routes/AdminDashboard";
import Doctor from "./Routes/Doctor";
import Patient from "./Routes/Patient";
import Ward from "./Routes/Ward";

function SystemRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="AdminDashboard" element={<AdminDashboard/>}/>
        <Route path="Doctor" element={<Doctor/>}/>
        <Route path="Patient" element={<Patient/>}/>
        <Route path="Ward" element={<Ward/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default SystemRoutes;
