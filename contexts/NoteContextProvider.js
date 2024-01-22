"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { v4 as uuid } from "uuid";
import { useLogContext } from "./LogContextProvider";

const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
  const [user_id, setUser_id] = useState(null);
  const [notes, setNotes] = useState([]);
  const [catUpdate, setCatUpdate] = useState(false);
  const{isLogIn}= useLogContext()

  useEffect(() => {
    let userID = localStorage.getItem("active_user") || " ";
    setUser_id(userID);
    const storedData =
      JSON.parse(localStorage.getItem(`note-app-${userID}`)) || [];
    setNotes(storedData);
  }, [user_id,isLogIn]);

  useEffect(() => {
    localStorage.setItem(`note-app-${user_id}`, JSON.stringify(notes));
  }, [notes,user_id]);

  useEffect(()=>{
    const filteredNotes = notes.filter(
      (note) => note.text.trim() !== ""
    );
    setNotes(filteredNotes);
    localStorage.setItem(
      `note-app-${user_id}`,
      JSON.stringify(filteredNotes)
    );
  },[])

  // const debounced = (func, timer) => {
  //   let timeoutId;
  //   return (...args) => {
  //     clearTimeout(timeoutId);

  //     timeoutId = setTimeout(() => func(...args), timer);
  //   };
  // };

  const updateText = (text, id) => {
    const tempNotes = [...notes];
    const index = tempNotes.findIndex((item) => item.id === id);
    if (index !== -1) {
      tempNotes[index].text = text;
      setNotes(tempNotes);
      console.log("debounced handled");
    }
  };
  const handleComplete = (id) => {
   debugger
    const updatedNotes = [...notes];
    const index = updatedNotes.findIndex((item) => (item.id === id));
    if(index != -1){
      updatedNotes[index].completed = true;
      setNotes(updatedNotes);
      console.log(updatedNotes)

    }
    else{
      console.log("cannot find the index of that note to completed")
    }
   
  };

  const handleUncomplete = (id)=>{
    const updatedNotes = [...notes];
    const index = updatedNotes.findIndex((item) => (item.id === id));
    if(index != -1){
      updatedNotes[index].completed = false;
      setNotes(updatedNotes);
      console.log(updatedNotes)

    }
    else{
      console.log("cannot find the index of that note to completed")
    }

  }
    


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
      completed: false,
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
      value={{
        notes,
        updateText,
        addNote,
        deleteNote,
        setNotes,
        user_id,
        catUpdate,
        setCatUpdate,
        handleComplete,
        handleUncomplete,
      }}
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
