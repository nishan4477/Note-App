"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLogContext } from "@/contexts/LogContextProvider";
import { redirect, useRouter } from "next/navigation";
import { useNotesContext } from "@/contexts/NoteContextProvider";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const { isLogIn, setIsLogIn } = useLogContext();
  const { notes, setNotes, user_id } = useNotesContext();
  const route = useRouter();
  const [user, setUser] = useState([]);
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    debugger;
    const allUser = JSON.parse(localStorage.getItem("user")) || [];
    const selectedUser = allUser?.find((a) => a.id == user_id);
    setUser(selectedUser);
  }, [user_id]);
  console.log("user ko photod ehaunu poarneko nam", user);

  const navigate = (page) => {
    route.push(page);
  };

  return (
    <nav className="w-full bg-gray-800   px-4 py-4 flex justify-between items-center  ">
      <div className="flex justify-start items-center">
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
              <Link href="/data">UserInfo</Link>
            </li>
          )}

          {/* {dropDown && (
            <li>
              <button
                onClick={(isLogIn) => {
                  const filteredNotes = notes.filter(
                    (note) => note.text.trim() !== ""
                  );
                  setNotes(filteredNotes);
                  localStorage.setItem(
                    `note-app-${user_id}`,
                    JSON.stringify(filteredNotes)
                  );
                  setIsLogIn(false);
                  window.localStorage.setItem("isLogIn", false);
                  window.localStorage.removeItem("active_user");
                  //  redirect("/")

                  navigate("/");
                }}
                className="btn-secondary "
              >
                Logout
              </button>
            </li>
          )} */}
        </ul>
      </div>
      <div className="flex items-center relative">
        {isLogIn && (
          <div className="w-14 h-14 rounded-full overflow-hidden bg-red-500">
            <img className="w-full" src={user?.photo} alt="img"></img>
          </div>
        )}
        {isLogIn && (
          <div className="flex flex-col  ">
            <IoMdArrowDropdown
              className="dropdown"
              size={24}
              color="white"
              onClick={() => {
                setDropDown(!dropDown);
              }}
            />

            {dropDown && (
              <div className="px-2 py-8 bg-white border rounded-xl absolute z-10 top-16 left-0">
              <button
                onClick={(isLogIn) => {
                  const filteredNotes = notes.filter(
                    (note) => note.text.trim() !== ""
                  );
                  setNotes(filteredNotes);
                  localStorage.setItem(
                    `note-app-${user_id}`,
                    JSON.stringify(filteredNotes)
                  );
                  setIsLogIn(false);
                  window.localStorage.setItem("isLogIn", false);
                  window.localStorage.removeItem("active_user");
                  setDropDown(!dropDown)
                  //  redirect("/")

                  navigate("/");
                }}
                className="btn-secondary  "
              >
                Logout
              </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
