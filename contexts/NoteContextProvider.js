    "use client";
    import React, { createContext, useState, useEffect, useContext } from "react";
    import { v4 as uuid } from "uuid";

    const NotesContext = createContext(null);

    export const NotesProvider = ({ children }) => {
        // let timeout;
        // let  timer=2000;
        
    const user_id = localStorage.getItem("active_user");

    const [notes, setNotes] = useState(
        JSON.parse(localStorage.getItem(`note-app-${user_id}`)) || []
    );



    useEffect(() => {

        localStorage.setItem(`note-app-${user_id}`, JSON.stringify(notes));

    }, [notes]);






    const updateText = (text, id) => {
        const tempNotes = [...notes];
        const index = tempNotes.findIndex((item) => item.id === id);
        if (index !== -1) {
        tempNotes[index].text = text;
        setNotes(tempNotes);
        }
    };



    const addNote = () => {
        const tempNote = [...notes];
        const noteColors = ["#FFD700", "#32CD32", "#87CEEB", "#FFA07A", "#9370DB"];
        const randomColor =
        noteColors[Math.floor(Math.random() * noteColors.length)];

        tempNote.push({
        id: uuid(),
        time: new Date().toLocaleDateString(),
        text: " ",
        colors: randomColor,
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
        value={{ notes, updateText, addNote, deleteNote, setNotes, user_id }}
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
