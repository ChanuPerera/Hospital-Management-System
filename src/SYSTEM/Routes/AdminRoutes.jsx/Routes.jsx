import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Doctor from "./Doctor";
import Patient from "./Patient";
import AdminDashboard from "./AdminDashboard";
import Appointment from "./Appointment";
import Ward from "./Ward";

function AdminRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="Doctor" element={<Doctor />} />
        <Route path="Patient" element={<Patient />} />
        <Route path="Ward" element={<Ward />} />
        <Route path="Appointment" element={<Appointment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminRoutes;
