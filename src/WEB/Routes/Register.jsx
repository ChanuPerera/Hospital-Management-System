import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import google from "../Assets/Images/Google.png";
import fb from "../Assets/Images/Facebook.png";
import { Link } from "react-router-dom";
import axios from 'axios';
import config from '../../config'; 


function Register() {


  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
};




  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[A-Za-z ]+$/, "Must be only Letters")
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[A-Za-z ]+$/, "Must be only Letters")
        .required('Required'),
    username: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Must be at least 8 characters long')
        .required('Required'),
    confirmPassword: Yup.string()
        .min(8, 'Must be at least 8 characters long')
        .oneOf([Yup.ref('password')], 'Your passwords do not match.')
        .required('Required'),
});




const handleAddNewWebUser = async (values,  { resetForm }) => {
  try {
      console.log('Form Data:', values);
      const response = await axios.post(`${config.baseUrl}/addNewWebUser`, values);
      console.log('Response:', response.data);
      console.log('Response message:', response.data.message);


        // Clear form fields on successful registration
    resetForm();


      document.getElementById('error-message').innerText = response.data.message;
  } catch (error) {
      console.error('Error:', error);
  }
};






  return (

    <div className="w-full flex flex-col justify-center items-center bg-white h-screen">
      <div className="md:w-[50%] w-[full] flex flex-col p-5 items-center">
      <Link to="/">
      <div className="nav-logo font-link">
          <span className="text-[6rem]  text-[#627BFE] font-link">e-</span><span className="text-[6rem]  text-[#002459] font-link">Doc</span>
        </div>
      </Link>
        
        <p className="text-[14px] text-[#1a1a1a] -mt-10">Please Register to Continue</p>





        <Formik
          initialValues={{
            firstName: "",
            lastName:"",
            username:"",
            email:"",
            password: "",
            confirmPassword:"",
           
          }}
          validationSchema={SignupSchema}
          onSubmit={handleAddNewWebUser }
        >
          {({ errors, touched, values, handleChange }) => (
            <Form className="flex flex-col mb-[56px] lg:w-1/2 w-full ">

            <div className="w-full flex flex-row space-x-5">
                <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-2">
                <div className="form-field-label sm:flex justify-between w-full hidden">
                  <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                    First Name<span className='text-red-700'>*</span>
                  </span>
                  <ErrorMessage
                    name="firstName"
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
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
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


              <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-1/2 space-y-2">
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
                  <div className="form-field-input-icobox bg-[#627BFE] h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
                    <span className="text-[16px] text-[#FFFFFF]">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
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
              



            <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-2">
                <div className="form-field-label sm:flex justify-between w-full hidden">
                  <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                    User Name<span className='text-red-700'>*</span>
                  </span>
                  <ErrorMessage
                    name="username"
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
                    name="username"
                    placeholder="User Name"
                    value={values.username}
                    onChange={handleChange}
                    className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                    required
                  />
                </div>
                <ErrorMessage
                  name="username"
                  component="span"
                  className="text-red-600 text-[12px] block sm:hidden"
                />
              </div>



              <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-2">
                <div className="form-field-label sm:flex justify-between w-full hidden">
                  <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                    Email <span className='text-red-700'>*</span>
                  </span>
                  <ErrorMessage
                    name="email"
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
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    className="w-full h-full p-2 bg-transparent outline-none text-[#1a1a1a] text-[12px] form-control form-field-input"
                    
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-red-600 text-[12px] block sm:hidden"
                />
              </div>




              <div className="form-field-container flex flex-col sm:mt-5 mt-2 space-y-2 w-full">
                <div className="form-field-label flex justify-between w-full">
                  <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">Password<span className='text-red-700'>*</span></span>
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




              <div className="form-field-container flex flex-col sm:mt-5 mt-2 space-y-2 w-full">
                <div className="form-field-label flex justify-between w-full">
                  <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">Confirm Password<span className='text-red-700'>*</span></span>
                  <ErrorMessage
                    name="confirmPassword"
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
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                  />
                  <div className="h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
                    {confirmPasswordVisible ? (
                      <span
                        className="text-[16px] text-[#627BFE] cursor-pointer"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </span>
                    ) : (
                      <span
                        className="text-[16px] text-[#627BFE] cursor-pointer"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        <FontAwesomeIcon icon={faEyeSlash} />
                      </span>
                    )}
                  </div>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="span"
                  className="text-red-600 text-[12px] block sm:hidden"
                />
              </div>

            <button 
            type="submit"
            className="w-full rounded-md bg-gradient-to-r from-[#627BFE] to-[#3D56DA] text-white uppercase font-semibold py-2 mt-5">
                        Register
            </button>

<span id="error-message" className="text-green-600 text-[12px] mt-1 mx-auto"></span>

              <div className="flex flex-col mt-5">
                <span className="text-[14px]  text-[#1a1a1a]">
                  Already have an account?{" "}
                  <Link to="/">
                    <span className="text-[14px]  text-[#627BFE] cursor-pointer">
                        Login
                    </span>
                  </Link>
                 
                </span>
              </div>
            </Form>
          )}
        </Formik>




      </div>




    </div>
  );
}

export default Register;