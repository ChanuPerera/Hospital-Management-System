import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';



const AppointmentForm = ({ onClose }) => {

    const navigate = useNavigate();

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
        address: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        age: Yup.string()
            .required('Required'),
        contactNumber: Yup.string()
            .min(10, 'Invalid Number')
            .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, "Must be only Digits")
            .required('Required'),
        gender: Yup.string().required('Gender is required'),
    });




    // const [doctorNames, setDoctorNames] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

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




    async function generateUniqueReferenceNumber() {
        try {
            const response = await axios.get(`${config.baseUrl}/appointments/count`);
            const patientCount = response.data.count; 

            const newIndex = patientCount + 1;

            const referenceNo = `#00REF${newIndex}`;

            return referenceNo;
        } catch (error) {
            console.error('Error generating reference number:', error);
            throw error;
        }
    }



    async function generateAppointmentNo() {
        try {
            const response = await axios.get(`${config.baseUrl}/appointments/count`);
            const patientCount = response.data.count; 

            const newIndex = patientCount + 1;

            const appointmentNo = `#00AP${newIndex}`;

            return appointmentNo;
        } catch (error) {
            console.error('Error generating appointment number:', error);
            throw error;
        }
    }


/////system 

    const handleAddNewAppointment = async (values) => {
        try {
          const formattedDate = format(selectedDate, 'd MMMM yyyy');
          values.date = formattedDate;
      
          const referenceNo = await generateUniqueReferenceNumber();
          const appointmentNo = await generateAppointmentNo();
          values.referenceNo = referenceNo;
          values.appointmentNo = appointmentNo;
      
          console.log('Form Data:', values);
      
          // Fetch the doctor's ObjectId based on the doctor's name
          const doctorResponse = await axios.get(`${config.baseUrl}/doctors/byName/${values.doctor}`);
          
          if (doctorResponse.data && doctorResponse.data.doctorId) {
            const doctorId = doctorResponse.data.doctorId;
            console.log('Doctor ObjectId:', doctorId);
      
            // Create a new appointment
            const response = await axios.post(`${config.baseUrl}/addNewAppointment`, values);
      
            if (response.data.message === "Appointment Submitted successfully") {
              // Update the doctor's appointmentNos array with the appointmentNo
              await axios.put(`${config.baseUrl}/doctors/updateAppointments/${doctorId}`, {
                appointmentId:appointmentNo, // Assuming the response contains the new appointment's ID
              });
      
              console.log('Appointment added to doctor:', response.data);
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
                    <div className='flex flex-row justify-start mt-1'>

                        <div className='flex flex-col'>
                            <h3 className='text-[1.2rem] font-semibold text-[#565656]'>Reference no : {nextReferenceNo}</h3>
                            <h3 className='text-[1rem] font-semibold text-[#565656]'>Appointment no : {nextAppointmentNo}</h3>
                        </div>
                    </div>



                    <h3 className='text-[#627BFE] text-[16px] mt-3 text-center'>Appointment Details</h3>

                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            age: '',
                            contactNumber: '',
                            gender: '',
                            address: '',
                            nic: '',
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
                                                value={values.firstName}
                                                onChange={handleChange}
                                                name="firstName"
                                                placeholder="First Name"
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input "
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
                                                value={values.lastName}
                                                onChange={handleChange}
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
                                                value={values.age}
                                                onChange={handleChange}

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

                                    <div className='form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1'>
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

                                </div>



                                <div className='w-full flex flex-row justify-between space-x-3'>
                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                NIC <span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="nic"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <Field
                                                type="text"
                                                name="nic"
                                                value={values.nic}
                                                onChange={handleChange}
                                                placeholder="NIC"
                                                className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                                required
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="nic"
                                            component="span"
                                            className="text-red-600 text-[12px] block sm:hidden"
                                        />
                                    </div>

                                    <div className='form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1'>
                                        <div className="form-field-container w-full">
                                            <div className="form-field-label">
                                                <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">Doctor <span className='text-red-700'>*</span></span>
                                                <ErrorMessage name="gender" component="span" className="text-red-600 text-[12px]" />
                                            </div>
                                            <div className="form-field-input-container flex flex-row space-x-5">
                                                <Field
                                                    as="select"
                                                    name="doctor"
                                                    className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input cursor-pointer"
                                                    required
                                                    value={values.doctor}
                                                >
                                                    <option value="">Select a doctor</option>
                                                    {doctors.map((doctor) => (
                                                        <option key={doctor._id} value={doctor.fullname}>
                                                            {doctor.fullname}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>
                                        </div>
                                    </div>

                                </div>




                                <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-1">
                                    <div className="form-field-label sm:flex justify-between w-full hidden">
                                        <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                            Address
                                        </span>
                                        <ErrorMessage
                                            name="address"
                                            component="span"
                                            className="text-red-600 text-[12px]"
                                        />
                                    </div>
                                    <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                        <Field
                                            type="text"
                                            name="address"
                                            value={values.address}
                                            onChange={handleChange}
                                            placeholder="Address"
                                            className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                                            required
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="address"
                                        component="span"
                                        className="text-red-600 text-[12px] block sm:hidden"
                                    />
                                </div>

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


                                <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-1">
                                    <div className="form-field-label sm:flex justify-between w-full hidden">
                                        <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                            Date <span className='text-red-700'>*</span>
                                        </span>
                                    </div>
                                    <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">
                                        <DatePicker
                                            selected={selectedDate}
                                            name="date"
                                            dateFormat="d MMMM yyyy"
                                            onChange={(date) => setSelectedDate(date)}
                                            placeholderText="Select Date"
                                            className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input cursor-pointer"
                                            required
                                        />
                                    </div>
                                </div>


                                <button
                                    type='submit'

                                    className="w-full rounded-md bg-gradient-to-r from-[#627BFE] to-[#3D56DA] text-white uppercase font-semibold py-2 mt-5">
                                    Add Patient
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






