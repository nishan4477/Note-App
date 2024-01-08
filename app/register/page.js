import React from "react";
import Signup from "@/components/Signup";
import Image from "next/image";

const Register = () => {
  return (
    <div className="signup">
      <div className="container mx-auto ">
        <h2 className=" mt-4 font-bold text-center pt-10 pb-20 text-4xl ">
          Register Now!!
        </h2>
        <div className="flex py-8 flex-col justify-evenly   md:flex-row">
          <Signup />
          <Image src="/Form.svg" alt="form" width={500} height={500} priority />
        </div>
      </div>
    </div>
  );
};

export default Register;
