"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/home.module.scss";
import NoteContainer from "@/components/noteContainer/NoteContainer";
import Sidebar from "@/components/sidebar/Sidebar";
import { v4 as uuid } from "uuid";
import { useNotesContext } from "@/contexts/NoteContextProvider";

const Home = () => {
  const { addNote, notes, setNotes, user_id } = useNotesContext();

  useEffect(() => {
    const filteredNotes = notes?.filter((note) => note.text?.trim() !== "");
    setNotes(filteredNotes);
    localStorage.setItem(`note-app-${user_id}`, JSON.stringify(filteredNotes));
  }, []);

  return (
    <div className={`${styles.container} flex  mx-auto px-4`}>
      <Sidebar />
      <NoteContainer />
    </div>
  );
};

export default Home;
