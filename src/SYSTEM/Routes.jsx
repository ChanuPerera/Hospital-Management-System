import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Routes/Login";

function SystemRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default SystemRoutes;
