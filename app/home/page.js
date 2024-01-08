"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/home.module.scss";
import NoteContainer from "@/components/noteContainer/NoteContainer";
import Sidebar from "@/components/sidebar/Sidebar";
import { v4 as uuid } from "uuid";
import { useNotesContext } from "@/contexts/NoteContextProvider";

const Home = () => {
  const {addNote} = useNotesContext()


  return (
    <div className={`${styles.container} flex`}>
      <Sidebar />
      <NoteContainer
       
      />
    </div>
  );
};

export default Home;
