"use client";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import Grid from "@mui/material/Grid"; // Grid version 1

const Signup = () => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const validate = Yup.object({
    firstName: Yup.string()
      .min(2, "Must be atleast 2 character or more")
      .max(50, "Must be 50 character or less")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(2, "Must be atleast 2 character or more")
      .max(50)
      .required("Last Name is required"),
    address: Yup.string()
      .max(50, "Must be 50 character or less")
      .required("Required"),
    contact: Yup.string()
      .matches(
        /^[0-9]{8,10}$/,
        "Phone number must be atleast the 8 to 10 digit"
      )
      .required("Phone number is required"),

    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/,
        "invalid email"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "password must be at least 6 characters ")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "password must match")
      .required("confirm password is required"),
  });
  return (
    <div className="border-[1px] rounded-md  border-slate-6 shadow-2xl  p-8">
      <Formik
        className="basis-2/3 "
        initialValues={{
          firstName: "",
          lastName: "",
          address: "",
          contact: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { _setSubmitting, resetForm }) => {
          console.log(values);
          const userId = uuidv4();
          let data = [];
          try {
            data = JSON.parse(localStorage.getItem("user"));
            data = [...data, { id: userId, ...values }];
          } catch (err) {
            data = [{ id: userId, ...values }];
          }
          localStorage.setItem("user", JSON.stringify(data));
          resetForm();
          toast.success("Form submitted successfully!");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container  columnSpacing={{}}>
              <Grid className="mr-4 lg:mr-10" xs={5}>
                <TextField  label="First Name" name="firstName" type="text" />
              </Grid>
              <Grid xs={5}>
                <TextField label="Last Name" name="lastName" type="text" />
              </Grid>
           
            <Grid xs={12}>
            <TextField label="Address" name="address" type="text" />
            </Grid>
            <Grid xs={12}>
            <TextField label="Contact" name="contact" type="number" />
            </Grid>
            <Grid xs={12}>
            <TextField label="Email" name="email" type="email" />
            </Grid>
            <Grid xs={12}>
            <TextField
              label="Password"
              name="password"
              type={visible ? "text" : "password"}
            >
              <button type="button" onClick={() => setVisible((prev) => !prev)}>
                {visible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </TextField>
            </Grid>

            <Grid xs={12}>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={visible1 ? "text" : "password"}
            >
              <button
                type="button"
                onClick={() => setVisible1((prev) => !prev)}
              >
                {visible1 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </TextField>
              </Grid>

            

         
            
            
            
 <Grid xs={12}>
 <div className="pt-4 ">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary "
              >
                Register
              </button>
            </div>


 </Grid>
            

           
            </Grid>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Signup;
