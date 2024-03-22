import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
function UserCard({props}) {
  const token=localStorage.getItem('token');
  const handlefollow=(Username)=>{
    const followingObj={followingUsername:Username};
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/follow/follow-user`,followingObj,{
      headers:{
          'Authorization':token
      }
    })
    .then((res)=>{
      alert("Successfully followed");
      window.location.reload();
    }).catch((e)=>alert(e));
  }
  const handleUnfollow=(Username)=>{
    const followingObj={followingUsername:Username};
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/follow/unfollow-user`,followingObj,{
      headers:{
          'Authorization':token
      }
    })
    .then((res)=>{
      alert("Successfully unfollowed");
      window.location.reload();
    }).catch((e)=>alert(e));
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.Name}</Card.Title>
        <Card.Text>{props.Username}</Card.Text>
        <Card.Text>{props.Email}</Card.Text>
        {
          props.follow ?
          (<> 
          <Button variant="danger" onClick={()=>handleUnfollow(props.Username)}>Unfollow</Button>
          </>
          ):(
            <>
            <Button variant="primary" onClick={()=>handlefollow(props.Username)}>Follow</Button>
            </>
            )
        }
      </Card.Body>
    </Card>
  );
}

export default UserCard;