import React,{useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const Login = () => {
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    useEffect(()=>{
        if(localStorage.getItem('token'))
        {
          window.location.href='/homepage';
        }
      },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        const userObj={
            Email:email,
            Password:password
        } 
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`,userObj)
        .then((res)=>{
            if(res.data.status==200)
            {
                localStorage.setItem('token',res.data.data.token);
                alert(res.data.message);
                window.location.href="/homepage";
            }else{
                alert(res.data.message);
            }
        })
        .catch((e)=>{
            alert(e);
        })
    }
  return (
        <div style={{padding:"5rem"}}>
    <h1>Login to Blog App</h1>  
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="Password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      <Button  type="submit"  variant="outline-success" size='lg'>Login</Button>
    </Form>
    </div>
  )
}

export default Login;