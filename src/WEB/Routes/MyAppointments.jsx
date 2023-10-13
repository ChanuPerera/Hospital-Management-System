import React, { useEffect, useState } from "react";
import TopNav from "../Components/TopNav";
import Slider1 from "../Assets/Images/slider1_Mesa de trabajo 1.png";
import Footer from "../Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";



const  MyAppointments = () => {




    const AppointmentData = [
        {
            patient: "Amali Silva",
            doctor:"G. Dinesh Karunarathne",
            hospital: "City Hospital - Colombo",
            date: "15-Jan-2023",
            reference: "23569885"
        },
        {
            patient: "Pradeep Silva",
            doctor:"L.D.K Opanayake",
            hospital: "Lanka Hospital - Colombo",
            date: "18-March-2023",
            reference: "22335402"
        },
      
    ]






    return (

        <div className="w-full h-screen bg-white flex flex-col">
            <TopNav />

            <div className="main-body w-[70%]  relative flex flex-col mx-auto mt-10 py-5 h-screen">
            <div className="">
            <Link to="/" className="space-x-3">
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


                                {AppointmentData.map((appointment, index) => {

                                   


                                    return (


                                        <tr className="py-2 w-full" key={index}>
                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {index+1}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {appointment.patient}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {appointment.doctor}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {appointment.hospital}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20" >
                                                {appointment.date}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20" >
                                                {appointment.reference}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20 text-center" >
                                                <FontAwesomeIcon icon={faDownload} className="cursor-pointer hover:text-[#627BFE]"/>
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