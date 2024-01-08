"use client";
import { useNotesContext } from "@/contexts/NoteContextProvider";
import React from "react";
import { IoAddCircle } from "react-icons/io5";
import { FaSave } from "react-icons/fa";

const Sidebar = () => {
  const { addNote } = useNotesContext();

  return (
    <div className="basis-[20%] flex flex-col pt-6 pl-4">
      <button onClick={() => addNote()}>
        <IoAddCircle size={50} />
      </button>
    
    </div>
  );
};

export default Sidebar;
