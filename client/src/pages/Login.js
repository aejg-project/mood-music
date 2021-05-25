import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import StarOutline from "@material-ui/icons/StarOutline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  image: {
    backgroundImage: "url('./woman.png')",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  const [inputState, setInputState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  // Update the state if the input changes
  const inputChange = (event) => {
    const { name, value } = event.target;

    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  // submit login form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...inputState },
      });

      Auth.login(data.login.token);
      document.location.replace('/dashboard/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <StarOutline />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {/* noValidate was below after the className, not sure if necessary*/}
          <form className={classes.form} onSubmit={handleFormSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              value={inputState.email}
              onChange={inputChange}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={inputState.password}
              onChange={inputChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="./signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
          {error && <div>Login failed</div>}
        </div>
      </Grid>
    </Grid>
  );
}
