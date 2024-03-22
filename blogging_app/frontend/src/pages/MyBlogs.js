import React, { useEffect, useState } from 'react'
import axios from "axios";
import BlogCard from '../components/BlogCard';

const MyBlogs = () => {
  const [myblogs,setMyblogs]=useState([]);
  const token=localStorage.getItem('token');
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog/get-user-blogs`,{
      headers:{
        'Authorization':token
      }
    })
    .then((res)=>{
      console.log(res.data.data)
      setMyblogs(res.data.data);
    })
    .catch((e)=>alert(e));
  },[token]);
  return (
    <div style={{padding:"2rem"}}>
    <h1 style={{marginBottom:"1rem"}}>My Blogs</h1>
    <div style={{display:'flex', flexWrap:"wrap",gap:"1rem"}}>
    {
        myblogs?.map((blog,key)=>(
          <BlogCard key={key} props={blog} setMyblogs={setMyblogs} myblogs={myblogs} homepage={false}/>
        ))
      }
    </div>
     
    </div>
  )
}

export default MyBlogs;