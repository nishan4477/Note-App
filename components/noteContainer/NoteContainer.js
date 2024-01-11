"use client";
import React, { useState, useEffect } from "react";
import Note from "../note/Note";
import { useNotesContext } from "@/contexts/NoteContextProvider";
import { AiTwotoneDelete } from "react-icons/ai";
import "./NoteContainer.scss";
import Grid from "@mui/material/Grid"; // Grid version 1

import Select from "react-select";

const NoteContainer = ({}) => {
  const [checked, setChecked] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [opt, setOpt] = useState(
    JSON.parse(localStorage.getItem("note-app-categories")) || []
  );
  const [catNote, setCatNote] = useState([]);
  const [showNotesCat, setShowNoteCat] = useState(false);

  const options = opt;
  console.log(options);

  const {
    deleteNote,
    notes,
    updateText,
    setNotes,
    user_id,
    catUpdate,
    setCatUpdate,
  } = useNotesContext();

  useEffect(() => {
    const updateOption = JSON.parse(
      localStorage.getItem("note-app-categories")
    );
    setOpt(updateOption);
  }, [catUpdate, setCatUpdate]);

  const deleteAll = () => {
    const tempChecked = [...checked];

    const matchDeleteData = notes.filter((item) => {
      return !tempChecked.includes(item.id);
    });

    setNotes(matchDeleteData);

    setChecked([]);
  };

  useEffect(() => {
    // const userId = `note-app-${user_id}`;
    const notes = JSON.parse(localStorage.getItem(`note-app-${user_id}`));
    setNotes(notes);
  }, [user_id]);

  useEffect(() => {
    debugger;
    const temp = [...notes];
    console.log("this is selected option value", selectedOption);
    console.log("this is temp", temp);
    let catFilter;
    try {
      catFilter = temp?.filter((c) => c.category == selectedOption.value);
    } catch (err) {
      catFilter = temp;
    }

    console.log("filterCategories", catFilter);
    setCatNote(catFilter);
  }, [selectedOption, setSelectedOption]);

  // const reversedNote = notes.toReversed();

  return (
    <div className=" note_container  basis-[80%]">
      <div className="flex py-4 flex-col gap-4 justify-start items-start  sm:flex-row justify-between items-center ">
        <h2 className="font-bold text-4xl text-black py-4">Your Notes</h2>

        <Select
          className="w-1/2"
          defaultValue={selectedOption}
          onChange={(option) => {
            setSelectedOption(option);
            setShowNoteCat(true); // Set showNotesCat to true on change
          }}
          options={options}
        />

        <button
          onClick={deleteAll}
          className="btn-primary flex justify-center items-center gap-2 "
        >
          delete selected{" "}
          <span>
            <AiTwotoneDelete size={20} />
          </span>
        </button>
      </div>

      <div className="flex flex-wrap gap-4 h-[90%] overflow-y-scroll">
        {showNotesCat === true && catNote?.length > 0
          ? catNote?.map((items) => {
              return (
                <Note
                  key={items.id}
                  checked={checked}
                  setChecked={setChecked}
                  colors={items.colors}
                  updateText={updateText}
                  deleteNote={deleteNote}
                  id={items.id}
                  time={items.time}
                  text={items.text}
                />
              );
            })
          : " "}

        {showNotesCat === false && notes?.length > 0 ? (
          <>
            {notes?.map((items, index) => {
              return (
                <Note
                  checked={checked}
                  setChecked={setChecked}
                  colors={items.colors}
                  updateText={updateText}
                  key={items.id}
                  deleteNote={deleteNote}
                  id={items.id}
                  time={items.time}
                  text={items.text}
                />
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NoteContainer;
