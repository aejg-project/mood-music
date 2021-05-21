import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StarOutline from '@material-ui/icons/StarOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  image: {
    backgroundImage: "url('./laptop.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

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
          <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
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
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <select id="sign" label="Astrological Sign" name="sign">              
                  <option value = "Aquarius">Aquarius (Jan. 20 - Febr. 18)</option>
                  <option value = "Pisces">Pisces (Feb. 19-Mar. 20)</option>
                  <option value = "Aries">Aries (Mar. 21 - Apr. 19)</option>
                  <option value = "Taurus">Taurus (Apr. 20 - May 20)</option>
                  <option value = "Gemini">Gemini (May 21 - Jun. 20)</option>
                  <option value = "Cancer">Cancer (Jun. 21 - Jul. 22)</option>
                  <option value = "Leo">Leo (Jul. 23 - Aug. 22)</option>
                  <option value = "Virgo">Virgo (Aug. 23 - Sep. 22)</option>
                  <option value = "Libra">Libra (Sep. 23 - Oct. 22)</option>
                  <option value = "Sorpio">Sorpio (Oct. 23 - Nov. 21)</option>
                  <option value = "Sagittarius">Sagittarius (Nov. 22 - Dec. 21)</option>
                  <option value = "Capricorn">Capricorn (Dec. 22 - Jan. 19)</option>
              </select>
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
        </div>
      </Grid>
    </Grid>
  );
}