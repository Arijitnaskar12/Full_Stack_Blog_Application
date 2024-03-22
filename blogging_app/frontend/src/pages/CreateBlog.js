import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";
const CreateBlog = () => {
  const token=localStorage.getItem('token');
  useEffect(()=>{
    if(token==null)
    {
      window.location.href='/login';
    }
  },[]);
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    
    const handleCreation=(e)=>{
        e.preventDefault();
        const blogObj={
            title,
            textBody:description
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/blog/create-blog`,blogObj,
        {
          headers:{
            'Authorization':token
          }
        })
        .then((res)=>{
            if(res.data.status==201)
            {
                window.location.href="/my-blogs";
            }else{
                alert(res.data.message);
            }
        })
        .catch((e)=>alert(e));
    }
  return (
    <div style={{padding:"5rem"}}>
    <h1>Create a Blog</h1>  
    <Form onSubmit={handleCreation}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title of your blog" onChange={(e)=>setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={5} placeholder="Write a description" onChange={(e)=>setDescription(e.target.value)} />
      </Form.Group>
      <Button  type="submit"  variant="outline-warning" size='lg'>Create Blog</Button>
    </Form>
    </div>
  )
}

export default CreateBlog;