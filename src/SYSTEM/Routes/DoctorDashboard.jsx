import React from 'react'
import sideNavDoctor from '../Components/sideNavDoctor';

import DashboardRightPanelDr from './DashboardRightPanelDr';
import { Calendar, Menu, Logout, CalendarMonth, Person2, Person3, LocationOn } from "@mui/icons-material";


function DoctorDashboard() {




  const patientQueue = [
    {
      time: "8.30 am",
      name: "Sandeepani Kumari",
      no: "01",
    },
    {
      time: "8.40 am",
      name: "Nimsara Lakshani",
      no: "02",
    },
    {
      time: "8.50 am",
      name: "Nimal Hasaranga",
      no: "03",
    },
    {
      time: "9.00 am",
      name: "Amila Sampath",
      no: "04",
    },
    {
      time: "9.10 am",
      name: "Kasun Gunathilaka",
      no: "05",
    },
    {
      time: "9.20 am",
      name: "Jayantha de Silva",
      no: "06",
    },
    {
      time: "9.30 am",
      name: "Ruwan Perera",
      no: "07",
    },
    {
      time: "9.40 am",
      name: "Sansun Theekshana",
      no: "08",
    },
    {
      time: "9.50 am",
      name: "Kavinga Tinomal",
      no: "09",
    },
    {
      time: "10.00 am",
      name: "Rukmanee Jayaweera",
      no: "10",
    },
    {
      time: "10.10 am",
      name: "Gaminie Hewa",
      no: "11",
    },
    {
      time: "10.20 am",
      name: "Niluka Wimalasiri",
      no: "12",
    },
  ]
  return (
    <div className='w-full h-screen flex flex-row justify-between'>

      <div className="res-sidenav lg:w-1/6 md:w-[80px] h-full fixed flex flex-col bg-[#FFFFFF] 
            border-[#565656] border-collapse border-r-[1px] border-opacity-10
          z-10 w-full backdrop-blur-md bg-opacity-90 sm:bg-opacity-100 sm:backdrop-blur-0 overflow-y-scroll sm:overflow-hidden ">

        <div className="nav-logo font-link w-full lg:flex justify-center hidden ">
          <span className="text-[4rem]  text-[#627BFE] font-link">e-</span><span className="text-[4rem]  text-[#002459] font-link">Doc</span>
        </div>
        <div className="flex flex-row justify-between items-center py-2 border-collapse border-b-[1px] border-opacity-10 border-[#565656] p-3">
            <h3 className='text-[12pt]  text-[#002459] font-semibold'>Patients List</h3>
            <div className="px-6 py-2 text-[10pt] text-white bg-[#627BFE] rounded-full flex justify-center items-center">
              38
            </div>
        </div>

        <div className="h-screen w-full p-3  overflow-y-auto" id="style-7">
          

          <ul className='flex flex-col mt-5'>


            {patientQueue.map((queue, index) => (

              <li key={index}>
                <div className='w-full flex justify-start items-center relative py-2 border-collapse border-b-[1px] border-opacity-10 border-[#565656]'>
                  <div className='w-full flex flex-col'>
                    <h6>{queue.time}</h6>
                    <h5>{queue.name}</h5>
                  </div>

                  <div className=' absolute py-1 px-4 rounded-full top-2 right-0 text-center text-[12px] bg-[#002459] text-white'>
                    No : {queue.no}
                  </div>
                </div>
              </li>


            ))}

          </ul>

        </div>
      </div>




      <div className='page-body-wrapper lg:w-4/6 sm:w-5/6 bg-[#ffffff] mx-auto'>
        <div className='page-body-content p-10'>
          <div className='flex flex-row justify-between items-center'>
            <h3 className='text-[18pt]  text-[#002459] font-semibold'>Welcome Dr. P.J Liyanage</h3>
            <div className='px-4 py-2 border-[1px] rounded-lg border-[#002459] bg-[#ffffff] flex items-center justify-center '>
                <span className='text-[12pt] text-[#002459]'>
                  Next in Queue : Nimsara Lakshani
                </span>
            </div>
          </div>
         

          <div className='flex flex-col justify-start space-y-5  w-full mt-5'>

            <h3 className='text-[14pt]  text-[#002459] font-semibold py-2 bg-slate-100 px-2'>Consultation</h3>

            <div className='flex flex-row justify-between  items-center w-2/3 mx-auto'>
              <div className=' flex flex-col w-full'>
                <h4 className='text-[#1a1a1a] font-semibold text-[12pt]'>Sandeepani Kumari</h4>
                <span className='text-[14px] text-[#565656]'>Female | 42 years</span>
                <span className='text-[14px] text-[#565656]'>PID | 000328</span>
              </div>
              <div className='px-4 py-2 border-[1px] rounded-full border-[#002459] justify-center flex items-center'>
                <h4 className='text-[#1a1a1a] font-semibold text-[12pt]'>Ongoing</h4>
              </div>
            </div>

            <div className='flex flex-col justify-between  items-center w-2/3 mx-auto'>
              <div className=' flex flex-col w-full'>
                <h4 className='text-[#1a1a1a] font-semibold text-[12pt]'>Last Checked</h4>
              </div>
              <div className='w-full flex flex-row space-x-5 mt-5'>
                <div className='p-3 rounded-md bg-[#627BFE] bg-opacity-10 justify-center items-center flex flex-col w-1/3'>
                  <CalendarMonth />
                  <h4 className='text-[#1a1a1a] font-semibold text-[12pt] mt-2'>12/05/2023</h4>
                </div>
                <div className='p-3 rounded-md bg-[#627BFE] bg-opacity-10 justify-center items-center flex flex-col w-1/3'>
                  <Person3 />
                  <h4 className='text-[#1a1a1a] font-semibold text-[12pt] mt-2'>Dr. P.J Liyanage</h4>
                </div>
                <div className='p-3 rounded-md bg-[#627BFE] bg-opacity-10 justify-center items-center flex flex-col w-1/3'>
                  <LocationOn />
                  <h4 className='text-[#1a1a1a] font-semibold text-[12pt] mt-2'>City Hospital</h4>
                </div>
              </div>
            </div>


            <div className='flex flex-col justify-between  items-center w-2/3 mx-auto'>
              <div className=' flex flex-row w-full'>
                <h4 className='text-[#1a1a1a] font-semibold text-[12pt]'>Last Prescription :</h4> <a href=''><span> 120500328PJL.pdf</span></a> 
              </div>
            
            </div>





          </div>

          <div className='flex flex-col justify-start space-y-5  w-full mt-5'>

            <h3 className='text-[14pt]  text-[#002459] font-semibold py-2 bg-slate-100 px-2'>Prescription</h3>

            <div className='flex flex-row justify-between items-center w-2/3  mx-auto space-x-5'>
              <div className=' flex flex-col w-3/4'>
                <input type='text' className='p-2 border-[1px] border-[#565656] border-opacity-25 rounded-lg w-full text-[#565656]' placeholder='Sandeepani Kumari' readOnly />
              </div>
              <div className='flex flex-col w-1/4'>
              <input type='text' className='p-2 border-[1px] border-[#565656] border-opacity-25 rounded-lg w-full text-[#565656]' placeholder='42' readOnly />
              </div>
            </div>

            <div className='flex flex-col justify-between  items-center w-2/3 mx-auto'>
              <textarea type='text' className='p-2 border-[1px] border-[#565656] border-opacity-25 rounded-lg w-full text-[#565656] resize-none overflow-y-auto' placeholder='Diagnosis' rows={10} id="style-7"/>
            </div>


            <div className='flex flex-row justify-between  items-center w-2/3 mx-auto'>
              
              <h3 className='text-[14pt]  text-[#002459] font-semibold'> Dr. P.J Liyanage</h3>
            

            <button className='px-4 py-2 rounded-lg text-white capitalize bg-gradient-to-r from-[#627BFE] to-[#3D56DA]'>Upload Prescription</button>
            </div>





          </div>
        </div>





      </div>



      <DashboardRightPanelDr />


    </div>
  )
}

export default DoctorDashboard;
