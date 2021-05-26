import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import StarOutline from "@material-ui/icons/StarOutline";
import Select from "@material-ui/core/Select";
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/react-hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  image: {
    backgroundImage: "url('./laptop.jpg')",
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


export default function SignInSide() {
  const classes = useStyles();

  const [inputState, setInputState] = useState({
    firstName: "",
    email: "",
    password: "",
    zodiacSign: "",
  });
  const [signUp, { error }] = useMutation(ADD_USER);
  // update the state if the input changes
  const inputChange = (event) => {
    const { name, value } = event.target;

    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  // submit the input
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(inputState);

    try {
      const { data } = await signUp({
        variables: { ...inputState },
      });
      Auth.login(data.signUp.token);
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
            Sign up
          </Typography>
          {/* noValidate was below after the className, not sure if necessary*/}
          <form className={classes.form} onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  value={inputState.firstName}
                  onChange={inputChange}
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  value={inputState.email}
                  onChange={inputChange}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <Select
                  id="zodiacSign"
                  label="Astrological Sign"
                  name="zodiacSign"
                  value={inputState.optionState}
                  onChange={inputChange}
                  variant="outlined"
                  fullWidth
                  required
                  input={<BootstrapInput />}

                >
                  <option value="aquarius">Aquarius (Jan. 20 - Febr. 18)</option>
                  <option value="pisces">Pisces (Feb. 19-Mar. 20)</option>
                  <option value="aries">Aries (Mar. 21 - Apr. 19)</option>
                  <option value="taurus">Taurus (Apr. 20 - May 20)</option>
                  <option value="gemini">Gemini (May 21 - Jun. 20)</option>
                  <option value="cancer">Cancer (Jun. 21 - Jul. 22)</option>
                  <option value="leo">Leo (Jul. 23 - Aug. 22)</option>
                  <option value="virgo">Virgo (Aug. 23 - Sep. 22)</option>
                  <option value="libra">Libra (Sep. 23 - Oct. 22)</option>
                  <option value="scorpio">Scorpio (Oct. 23 - Nov. 21)</option>
                  <option value="sagittarius">Sagittarius (Nov. 22 - Dec. 21)</option>
                  <option value="capricorn">Capricorn (Dec. 22 - Jan. 19)</option>
                </Select>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="./login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
          {error && <div>Sign up failed</div>}
        </div>
      </Grid>
    </Grid>
  );
}
