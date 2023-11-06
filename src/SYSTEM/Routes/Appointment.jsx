import React,{useState, useEffect} from 'react'
import SideNav from '../Components/SideNav';
import { Search, Menu, Logout, ArrowForwardIos, NotificationsActive, Add } from "@mui/icons-material";
import PatientEdit from '../Components/PatientEdit';
import PatientForm from '../Components/PatientForm';
import AppointmentForm from '../Components/AppointmentForm';
import axios from 'axios';
import config from '../../config';




function Appointment() {
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [isAppointmentFormPopUpOpen, setAppointmentFormPopUpOpen] =
    useState(false);
  // const [selectedAppointment, setSelectedAppointment] = useState(null); // State to store the selected doctor data

  // const openPopUp = (PatientData) => {
  //   setSelectedPatient(PatientData); // Set the selected doctor data
  //   setPopUpOpen(true);
  // };

  // const closePopUp = () => {
  //   setPopUpOpen(false);
  // };

  const openFormPopUp = () => {
    setAppointmentFormPopUpOpen(true);
  };
  const closeFormPopUp = () => {
    setAppointmentFormPopUpOpen(false);
  };

  const AppointmentData = [
    {
      name: "G. Dinesh Karunarathne",
      age: "46",
      address: "12/A, Temple rd, kasbawa",
      contact: "0775887741",
      email: "md@gmail.com",
      appointmentNo: "36845",
      payment: "Completed",
    },
    {
      name: "G. Dinesh Karunarathne",
      age: "46",
      address: "12/A, Temple rd, kasbawa",
      contact: "0775887741",
      email: "md@gmail.com",
      appointmentNo: "36845",
      payment: "Completed",
    },
    {
      name: "G. Dinesh Karunarathne",
      age: "46",
      address: "12/A, Temple rd, kasbawa",
      contact: "0775887741",
      email: "md@gmail.com",
      appointmentNo: "36845",
      payment: "Pending",
    },
  ];








      // const [doctorNames, setDoctorNames] = useState([]);;

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
    <div className="w-full h-screen flex flex-row justify-between">
      <SideNav />

      <div
        className="page-body-wrapper lg:w-5/6 bg-[#ffffff] h-screen mx-auto flex flex-col fixed right-0"
        id="style-7"
      >
        <div className="page-body-content p-10 sm:ml-[80px] lg:ml-0">
          <h3 className="text-[18pt]  text-[#002459] font-semibold">
            Appointment
          </h3>

          <div className="flex flex-row space-x-2 w-full mt-5">
            <input
              type="text"
              placeholder="Search Doctor,Specialize,Room no.."
              className="w-1/3 p-2 outline-none border-[#565656] border-[1px] rounded-md border-opacity-30"
            />
            <button className="text-[#ffffff] text-[14px] px-4 py-2 rounded-md bg-[#3D56DA]">
              Search
            </button>
            <button
              className="text-[#ffffff] text-[14px] px-4 py-2 rounded-md bg-gradient-to-r from-[#627BFE] to-[#3D56DA]"
              onClick={() => openFormPopUp()}
            >
              {" "}
              <span>
                <Add className="mr-1" />
                Add new Appointment
              </span>
              {isAppointmentFormPopUpOpen && (
                <AppointmentForm onClose={closeFormPopUp} />
              )}
            </button>
          </div>

          <div className="table-wrapper mt-5 w-full">
            <table className="appointment-availability-table w-full bg-white border-[#565656] border-opacity-20 border-[1px]">
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                #
              </th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                Reference No
              </th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                Name
              </th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                Age
              </th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                NIC
              </th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                Contact
              </th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                Doctor
              </th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                Date
              </th>
              <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                Appointment No
              </th>
              

              {appointments.map((appointment, index) => {
                

                let fullname = appointment.firstName + ` ` + appointment.lastName;

                return (
                  <tr className="py-2 w-full" key={index}>
                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {index + 1}
                    </td>
                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {appointment.referenceNo}
                    </td>

                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {fullname}
                    </td>
                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {appointment.age}
                    </td>

                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {appointment.nic}
                    </td>

                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {appointment.contactNumber}
                    </td>

                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {appointment.doctor}
                    </td>

                    <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                      {appointment.date}
                    </td>

                    <td
                      className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20"
                     
                    >
                      {appointment.appointmentNo}
                    </td>
                  
                  </tr>
                );
              })}
            </table>
          </div>

          {/* {isAppointmentFormPopUpOpen && selectedAppointment && (
            <PatientEdit
              PatientData={selectedAppointment}
              onClose={closeFormPopUp}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Appointment;
