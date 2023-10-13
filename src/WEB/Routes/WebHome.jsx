import React, { useEffect, useState } from "react";
import TopNav from "../Components/TopNav";
import Slider1 from "../Assets/Images/slider1_Mesa de trabajo 1.png";
import Footer from "../Components/Footer";



const Home = () => {




    const DoctorData = [
        {
            name: "G. Dinesh Karunarathne",
            specialize: "Cancer Surgeon",
            hospital: "City Hospital - Colombo",
            time: "8.30 am",
            status: "Available"
        },
        {
            name: "L.D.K Opanayake",
            specialize: "Anaesthetist",
            hospital: "City Hospital - Colombo",
            time: "6.30 pm",
            status: "Unavailable"
        },
        {
            name: "Pushpika Senarathne",
            specialize: "Clinical Physiologist",
            hospital: "Lanka Hospital - Colombo",
            time: "2.30 pm",
            status: "Available"
        },
    ]






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
                            <select className="w-1/5 outline-none border-[#565656] rounded-md p-2 px-2">
                                <option>Select Doctor</option>
                                <option>Doctor 1</option>
                                <option>Doctor 2</option>
                                <option>Doctor 3</option>
                            </select>

                            <select className="w-1/5 outline-none border-[#565656] rounded-md p-2 px-2">
                                <option>Select Specialize</option>
                                <option>Doctor 1</option>
                                <option>Doctor 2</option>
                                <option>Doctor 3</option>
                            </select>

                            <select className="w-1/5 outline-none border-[#565656] rounded-md p-2 px-2">
                                <option>Select Hospital</option>
                                <option>Doctor 1</option>
                                <option>Doctor 2</option>
                                <option>Doctor 3</option>
                            </select>

                            <select className="w-1/5 outline-none border-[#565656] rounded-md p-2 px-2">
                                <option>Select Date</option>
                                <option>Doctor 1</option>
                                <option>Doctor 2</option>
                                <option>Doctor 3</option>
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


                                {DoctorData.map((doctor, index) => {

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
                                                {doctor.name}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {doctor.specialize}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {doctor.hospital}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {doctor.time}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20" style={{ color: textColor }}>
                                                {doctor.status}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20 text-center" >
                                                <button className="px-4 py-2 rounded-md bg-[#627BFE] text-white text-[12px] mx-auto " style={{ display: visibility }}>
                                                    Request
                                                </button>
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

export default Home;