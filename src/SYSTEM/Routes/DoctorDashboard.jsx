import React, { useState, useEffect } from 'react'
import sideNavDoctor from '../Components/sideNavDoctor';
import axios from 'axios';
import config from '../../config';
import DashboardRightPanelDr from './DashboardRightPanelDr';
import { Calendar, Menu, Logout, CalendarMonth, Person2, Person3, LocationOn } from "@mui/icons-material";


function DoctorDashboard() {



  



  const [userData, setUserData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [webAppointmentsData, setWebAppointmentsData] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userJSON = localStorage.getItem('userData');
        if (userJSON) {
          const user = JSON.parse(userJSON);
          setUserData(user);

          // Fetch doctor data
          const doctorResponse = await axios.get(`${config.baseUrl}/doctors/byUserID/${user.userID}`);
          const { appointmentNos } = doctorResponse.data;

          // Fetch details for each appointmentNo from the appointments route
          const appointmentsDetails = await Promise.all(
            appointmentNos.map(async (appointmentNo) => {
              const appointmentDetailsResponse = await axios.get(`${config.baseUrl}/appointments/${appointmentNo}`);
              return appointmentDetailsResponse.data;
            })
          );

          // Fetch details for each appointmentNo from the webAppointments route
          const webAppointmentsDetails = await Promise.all(
            appointmentNos.map(async (appointmentNo) => {
              const webAppointmentDetailsResponse = await axios.get(`${config.baseUrl}/webUserAppointments/${appointmentNo}`);
              return webAppointmentDetailsResponse.data;
            })
          );

          // Set the fetched data in state
          setDoctorData(doctorResponse.data);
          setAppointmentsData(appointmentsDetails.flat()); // Flatten the array
          setWebAppointmentsData(webAppointmentsDetails.flat()); // Flatten the array


          console.log('Appointments Details:', appointmentsDetails.flat());
          console.log('Web Appointments Details:', webAppointmentsDetails.flat());


          // Set the first appointment as selectedAppointment
    if (webAppointmentsData.length > 0) {
      setSelectedAppointment(webAppointmentsData[0]);
    }

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  async function generateUniquePrescriptionID() {
    try {
      
      const response = await axios.get(`${config.baseUrl}/prescriptions/count`);
      const prescriptionCount = response.data.count; 
        const newIndex = prescriptionCount + 1;

        const PrescriptionID = `#PR23${newIndex}`;

        return PrescriptionID;
    } catch (error) {
        console.error('Error generating reference number:', error);
        throw error;
    }
}




  const handlePrescriptionUpload = async (values) => {
    try {
      // Check if selectedAppointment is not null (just to be safe)
      if (selectedAppointment) {
        const description = document.getElementById('prescription').value;
        // Generate unique PrescriptionID
      const prescriptionReferenceID = await generateUniquePrescriptionID();

        const response = await axios.post(`${config.baseUrl}/uploadprescription`, {
          description,
          doctorID: userData.userID,
          doctorName: doctorData.fullname,
          patientAge: selectedAppointment.age,
          patientREF: selectedAppointment.appointmentNo,
          prescriptionReferenceID,
          // Include the selected appointment data
        });
        console.log(response.data.message);
        console.log(response.data.count);
        // You can also do something with the prescription data if needed
      }
    } catch (error) {
      console.error('Prescription upload error:', error);
    }
  };



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


            {webAppointmentsData.length > 0 && (
              <div>
                {webAppointmentsData.slice(0, Math.ceil(webAppointmentsData.length / 2)).map((appointment, index) => (
                  <div key={index}>

                    <div className='w-full flex justify-start items-center relative py-2 border-collapse border-b-[1px] border-opacity-10 border-[#565656]'>
                      <div className='w-full flex flex-col'>
                        <h6>8.45 am</h6>
                        <h5>{appointment.firstName} {appointment.lastName}</h5>
                        <h5 className='text-gray-500 text-[14px]'>{appointment.referenceNo}</h5>
                      </div>

                      <div className=' absolute py-1 px-4 rounded-full top-2 right-0 text-center text-[12px] bg-[#002459] text-white'>
                        No : {appointment.appointmentNo}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}


            {appointmentsData.length > 0 && (
              <div>
                {appointmentsData.slice(0, Math.ceil(appointmentsData.length / 2)).map((appointment, index) => (
                  <div key={index}>

                    <div className='w-full flex justify-start items-center relative py-2 border-collapse border-b-[1px] border-opacity-10 border-[#565656]'>
                      <div className='w-full flex flex-col'>
                        <h6>8.45 am</h6>
                        <h5>{appointment.firstName} {appointment.lastName}</h5>
                        <h5 className='text-gray-500 text-[14px]'>{appointment.referenceNo}</h5>
                      </div>

                      <div className=' absolute py-1 px-4 rounded-full top-2 right-0 text-center text-[12px] bg-[#002459] text-white'>
                        No : {appointment.appointmentNo}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}


          </ul>

        </div>
      </div>




      <div className='page-body-wrapper lg:w-4/6 sm:w-5/6 bg-[#ffffff] mx-auto'>
        <div className='page-body-content p-10'>
          <div className='flex flex-row justify-between items-center'>

            {doctorData && (
              <div>

                <h3 className='text-[20pt] text-[#002459] font-semibold'>Welcome Dr. {doctorData.fullname}</h3>

              </div>
            )}


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


                {webAppointmentsData.length > 0 && (
                  <div>
                    {webAppointmentsData.map((appointment, index) => (
                      <div key={index} className='flex flex-col'>
                        {index === 0 && (
                          <>
                            <h4 className='text-[#1a1a1a] font-semibold text-[12pt]'>{appointment.firstName} {appointment.lastName}</h4>
                            <span className='text-[14px] text-[#565656]'>{appointment.gender} | {appointment.age} years</span>
                            <span className='text-[14px] text-[#565656]'>REF | {appointment.referenceNo}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}




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
              
            </div>

            <div className='flex flex-col justify-between  items-center w-2/3 mx-auto'>
              <textarea type='text' className='p-2 border-[1px] border-[#565656] border-opacity-25 rounded-lg w-full text-[#565656] resize-none overflow-y-auto' placeholder='Diagnosis' rows={10} id="prescription" />
            </div>


            <div className='flex flex-row justify-between  items-center w-2/3 mx-auto'>

              


              <button
              onClick={handlePrescriptionUpload}
               className='px-4 py-2 rounded-lg text-white capitalize bg-gradient-to-r from-[#627BFE] to-[#3D56DA]'>Upload Prescription</button>
            </div>





          </div>
        </div>





      </div>



      <DashboardRightPanelDr />


    </div>
  )
}

export default DoctorDashboard;
