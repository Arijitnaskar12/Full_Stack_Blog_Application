import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from "axios";
const Register = () => {
    const[name,setName]=useState("");
    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    useEffect(()=>{
      if(localStorage.getItem('token'))
      {
        window.location.href='/homepage';
      }
    },[]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        const userObj={
            Name:name,
            Username:username,
            Email:email,
            Password:password
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/register`,userObj)
        .then((res)=>{
            if(res.data.status==201)
            {
              alert(res.data.message);
                window.location.href="/login";
                
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
    <h1>Register to Blog App</h1>  
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" placeholder="Enter your Name"  onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter a Username" onChange={(e)=>setUsername(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="Password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      <Button  type="submit"  variant="outline-dark" size='lg'>Register</Button>
    </Form>
    </div>
  )
}

export default Register;