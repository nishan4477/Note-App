import React from "react";
import Signup from "@/components/Signup";
import Image from "next/image";

const Register = () => {
  return (
    <div className="signup">
      <div className="containers mx-auto relative ">
        <h2 className=" mt-4 font-bold text-center pt-10 pb-20 text-4xl ">
          Register Now!!
        </h2>
        <div className="flex  py-8 flex-col justify-evenly   lg:flex-row">
          <Signup />
          <Image src="/Form.svg" alt="form" width={500} height={500} priority />
        </div>
        {/* <div className="absolute bottom-0 right-0">
        <iframe width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/09c6516c-212c-4560-a5a6-7a3a0dd95920"></iframe>

          
        </div> */}
   
      </div>
    </div>
  );
};

export default Register;
