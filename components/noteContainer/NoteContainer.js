"use client";
import React, { useState, useEffect } from "react";
import Note from "../note/Note";
import { useNotesContext } from "@/contexts/NoteContextProvider";
import { AiTwotoneDelete } from "react-icons/ai";
import "./NoteContainer.scss";
import Select from "react-select";
import { Typography } from "@material-tailwind/react";

const NoteContainer = ({}) => {
  const [checked, setChecked] = useState([]);
  const initialOption = { value: "ALL", label: "ALL" };
  const [selectedOption, setSelectedOption] = useState(null);
  const [opt, setOpt] = useState(
    JSON.parse(localStorage.getItem("note-app-categories")) || []
  );
  const [catNote, setCatNote] = useState([]);
  const [showNotesCat, setShowNoteCat] = useState(false);
  const [noOfChecked, setNoOfChecked] = useState(false);

  const options = opt;

  useEffect(() => {
    const noCheckedBox = checked.length;

    noCheckedBox > 1 ? setNoOfChecked(true) : setNoOfChecked(false);
  }, [checked, setChecked, setSelectedOption]);

  const {
    deleteNote,
    notes,
    updateText,
    setNotes,
    user_id,
    catUpdate,
    setCatUpdate,
    handleComplete,
    handleUncomplete,
  } = useNotesContext();

  useEffect(() => {
    const updateOption = JSON.parse(
      localStorage.getItem("note-app-categories")
    );
    updateOption.unshift(initialOption);
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

    let catFilter;
    if (selectedOption?.value == "ALL") {
      catFilter = temp;
    } else {
      try {
        catFilter = temp?.filter((c) => c.category == selectedOption.value);
      } catch (err) {
        catFilter = temp;
      }
    }

    setCatNote(catFilter);
  }, [selectedOption, setSelectedOption,notes]);

  // const reversedNote = notes.toReversed();

  return (
    <div className=" note_container   basis-[90%]">
      <div className="flex py-4 flex-col gap-4 justify-start items-start  sm:flex-row justify-start items-center gap-40 ">
        <h2 className="font-bold z-10 text-4xl text-white py-4">Your Notes</h2>

        <Select
          className="w-1/2 border-[1.5px] border-black rounded-lg "
          defaultValue={selectedOption}
          onChange={(option) => {
            setSelectedOption(option);
            setShowNoteCat(true); // Set showNotesCat to true on change
          }}
          options={options}
        />

        {noOfChecked && (
          <button
            onClick={deleteAll}
            className="btn-primary flex justify-center items-center gap-2 z-10 "
          >
            delete selected{" "}
            <span>
              <AiTwotoneDelete size={20} />
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-4 h-[90%] overflow-y-scroll">
        {showNotesCat === true && catNote?.length > 0
          ? catNote?.map((items) => {
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
                completed={items.completed}
                handleUncomplete={handleUncomplete}
                handleComplete={handleComplete}
                />
              );
            })
          : " "}
        {showNotesCat === true && catNote?.length == 0 ? (
          <Typography className="pt-8  w-full text-center" variant="h4">
            No notes were created of such categories...
          </Typography>
        ) : (
          " "
        )}

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
                completed={items.completed}
                handleUncomplete={handleUncomplete}
                handleComplete={handleComplete}

                />
              );
            })}
          </>
        ) : (
          ""
        )}

        {showNotesCat === false && notes?.length == 0 ? (
          <Typography className="pt-8  w-full text-center" variant="h4">
            Please create a new note...
          </Typography>
        ) : (
          " "
        )}

        {/* {showNotesCat === true && } */}
      </div>
    </div>
  );
};

export default NoteContainer;
