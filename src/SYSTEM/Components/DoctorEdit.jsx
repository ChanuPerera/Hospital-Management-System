import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import config from '../../config';

import axios from 'axios';


const DoctorEdit = ({ doctorData, onClose, onUpdate }) => {

    const [updatedInitials, setUpdatedInitials] = useState(doctorData.initials);
    const [updatedSurname, setUpdatedSurname] = useState(doctorData.surname);
    const [updatedContactNumber, setUpdatedContactNumber] = useState(doctorData.contactNumber);
  
    const initialValues = {
      initials: updatedInitials,
      surname: updatedSurname,
      contactNumber: updatedContactNumber,
    };
  
    const validationSchema = Yup.object().shape({
      initials: Yup.string()
        .matches(/^[A-Za-z .]+$/, 'Must be only letters')
        .required('Required'),
      surname: Yup.string()
        .matches(/^[A-Za-z .]+$/, 'Must be only letters')
        .required('Required'),
      contactNumber: Yup.string()
        .min(10, 'Invalid Number')
        .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, 'Must be only digits')
        .required('Required'),
    });
  
    const handleContactNumberChange = (e) => {
      setUpdatedContactNumber(e.target.value);
    };
  
    const handleFormSubmit = (values) => {
      const updatedFullname = `${updatedInitials} ${updatedSurname}`;
      const updatedDoctorData = {
        ...doctorData,
        initials: updatedInitials,
        surname: updatedSurname,
        fullname: updatedFullname,
        contactNumber: updatedContactNumber,
      };
      onUpdate(doctorData._id, updatedDoctorData);
      onClose();
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
                    <div className='flex flex-row justify-between mt-1'>
                        <div className='flex flex-col'>
                            <h3 className='text-[#565656]'> <span className='text-[#627BFE] font-semibold'>Dr. {doctorData.initials} {doctorData.surname} </span></h3>
                            <p>Specialize: {doctorData.specialize}</p>
                            <p>Date and Time : {doctorData.availabledate} {doctorData.time}</p>

                        </div>

                        <div className='flex flex-col'>
                            <h3 className='text-[1.2rem] font-semibold text-[#565656]'>Room no : {doctorData.roomNo}</h3>
                        </div>
                    </div>



                    <h3 className='text-[#627BFE] text-[16px] mt-3 text-center'>Doctor Details</h3>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ errors, touched, values, handleChange }) => (
                            <Form className="flex flex-col mb-[24px] w-full ">




                                <div className='w-full flex flex-row justify-between space-x-3'>
                                    <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-1">
                                        <div className="form-field-label sm:flex justify-between w-full hidden">
                                            <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                                Initials <span className='text-red-700'>*</span>
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
                                                placeholder="initials"
                                                value={updatedInitials}
                                                onChange={(e) => setUpdatedInitials(e.target.value)}
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
                                                Surname<span className='text-red-700'>*</span>
                                            </span>
                                            <ErrorMessage
                                                name="surname"
                                                component="span"
                                                className="text-red-600 text-[12px]"
                                            />
                                        </div>
                                        <div className="form-field-input-container w-full rounded-[6px] h-[38px] bg-[#FFFFFF] border-[1px] border-[#565656] border-opacity-20 flex flex-row justify-center items-center">

                                            <Field
                                                type="text"
                                                name="surname"
                                                placeholder="Surname"
                                                value={updatedSurname}
                                                onChange={(e) => setUpdatedSurname(e.target.value)}
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
                                            value={updatedContactNumber}
                onChange={handleContactNumberChange}
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
                                    Update
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

export default DoctorEdit;






