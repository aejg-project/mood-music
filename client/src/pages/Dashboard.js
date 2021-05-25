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
import axios from "axios";
import { Credentials } from "../Credentials";

import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../utils/queries";

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
    "&:hover": {
      backgroundColor: "#471A66",
    }
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

export default function Album() {
  // SET HOROSCOPE
  const [horoscope, setHoroscope] = useState("");

  // SET ARTIST NAME (1-3)
  const [artistName1, setArtistName1] = useState("");
  // const [ artistName2, setArtistName2 ] = useState('');
  // const [ artistName3, setArtistName3 ] = useState('');

  // SET ARTIST IMAGE (1-3)
  // const [ artistImage1, setArtistImage1 ] = useState('');
  // const [ artistImage2, setArtistImage2 ] = useState('');
  // const [ artistImage3, setArtistImage3 ] = useState('');

  const spotify = Credentials();

  const [_, setToken] = useState("");

  const { data: userData } = useQuery(GET_USER);
  useEffect(() => {
    // console.log(userData);
    axios
      .get("http://localhost:3001/getHoroscope?zodiac=leo")
      .then((response) => {
        console.log(response.data);
        setHoroscope(response.data);
      });
  }, [horoscope]);

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(spotify.ClientId + ":" + spotify.ClientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
      const randomOffset = getRandomNumber(5, 20);

      axios(
        `https://api.spotify.com/v1/search?q=%20genre:%22indie%22&type=artist&offset=${randomOffset}&limit=3`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        }
      ).then((response) => {
        // API response from server
        console.log(response);
        console.log(response.data.artists.items[0].images[1].url);

        // SET ARTIST NAME
        setArtistName1(response.data.artists.items[0].name);

        // SET ARTIST IMAGE
        // setArtistImage1(response.data.artists.items[1].images.url);
      });
    });
  }, [spotify.ClientId, spotify.ClientSecret]);

  //------------------------------------------
  // RANDOM NUMBER FUCNTION USED FOR SONG OFFSET
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  //------------------------------------------
  // GET ATTRIBUTES BASED ON SIGN

  function getGenres(sign) {
    const genres = [];

    switch (sign) {
      case "Aries":
        // Upbeat, fiery, dancing (no slow songs)
        genres = ["dance", "hip-hop", "house", "reggaeton"];
        break;

      // Earth sign, raw, emotional music, organic, classic sound
      case "Taurus":
        genres = ["folk", "singer-songwriter", "guitar"];
        break;

      // Air sign, lyrical music, techno, electronic
      case "Gemini":
        genres = ["electronic", "trance", "hip-hop", "detroit-techno"];
        break;

      // Water, thought-provoking, creative, relatable music
      case "Cancer":
        genres = ["singer-songwriter", "alt-rock", "folk", "indie"];
        break;

      // Fiery, anthemic, ego-boosting, conquering, empowering
      case "Leo":
        genres = ["pop", "alternative", "deep-house", "reggaeton"];
        break;

      // Earth sign, sensual, ambient, soulful, jazzy, upbeat
      case "Virgo":
        genres = ["jazz", "ambient", "happy"];
        break;

      // Love songs, romantic, positive (no sad tunes)
      case "Libra":
        genres = ["country", "r-n-b", "power-pop"];
        break;

      // Water sign, intense, sensual, romance, dark, emotional
      case "Scorpio":
        genres = ["soul", "goth", "r-n-b", "trip-hop"];
        break;

      // Fiery, high-energy, dance, pop, active
      case "Sagittarius":
        genres = ["pop", "dance", "idm", "reggaeton", "honky-tonk"];
        break;

      // Sophisticated, intelligent, jazz, lyrical, soulful
      case "Capricorn":
        genres = ["jazz", "soul", "idm", "classical", "rock"];
        break;

      // Deep thinker, chilled-out, mellow, thought-provoking, electronic, experimental
      case "Aquarius":
        genres = ["chill", "songwriter", "minimal-techno", "indie-pop"];
        break;

      // Water sign, trippy, melancholy, nostalgic, emotive,
      case "Pisces":
        genres = ["psych-rock", "synth-pop", "emo"];
        break;
    }
  }
  // ----- END OF SWITCH CASE STATEMENT -----
  //------------------------------------------

  const cards = [1, 2, 3];

  const classes = useStyles();

  return (
    <React.Fragment>
      <button
        onClick={() => {
          console.log(userData);
        }}
      >
        CLICK
      </button>
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
              variant="body1"
              align="center"
              display="block"
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
                    image="https://i.scdn.co/image/05c77688da89cc4cc2388bf98dd374ef5cbd4797"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      <b>{artistName1}</b>
                    </Typography>
                    <Typography>Generes:</Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button
                      startIcon={<MusicNote />}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      Listen on Spotify
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
