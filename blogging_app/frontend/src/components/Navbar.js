import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarMenu() {
  const token=localStorage.getItem('token');
  const handleLogout=()=>{
    localStorage.removeItem('token');
    window.location.href="/login";
  }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/homepage">MyBlogs.</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link href="/homepage">Home</Nav.Link>
          
            <Nav.Link href="/create-blog">Create a blog</Nav.Link>
            <Nav.Link href="/my-blogs">Myblogs</Nav.Link>
            <Nav.Link href="/follower-list">Follower-List</Nav.Link>
            <Nav.Link href="/following-list">Following-List</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            {
              token?
              <><Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link></>
              :<> <Nav.Link href="/">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link></>
            }
          
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMenu;