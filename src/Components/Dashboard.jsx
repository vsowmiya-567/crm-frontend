import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate()

    return (

         <div>

            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home" className='title'>CRM</Navbar.Brand>
                    <Nav className="me-auto">

                        <Nav.Link href="#home" className='signup' 
                            onClick={() => { navigate('/signup') }}>
                                Sign Up
                        </Nav.Link>

                        <Nav.Link href="#features" 
                            onClick={()=>{navigate('/signin')}} >
                                Sign In
                        </Nav.Link>
                        {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>
            <div>
            <h1 className='welcome'>Welcome to CRM</h1>

            </div>
        </div>

    );
};

export default Dashboard;