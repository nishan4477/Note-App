import { useField, ErrorMessage, Field } from "formik";
import React from "react";

const TextField = ({ children, label, ...props }) => {
  const [field, meta] = useField(props);

  // console.log("field:", field)
  // console.log("meta:", meta)
  // console.log("props:", props)

  return (
    <div className="my-2 relative text-xl font-medium  flex flex-col justify-start gap-2 ">
      <label htmlFor={field.name}>{label}</label>
      <Field
        className={`  border-[1px] border-gray-500  rounded-md border-solid  py-2 ps-2 inline-block`}
        {...field}
        {...props}
        autoComplete="on"
      />
      <ErrorMessage component="div" name={field.name} className="error" />

      <div className="absolute right-4 top-[32px] text-xl">{children}</div>
    </div>
  );
};

export default TextField;
