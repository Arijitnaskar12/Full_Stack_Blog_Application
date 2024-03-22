import React, { useEffect, useState } from 'react'
import UserCard from '../components/Users/UserCard';
import axios from 'axios';
const FollowingList = () => {
    const token=localStorage.getItem('token');
    const[followingList,setFollowingList]=useState();
    useEffect(()=>{
        if(token==null)
        {
            window.location.href='/login';
        }else{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/follow/following-list`,{
            headers:{
                "authorization":token
            }
        }).then((res)=>{
            let followinglistArr=[];
            res.data.data.forEach((user)=>{
                const userObj={
                    _id:user._id,
                    Username: user.Username,
                    Name: user.Name,
                    Email: user.Email,
                    follow: true,
                }
                followinglistArr.push(userObj);
            })
            setFollowingList(followinglistArr);
        }).catch((e)=>{
            alert(e);
        })
    }
    },[]);
  return (
    <div>
         <h1>Following List</h1>
    <div style={{display:'flex',gap:"1rem",flexWrap:'flex-wrap'}}>
    {
        (followingList?.map((user)=>(
            <UserCard props={user}/>
        )))
    }
    </div>
   
    </div>
  )
}

export default FollowingList;