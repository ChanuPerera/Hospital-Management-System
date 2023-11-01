import React,{useState} from 'react'
import SideNav from '../../Components/SideNav'
import { Search, Menu, Logout, ArrowForwardIos, NotificationsActive, Add } from "@mui/icons-material";
import DoctorEdit from '../../Components/DoctorEdit';
import DoctorForm from '../../Components/DoctorForm';

function Doctor() {



  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to store the selected doctor data

  const openPopUp = (doctorData) => {
    setSelectedDoctor(doctorData); // Set the selected doctor data
    setPopUpOpen(true);
  };

  const closePopUp = () => {
    setPopUpOpen(false);
  };


  const [isDoctorFormPopUpOpen, setDoctorFormPopUpOpen] = useState(false);
  const openFormPopUp = () =>{
    setDoctorFormPopUpOpen(true);
  }
  const closeFormPopUp = () =>{
    setDoctorFormPopUpOpen(false);
  }





    const DoctorData = [
        {
            name: "G. Dinesh Karunarathne",
            specialize: "Cancer Surgeon",
            hospital: "City Hospital - Colombo",
            contact:"0775887741",
            datetime: "Mon -7.00 PM , Sat-8.30 AM",
            roomno:"35",
            status: "Arrived"
        },
        {
            name: "L.D.K Opanayake",
            specialize: "Anaesthetist",
            hospital: "City Hospital - Colombo",
            contact:"0775887741",
            datetime: "Mon -7.00 PM , Sat-8.30 AM",
            roomno:"11",
            status: "Leave"
        },
        {
            name: "Pushpika Senarathne",
            specialize: "Clinical Physiologist",
            hospital: "Lanka Hospital - Colombo",
            contact:"0775887741",
            datetime: "Mon -7.00 PM , Sat-8.30 AM",
            roomno:"28",
            status: "Arrived"
        },
    ]





  return (
    <div className='w-full h-screen flex flex-row justify-between'>
      <SideNav/>

      <div className='page-body-wrapper lg:w-5/6  bg-[#ffffff] h-screen mx-auto flex flex-col fixed right-0' id="style-7">
          <div className='page-body-content p-10 sm:ml-[80px] lg:ml-0'>
            <h3 className='text-[18pt]  text-[#002459] font-semibold'>Doctors</h3>


            <div className='flex flex-row space-x-2 w-full mt-5'>
                <input type='text' placeholder='Search Doctor,Specialize,Room no..' className='w-1/3 p-2 outline-none border-[#565656] border-[1px] rounded-md border-opacity-30' />
                <button className='text-[#ffffff] text-[14px] px-4 py-2 rounded-md bg-[#3D56DA]'>Search</button>
                <button className='text-[#ffffff] text-[14px] px-4 py-2 rounded-md bg-gradient-to-r from-[#627BFE] to-[#3D56DA]'
                 onClick={() => openFormPopUp()}
                 
                 > <span><Add className="mr-1"/>Add new Doctor</span>
                {isDoctorFormPopUpOpen && (
        <DoctorForm
          onClose={closeFormPopUp}
        />
      )}
      </button>
            </div>





            <div className="table-wrapper mt-5 w-full">
                            <table className="appointment-availability-table w-full bg-white border-[#565656] border-opacity-20 border-[1px]">
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">#</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Name</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Specialize</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Contact</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Date & Time</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Room NO</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Status</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 ">Action</th>


                                {DoctorData.map((doctor, index) => {

                                    let textColor;
                                    let visibility;
                                    if (doctor.status === "Arrived") {
                                        textColor = "#2CA74F";
                                        
                                    } else {
                                        textColor = "#A72C2C";
                                        
                                    }




                                    return (


                                        <tr className="py-2 w-full" key={index}>
                                        <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {index+1}
                                            </td>
                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {doctor.name}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {doctor.specialize}
                                            </td>

                                        

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {doctor.contact}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {doctor.datetime}
                                            </td>


                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {doctor.roomno}
                                            </td>


                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20" style={{ color: textColor }}>
                                                {doctor.status}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20 text-center" >
                                                <button className="px-4 py-2 rounded-md bg-[#627BFE] text-white text-[12px] mx-auto "
                                                onClick={() => openPopUp(doctor)}
                                                >
                                                    Edit
                                                </button>
                                            </td>

                                        </tr>
                                    );
                                })}


                            </table>
                        </div>

                        {isPopUpOpen && selectedDoctor && (
        <DoctorEdit
          doctorData={selectedDoctor} 
          onClose={closePopUp}
        />
      )}





          </div>
      </div>





    </div>
  )
}

export default Doctor;
