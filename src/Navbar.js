import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbars() {
  return (
    <div>

      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link href="/">Registration</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/home">Home</Nav.Link>
       <Nav.Link href="/reg">classRegistration</Nav.Link>
       <Nav.Link href="/loginc">classLogin</Nav.Link>
       <Nav.Link href="/homes">classHome</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
 </div>
  )
}

export default Navbars;
