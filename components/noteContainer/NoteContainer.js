"use client"
import React, { useEffect } from "react";
import Note from "../note/Note";
import { useNotesContext } from "@/contexts/NoteContextProvider";

const NoteContainer = ({  }) => {

 const {deleteNote,notes,updateText,setNotes}= useNotesContext()

 const user_id= localStorage.getItem("active_user")

    useEffect(()=>{
    const userId = `note-app-${user_id}`
    const notes = JSON.parse(localStorage.getItem(`note-app-${user_id}`));
    setNotes(notes)
   },[user_id])
  return (
    <div className="h-full basis-[80%]">
      <h2 className="font-bold text-3xl text-black py-4">Notes</h2>

      <div className="flex flex-wrap gap-4 h-[90%] overflow-y-scroll">
        {/* {notes.map(each=>each.id).join(',')} */}
       {notes?.length>0 ? notes?.map((items, id) => {
        return  <Note colors={items.colors} updateText={updateText} key={items.id}  deleteNote={deleteNote} id={items.id} time={items.time} text={items.text} />
        }
             
        
          
        ) : <h2 className="font-semibold text-2xl ">No notes present</h2>
        }

      </div>
    </div>
  );
};

export default NoteContainer;
