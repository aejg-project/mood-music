import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import "./index.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Prompt",
    fontWeightRegular: 400,
    fontWeightBold: 700,
  },
  typography: {
    fontFamily: "Raleway",
    fontWeightRegular: 400,
  },
});

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  const [currentSong, setCurrentSong] = useState("");
  const [currentHoroscope, setCurrentHoroscope] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-center align-center min-100-vh">
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/dashboard" component={Dashboard} />

                <Route
                  exact
                  path="/dashboard/:userId"
                  component={() => (
                    <Dashboard
                      setCurrentSong={setCurrentSong}
                      currentSong={currentSong}
                      setCurrentHoroscope={setCurrentHoroscope}
                      currentHoroscope={currentHoroscope}
                    />
                  )}
                />
                <Route render={() => <h1>404! Wrong Page</h1>} />
              </Switch>
            </div>
          </div>
          <Footer />
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
