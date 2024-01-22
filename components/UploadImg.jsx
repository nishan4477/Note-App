"use client"
import React, { useState } from 'react'
import { Typography } from '@material-tailwind/react'
import  axios from 'axios'
import { Progress } from "@material-tailwind/react";


const UploadImg = () => {
    const [files,setFiles]= useState();
    const [progress,setProgress]= useState({started: false, pc:0});
    const [msg,setMsg]= useState(null);

    function handleUpload(){
        if(!files){
            setMsg("No file selected")
            return;
        }
        const fd = new FormData()
         for(let i=0 ; i<files.length ;  i++){
            fd.append(`file${i+1}`, files[i])

         }

        setMsg("Uploading...")
        setProgress(prevState=>{
            return {...prevState, started:true}
        })

        axios.post("http://httpbin.org/post", fd, {
            onUploadProgress: (progressEvent)=> {setProgress((prevState)=>{
                return {...prevState, pc:progressEvent.progress*100}
            })},
            headers: {
                "Custom-Header": "value",

            }
        }).then(res=>{ 
            setMsg("upload successful")
            console.log(res.data)
        }).catch(err=> {
            setMsg("upload failed")
            console.error(err)})
    }
  return (
    <div>
    <Typography variant= "h2">Upload the file.</Typography>
    <input onChange={(e)=>{setFiles(e.target.files)}} type='file' multiple/>
    <button className='btn-primary'  onClick={handleUpload}>upload</button>
    <div>
    {progress.started && <Progress className='w-[200px]' max="100" value={progress.pc}></Progress>  }


    </div>
    <div>
    {msg && <Typography variant='h4'>{msg}</Typography>}


    </div>
   
  


    </div>
  )
}

export default UploadImg