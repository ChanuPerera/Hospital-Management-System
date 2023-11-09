import React, { useState, useEffect } from 'react'
import SideNav from '../Components/SideNav';
import { Search, Menu, Logout, ArrowForwardIos, NotificationsActive, Add } from "@mui/icons-material";
import PatientEdit from '../Components/PatientEdit';
import PatientForm from '../Components/PatientForm';

import config from '../../config';
import axios from 'axios';





function Patient() {



  const handleUpdatePatient = async (patientId, updatedPatientData) => {
    try {
      const updatedFullname = `${updatedPatientData.firstName} ${updatedPatientData.lastName}`;
      updatedPatientData.fullName = updatedFullname;
      const response = await axios.put(`${config.baseUrl}/doctors/updateDoctor/${patientId}`, updatedPatientData);
      console.log('Doctor updated:', response.data);
      closePopUp();
      fetchPatient();
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };
  



  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [isPatientFormPopUpOpen, setPatientFormPopUpOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null); // State to store the selected doctor data

  const openPopUp = (PatientData) => {
    setSelectedPatient(PatientData); // Set the selected doctor data
    setPopUpOpen(true);
  };



  const closePopUp = () => {
    setPopUpOpen(false);
  };



  const openFormPopUp = () => {
    setPatientFormPopUpOpen(true);
  }
  const closeFormPopUp = () => {
    setPatientFormPopUpOpen(false);
  }




  const PatientData = [
    {
      name: "G. Dinesh Karunarathne",
      age: "46",
      address: "12/A, Temple rd, kasbawa",
      contact: "0775887741",
      email: "md@gmail.com",
      appointmentNo: "36845",
      payment: "Completed"
    },
    {
      name: "G. Dinesh Karunarathne",
      age: "46",
      address: "12/A, Temple rd, kasbawa",
      contact: "0775887741",
      email: "md@gmail.com",
      appointmentNo: "36845",
      payment: "Completed"
    },
    {
      name: "G. Dinesh Karunarathne",
      age: "46",
      address: "12/A, Temple rd, kasbawa",
      contact: "0775887741",
      email: "md@gmail.com",
      appointmentNo: "36845",
      payment: "Pending"
    },

  ]




  const [patients, setPatients] = useState([]);
  const fetchPatient = async () => {
    try {

     
      const response = await axios.get(`${config.baseUrl}/patients`);
      console.log('Response from the server:', response.data);
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      console.error('Error response data:', error.response.data);
    }
  };

  // Call the async function to fetch Patient when the component mounts
  useEffect(() => {
    fetchPatient();
  }, []);

  console.log('Patient state:', patients);






  return (
    <div className='w-full h-screen flex flex-row justify-between'>
      <SideNav />

      <div className='page-body-wrapper lg:w-5/6 bg-[#ffffff] h-screen mx-auto flex flex-col fixed right-0' id="style-7">
        <div className='page-body-content p-10 sm:ml-[80px] lg:ml-0'>
          <h3 className='text-[18pt]  text-[#002459] font-semibold'>Patients</h3>


          <div className='flex flex-row space-x-2 w-full mt-5'>
            <input type='text' placeholder='Search Doctor,Specialize,Room no..' className='w-1/3 p-2 outline-none border-[#565656] border-[1px] rounded-md border-opacity-30' />
            <button className='text-[#ffffff] text-[14px] px-4 py-2 rounded-md bg-[#3D56DA]'>Search</button>
            <button className='text-[#ffffff] text-[14px] px-4 py-2 rounded-md bg-gradient-to-r from-[#627BFE] to-[#3D56DA]'
              onClick={() => openFormPopUp()}

            > <span><Add className="mr-1" />Add new Patient</span>
              {isPatientFormPopUpOpen && (
                <PatientForm
                  onClose={closeFormPopUp}
                />
              )}
            </button>
          </div>





          <div className="table-wrapper mt-5 w-full">
            <table className="appointment-availability-table w-full bg-white border-[#565656] border-opacity-20 border-[1px]">
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">#</th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">ReferenceID</th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Name</th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Age</th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Address</th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Contact</th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Email</th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Appointment No</th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Payment</th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 ">Action</th>


              {patients.map((patient, index) => {
                let email;
                let appointmentNo;
                let payment;

                if (patient.email === null) {
                  email = "N/A";
                }
                else {
                  email = patient.email;
                }


                if (patient.appointmentNo === null) {
                  appointmentNo = "N/A";
                }
                else {
                  appointmentNo = patient.appointmentNo;
                }


                if (patient.payment === null) {
                  payment = "N/A";
                }
                else {
                  payment = patient.payment;
                }


               



                return (


                  <tr className="py-2 w-full" key={index}>
                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {index + 1}

                    </td>

                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {patient.referenceNo}
                    </td>

                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {patient.fullName}
                    </td>

                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {patient.age}
                    </td>

                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {patient.address}
                    </td>

                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {patient.contactNumber}
                    </td>

                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {email}
                    </td>


                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {appointmentNo}
                    </td>


                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20" >
                      {payment}
                    </td>

                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20 text-center" >
                      <button className="px-4 py-2 rounded-md bg-[#627BFE] text-white text-[12px] mx-auto "
                        onClick={() => openPopUp(patient)}
                      >
                        Edit
                      </button>
                    </td>

                  </tr>
                );
              })}


            </table>
          </div>

          {isPopUpOpen && selectedPatient && (
            <PatientEdit
              PatientData={selectedPatient}
              onClose={closePopUp}
              onUpdate={handleUpdatePatient}
            />
          )}





        </div>
      </div>





    </div>
  )
}

export default Patient;
