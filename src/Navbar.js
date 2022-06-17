import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navbars() {

    return (
        <div>

            <Navbar bg="primary" variant="dark" >
                <Container>
                    <Navbar.Brand href="#home" ></Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/" className='text-light text-decoration-none m-3'>Registration</Link>
                        <Link to="/login" className='text-white text-decoration-none m-3'>Login</Link>
                        <Link to="/home" className='text-white text-decoration-none m-3'>Home</Link>
                        <Link to="/reg" className='text-white text-decoration-none m-3' >classRegistration</Link>
                        <Link to="/loginc" className='text-white text-decoration-none m-3'>classLogin</Link>
                        <Link to="/homes" className='text-white text-decoration-none m-3'>classHome</Link>



                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navbars;
