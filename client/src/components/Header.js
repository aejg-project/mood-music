import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Auth from "../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-light mb-4 py-2 flex-row align-center">
      <div className="mmlogo justify-center align-center">
        <Link to="/" className="mmlogo container flex-row justify-center align-center">
          <img src="./mm-logo.png" />
        </Link>
        <Container>
          <Navbar expand="true" className="justify-content-center" bg="light" variant="light">
            <Nav  defaultActiveKey="/home">
              <Nav.Item>
                {Auth.loggedIn() ? (
                  <Nav.Item > 
                    <a href="/login" onClick={logout}>Logout</a>
                    <Navbar.Text>
                    <a href="/dashboard">Dashboard</a>
                      {/* Signed in as: <a href="#">Mr. Ed</a> */}
                    </Navbar.Text>
                  </Nav.Item>
                ) : (
                  <>
                    <a href="./">Home</a>
                    <a href="/login">Log In</a>
                    <a href="/signup">Sign Up</a>
                  </>
                )}
              </Nav.Item>
            </Nav>
          </Navbar>
        </Container>
      </div>
    </header>
  );
};

export default Header;
