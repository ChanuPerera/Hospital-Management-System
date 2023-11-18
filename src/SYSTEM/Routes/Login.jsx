import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import config from '../../config';


function Login() {

  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };



  const LoginSchema = Yup.object().shape({
    userID: Yup.string()
      .required('Required'),
    password: Yup.string()
      .required('Required'),


  });





const [errorMessage, setErrorMessage] = useState('');



// const handleLogin = async (values) => {
//   try {
//     const response = await axios.post(`${config.baseUrl}/login`, {
//       userID: values.userID,
//       password: values.password,
//     });

//     if (response.data.message === 'UserID and password are matching') {
//       console.log(`UserID and password are matching. Role: ${response.data.role}`);

//       // Save user role to localStorage
//       localStorage.setItem('userRole', response.data.role);

//       // Redirect based on the user role
//       const userRole = response.data.role;
//       if (userRole === 'admin') {
//         window.location.href = `/AdminDashboard?userID=${response.data.userID}`;
//       } else if (userRole === 'doctor') {
//         window.location.href = `/DoctorDashboard?userID=${response.data.userID}`;
//       }
//     } else {
//       console.error('Invalid User ID or password');
//       const error = response.data.error || 'Invalid User ID or password';
//       setErrorMessage(error);
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//   }
// };





// const handleLogin = async (values) => {
//   try {
//     const response = await axios.post(`${config.baseUrl}/login`, {
//       userID: values.userID,
//       password: values.password,
//     });

//     if (response.data.message === 'UserID and password are matching') {
//       document.getElementById('info-message').innerText = "User Verified!";
//       document.getElementById('error-message').innerText = "";
//       console.log(`UserID and password are matching. Role: ${response.data.role}`);

//       // Save token and user role to localStorage
//       localStorage.setItem('userRole', response.data.role);
//       localStorage.setItem('token', response.data.token);

//       // Redirect based on the user role
//       const userRole = response.data.role;
//       if (userRole === 'admin') {
//         window.location.href = '/AdminDashboard';
//       } else if (userRole === 'doctor') {
//         window.location.href = '/DoctorDashboard';
//       }
//     } else if(response.data.message === 'Invalid User ID'){
//       document.getElementById('error-message').innerText = "Invalid UserID";
//     }else if (response.data.message === 'Invalid Password') {
//       document.getElementById('error-message').innerText = "Invalid Password";
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//   }
// };




const handleLogin = async (values) => {
  try {
    const response = await axios.post(`${config.baseUrl}/login`, {
      userID: values.userID,
      password: values.password,
    });

    if (response.data.message === 'UserID and password are matching') {
      document.getElementById('info-message').innerText = "User Verified!";
      document.getElementById('error-message').innerText = "";
      console.log(`UserID and password are matching. Role: ${response.data.role}`);

      // Save token and user role to localStorage
      localStorage.setItem('userRole', response.data.role);
      localStorage.setItem('token', response.data.token);

      // Save user data to localStorage
      localStorage.setItem('userData', JSON.stringify({
        userID: response.data.userID,
        role: response.data.role,
      }));

      // Redirect based on the user role
      const userRole = response.data.role;
      if (userRole === 'admin') {
        window.location.href = '/AdminDashboard';
      } else if (userRole === 'doctor') {
        window.location.href = '/DoctorDashboard';
      }
    } else if(response.data.message === 'Invalid User ID'){
      document.getElementById('error-message').innerText = "Invalid UserID";
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
            <span className="text-[6rem]  text-[#627BFE] font-link">City Hospital</span>
          </div>
        </Link>
        <p className="text-[14px] text-[#1a1a1a] -mt-10">Please Login to Continue</p>





        <Formik
          initialValues={{
            userID: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, handleChange, values }) => (
            <Form className="flex flex-col mb-[56px] lg:w-1/2 w-full ">
              <div className="form-field-container flex flex-col sm:mt-5 mt-2 w-full space-y-2">
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

              <button
               
                type="submit" className="w-full h-[44px] rounded-md text-white text-[16px] bg-gradient-to-r from-[#627BFE] to-[#3D56DA] mt-5">
                Login
              </button>

              <span id="info-message" className="text-green-600 text-[12px] mt-1 mx-auto"></span>
              <span id="error-message" className="text-red-600 text-[12px] mt-1 mx-auto"></span>
              

            </Form>
          )}
        </Formik>




      </div>




    </div>
  );
}

export default Login