import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { Container, Navbar, Nav } from "react-bootstrap";
import './index.css'

import Header from './components/Header';
// import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const client = new ApolloClient({
  uri: '/graphql'
});

function App() {
  const [currentBook, setCurrentBook] = useState('');

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header currentBook={currentBook} />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/book/:bookId"
                component={() => (
                  <Dashboard
                    setCurrentBook={setCurrentBook}
                    currentBook={currentBook}
                  />
                )}
              />
              <Route render={() => <h1>404! Wrong Page</h1>} />
            </Switch>
          </div>
        </div>
        {/* <Footer /> */}
      </Router>
    </ApolloProvider>
    
  );
}

export default App;