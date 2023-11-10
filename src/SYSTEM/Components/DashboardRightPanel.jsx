import React, { useState, useEffect } from 'react'
import axios from 'axios';
import config from '../../config';

import user from "../Assets/Images/user.png";
import Calendar from './Calendar';

function DashboardRightPanel({ userID}) {










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
                <div className='user-info w-full border-[1px] border-[#565656] border-opacity-20 rounded-lg p-5'>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='user flex flex-col spce-y-2'>
                            <h4 className='text-[#565656]'>Amali
                                Gunathilake</h4>
                            <h4 className='text-[#565656]'>User ID : { userID }</h4>
                        </div>
                        <div className=' w-[80px] h-[80px] rounded-full relative object-center'>
                            <img src={user} alt='' className='w-full h-full object-cover rounded-full' />
                        </div>
                    </div>
                </div>

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

export default DashboardRightPanel
