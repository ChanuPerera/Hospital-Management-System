import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Popup from 'reactjs-popup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';

const PatientForm = ({ onClose }) => {

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




    async function generateUniqueReferenceNumber() {
        try {
            const response = await axios.get(`${config.baseUrl}/patients/count`);
            const patientCount = response.data.count; // Extract the count from the response
    
            const newIndex = patientCount + 1;
    
            const referenceNo = `23PR${newIndex}`;
    
            return referenceNo;
        } catch (error) {
            console.error('Error generating reference number:', error);
            throw error;
        }
    }
    

    const handleAddNewPatient = async (values) => {
        try {
            const referenceNo = await generateUniqueReferenceNumber();
            values.referenceNo = referenceNo; 
            console.log('Form Data:', values);
    
            const response = await axios.post(`${config.baseUrl}/addNewPatient`, values);
            console.log('Response:', response.data);
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
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

                        {/* <div className='flex flex-col'>
                            <h3 className='text-[1.2rem] font-semibold text-[#565656]'>Reference no : 654996</h3>
                            <h3 className='text-[1rem] font-semibold text-[#565656]'>Appointment no : 3</h3>
                        </div> */}
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
             
            }}
            validationSchema={AppointmentSchema}
            onSubmit={handleAddNewPatient}
       
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

export default PatientForm;






