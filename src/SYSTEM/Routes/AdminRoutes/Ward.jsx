import React,{useState} from 'react'
import SideNav from '../../Components/SideNav'
import { Search, Menu, Logout, ArrowForwardIos, NotificationsActive, Add } from "@mui/icons-material";
import PatientEdit from '../../Components/PatientEdit';
import WardForm from '../../Components/WardForm';






function Ward() {



  const [isWardFormPopUpOpen, setWardFormPopUpOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null); // State to store the selected doctor data



  
  const openFormPopUp = () =>{
    setWardFormPopUpOpen(true);
  }
  const closeFormPopUp = () =>{
    setWardFormPopUpOpen(false);
  }




    const WardData = [
        {
            buildingno: "1",
            section:"Admissions ward",
            wardno: "2",
            nofBeds:"18",
            avBeds: "3",
            gender:"Male",

        },
        {
          buildingno: "2B",
          section:"General medicine ward",
          wardno: "1",
          nofBeds:"24",
          avBeds: "8",
          gender:"Female",
        },
        {
            buildingno: "2",
            section:"ICU ward",
            wardno: "1",
            nofBeds:"12",
            avBeds: "2",
            gender:"Male",
        },
       
    ]





  return (
    <div className='w-full h-screen flex flex-row justify-between'>
    <SideNav/>

    <div className='page-body-wrapper lg:w-5/6 sm:w-full  bg-[#ffffff] h-screen mx-auto flex flex-col fixed right-0' id="style-7">
        <div className='page-body-content p-10 sm:ml-[80px] lg:ml-0'>
          <h3 className='text-[18pt]  text-[#002459] font-semibold'>Ward List</h3>


          <div className='flex flex-row space-x-2 w-full mt-5 '>
                <input type='text' placeholder='Search Doctor,Specialize,Room no..' className='w-1/3 p-2 outline-none border-[#565656] border-[1px] rounded-md border-opacity-30' />
                <button className='text-[#ffffff] text-[14px] px-4 py-2 rounded-md bg-[#3D56DA]'>Search</button>
                <button className='text-[#ffffff] text-[14px] px-4 py-2 rounded-md bg-gradient-to-r from-[#627BFE] to-[#3D56DA]'
                 onClick={() => openFormPopUp()}
                 
                 > <span><Add className="mr-1"/>Add new Ward</span>
                {isWardFormPopUpOpen && (
        <WardForm
          onClose={closeFormPopUp}
        />
      )}
      </button>
            </div>





            <div className="table-wrapper mt-5 w-full">
                            <table className="appointment-availability-table w-full bg-white border-[#565656] border-opacity-20 border-[1px]">
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">#</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Building No</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Section</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Ward No</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">No of Beds</th>
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">No of Available Beds</th>
                                {/* <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Appointment No</th> */}
                                <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">Gender</th>
                                {/* <th className="font-normal bg-[#627BFE] bg-opacity-25 py-2 ">Action</th> */}


                                {WardData.map((ward, index) => {

                                



                                    return (


                                        <tr className="py-2 w-full" key={index}>
                                        <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {index+1}
                                            </td>
                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {ward.buildingno}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {ward.section}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {ward.wardno}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {ward.nofBeds}
                                            </td>

                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {ward.avBeds}
                                            </td>


                                            <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20">
                                                {ward.gender}
                                            </td>


                                            {/* <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20" style={{ color: textColor }}>
                                                {patient.payment}
                                            </td> */}

                                            {/* <td className="py-2 px-2 border-collapse border-r-[1px] border-[#565656] border-opacity-20 text-center" >
                                                <button className="px-4 py-2 rounded-md bg-[#627BFE] text-white text-[12px] mx-auto "
                                                onClick={() => openPopUp(patient)}
                                                >
                                                    Edit
                                                </button>
                                            </td> */}

                                        </tr>
                                    );
                                })}


                            </table>
                        </div>

                        {isWardFormPopUpOpen &&  (
        <PatientEdit
          onClose={closeFormPopUp}
        />
      )}





        </div>
    </div>





  </div>
  )
}

export default Ward;
