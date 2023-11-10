// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import DoctorRoutes from "./DoctorRoutes/Routes";
// import AdminRoutes from "./AdminRoutes/Routes";

// function SystemRoutes() {


//     const login = "admin"

//     return (
//         <>
//             {
//                 login === "admin" 
//                     ? 
//                         <AdminRoutes /> 
//                     : 
//                         <DoctorRoutes />
//             }
//         </>
//     );
// }

// export default SystemRoutes;


// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AdminRoutes from "./AdminRoutes";
// import DoctorRoutes from "./DoctorRoutes";

// function SystemRoutes() {
 
//   const userRole = localStorage.getItem('userRole'); 

//   return (
//     <BrowserRouter>
//       <Routes>
//         {
//             userRole === "admin" ? 

//           <Route path="/*" element={<AdminRoutes />} />
//          : 
        
//          <Route path="/*" element={<DoctorRoutes />} />
          
//         }
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default SystemRoutes;


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import Doctor from "./Doctor";
import Patient from "./Patient";
import Ward  from "./Ward";
import Appointment from "./Appointment";
import Login from "./Login";
import Register from "./Register";
import DoctorDashboard from "./DoctorDashboard";

function SystemRoutes() {
  const userRole = localStorage.getItem('userRole');

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="Register" element={<Register />} />
      {userRole === 'admin' ? (
        <>
            <Route path="AdminDashboard" element={<AdminDashboard />} />
            <Route path="Doctor" element={<Doctor />} />
            <Route path="Patient" element={<Patient />} />
            <Route path="Ward" element={<Ward />} />
            <Route path="Appointment" element={<Appointment />} />
        </>
      ) : userRole === 'doctor' ? (
            <Route path="DoctorDashboard" element={<DoctorDashboard />} />
      ) : (
        <Route to="/" replace />
      )}
    </Routes>
  );
}

export default SystemRoutes;
