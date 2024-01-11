"use client";
import React, { useEffect, useState } from "react";

import { MdDelete } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { Checkbox } from "@material-tailwind/react";

const Note = ({
  id,
  time,
  text,
  deleteNote,
  updateText,
  colors,
  checked,
  setChecked,
}) => {


  
  return (
    <div
      className="note relative rounded-[20px] p-5 h-[250px] w-[220px] flex flex-col"
      style={{ backgroundColor: colors }}
    >
      <input
        type="checkbox"
        className="absolute  left-1 top-1
      "
        onClick={() => {
          setChecked((prevIds) => { 
            return [...prevIds, id];
          });
        }}
      ></input>

      <textarea
        value={text}
        onChange={(e) => {
          updateText(e.target.value, id);
        }}
        // defaultValue={text}
        className="note_text flex-1 bg-transparent resize-none font-medium text-lg outline-0"
      />
      <p className="text-center absolute bottom-2 left-2">{time}</p>

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
