"use client";

import React, { useState } from "react";

import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useLogContext } from "@/contexts/LogContextProvider";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { isLogIn, setIsLogIn } = useLogContext();

  const validate = Yup.object({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
        "invalid email"
      )
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { _setSubmitting, resetForm }) => {
          const storedUserData = JSON.parse(localStorage.getItem("user")) || [];

          const userIndex = storedUserData.findIndex(
            (user) => user.email === values.email
          );

          if (userIndex !== -1) {
            const foundUser = storedUserData[userIndex];
            // let active = JSON.parse(localStorage.getItem("active_user")) ||[]


           

            

            if (foundUser.password === values.password) {
              toast.success("login successfully!");
              setIsLogIn(true);
              window.localStorage.setItem("isLogIn", true);
             window.localStorage.setItem("active_user", foundUser.id);
              console.log(isLogIn);
              setTimeout(() =>{
                console.log("loged in")
                router.push("/home");

              },1000)
             
            } else {
              toast.error("Wrong Password");
            }
          } else {
            toast.error("Email address not found");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="grid grid-flow-row gap-8">
              <div>
                <TextField label="Email" name="email" type="text" />
                <TextField
                  label="Password"
                  name="password"
                  type={visible ? "text" : "password"}
                >
                  <button
                    type="button"
                    onClick={() => setVisible((prev) => !prev)}
                  >
                    {visible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </TextField>
              </div>

              <div className="text-center flex items-center gap-4">
                <button className="btn-primary " type="submit">
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => router.push("register")}
                  className="btn-primary"
                >
                  Register Now
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Login;
