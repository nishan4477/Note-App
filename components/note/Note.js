"use client";
import React from "react";
import "./Note.scss";
import { MdDelete } from "react-icons/md";
import { IoMdSave } from "react-icons/io";

const Note = ({ id, time, text, deleteNote, updateText, colors }) => {
  return (
    <div
      className="note relative rounded-[20px] p-4 h-[280px] w-[260px] flex flex-col"
      style={{ backgroundColor: colors }}
    >
      <textarea
        value={text}
        onChange={(event) => {
          updateText(event.target.value, id);
        }}
        // defaultValue={text}
        className="note_text flex-1 bg-transparent resize-none font-medium text-lg outline-0"
      />
      <p className="text-center absolute bottom-2 left-2">{time}</p>

      {/* <button onClick={()=>save()} className='absolute bottom-1 right-12' ><IoMdSave size={30} /></button> */}
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
