import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { Container, Navbar, Nav } from "react-bootstrap";
import './index.css'

import Header from './components/Header';
import Login from './pages/Login';
import Detail from './pages/Detail';
import Signup from './pages/Signup';

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
                  <Detail
                    setCurrentBook={setCurrentBook}
                    currentBook={currentBook}
                  />
                )}
              />
              <Route render={() => <h1>404! Wrong Page</h1>} />
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
