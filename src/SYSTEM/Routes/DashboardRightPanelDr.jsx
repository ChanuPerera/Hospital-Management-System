import React, { useState, useEffect } from 'react'
import user from "../Assets/Images/user.png";
import Calendar from '../Components/Calendar';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode" 
import axios from 'axios';
import config from '../../config';









function DashboardRightPanelDr() {




    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const userJSON = localStorage.getItem('userData');
      if (userJSON) {
        const user = JSON.parse(userJSON);
        setUserData(user);
      }
    }, []);
  



    const location = useLocation();
        const userID = new URLSearchParams(location.search).get('userID');


        const [decodedUser, setDecodedUser] = useState(null);
    



        const handleSignout = async () => {
            try {
                // Remove token and userRole from localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');
        
                console.log('Token and userRole removed from localStorage.');
        
                // Redirect to the home page
                window.location.href = '/';
            } catch (error) {
                console.error('Signout error:', error);
            }
        };



    

        

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
        
            const token = localStorage.getItem("jwtToken");
      
          
            const user = decodeToken(token);
        
      
            if (user) {
              console.log("Decoded User Data:", user);
             console.log("email:", user.email)
             console.log("username:", user.username)
             setDecodedUser(user);
            }
          }, []); 
    
    
          const [appointments, setAppointments] = useState([]);
          const [doctors, setDoctors] = useState([]);
      
      
          const fetchAppointments = async () => {
              try {
                  const response = await axios.get(`${config.baseUrl}/appointments`);
                  setAppointments(response.data);
              } catch (error) {
                  console.error('Error fetching Appointment data:', error);
              }
          }
      
          const fetchDoctors = async () => {
              try {
                  const response = await axios.get(`${config.baseUrl}/doctors`);
                  setDoctors(response.data);
              } catch (error) {
                  console.error('Error fetching doctor data:', error);
              }
          }
      
          useEffect(() => {
              fetchAppointments();
              fetchDoctors();
          }, []);
      



  // Function to find the doctor and get room number
  const getRoomNumber = (appointment) => {
    const doctor = doctors.find((d) => d.fullname === appointment.doctor);
    return doctor ? doctor.roomNo : 'Room not found';
}

        
    return (
        <div className='w-1/6 h-screen fixed right-0 border-collapse border-l-[1px] border-[#565656] border-opacity-10 lg:block hidden overflow-y-auto' id="style-7">
            <div className='right-nav-body p-5 flex flex-col space-y-5'>
                {/* <div className='user-info w-full border-[1px] border-[#565656] border-opacity-20 rounded-lg p-5'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='user flex flex-col spce-y-2'>
                            <h4 className='text-[#565656]'>Dr. P.J Liyanage</h4>
                            <h4 className='text-[#565656]'>Username: {decodedUser ? decodedUser.username : 'Loading...'}</h4>
                        </div>
                        <div className=' w-[80px] h-[80px] rounded-full relative object-center'>
                            <img src={user} alt='' className='w-full h-full object-cover rounded-full' />
                        </div>
                    </div>
                </div> */}


                <div className="signin w-full p-3">
                    <button className="px-4 py-2 w-full rounded-full bg-gradient-to-r from-[#627BFE] to-[#3D56DA] text-white text-[14px]" onClick={handleSignout} id="head-button">
                    Sign Out
                    </button>
                </div>


                {userData && (
        <div>
          <p>User ID: {userData.userID}</p>
          <p>User Role: {userData.role}</p>
          {/* Add other user data fields as needed */}
        </div>
      )}



                <div className='p-3 w-full '>
                    <Calendar />
                </div>


                <h3 className='text-[18pt]  text-[#002459] font-semibold'>Recent Appointments</h3>

                {appointments.map((appointmentData, index) => (



<div className='w-full flex flex-row border-[#565656] border-[1px] border-opacity-20 rounded-lg p-5 relative' key={index}>
    <div className='flex flex-col space-y-2'>
        <span className='text-[#565656]'>{appointmentData.time}</span>
        <span className='text-[#1a1a1a] font-semibold'>{appointmentData.firstName} {appointmentData.lastName}</span>
        <span className='text-[#565656]'>Consultation with <span className='text-[#627BFE] font-semibold'>Dr. {appointmentData.doctor}</span> </span>
    </div>

    <div className='text-[12px] text-white font-semibold justify-center
 items-center absolute top-2 right-2 rounded-s-full px-2 py-1 bg-[#0176C5]'>
        No {getRoomNumber(appointmentData)}
    </div>
</div>

))}

                

            </div>
        </div>
    )
}

export default DashboardRightPanelDr
