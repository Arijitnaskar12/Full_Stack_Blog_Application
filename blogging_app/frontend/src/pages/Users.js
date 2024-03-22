import React, { useEffect, useState } from 'react'
import axios from "axios";
import UserCard from '../components/Users/UserCard';
const Users = () => {
    const token=localStorage.getItem('token');
const[users,setUsers]=useState();
// console.log(users);
useEffect(()=>{
    if(token==null)
        {
            window.location.href='/login';
        }else{
axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/get-all-users`,{
    headers:{
        'authorization':token
    }
})
.then((res1)=>
{
    
    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/follow/following-list`, {
      headers: {
        "authorization": token,
      },
    })   
    .then((res2)=>{
      
        let followingMap = new Map();

        res2.data.data.forEach((user) => {
          followingMap.set(user.Username, true);
        });

        let allUserDetails = [];

        res1.data.data.forEach((user) => {
          if (followingMap.get(user.Username)) {
            let userObj = {
              _id: user._id,
              Username: user.Username,
              Name: user.Name,
              Email: user.Email,
              follow: true,
            };

            allUserDetails.push(userObj);
          } else {
            let userObj = {
              _id: user._id,
              Username: user.Username,
              Name: user.Name,
              Email: user.Email,
              follow: false,
            };

            allUserDetails.push(userObj);
          }
        });
        setUsers(allUserDetails);
    }).catch((e)=>alert(e));
}
)
.catch((e)=>alert(e));
        }
},[token]);
  return (
    <div>
    <h1>Users</h1>
    <div style={{display:'flex',gap:"1rem",flexWrap:'flex-wrap'}}>
    {
        (users?.map((user)=>(
            <UserCard props={user}/>
        )))
    }
    </div>
   
    </div>
  )
}

export default Users;