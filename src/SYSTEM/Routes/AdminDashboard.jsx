import React, { useState, useEffect } from 'react'
import SideNav from '../Components/SideNav';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import DashboardRightPanel from '../Components/DashboardRightPanel';
import * as Icons from "@mui/icons-material";
// import { hover } from '@testing-library/user-event/dist/hover';
import { ChevronRight } from "@mui/icons-material";
import { Search, Menu, Logout, ArrowForwardIos, NotificationsActive } from "@mui/icons-material";
import AppointmentScheduling from "../Assets/Images/AppointmentScheduling.png";
import MedicalDoctor from "../Assets/Images/MedicalDoctor.png";
import NurseCall from "../Assets/Images/NurseCall.png";
import PatientForm from '../Components/PatientForm';
import AppointmentForm from '../Components/AppointmentForm';
import axios from 'axios';
import config from '../../config';

















function AdminDashboard() {


  const [isPatientFormPopUpOpen, setPatientFormPopUpOpen] = useState(false);
  const [isAppointmentFormPopUpOpen, setAppointmentFormPopUpOpen] = useState(false);

  const openPatientFormPopUp = () => {
    setPatientFormPopUpOpen(true);
  }
  const closePatinetFormPopUp = () => {
    setPatientFormPopUpOpen(false);
  }


  const openAppointmentFormPopUp = () => {
    setAppointmentFormPopUpOpen(true);
  }
  const closeAppointmentFormPopUp = () => {
    setAppointmentFormPopUpOpen(false);
  }


  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${config.baseUrl}/doctors`);
      console.log('Response from the server:', response.data);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
      console.error('Error response data:', error.response.data);
    }
  };

  // Call the async function to fetch doctors when the component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);

  console.log('Doctors state:', doctors);


  const [appointmentCount, setAppointmentCount] = useState(0); // Initialize the count

  useEffect(() => {
    const fetchAppointmentCount = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/appointments/count`);
        const count = response.data.count;
        setAppointmentCount(count); 
      } catch (error) {
        console.error('Error getting appointment Count:', error);
        throw error;
      }
    };

    fetchAppointmentCount(); 
  }, []);



  const [doctorCount, setDoctorCount] = useState(0); // Initialize the count

  useEffect(() => {
    const fetchDoctorCount = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/doctors/count`);
        const count = response.data.count;
        setDoctorCount(count); 
      } catch (error) {
        console.error('Error getting appointment Count:', error);
        throw error;
      }
    };

    fetchDoctorCount(); 
  }, []);




  const [appointments, setAppointments] = useState([]);

      const fetchAppointment = async () => {
        try {
          
          const response = await axios.get(`${config.baseUrl}/appointments`);
          console.log('Response from the server:', response.data);
          setAppointments(response.data);

        } catch (error) {
          console.error('Error fetching Appointment data:', error);
          console.error('Error response data:', error.response.data);
        }
      }

      useEffect(()=>{
        fetchAppointment();
        },[])

        

  return (
    <div className='w-full h-screen flex flex-row justify-between'>
      <SideNav />

      <div className='w-full flex flex-col '>



        <div className='page-body-wrapper lg:w-4/6 sm:w-5/6 bg-[#ffffff] mx-auto'>
          <div className='page-body-content p-10'>
            <h3 className='text-[18pt]  text-[#002459] font-semibold'>Dashboard</h3>

            <div className='flex flex-row justify-start space-x-5 items-center w-full mt-5'>

              <div className='w-2/6 rounded-md p-5 flex cursor-pointer flex-row justify-center items-center bg-gradient-to-r from-[#627BFE] to-[#3D56DA] '
                onClick={() => openPatientFormPopUp()}>
                <div className='flex flex-col w-2/3'>
                  <span className='text-[#e3e3e3] text-[14px]'>Admit new</span>
                  <h4 className='uppercase text-white font-semibold text-[18pt]'>Patient</h4>
                </div>
                <div className='flex flex-col w-1/3 justify-center items-center text-white'>
                  <ArrowForwardIos />
                </div>

                {
                  isPatientFormPopUpOpen && (
                    <PatientForm
                      onClose={closePatinetFormPopUp} />
                  )
                }


              </div>


              <div className='w-2/6 rounded-md p-5 cursor-pointer flex flex-row justify-center items-center bg-gradient-to-r from-[#627BFE] to-[#3D56DA] '
                onClick={() => openAppointmentFormPopUp()}
              >
                <div className='flex flex-col w-2/3'>
                  <span className='text-[#e3e3e3] text-[14px]'>Make new</span>
                  <h4 className='uppercase text-white font-semibold text-[18pt]'>Appointment</h4>
                </div>
                <div className='flex flex-col w-1/3 justify-center items-center text-white'>
                  <ArrowForwardIos />
                </div>

                {
                  isAppointmentFormPopUpOpen && (
                    <AppointmentForm
                      onClose={closeAppointmentFormPopUp} />
                  )
                }
              </div>

              <div className='w-[80px] h-[80px] bg-[#627BFE] rounded-full flex justify-center items-center text-white'>
                <NotificationsActive fontSize='large' />
              </div>



            </div>

            <div className='flex flex-row justify-start space-x-5 items-center w-full mt-5'>

              <div className='w-full p-5 flex flex-row'>
                <div className='w-1/3 border-collapse border-r-[2px] border-[#002459] flex justify-center items-center space-x-5'>
                  <div className='relative'>
                    <img src={AppointmentScheduling} alt='' className='w-full h-full object-cover' />
                  </div>
                  <div className='flex flex-col'>
                    <h4 className='text-[18pt] text-[#002459]'>{appointmentCount}</h4>
                    <span className='text-[#565656] text-[14px]'>Appointments</span>
                  </div>

                </div>


                <div className='w-1/3 border-collapse border-r-[2px] border-[#002459] flex justify-center items-center space-x-5'>
                  <div className='relative'>
                    <img src={MedicalDoctor} alt='' className='w-full h-full object-cover' />
                  </div>
                  <div className='flex flex-col'>
                    <h4 className='text-[18pt] text-[#002459]'>{doctorCount}</h4>
                    <span className='text-[#565656] text-[14px]'>Available Doctors</span>
                  </div>

                </div>



                <div className='w-1/3 flex justify-center items-center space-x-5'>
                  <div className='relative'>
                    <img src={NurseCall} alt='' className='w-full h-full object-cover' />
                  </div>
                  <div className='flex flex-col'>
                    <h4 className='text-[18pt] text-[#002459]'>48</h4>
                    <span className='text-[#565656] text-[14px]'>Free Beds</span>
                  </div>

                </div>


              </div>
            </div>



            <div className='flex flex-col space-y-5 w-full mt-5 relative'>
              <h3 className='text-[18pt]  text-[#002459] font-semibold'>Today’s Doctors</h3>


              <div className='flex flex-row space-x-2 w-full'>
                <input type='text' placeholder='Search Doctor,Specialize,Room no..' className='w-1/3 p-2 outline-none border-[#565656] border-[1px] rounded-md border-opacity-30' />
                <button className='text-[#ffffff] text-[14px] px-4 py-2 rounded-md bg-[#3D56DA]'>Search</button>
              </div>
            </div>


          </div>
        </div>




        <div className='flex flex-row p-10 justify-start  w-full overflow-y-auto py-5 lg:w-4/6 sm:w-5/6 bg-[#ffffff] mx-auto mb-10' id="style-7">





          <div className='flex flex-col w-1/2 '>

            {doctors.map((doctor, index) => (
              <div className='flex flex-col w-full justify-between pr-5' key={index}>
                {index % 2 === 0 && (
                  <div className='w-full mt-5 '>
                    <div className='flex flex-row border-[#565656] border-[1px] border-opacity-20 rounded-lg p-5 relative'>
                      <div className='flex flex-col space-y-1'>
                        <span className='text-[#565656]'>{doctor.time}</span>
                        <span className='text-[#1a1a1a] font-semibold'>{doctor.fullname}</span>
                        <span className='text-[#a7a7a7]'>{doctor.specialize}</span>
                      </div>
                      <div className='text-[12px] text-white font-semibold justify-center items-center absolute top-2 right-2 rounded-s-full px-2 py-1 bg-[#002459]'>
                        Room {doctor.roomNo}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>


          <div className='flex flex-col w-1/2 '>
            {doctors.map((doctor, index) => (
              <div className='flex flex-col w-full justify-between ' key={index}>
                {index % 2 === 1 && (
                  <div className='w-full mt-5'>
                    <div className='flex flex-row border-[#565656] border-[1px] border-opacity-20 rounded-lg p-5 relative'>
                      <div className='flex flex-col space-y-1'>
                        <span className='text-[#565656]'>{doctor.time}</span>
                        <span className='text-[#1a1a1a] font-semibold'>{doctor.fullname}</span>
                        <span className='text-[#a7a7a7]'>{doctor.specialize}</span>
                      </div>
                      <div className='text-[12px] text-white font-semibold justify-center items-center absolute top-2 right-2 rounded-s-full px-2 py-1 bg-[#002459]'>
                        Room {doctor.roomNo}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>












        </div>



      </div>


      <DashboardRightPanel />


    </div>
  )
}

export default AdminDashboard;
