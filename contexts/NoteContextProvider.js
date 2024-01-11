"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";


const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
  const user_id = localStorage.getItem("active_user");

  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem(`note-app-${user_id}`)) || []
  );

  const [catUpdate,setCatUpdate] = useState(false)

  useEffect(() => {
    localStorage.setItem(`note-app-${user_id}`, JSON.stringify(notes));
  }, [notes, setNotes]);
  // const debounced = (func, timer) => {
  //   let timeoutId;
  //   return (...args) => {
  //     clearTimeout(timeoutId);

  //     timeoutId = setTimeout(() => func(...args), timer);
  //   };
  // };

  const updateText = (text, id) => {
    debugger
    const tempNotes = [...notes];
    const index = tempNotes.findIndex((item) => item.id === id);
    if (index !== -1) {
      tempNotes[index].text = text;
      setNotes(tempNotes);
      console.log("debounced handled");
    }
  };
  // const updateText = debounced((text,id) => updatesText(text, id), 2000);


  const addNote = (values) => {
    const tempNote = [...notes];
    const noteColors = ["#FFD700", "#32CD32", "#87CEEB", "#FFA07A", "#9370DB"];
    const randomColor =
      noteColors[Math.floor(Math.random() * noteColors.length)];

    tempNote.unshift({
      id: uuid(),
      time: new Date().toLocaleDateString(),
      text: " ",
      colors: randomColor,
      category: values,
    });

    setNotes(tempNote);
  };

  const deleteNote = (id) => {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex((item) => item.id === id);
    if (index !== -1) {
      tempNotes.splice(index, 1);
      setNotes(tempNotes);
    } else {
      alert("no id found");
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, updateText, addNote, deleteNote, setNotes, user_id,catUpdate,setCatUpdate }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const contextNote = useContext(NotesContext);
  if (!contextNote) {
    throw new Error("useNotes must be used within the NotesProvider");
  }
  return contextNote;
};
