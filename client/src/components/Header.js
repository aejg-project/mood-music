import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

import Auth from "../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-light mb-4 py-2 flex-row align-center">
      <div className="mmlogo container flex-row justify-center align-center">
        <Link to="/">
          <img src="./mm-logo.png" />
        </Link>
        <Container>
          <Navbar className="justify-content-center" bg="light" variant="light">
            <Nav defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="./">Home</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link href="/login">Log In</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </Nav.Item> */}
              {/* <Nav.Item>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              </Nav.Item> */}
              <Nav.Item>
                {Auth.loggedIn() ? (
                  <Nav.Item>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/login" onClick={logout}>
                      Logout
                    </Nav.Link>
                  </Nav.Item>
                ) : (
                  <>
                    <Nav.Link href="/login">Log In</Nav.Link>
                    <Nav.Link href="/signup">Sign Up</Nav.Link>
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
