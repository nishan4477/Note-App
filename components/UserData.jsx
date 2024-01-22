"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";

const UserData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log(data, "this is data");
    const fetchData = async () => {
      try {
        debugger;
        const res = await axios.get(
          "https://run.mocky.io/v3/f311c55e-2c70-4ccf-939a-1690f8811be2"
        );
        console.log(res.data, "this is the response from api")

        setData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <Typography variant="h2">All Users</Typography>

      <div className="flex flex-row justify-start items-center flex-wrap gap-8 ">
        {data ? (
          data?.map((a) => (
            <div
            key={a.id}
            className="border border-solid rounded-xl border-black p-4 bg-brown-700"
            >
              <p>id: {a.id}</p>
              <p>Name: {a.name}</p>
              <p>Email: {a.email}</p>
            </div>
          ))
        ) : (
          <Typography variant="h3">Loading....</Typography>
        )}
    </div>
    </div>
  );
};

export default UserData;
