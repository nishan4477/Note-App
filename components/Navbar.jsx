"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLogContext } from "@/contexts/LogContextProvider";
import { redirect, useRouter } from "next/navigation";
import { useNotesContext } from "@/contexts/NoteContextProvider";


const Navbar = () => {
  const { isLogIn, setIsLogIn } = useLogContext();
  const {notes,setNotes,user_id} = useNotesContext()
  const route = useRouter()

  const navigate = (page)=>{
    route.push(page)
  }

  return (
    <nav className="w-full bg-blue-600 px-4 py-2 flex justify-start items-center  ">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="LOGO"
          width={70}
          height={70}
          priority
        ></Image>
      </Link>
      <ul className="flex justify-center  items-center gap-20 pl-60  ">
        {isLogIn && (
          <li>
            <Link href="/home">Home</Link>
          </li>
        )}
        <li>
          <Link href="/register">Register</Link>
        </li>
        {!isLogIn && (
          <li>
            <Link href="/">Login</Link>
          </li>
        )}

        {isLogIn && (
          <li>
            <button
            
              onClick={(isLogIn) => {
                const filteredNotes = notes.filter(note => note.text.trim() !== "");
                debugger
                setNotes(filteredNotes);
                localStorage.setItem(`note-app-${user_id}`, JSON.stringify(filteredNotes));
                setIsLogIn(false);
                window.localStorage.setItem("isLogIn", false);
                window.localStorage.removeItem("active_user")
               

                navigate("/")
              }}
              className="btn-secondary"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
