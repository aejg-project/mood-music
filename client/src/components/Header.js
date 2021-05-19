import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'

const Header = () => {
  return (
    <header className="bg-light mb-4 py-2 flex-row align-center">
      <div className="mmlogo container flex-row justify-center align-center">
        
        <Link to="/">
          <img src="./mm-logo.png"/>
        </Link>
        <Container>
          <Navbar className="justify-content-center" bg="light" variant="light">
            <Nav defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="#home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#features">Log In</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#pricing">Sign Up</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#pricing">Sign Out</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar>
        </Container>

      </div>
    </header>
  );
};

export default Header;
