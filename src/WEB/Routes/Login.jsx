import React,{useState, useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";



function Login() {



    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };



    const LoginSchema =  Yup.object().shape({
        username: Yup.string()
        .required('Required'),
        password: Yup.string()
        .required('Required'),


    });

    return (

        <div className="w-full flex flex-col justify-center items-center bg-white h-screen">
            <div className="md:w-[50%] w-[full] flex flex-col p-5 items-center">
                <div className="nav-logo font-link">
                    <span className="text-[6rem]  text-[#627BFE] font-link">e-</span><span className="text-[6rem]  text-[#002459] font-link">Doc</span>
                </div>
                <p className="text-[14px] text-[#1a1a1a] -mt-10">Please Login to Continue</p>





                <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col mb-[56px] w-1/2 ">
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
              <span className="text-[#1a1a1a] text-[12px] uppercase">Password</span>
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
                type="password"
                name="password"
                required
              />
              <div className="h-[38px] w-[38px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
                <span
                  className="text-[16px] text-[#627BFE] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={faEye} />
                </span>
              </div>
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className="text-red-600 text-[12px] block sm:hidden"
            />
          </div>

          <div className="flex flex-col mt-5">
            <span className="text-[14px]  text-[#1a1a1a]">
              Don't have an account?{" "}
              <span className="text-[14px]  text-[#627BFE] cursor-pointer">
                Register Now
              </span>
            </span>
          </div>
        </Form>
      )}
    </Formik>




            </div>

           


        </div>
    );
}

export default Login