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


function Login() {



  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };



  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required('Required'),
    password: Yup.string()
      .required('Required'),


  });



//1 fine
   // const handleWebUserLogin = async (values) => {
  //   try {
     
  
  //     // Send a POST request with the extracted fields
  //     const response = await axios.post(`${config.baseUrl}/webuserlogin`, {
  //       username: values.username,
  //       password: values.password,
  //     });
  
  //     console.log("Message from server:", response.data.message);
  
  //     // Handle the response accordingly
  //     if (response.data.message === 'User found') {
  //       // User found, redirect to another page
        
  //       console.log('User found!');
  //       window.location.href = '/';
  //     } else if (response.data.message === 'User not found')  {
  //       // User not found or invalid password
  //       document.getElementById('error-message').innerText = "Invalid Username";
  //       // console.log('Invalid username or password');
      
  //     }
  //     else if (response.data.message === 'Invalid Password')
  //     {
  //       document.getElementById('error-message').innerText = "Invalid Password";
  //     }

  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  // };
  
  
  

  // const handleWebUserLogin = async (values) => {
  //   try {
  //     // Send a POST request with the extracted fields
  //     const response = await axios.post(`${config.baseUrl}/webuserlogin`, {
  //       username: values.username,
  //       password: values.password,
  //     });
  
  //     console.log("Message from server:", response.data.message);

  //     if (response.data.message === 'User found') 
  //     {
  //       const user = response.data.user;
  //       console.log('User found:', user);
  //       document.getElementById('info-message').innerText = "User Verified!";
  //       document.getElementById('error-message').innerText = "";
  //       // window.location.href = '/';
  //     } else if (response.data.message === 'User not found') {
  //       document.getElementById('error-message').innerText = "Invalid Username";
  //     } else if (response.data.message === 'Invalid Password') {
  //       document.getElementById('error-message').innerText = "Invalid Password";
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     document.getElementById('error-message').innerText = "Something went wrong. Please try again.";
  //   }
  // };

  



  const handleWebUserLogin = async (values) => {
    try {
      // Send a POST request with the extracted fields
      const response = await axios.post(`${config.baseUrl}/webuserlogin`, {
        username: values.username,
        password: values.password,
      });

      console.log("Message from server:", response.data.message);

      // Handle the response accordingly
      if (response.data.message === 'User found') {
        document.getElementById('info-message').innerText = "User Verified!";
        document.getElementById('error-message').innerText = "";
        console.log('User found!');
        // Extract the token from the response
        const { token } = response.data;
        // Save the token to localStorage or sessionStorage
        localStorage.setItem('jwtToken', token); // You may use sessionStorage if you want the token to be session-specific
        
        window.location.href = '/';
        // document.getElementById('info-message').innerText = response.data.token;
       
      } else if (response.data.message === 'User not found') {
        // User not found or invalid password
        document.getElementById('error-message').innerText = "Invalid Username";
      } else if (response.data.message === 'Invalid Password') {
        document.getElementById('error-message').innerText = "Invalid Password";
      }
    } catch (error) {
      console.error('Login error:', error);
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
        <p className="text-[14px] text-[#1a1a1a] -mt-10">Please Login to Continue</p>





        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleWebUserLogin}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form className="flex flex-col mb-[56px] lg:w-1/2 w-full ">

            
              <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-2">
                <div className="form-field-label sm:flex justify-between w-full hidden">
                  <span className="text-[#1a1a1a] text-[12px] uppercase font-semibold">
                    User Name
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

              <div className="form-field-container flex flex-col sm:mt-5 mt-2 space-y-2 w-full">
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

              <div className="flex flex-col mt-5">
                <span className="text-[14px]  text-[#627BFE] w-auto cursor-default">
                  Forgot Password?
                </span>
                <span className="text-[14px]  text-[#1a1a1a]">
                  Don't have an account?{" "}
                  <Link to="/Register">
                  <span className="text-[14px]  text-[#627BFE] cursor-pointer">
                    Register Now
                  </span>
                  </Link>
                 
                </span>
              </div>

              <button
              type="submit" 
              className="w-full h-[44px] rounded-md text-white text-[16px] bg-gradient-to-r from-[#627BFE] to-[#3D56DA] mt-5">
                        Login
              </button>

              <span id="info-message" className="text-green-600 text-[12px] mt-1 mx-auto"></span>
              <span id="error-message" className="text-red-600 text-[12px] mt-1 mx-auto"></span>


              <div className="w-full flex flex-row justify-between mt-5">
                <div className="w-2/5 relative h-full">
                  <div className="absolute w-full border-collapse border-b-[1px] border-[#565656] h-1/2 border-opacity-10 top-0"></div>
                </div>

                <span className="text-[#1a1a1a] opacity-60">OR</span>

                <div className="w-2/5 relative h-full">
                  <div className="absolute w-full border-collapse border-b-[1px] border-[#565656] h-1/2 border-opacity-10 top-0"></div>
                </div>
              </div>
              <span className="text-[#1a1a1a] opacity-60 text-center text-[12px]">Login with</span>


              <div className="flex flex-row justify-center space-x-1 mt-5">
                <div className="img-btn-box w-[56px] h-[56px] rounded-full relative">
                  <img src={google} alt="" className="object-cover w-full h-full cursor-pointer" />
                </div>
                <div className="img-btn-box w-[56px] h-[56px] rounded-full relative">
                  <img src={fb} alt="" className="object-cover w-full h-full cursor-pointer" />
                </div>
              </div>
            </Form>
          )}
        </Formik>




      </div>




    </div>
  );
}

export default Login