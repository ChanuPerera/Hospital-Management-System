import React, { useEffect, useState } from "react";
import TopNav from "../Components/TopNav";
import Slider1 from "../Assets/Images/slider1_Mesa de trabajo 1.png";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode" 

import config from '../../config';
import axios from 'axios';


const  MyAppointments = () => {




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
        console.log("Decoded WebUser Data:", decodedUser);
      }
    }, []);


    const [myAppointments, setMyAppointments] = useState([]);


const fetchMyAppointments = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const decodedUser = decodeToken(token);
  
      if (decodedUser) {
        const response = await axios.get(`${config.baseUrl}/webUser/byName/${decodedUser.username}`);
        console.log('AppointmentNos for the current user:', response.data.appointmentNos);
  
        // Send the appointmentNos directly to the server
        const appointmentsDetails = await axios.post(`${config.baseUrl}/webUserAppointments/byAppointmentNos`, {
          appointmentNos: response.data.appointmentNos,
        });
  
        console.log('Web Appointment details for the current user:', appointmentsDetails.data);
        setMyAppointments(appointmentsDetails.data);
      }
    } catch (error) {
      console.error('Error fetching myAppointments data:', error);
      console.error('Error response data:', error.response.data);
    }
  };
  
  useEffect(() => {
    fetchMyAppointments();
  }, []);




  // const handleDownloadButtonClick = async (appointmentNo) => {
  //   try {
  //     // Fetch prescription data based on the appointmentNo
  //     const prescriptionResponse = await axios.get(`${config.baseUrl}/prescriptions/byAppointmentNo/${appointmentNo}`);

  //     console.log('Prescription details for the current user:', prescriptionResponse.data);
  //     // Now you have the prescription details, you can do something with it
  //   } catch (error) {
  //     console.error('Error fetching prescription data:', error);
  //     console.error('Error response data:', error.response.data);
  //   }
  // };







    return (

        <div className="w-full h-screen bg-white flex flex-col">
            <TopNav />

            <div className="main-body w-[70%]  relative flex flex-col mx-auto mt-10 py-5 h-screen">
            <div className="">
            <Link to="/Home" className="space-x-3">
            <FontAwesomeIcon icon={faArrowLeft} /><span className="text-[18px]">Back</span>
            </Link> 
</div>
                <div className="req mt-[26px] w-full flex flex-col  justify-between items-center">
                    

                    <div className="app-table w-full mt-5 bg-[#0176C5] rounded-xl p-5">
                        <div className="flex flex-row space-x-5">
                           
                            <input className="w-[20%] px-2 py-2 rounded-md outline-none" placeholder="Search Doctor, Date, Hospital, Reference No">

                            </input>

                            <button className="px-4 py-2 text-[#1a1a1a] rounded-md bg-[#FFFFFF] text-[12px]">
                                Search
                            </button>
                        </div>

                        <div className="table-wrapper mt-5 w-full">
                            <table className="appointment-availability-table w-full bg-white">
                            <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">#</th>
                            <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Patient</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Doctor</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Hospital</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Date</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Reference No</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 ">Prescription</th>


                                {myAppointments.map((appointment, index) => {
  let fullName = `${appointment.firstName} ${appointment.lastName}`;

 {/* const handleRowClick = async (appointment) => {
  try {
    const appointmentNo = appointment.appointmentNo;

    // Make a request to fetch prescription details
    const response = await axios.get(`${config.baseUrl}/prescriptions/${appointmentNo}`);

    if (response.data) {
      console.log('Prescription found:', response.data);
    } else {
      console.log('Prescription not found for appointmentNo:', appointmentNo);
    }
  } catch (error) {
    console.error('Error fetching prescription details:', error);
  }
}; */}



const handleRowClick = async (appointment) => {
  try {
    const appointmentNo = appointment.appointmentNo;

    // Make a request to fetch prescription details
    const response = await axios.get(`${config.baseUrl}/prescriptions/${appointmentNo}`);

    if (response.data) {
      console.log('Prescription found:', response.data);

      // Create a Blob with the prescription data
      const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'text/plain' });

      // Create a temporary link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `prescription_${appointmentNo}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log('Prescription not found for appointmentNo:', appointmentNo);
    }
  } catch (error) {
    console.error('Error fetching prescription details:', error);
  }
};


  return (
    <tr 
       onClick={() => handleRowClick(appointment)}
      className="py-2 w-full" 
      key={index}
    >
      <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
        {index + 1}
      </td>

      <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
        {fullName}
      </td>

      <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
        {appointment.doctor}
      </td>

      <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
        City Hospital
      </td>

      <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20" >
        {appointment.date}
      </td>

      <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20" >
        {appointment.referenceNo}
      </td>

      <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20 text-center" >
        <FontAwesomeIcon 
          icon={faDownload} 
          className="cursor-pointer hover:text-[#627BFE]"
        />
      </td>
    </tr>
  );
})}



                            </table>

                            
                        </div>

                        
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default MyAppointments;