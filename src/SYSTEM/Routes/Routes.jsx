import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DoctorRoutes from "./DoctorRoutes/Routes";
import AdminRoutes from "./AdminRoutes/Routes";

function SystemRoutes() {


    const login = "admin"

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