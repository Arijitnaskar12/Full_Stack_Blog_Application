import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import formatDateAndTime from '../utils/DateandTIme';
import axios from 'axios';
const BlogCard = ({props,setMyblogs,myblogs,homepage}) => {
    const token=localStorage.getItem("token");
    const [isEdit,setIsEdit]=useState(false);
    const [newTitle,setnewTitle]=useState("");
    const [newdescription,setnewDescription]=useState("");
    const handleDelete=(blogid)=>{
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/blog/delete-blog/${blogid}`,{
            headers:{
                "Authorization":token
            },
        })
        .then((res)=>{
            if(res.data.status==200)
            {
                alert(res.data.message);
                // window.location.reload();
                // axios.get(`${process.env.REACT_APP_BACKEND_URL}/blog/get-user-blogs`,{
                //     headers:{
                //       'Authorization':token
                //     }
                //   })
                //   .then((res)=>{
                //     console.log(res.data.data)
                //     setMyblogs(res.data.data);
                //   })
                //   .catch((e)=>alert(e));
                const myBlogNew=myblogs.filter((blog)=>blog._id!==blogid);
                setMyblogs(myBlogNew);
            }else{
                alert(res.data.message)
            }
        })
        .catch((e)=>alert(e));
    }
    const handleCreation=(e,blogid)=>{
      e.preventDefault();
      const newBlogObject={
        blogid,
        title:newTitle,
        textBody:newdescription
      }
      axios.put(`${process.env.REACT_APP_BACKEND_URL}/blog/edit-blog`,newBlogObject,{
        headers:{
          "authorization":token
        }
      }).then((res)=>{
        alert(res.data.message);
        setIsEdit(false);
        window.location.reload();
      }).catch((err)=>{
        alert(err);
      })
    }
  return (
    <div>
    <Card style={{ width: '100%'}}>
      <Card.Body>
      <div style={{display:"flex",justifyContent:'space-between',marginBottom:'0.5rem'}}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>Created on: {formatDateAndTime(new Date(props.creationDateTime))}</Card.Text>
      </div>
        <Card.Text>{props.textBody}</Card.Text>
        {
          homepage?<></>:<>
          <Button variant="outline-info" style={{marginRight:"0.7rem"}} onClick={()=>setIsEdit(!isEdit)}>Edit Blog</Button>
        <Button variant="outline-danger" onClick={()=>handleDelete(props._id)}>Delete Blog</Button>
          </>
        }
       
        {
      isEdit &&(
        <Form onSubmit={(e)=>handleCreation(e,props._id)}>
      <Form.Group className="mb-3 mt-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title of your blog" onChange={(e)=>setnewTitle(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={5} placeholder="Write a description" onChange={(e)=>setnewDescription(e.target.value)} />
      </Form.Group>
      <Button  type="submit"  variant="outline-success" size='lg'>Edit</Button>
    </Form>
      )
    }
      </Card.Body>
    </Card>
    
    </div>
  )
}

export default BlogCard;