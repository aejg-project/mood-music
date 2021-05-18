import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./index.css";


import axios from 'axios';
import { Credentials } from './Credentials';


import HomePage from "./components/HomePage";
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Mood Music",
      headerLinks: [
        { title: "Home", path: "/" },
        { title: "Login", path: "/login" },
      ],
      home: {
        title: "Mood Music",
      },
      login: {
        title: "Login",
      },
    };
  }
  render() {
    return (
      <Router>
        <Container className="p-0" fluid={true}>
          <Navbar className="border-bottom" bg="transparent" expand="lg">
            <Navbar.Brand>Mood Music</Navbar.Brand>

            <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
            <Navbar.Collapse id="navbar-toggle">
              <Nav className="ml-auto">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>


          <Route
            path="/"
            exact
            render={() => <HomePage title={this.state.home.title} />}
          />
          <Route
            path="/login"

            render={() => <LogIn title={this.state.about.title} />}
          />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          
          <Footer />
        </Container>

      </Router>
    );
  }
}

export default App;
