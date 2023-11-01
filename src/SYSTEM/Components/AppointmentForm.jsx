import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

import config from '../../config';

import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const AppointmentForm = ({ onClose }) => {


    const AppointmentSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .matches(/^[A-Za-z .]+$/, "Must be only Letters")
            .required("Required"),
        lastName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .matches(/^[A-Za-z .]+$/, "Must be only Letters")
            .required("Required"),
        doctorName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .matches(/^[A-Za-z .]+$/, "Must be only Letters")
            .required("Required"),
        age: Yup.string()
            .required("Required"),
        contactNumber: Yup.string()
            .min(10, "Invalid Number")
            .matches(
                /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
                "Must be only Digits"
            )
            .required("Required"),
        date: Yup.date()
            .typeError('The value must be a date (YYYY-MM-DD)')
            .required('This field is required'),
    });




    // const [doctorNames, setDoctorNames] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleAddNewAppointment = async (values) => {
        try {
            console.log('Form Data:', values);
            const response = await axios.post(`${config.baseUrl}/addNewAppointment`, values);
            console.log('Response:', response.data);
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };




    // const [doctors, setDoctors] = useState([]);
    // useEffect(() => {
    //     // Fetch the list of doctors when the component mounts
    //     axios.get(`${config.baseUrl}/doctors`)
    //       .then((response) => {
    //         setDoctors(response.data);
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching doctor data:', error);
    //       });
    //   }, []);
    // const fetchDoctors = async () => {
    //     try {
    //       const response = await axios.get(`${config.baseUrl}/doctors`);
    //       setDoctors(response.data);
    //     } catch (error) {
    //       console.error('Error fetching doctor data:', error);
    //     }
    //   };

    //   useEffect(() => {
    //     fetchDoctors();
    //   }, []);  



    const [doctors, setDoctors] = useState([]);

    const fetchDoctors = async () => {
        try {
          const response = await axios.get(`${config.baseUrl}/doctors`);
          console.log('Response from the server:', response.data);
          setDoctors(response.data);
        } catch (error) {
          console.error('Error fetching doctor data:', error);
          console.error('Error response data:', error.response.data);
        }
      };

  // Call the async function to fetch doctors when the component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);

  console.log('Doctors state:', doctors);




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
                    <div className='flex flex-row justify-start mt-1'>


                        <div className='flex flex-col'>
                            <h3 className='text-[1.2rem] font-semibold text-[#565656]'>Reference no : 654996</h3>
                            <h3 className='text-[1rem] font-semibold text-[#565656]'>Appointment no : 3</h3>
                        </div>
                    </div>


                    <h3 className='text-[#627BFE] text-[16px] mt-3 text-center'>Appointment Form</h3>
                    <h3 className='text-[#565656 text-[14px] mt-1 mb-3 text-center'>Fill Patient Details</h3>

                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            age: "",
                            contactNumber: "",
                            date: "",
                            doctor: "",

                        }}
                        validationSchema={AppointmentSchema}
                        onSubmit={handleAddNewAppointment}
                    >
                        {({ errors, touched, values, handleChange }) => (
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
                                                Last Name<span className='text-red-700'>*</span>
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


                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
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



                                </div>



                                <div className='w-full flex flex-row justify-between space-x-3'>

                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                Doctor <span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="age"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">
                        <Field
                          as="select"
                          name="doctor"
                          className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                          required
                        >
                          <option value="">Select a doctor</option>
                          {doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor.name}>
                              {doctor.name}
                            </option>
                          ))}
                        </Field>

                


                      </div>
                                        <ErrorMessage
                                            name="age"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>

                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                Date <span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="date"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <div className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input relative">
                                                <DatePicker
                                                    selected={selectedDate}
                                                    onChange={(date) => setSelectedDate(date)}
                                                    placeholderText="Select a date"
                                                    className='w-full outline-none cursor-pointer h-full px-4'
                                                />
                                            </div>
                                        </div>
                                        <ErrorMessage
                                            name="date"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>


                                </div>















                                <button className="w-full rounded-md bg-gradient-to-r from-[#627BFE] to-[#3D56DA] text-white uppercase font-semibold py-2 mt-5">
                                    Submit Appointment
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






