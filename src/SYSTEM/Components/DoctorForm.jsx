import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import config from '../../config';
import 'react-datepicker/dist/react-datepicker.css';

const DoctorForm = ({ onClose }) => {


    const AppointmentSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .matches(/^[A-Za-z .]+$/, "Must be only Letters")
            .required('Required'),
        specialize: Yup.string()
            .min(2, 'Too Short!')
            .matches(/^[A-Za-z .]+$/, "Must be only Letters")
            .required('Required'),
        contactNumber: Yup.string()
            .min(10, 'Invalid Number')
            .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, "Must be only Digits")
            .required('Required'),
        gender: Yup.string().required('Gender is required'),

    });




    const handleAddNewDoctor = async (values) => {
        try {
            // Include selectedDay and selectedTime in the form data
            const formData = {
                ...values,
                availabledate: selectedDay, // Assign selectedDay to date
                time: selectedTime, // Assign selectedTime to time
                roomNo: selectedRoomNo,
            };

            console.log('Form Data:', formData);
            const response = await axios.post(`${config.baseUrl}/addNewDoctor`, formData);
            console.log('Response:', response.data);
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedRoomNo, setSelectedRoomNo] = useState('');

    const handleRoomChange = (event) => {
        setSelectedRoomNo(event.target.value);
    };

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
       
      };
      

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

                    </div>



                    <h3 className='text-[#627BFE] text-[16px] mt-3 text-center'>Doctor Details</h3>

                    <Formik
                        initialValues={{
                            name: "",
                            specialize: "",
                            contactNumber: "",
                            gender: '',
                            availabledate: "",
                            roomNo: '',

                        }}
                        validationSchema={AppointmentSchema}
                        onSubmit={handleAddNewDoctor}
                    >
                        {({ errors, touched, values, handleChange }) => (
                            <Form className="flex flex-col mb-[24px] w-full ">




                                <div className='w-full flex flex-row justify-between space-x-3'>
                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                Name <span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="Name with Initials"
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                                required
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="name"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>


                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                Specialize<span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="specialize"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <Field
                                                type="text"
                                                name="specialize"
                                                value={values.specialize}
                                                onChange={handleChange}
                                                placeholder="Specialize in"
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                                required
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="specialize"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>
                                </div>






                                <div className='w-full flex flex-row justify-between space-x-3'>
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
                                                value={values.contactNumber}
                                                onChange={handleChange}
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

                                    <div className='form-field-container flex flex-col sm:mt-5 mt-2 w-1/3 space-y-1'>
                                        <div className="form-field-container w-full">
                                            <div className="form-field-label">
                                                <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">Gender <span className='text-red-700'>*</span></span>
                                                <ErrorMessage name="gender" component="span" className="text-red-600 text-[12px]" />
                                            </div>
                                            <div className="form-field-input-container flex flex-row space-x-5">
                                                <div>
                                                    <label>
                                                        <Field type="radio" name="gender" value="male" className="mr-3" />
                                                        Male
                                                    </label>
                                                </div>
                                                <div>
                                                    <label>
                                                        <Field type="radio" name="gender" value="female" className="mr-3" />
                                                        Female
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/3 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                Room No <span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="roomNo"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">


                                            <Field
                                                as="select"
                                                name="roomNo"
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input cursor-pointer"
                                                required
                                                value={selectedRoomNo}
                                                onChange={handleRoomChange}
                                            >
                                                <option value="">Select Room No</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                            </Field>

                                        </div>

                                    </div>


                                </div>



                                <div className='form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-1'>
                                    <div className="form-field-container w-full">
                                        <div className="form-field-label">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">Date & Time <span className='text-red-700'>*</span></span>
                                            <ErrorMessage name="gender" component="span" className="text-red-600 text-[12px]" />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">
                                            <select value={selectedDay} name='date' onChange={handleDayChange} className='cursor-pointer outline-none'>
                                                <option value="">Select Day</option>
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thursday">Thursday</option>
                                                <option value="Friday">Friday</option>
                                                <option value="Saturday">Saturday</option>
                                                <option value="Sunday">Sunday</option>
                                            </select>
                                            <Field
                                               type="time"
                                                value={selectedTime}
                                                onChange={handleTimeChange}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <button
                                    type='submit'
                                    className="w-full rounded-md bg-gradient-to-r from-[#627BFE] to-[#3D56DA] text-white uppercase font-semibold py-2 mt-5">
                                    Add Doctor
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

export default DoctorForm;






