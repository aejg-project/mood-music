import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MusicNote from "@material-ui/icons/MusicNote";
import axios from 'axios';
import { Credentials } from '../Credentials';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: "#F1926E",
    padding: theme.spacing(8, 0, 6),
    borderRadius: 10,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3];

export default function Album() {
  
  const [ horoscope, setHoroscope ] = useState('');
  const [song, setSong ] = useState('');

  const spotify = Credentials();

  const [token, setToken] = useState('');  
  const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});


  useEffect(() => {
    axios.get('http://localhost:3001/getHoroscope?zodiac=leo')
    .then(response => {
      console.log(response.data);
      setHoroscope(response.data);
    })
  }, [horoscope]);

  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {      
      setToken(tokenResponse.data.access_token);

      axios('https://api.spotify.com/v1/search?q=%20genre:%22indie%22&type=artist&offset=0&limit=3', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then (response => {        
        // setGenres({
        //   selectedGenre: genres.selectedGenre,
        //   listOfGenresFromAPI: genreResponse.data.categories.items
        console.log(response)
        })
      // .catch(err => {
      //   console.log(err);
      // })
      });
      


  }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]); 

  // const genreChanged = val => {
  //   setGenres({
  //     selectedGenre: mood, 
  //     listOfGenresFromAPI: genres.listOfGenresFromAPI
  //   });

  //   axios(`https://api.spotify.com/v1/browse/categories/mood/playlists?limit=10`, {
  //     method: 'GET',
  //     headers: { 'Authorization' : 'Bearer ' + token}
  //   })
  //   .then(playlistResponse => {
  //     setPlaylist({
  //       selectedPlaylist: playlist.selectedPlaylist,
  //       listOfPlaylistFromAPI: playlistResponse.data.playlists.items
  //     })
  //   });

  //   console.log(val);
  // }

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Horoscope Section */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Today's horoscope:
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              {horoscope}
            </Typography>
          </Container>
        </div>
        {/* Horoscope ends here */}

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/user/bekkybekks"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Song Name
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content.
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button
                      startIcon={<MusicNote />}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      Listen on YouTube
                    </Button>{" "}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
