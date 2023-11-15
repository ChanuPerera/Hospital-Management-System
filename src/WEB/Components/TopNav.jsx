import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { jwtDecode } from "jwt-decode" 

import config from '../../config';

import axios from 'axios';

function TopNav () {

    const navigate = useNavigate();

    const DirectLogin = () =>
    {
        navigate('/Login');
    }


    
    const decodeToken = (token) => {
        try {
          const decoded = jwtDecode(token);
          return decoded;
        } catch (error) {
          console.error("Token decoding error:", error);
          return null;
        }
      };
    
      useEffect(() => {
        // Get the token from localStorage
        const token = localStorage.getItem("jwtToken");
  
        if(token)
        {
          document.getElementById('head-button').innerText = "Sign Out";
        }
        else
        {
          document.getElementById('head-button').innerText = "Signin";
        }
    
        // Decode the token
        const decodedUser = decodeToken(token);
    
        // Now you can access user details
        if (decodedUser) {
          console.log("Decoded User Data:", decodedUser);
         console.log("email:", decodedUser.email)
        }
      }, []); 

    return(
        <div className="nav-wrapper w-full h-[96px] bg-white flex flex-col py-3">
            <div className="top-nav-body w-[70%] h-full flex flex-row justify-between items-center mx-auto bg-white">
                <div className="nav-logo font-link">
                    <span className="text-[4rem]  text-[#627BFE] font-link">e-</span><span className="text-[4rem]  text-[#002459] font-link">Doc</span>
                </div>

                <div className="signin">
                    <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#627BFE] to-[#3D56DA] text-white text-[14px]" onClick={DirectLogin} id="head-button">
                    
                    </button>
                </div>
            </div>
            <div className="bottom-nav-body w-[70%] justify-end items-center flex bg-slate-100 mx-auto p-3 mt-2 mtb-3">
                <ul className="flex flex-row space-x-5">
                <Link to="/MyAppointments">
                <li className="text-[#627BFE]">My Appointments</li>
                </Link>
                    
                    <li>My Profile</li>
                </ul>
            </div>

        </div>
    );
}

export default TopNav;