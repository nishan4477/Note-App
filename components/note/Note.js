"use client";
import React, { useEffect, useState } from "react";

import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

const Note = ({
  id,
  time,
  text,
  deleteNote,
  updateText,
  colors,
  checked,
  setChecked,
  handleComplete,
  completed,
  handleUncomplete,
}) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(checked); // Initialize with initial checked state

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked); // Toggle checkbox state

    if (isCheckboxChecked) {
      setChecked((prevIds) => [...prevIds, id]); // Add id to checked array if checked
    } else {
      setChecked((prevIds) => prevIds.filter((prevId) => prevId !== id)); // Remove id from checked array if unchecked
    }
  };

  // console.log(isCheckboxChecked, "this is only checked notess");

  return (
    <div
      className="note relative rounded-[20px] p-5 h-[250px] w-[220px] flex flex-col"
      style={{ backgroundColor: colors }}
    >
      <input
        type="checkbox"
        className="absolute  left-1 top-1
      "
        // checked={isCheckboxChecked} // Bind to local checkbox state
        onChange={handleCheckboxChange} // Call handleCheckboxChange on change
      ></input>

      <textarea
        value={text}
        readOnly={completed ? true : false}
        
        onChange={(e) => {
          updateText(e.target.value, id);
        }}
        // defaultValue={text}
        className= {` note_text flex-1 bg-transparent resize-none font-medium text-lg outline-0 ${completed ? "line-through" : ""} `}
      />
      <p className="text-center absolute bottom-2 left-2">{time}</p>
      <button
       className="absolute bottom-2 right-28 cursor-pointer"
       onClick={()=>handleUncomplete(id)}
       ><MdModeEditOutline size={24} />
</button>

      <button
       className="absolute bottom-2 right-16 cursor-pointer"
       onClick={()=>  handleComplete(id)}
       ><FaCheckCircle size={24} />
</button>
    

      <button
        onClick={() => deleteNote(id)}
        className="absolute bottom-1 right-1"
      >
        <MdDelete style={{ color: "#9D1D00" }} size={30} />
      </button>
    </div>
  );
};

export default Note;
