import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorRoutes from "./DoctorRoutes.jsx/Routes";
import AdminRoutes from "./AdminRoutes.jsx/Routes";

function SystemRoutes() {


    const login = "doctor"

    return (
        <>
            {
                login === "admin"

                    ?
                    <AdminRoutes />
                    :
                    <DoctorRoutes />
            }
        </>
    );
}

export default SystemRoutes;