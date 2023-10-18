import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";

function DoctorRoutes (){

    return(
<BrowserRouter>
    <Routes>
        <Route path="/" element={< DoctorDashboard/>} />
    </Routes>
</BrowserRouter>
    );
}

export default DoctorRoutes;