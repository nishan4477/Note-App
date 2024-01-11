"use client";
import { useNotesContext } from "@/contexts/NoteContextProvider";
import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { FaSave } from "react-icons/fa";
import Modal from "react-modal";
import Grid from "@mui/material/Grid"; // Grid version
import { Formik, Form } from "formik";
import TextField from "../TextField";
import * as Yup from "yup";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid transparent",
    borderRadius: "10px",
  },
};

const Sidebar = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem(`note-app-categories`)) || []
  );

  const { user_id, addNote, catUpdate, setCatUpdate } = useNotesContext();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const validate = Yup.object({
    categories: Yup.string().required("categories is required"),
  });

  return (
    <div className="basis-[20%] flex flex-col pt-6 ">
      <div>
        <button onClick={openModal}>
          <IoAddCircle size={50} />
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Formik
            initialValues={{
              value: "",
              label: "",
            }}
            validationSchema={validate}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              debugger;
              const cat = values.categories;
              console.log(cat);
              const categoryValue = {
                value: cat,
                label: cat,
              };

              addNote(cat);

              let updatedCategories;
              // const isValue = categories?.some((item)=> item.value === categoryValue)
              // if (categories.length === 0) {
              //   updatedCategories = [categoryValue];
              // } else if (!isValue)  {
              //   debugger
              //   updatedCategories = [...categories, categoryValue];

              // }
              if (
                Boolean(categories.find((s) => s.value === categoryValue.value))
              ) {
                updatedCategories = categories;
                // alert("Already Exists");
              } else {
                updatedCategories = [...categories, categoryValue];
                addNote(cat);
              }

              setCategories(updatedCategories);

              localStorage.setItem(
                "note-app-categories",
                JSON.stringify(updatedCategories)
              );

              setIsOpen(false);
              setCatUpdate(!catUpdate);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      name="categories"
                      label="Categories"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <button debugger className="btn-primary" type="submit">
                      Create
                    </button>
                  </Grid>
                  <Grid item xs={4}>
                    <button className="btn-primary" onClick={closeModal}>
                      close
                    </button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    </div>
  );
};

export default Sidebar;
