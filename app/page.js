
import Login from "@/components/Login";
import React from "react";
import Image from "next/image";

const Logins = () => {
  return (
    <div className="h-screen  bg-gray-200 w-full grid place-items-center  gap-4">
    
    <div className="shadow-xl">
    <div className="flex flex-col  gap-4  border-[2px] rounded-md   border-gray-400 py-16 px-32 ">
        <h2 className="text-center font-bold text-4xl">Sign In</h2>
        <Image
          src="/login.svg"
          alt="login_logo"
          width={200}
          height={200}
          priority
        />

        <Login />
      </div>

    </div>
       
        

        
        
      
    </div>
  );
};

export default Logins;
