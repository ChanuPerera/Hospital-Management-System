import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

const PatientEdit = ({ PatientData, onClose, onUpdate }) => {


    const [updatedFirstName, setUpdatedFirstName] = useState(PatientData.firstName);
    const [updatedLastName, setUpdatedLastName] = useState(PatientData.lastName);
    const [updatedAddress, setUpdatedAddress] = useState(PatientData.address);
    const [updatedEmail, setUpdatedEmail] = useState(PatientData.email);
    const [updatedContactNumber, setUpdatedContactNumber] = useState(PatientData.contactNumber);
  
    const initialValues = {
      firstName: updatedFirstName,
      lastName: updatedLastName,
      contactNumber: updatedContactNumber,
      address: updatedAddress,
      email: updatedEmail,
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


    const handleFirstNameChange = (e) => {
        setUpdatedFirstName(e.target.value);
      };
      const handleLastNameChange = (e) => {
        setUpdatedLastName(e.target.value);
      };
      const handleEmailChange = (e) => {
        setUpdatedAddress(e.target.value);
      };

      const handleAddressChange = (e) => {
        setUpdatedEmail(e.target.value);
      };



    const handleContactNumberChange = (e) => {
        setUpdatedContactNumber(e.target.value);
      };
    
      const handleFormSubmit = (values) => {
        const updatedFullname = `${updatedFirstName} ${updatedLastName}`;
        const updatedPatientData = {
          ...PatientData,
          firstName: updatedFirstName,
          lastName: updatedLastName,
          fullName: updatedFullname,
          contactNumber: updatedContactNumber,
        };
        onUpdate(PatientData._id, updatedPatientData);
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
                            <h3 className='text-[#565656]'> <span className='text-[#627BFE] font-semibold'>{PatientData.name} </span></h3>
                            <p>Age: {PatientData.age}</p>
                            <p>Address: {PatientData.address}</p>
                        </div>

                        <div className='flex flex-col'>
                            <h3 className='text-[1.2rem] font-semibold text-[#565656]'>Room no : {PatientData.appointmentNo}</h3>
                            {/* <h3 className='text-[1rem] font-semibold text-[#565656]'>Appointment no : 3</h3> */}
                        </div>
                    </div>



                    <h3 className='text-[#627BFE] text-[16px] mt-3 text-center'>Patient Details</h3>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ errors, touched }) => (
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






                                {/* <div className='w-full flex flex-row justify-between space-x-3'>
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





                                </div> */}

                                <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-1">
                                    <div className="form-field-label sm:flex justify-between w-full hidden">
                                        <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                                            Email
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
                                            placeholder={PatientData.email}
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
                                            placeholder={PatientData.contact}
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
                                            Address<span className="text-[12px] text-[#565656] opacity-60 capitalize"><span className='text-red-700'>*</span></span>
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
                                            placeholder={PatientData.address}
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











                                <button className="w-full rounded-md bg-gradient-to-r from-[#627BFE] to-[#3D56DA] text-white uppercase font-semibold py-2 mt-5">
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

export default PatientEdit;






