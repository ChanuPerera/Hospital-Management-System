import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

import { jwtDecode } from "jwt-decode" 




const AppointmentForm = ({ doctorData, onClose }) => {


    const AppointmentSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .matches(/^[A-Za-z]+$/, "Must be only Letters")
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .matches(/^[A-Za-z]+$/, "Must be only Letters")
            .required('Required'),
        age: Yup.string()
            .required('Required'),
        contactNumber: Yup.string()
            .min(10, 'Invalid Number')
            .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, "Must be only Digits")
            .required('Required'),
        email: Yup.string().email('Invalid email')
            .required('Required'),
        gender: Yup.string().required('Gender is required'),
    });



    const [decodedUser, setDecodedUser] = useState(null);
    const [webUserResponse, setWebUserResponse] = useState(null);
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
          setDecodedUser(decodedUser); // Save decoded user data to state
    
          // Example: Accessing the username and making an axios request
          const fetchWebUser = async () => {
            try {
              const response = await axios.get(
                `${config.baseUrl}/webUser/byName/${decodedUser.username}`
              );
              setWebUserResponse(response.data);
            } catch (error) {
              console.error("Error fetching web user:", error);
            }
          };
    
          fetchWebUser();
        }
      }, []); 

      



    async function generateUniqueReferenceNumber() {
        try {
            const response = await axios.get(`${config.baseUrl}/webUserappointments/count`);
            const patientCount = response.data.count; 

            const newIndex = patientCount + 1;

            const referenceNo = `#WEB00REF${newIndex}`;

            return referenceNo;
        } catch (error) {
            console.error('Error generating reference number:', error);
            throw error;
        }
    }


    async function generateAppointmentNo() {
        try {
            const response = await axios.get(`${config.baseUrl}/webUserappointments/count`);
            const patientCount = response.data.count; 

            const newIndex = patientCount + 1;

            const appointmentNo = `#WEB00AP${newIndex}`;

            return appointmentNo;
        } catch (error) {
            console.error('Error generating appointment number:', error);
            throw error;
        }
    }



    

    // const handleAddNewAppointment = async (values) => {
    //     try {
     
    //       const referenceNo = await generateUniqueReferenceNumber();
    //       const appointmentNo = await generateAppointmentNo();
    //       values.referenceNo = referenceNo;
    //       values.appointmentNo = appointmentNo;
    //       values.doctor = doctorData.fullname;
    //       values.date = "Monday";
    //       values.time  = doctorData.time;
      
    //       console.log('Form Data:', values);
      
    //       // Fetch the doctor's ObjectId based on the doctor's name
    //       const doctorResponse = await axios.get(`${config.baseUrl}/doctors/byName/${values.doctor}`);
    //     //   const webUserResponse = await axios.get(`${config.baseUrl}/webUser/byName/${decodedUser.username}`);
          
    //       if (doctorResponse.data && doctorResponse.data.doctorId ) {
    //         const doctorId = doctorResponse.data.doctorId;
    //         console.log('Doctor ObjectId:', doctorId);
      
    //         // Create a new appointment
    //         const response = await axios.post(`${config.baseUrl}/addWebUserNewAppointment`, values);
      
    //         if (response.data.message === "Appointment Submitted successfully") {
    //           // Update the doctor's appointmentNos array with the appointmentNo
    //           await axios.put(`${config.baseUrl}/doctors/updateAppointments/${doctorId}`, {
    //             appointmentId:appointmentNo, // Assuming the response contains the new appointment's ID
    //           });
      
    //           console.log('Appointment added to doctor:', response.data);
    //           onClose();
    //         } else {
    //           console.log('Appointment submission failed.');
    //         }
    //       } else {
    //         console.log('Doctor not found.');
    //       }

    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   };

      






































    const handleAddNewAppointment = async (values) => {
        try {
            const referenceNo = await generateUniqueReferenceNumber();
            const appointmentNo = await generateAppointmentNo();
            values.referenceNo = referenceNo;
            values.appointmentNo = appointmentNo;
            values.doctor = doctorData.fullname;
            values.date = "Monday";
            values.time = doctorData.time;
    
            console.log('Form Data:', values);
    
            // Fetch the doctor's ObjectId based on the doctor's name
            const doctorResponse = await axios.get(`${config.baseUrl}/doctors/byName/${values.doctor}`);
            // const webUserResponse = await axios.get(`${config.baseUrl}/webUser/byName/${decodedUser.username}`);
    
            if (doctorResponse.data && doctorResponse.data.doctorId) {
                const doctorId = doctorResponse.data.doctorId;
                console.log('Doctor ObjectId:', doctorId);
    
                // Create a new appointment
                const response = await axios.post(`${config.baseUrl}/addWebUserNewAppointment`, values);
    
                if (response.data.message === "Appointment Submitted successfully") {
                    // Update the doctor's appointmentNos array with the appointmentNo
                    await axios.put(`${config.baseUrl}/doctors/updateAppointments/${doctorId}`, {
                        appointmentId: appointmentNo, // Assuming the response contains the new appointment's ID
                    });
    
                    // Update the user's appointmentNos array with the appointmentNo
                    const userResponse = await axios.put(`${config.baseUrl}/webUser/updateAppointments`, {
                        username: decodedUser.username,
                        appointmentId: appointmentNo,
                    });
    
                    if (userResponse.data.message === "Appointment added to user successfully") {
                        console.log('Appointment added to user:', userResponse.data);
                    } else {
                        console.log('Failed to update user appointmentNos.');
                    }
    
                    onClose();
                } else {
                    console.log('Appointment submission failed.');
                }
            } else {
                console.log('Doctor not found.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

   


      const [nextReferenceNo, setNextReferenceNo] = useState('');
      const [nextAppointmentNo, setNextAppointmentNo] = useState('');
      useEffect(() => {
          async function fetchNextReferenceNo() {
              try {
                  const referenceNo = await generateUniqueReferenceNumber();
                  setNextReferenceNo(referenceNo);
              } catch (error) {
                  console.error('Error fetching reference number:', error);
              }
          }
  
          fetchNextReferenceNo();
      }, []);
  
  
      useEffect(() => {
          async function fetchNextAppointmentNo() {
              try {
                  const appointmentNo = await generateAppointmentNo();
                  setNextAppointmentNo(appointmentNo);
              } catch (error) {
                  console.error('Error fetching appointment number:', error);
              }
          }
  
  
          fetchNextAppointmentNo();
      }, []);


    return (
        <Popup
            open={true}
            modal
            nested
            closeOnDocumentClick={false}
            closeOnEscape={false}
        >{close => (
            <div className='w-screen h-screen bg-[#565656] bg-opacity-40 backdrop-blur-sm relative flex justify-center items-center z-20 '>
                <div className="modal p-5 bg-white rounded-lg w-[50%] lg:w-[50%] h-auto border-[2px] border-[#627BFE]">
                    <div className='flex flex-row justify-end w-full'>
                        <div className="close w-[22px] h-[22px] rounded-full bg-[#627BFE] text-[#ffffff] flex justify-center items-center cursor-pointer" onClick={() => { onClose(); close(); }}>
                            <FontAwesomeIcon icon={faClose} />
                        </div>
                    </div>
                    <div className='flex flex-row justify-between mt-1'>
                        <div className='flex flex-col'>
                            <h3 className='text-[#565656]'>Request Appointment for <span className='text-[#627BFE] font-semibold'>Dr.{doctorData.fullname} </span></h3>
                            <p>Specialize: {doctorData.specialize}</p>
                            <p>Hospital: City Hospital</p>
                            <p>Time: {doctorData.time}</p>
                             <p>Username: {decodedUser && decodedUser.username}</p>
                        </div>

                        <div className='flex flex-col'>
                            <h3 className='text-[1.2rem] font-semibold text-[#565656]'>Reference no : {nextReferenceNo}</h3>
                            <h3 className='text-[1rem] font-semibold text-[#565656]'>Appointment no : {nextAppointmentNo}</h3>
                        </div>
                    </div>



                    <h3 className='text-[#627BFE] text-[16px] mt-3 text-center'>Patient Details</h3>

                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            age: '',
                            contactNumber: '',
                            gender: '',
                            address: '',
                            email:'',
                            doctor: '',

                        }}
                        validationSchema={AppointmentSchema}
                        onSubmit={handleAddNewAppointment}
                    >
                        {({ errors, touched, handleChange, values }) => (
                            <Form className="flex flex-col mb-[24px] w-full ">




                                <div className='w-full flex flex-row justify-between space-x-3'>
                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                First Name <span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="firstName"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <Field
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                                required
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="firstName"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>


                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                Last Name <span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="lastName"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <Field
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                                required
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="lastName"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>
                                </div>






                                <div className='w-full flex flex-row justify-between space-x-3'>
                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                Age <span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="age"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <Field
                                                type="text"
                                                name="age"
                                                placeholder="Age"
                                                value={values.age}
                                                onChange={handleChange}
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                                required
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="age"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>

                                    <div className='form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1'>
                                        <div className="form-field-container w-full">
                                            <div className="form-field-label">
                                                <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">Gender <span className='text-red-700'>*</span></span>
                                                <ErrorMessage name="gender" component="span" className="text-red-600 text-[12px]" />
                                            </div>
                                            <div className="form-field-input-container flex flex-row space-x-5">
                                                <div>
                                                    <label>
                                                        <Field type="radio" name="gender" value="male" className="mr-3"/>
                                                        Male
                                                    </label>
                                                </div>
                                                <div>
                                                    <label>
                                                        <Field type="radio" name="gender" value="female" className="mr-3"/>
                                                        Female
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>





                                </div>

                                {/* <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-1">
                                    <div className="form-field-label sm:flex justify-between w-full hidden">
                                        <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                            Age
                                        </span>
                                        <ErrorMessage
                                            name="age"
                                            component="span"
                                            className="text-red-600 text-[12px]"
                                        />
                                    </div>
                                    <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                        <Field
                                            type="text"
                                            name="age"
                                            placeholder="Age"
                                            className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                            required
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="age"
                                        component="span"
                                        className="text-red-600 text-[12px] block sm:hidden"
                                    />
                                </div> */}

                                <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-1">
                                    <div className="form-field-label sm:flex justify-between w-full hidden">
                                        <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                            Contact Number <span className='text-red-700'>*</span>
                                        </span>
                                        <ErrorMessage
                                            name="contactNumber"
                                            component="span"
                                            className="text-red-600 text-[12px]"
                                        />
                                    </div>
                                    <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                        <Field
                                            type="text"
                                            name="contactNumber"
                                            placeholder="Contact Number"
                                            value={values.contactNumber}
                                            onChange={handleChange}
                                            className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                            required
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="contactNumber"
                                        component="span"
                                        className="text-red-600 text-[12px] block sm:hidden"
                                    />
                                </div>



                                <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-1">
                                    <div className="form-field-label sm:flex justify-between w-full hidden">
                                        <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                            Email <span className="text-[12px] text-[#565656] opacity-60 capitalize"><span className='text-red-700'>*</span></span>
                                        </span>
                                        <ErrorMessage
                                            name="email"
                                            component="span"
                                            className="text-red-600 text-[12px]"
                                        />
                                    </div>
                                    <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">
                                        <Field
                                            type="text"
                                            name="email"
                                            placeholder="Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                            required
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="email"
                                        component="span"
                                        className="text-red-600 text-[12px] block sm:hidden"
                                    />
                                </div>











                                <button 
                                type='submit'
                                className="w-full rounded-md bg-gradient-to-r from-[#627BFE] to-[#3D56DA] text-white uppercase font-semibold py-2 mt-5">
                                    Submit
                                </button>




                            </Form>
                        )}
                    </Formik>



                </div>

            </div>

        )}


        </Popup>
    );
};

export default AppointmentForm;






