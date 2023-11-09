import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import config from '../../config';
import 'react-datepicker/dist/react-datepicker.css';

const DoctorForm = ({ onClose }) => {


    const AppointmentSchema = Yup.object().shape({
        surname: Yup.string()
            .min(2, 'Too Short!')
            .matches(/^[A-Za-z .]+$/, "Must be only Letters")
            .required('Required'),
        initials: Yup.string()
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
        userID: Yup.string()
            .min(2, 'Too Short!')
            .matches(/^[A-Za-z]+$/, "Must be only Letters")
            .required('Required'),
        password: Yup.string()
            .required('Required'),


    });




    const handleAddNewDoctor = async (values) => {
        try {

            const fullname = `${values.initials} ${values.surname}`;
            const role = "doctor";
            // Include selectedDay and selectedTime in the form data
            const formData = {
                ...values,
                availabledate: selectedDay, // Assign selectedDay to date
                time: selectedTime, // Assign selectedTime to time
                roomNo: selectedRoomNo,
                fullname: fullname,
                role: role,
            };

            console.log('Form Data:', formData);
            const response = await axios.post(`${config.baseUrl}/addNewDoctor`, formData);
            console.log('Response:', response.data);

            const { userID, password } = formData;
            const roleResponse = await axios.post(`${config.baseUrl}/addNewRole`, { userID, password, role });
            console.log('Role Response:', roleResponse.data);

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

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
                            surname: "",
                            specialize: "",
                            contactNumber: "",
                            gender: '',
                            availabledate: "",
                            roomNo: '',
                            initials: '',
                            fullname: '',
                            userID: '',
                            password: '',


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
                                                Initials<span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="initials"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <Field
                                                type="text"
                                                name="initials"
                                                value={values.initials}
                                                onChange={handleChange}
                                                placeholder="Initials"
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                                required
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="initials"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>



                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                Surname <span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="surname"
                                                value={values.surname}
                                                onChange={handleChange}
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <Field
                                                type="text"
                                                name="surname"
                                                placeholder="Surname"
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                                required
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="surname"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>



                                </div>


                                <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-1">
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



                                {/* <div className='w-full flex flex-row justify-between space-x-3'>


                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-2">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                UserID
                                            </span>
                                            <ErrorMessage
                                                name="userID"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">
                                            <div className="form-field-input-icobox bg-[#627BFE] h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
                                                <span className="text-[16px] text-[#FFFFFF]">
                                                    <FontAwesomeIcon icon={faUser} />
                                                </span>
                                            </div>
                                            <Field
                                                type="text"
                                                name="userID"
                                                value={values.userID}
                                                onChange={handleChange}
                                                placeholder="UserID"
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                                required
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="userID"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>

                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 space-y-2 w-1/2">
                                        <div className="form-field-label flex justify-between w-full">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">Password</span>
                                            <ErrorMessage
                                                name="password"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">
                                            <div className="form-field-input-icobox bg-[#627BFE] h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
                                                <span className="text-[16px] text-[#ffffff]">
                                                    <FontAwesomeIcon icon={faLock} />
                                                </span>
                                            </div>
                                            <Field
                                                className="form-field-input w-[90%] h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px]"
                                                type={passwordVisible ? 'text' : 'password'}
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <div className="h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
                                                {passwordVisible ? (
                                                    <span
                                                        className="text-[16px] text-[#627BFE] cursor-pointer"
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="text-[16px] text-[#627BFE] cursor-pointer"
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        <FontAwesomeIcon icon={faEyeSlash} />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <ErrorMessage
                                            name="password"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>


                                </div> */}



                                <div className='w-full flex flex-row justify-between space-x-3'>


                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                UserID<span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="userID"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <Field
                                                type="text"
                                                name="userID"
                                                value={values.userID}
                                                onChange={handleChange}
                                                placeholder="UserID"
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                                required
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="userID"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>



                                    {/* <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                Password <span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <Field
                                                type="password"
                                                name="password"
                                                
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                                required
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="password"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div> */}

                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 space-y-2 w-1/2">
                                        <div className="form-field-label flex justify-between w-full">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">Password</span>
                                            <ErrorMessage
                                                name="password"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <Field
                                                className="form-field-input w-[90%] h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px]"
                                                type={passwordVisible ? 'text' : 'password'}
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <div className="h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
                                                {passwordVisible ? (
                                                    <span
                                                        className="text-[16px] text-[#627BFE] cursor-pointer"
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="text-[16px] text-[#627BFE] cursor-pointer"
                                                        onClick={togglePasswordVisibility}
                                                    >
                                                        <FontAwesomeIcon icon={faEyeSlash} />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <ErrorMessage
                                            name="password"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
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






