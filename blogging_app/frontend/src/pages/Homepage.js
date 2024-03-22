import React, { useEffect, useState } from 'react'
import UserCard from '../components/Users/UserCard';
import axios from "axios";
import BlogCard from '../components/BlogCard';
const Homepage = () => {
  const token=localStorage.getItem('token');
  if(token==null){
    window.location.href="/login";
  }
  const[homeBlogs,setHomeBlogs]=useState();
  useEffect(()=>{
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog/homepage-blogs`,{
          headers:{
              "authorization":token
          }
      }).then((res)=>{
          setHomeBlogs(res.data.data);
      }).catch((e)=>{
          alert(e);
      })
  },[token]);
  return (
    <div>
    <h1>Homepage</h1>
        <div style={{display:'flex',flexDirection:"column",gap:"1rem",flexWrap:'flex-wrap'}}>
    {
        (homeBlogs?.map((blog)=>(
          <div style={{padding:'1rem'}}>
          <BlogCard props={blog} homepage={true} />
          </div>
           
        )))
    }
    </div>
    </div>
  )
}
export default Homepage