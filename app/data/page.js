"use client";
import UploadImg from "@/components/UploadImg";
import UserData from "@/components/userData";
import isNs from "is-ns";
import { Forms } from "simple-nis-form";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



const Data = () => {
  const myFunc = ()=>{
    alert(isNs("ns"));
  }


  return (
    <div className="containers">
      <div className="my-8">
        <UserData />
      </div>

      <div className="my-8">
        <UploadImg />

        <button onClick={myFunc} className="btn-primary">myFunction</button>

        <Forms/>
      </div>
      <div>
      <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
    </TabPanel>
    <TabPanel>
      <h2>Any content 2</h2>
    </TabPanel>
  </Tabs>
      </div>
    </div>
  );
};

export default Data;
