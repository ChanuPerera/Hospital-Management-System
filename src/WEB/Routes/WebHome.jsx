import React, { useEffect, useState } from "react";
import TopNav from "../Components/TopNav";
import Slider1 from "../Assets/Images/slider1_Mesa de trabajo 1.png";
import Footer from "../Components/Footer";
import AppointmentForm from "../Components/AppoinementForm";
import { jwtDecode } from "jwt-decode" 

import config from '../../config';

import axios from 'axios';


const Home = () => {

  const [isPopUpOpen, setPopUpOpen] = useState(false);


  const openPopUp = (doctorData) => {
    setSelectedDoctor(doctorData); 
    setPopUpOpen(true);
  };

  const closePopUp = () => {
    setPopUpOpen(false);
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

    
      const decodedUser = decodeToken(token);
  

      if (decodedUser) {
        console.log("Decoded User Data:", decodedUser);
       console.log("email:", decodedUser.email)
       console.log("username:", decodedUser.username)
      }
    }, []); 



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
  
    useEffect(() => {
      fetchDoctors();
    }, []);
  
    console.log('Doctors state:', doctors);





    const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedSpecialize, setSelectedSpecialize] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
    // Reset other selects
    setSelectedSpecialize("");
    setSelectedHospital("");
    setSelectedDate("");
  };

  const handleSpecializeChange = (event) => {
    setSelectedSpecialize(event.target.value);
    // Reset other selects
    setSelectedDoctor("");
    setSelectedHospital("");
    setSelectedDate("");
  };

  const handleHospitalChange = (event) => {
    setSelectedHospital(event.target.value);
    // Reset other selects
    setSelectedDoctor("");
    setSelectedSpecialize("");
    setSelectedDate("");
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    // Reset other selects
    setSelectedDoctor("");
    setSelectedSpecialize("");
    setSelectedHospital("");
  };




    return (

        <div className="w-full h-screen bg-white flex flex-col">
            <TopNav />

            <div className="main-body w-[70%]  relative flex flex-col mx-auto mt-10 py-5">
                <div className="hero-slider w-full h-auto">
                    <img src={Slider1} alt="" />
                </div>
                <div className="req mt-[56px] w-full flex flex-col  justify-between items-center">
                    <div className="flex flex-row justify-between w-full" >
                        <div className="w-[30%] ">
                            <h3 className="text-[#002459] font-semibold text-[18pt]">Request Appointment</h3>

                        </div>
                        <div className="w-full h-auto flex flex-col relative">
                            <div className="w-full h-1/2 absolute top-0 border-collapse border-b-[1px] border-[#002459] ">

                            </div>
                        </div>

                    </div>

                    <div className="app-table w-full mt-5 bg-[#0176C5] rounded-xl p-5">
                        <div className="flex flex-row space-x-5">
                            <select className="w-1/5 outline-none border-[#565656] rounded-md p-2 px-2"
                            value={selectedDoctor}
        onChange={handleDoctorChange}
        >
                            <option value="">Select a doctor</option>
                                                    {doctors.map((doctor) => (
                                                        <option key={doctor._id} value={doctor.fullname}>
                                                            {doctor.fullname}
                                                        </option>
                                                    ))}
                            </select>

                            <select className="w-1/5 outline-none border-[#565656] rounded-md p-2 px-2"
                            value={selectedSpecialize}
        onChange={handleSpecializeChange}
        >
                                <option>Select Specialize</option>
                                {doctors.map((doctor) => (
                                                        <option key={doctor._id} value={doctor.specialize}>
                                                            {doctor.specialize}
                                                        </option>
                                                    ))}
                            </select>

                            <select className="w-1/5 outline-none border-[#565656] rounded-md p-2 px-2"
                            value={selectedHospital}
        onChange={handleHospitalChange}>
                                <option>Select Hospital</option>
                                <option>City Hospital</option>
                            </select>

                            <select className="w-1/5 outline-none border-[#565656] rounded-md p-2 px-2"
                            value={selectedDate}
        onChange={handleDateChange}>
                                <option>Select Date</option>
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Frieday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </select>


                            <button className="w-1/5 py-2 text-white rounded-md bg-[#002459] text-[12px]">
                                Check availability
                            </button>
                        </div>

                        <div className="table-wrapper mt-5 w-full">
                            <table className="appointment-availability-table w-full bg-white">
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Doctor</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Specialize</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Hospital</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Time</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Status</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 ">Action</th>


                                {doctors.map((doctor, index) => {

                                    let textColor;
                                    let visibility;
                                    if (doctor.status === "Available") {
                                        textColor = "#2CA74F";
                                        visibility = "block";
                                    } else {
                                        textColor = "#A72C2C";
                                        visibility = "none";
                                    }




                                    return (


                                        <tr className="py-2 w-full" key={index}>
                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {doctor.fullname}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {doctor.specialize}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                City Hospital
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {doctor.time}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20" style={{ color: textColor }}>
                                                {doctor.status}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20 text-center" >
                                                <button className="px-4 py-2 rounded-md bg-[#627BFE] text-white text-[12px] mx-auto " style={{ display: visibility }}
                                                onClick={() => openPopUp(doctor)}
                                                >
                                                    Request
                                                </button>
                                            </td>

                                        </tr>
                                    );
                                })}


                            </table>
                        </div>

                        {isPopUpOpen && selectedDoctor && (
        <AppointmentForm
          doctorData={selectedDoctor} 
          onClose={closePopUp}
        />
      )}

      
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default Home;