import React, { useEffect, useState } from "react";
// import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
// import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
// import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import Link from "@material-ui/core/Link";
import MusicNote from "@material-ui/icons/MusicNote";
import axios from "axios";
import { Credentials } from "../Credentials";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../utils/queries";
// import { blue } from "@material-ui/core/colors";


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
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "space-between",
    margin: "1rem",
  },
  cardRow: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  artistName: {
    // background: "#f57848",
    color: "#471867",
    textAlign: 'center',
    fontWeight: "bold",
  },
  button: {
    color: "#f57848",
    backgroundColor: "#471867"
  }
}));

export default function Album() {
  // SET HOROSCOPE
  const [horoscope, setHoroscope] = useState('');

  // SET ARTIST NAME (1-3)
  const [artistName1, setArtistName1] = useState('');
  const [artistName2, setArtistName2] = useState('');
  const [artistName3, setArtistName3] = useState('');

  // SET ARTIST IMAGE (1-3)
  const [artistImage1, setArtistImage1] = useState('');
  const [artistImage2, setArtistImage2] = useState('');
  const [artistImage3, setArtistImage3] = useState('');

  // SET ARTIST GENRE (1-3)
  const [artistGenre1, setArtistGenre1] = useState('');
  const [artistGenre2, setArtistGenre2] = useState('');
  const [artistGenre3, setArtistGenre3] = useState('');

  // SET ARTUST LINK TO SPOTIFY (1-3)
  const [ spotifyLink1, setSpotifyLink1 ] = useState('');
  const [ spotifyLink2, setSpotifyLink2 ] = useState('');
  const [ spotifyLink3, setSpotifyLink3 ] = useState('');

  const spotify = Credentials();

  const [_, setToken] = useState("");

  // // GETS USER DATA
  const { data: userData, loading } = useQuery(GET_USER);

  // // GETS ZODIAC SIGN
  const [zodiacSign, setZodiacSign] = useState(userData);

  useEffect(() => {
    if(!loading){
      setZodiacSign(userData?.me?.zodiacSign);
    }
  }, [ userData, loading ])

  useEffect(() => {
    console.log(zodiacSign);

    if (!zodiacSign) {
      return;
    } else{
      axios
      .get("/getHoroscope?zodiac=" + zodiacSign)
      .then((response) => {
        console.log(response.data);
        setHoroscope(response.data);
      });
    }
  }, [zodiacSign, horoscope]);

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
      const randomOffset = getRandomNumber(20, 100);

      axios(
        `https://api.spotify.com/v1/search?q=%20genre:%22country%22&type=artist&offset=${randomOffset}&limit=3`,
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
        setArtistName2(response.data.artists.items[1].name);
        setArtistName3(response.data.artists.items[2].name);

        // SET ARTIST IMAGE
        setArtistImage1(response.data.artists.items[0].images[1].url);
        setArtistImage2(response.data.artists.items[1].images[1].url);
        setArtistImage3(response.data.artists.items[2].images[1].url);

        // SET ARTIST GENRE
        const genre1 = JSON.stringify(response.data.artists.items[0].genres);
        setArtistGenre1(genre1.replace("[", '').replace("]", ''));
        const genre2 = JSON.stringify(response.data.artists.items[1].genres);
        setArtistGenre2(genre2.replace("[", '').replace("]", ''));
        const genre3 = JSON.stringify(response.data.artists.items[2].genres);
        setArtistGenre3(genre3.replace("[", '').replace("]", ''));

        // SET ARTIST LINK TO SPOTIFY
        setSpotifyLink1(response.data.artists.items[0].external_urls.spotify)
        setSpotifyLink2(response.data.artists.items[1].external_urls.spotify)
        setSpotifyLink3(response.data.artists.items[2].external_urls.spotify)

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

  // function getGenres(sign) {
  //   const genres = [];

  //   switch (sign) {
  //     case "Aries":
  //       // Upbeat, fiery, dancing (no slow songs)
  //       genres = ["dance", "hip-hop", "house", "reggaeton"];
  //       console.log(" selected");
  //       break;

  //     // Earth sign, raw, emotional music, organic, classic sound
  //     case "Taurus":
  //       genres = ["folk", "singer-songwriter", "guitar"];
  //       console.log("Taurus selected");
  //       break;

  //     // Air sign, lyrical music, techno, electronic
  //     case "Gemini":
  //       genres = ["electronic", "trance", "hip-hop", "detroit-techno"];
  //       console.log("Gemini selected");
  //       break;

  //     // Water, thought-provoking, creative, relatable music
  //     case "Cancer":
  //       genres = ["singer-songwriter", "alt-rock", "folk", "indie"];
  //       console.log("Cancer selected");
  //       break;

  //     // Fiery, anthemic, ego-boosting, conquering, empowering
  //     case "Leo":
  //       genres = ["pop", "alternative", "deep-house", "reggaeton"];
  //       console.log("Leo selected");
  //       break;

  //     // Earth sign, sensual, ambient, soulful, jazzy, upbeat
  //     case "Virgo":
  //       genres = ["jazz", "ambient", "happy"];
  //       console.log("Virgo selected");
  //       break;

  //     // Love songs, romantic, positive (no sad tunes)
  //     case "Libra":
  //       genres = ["country", "r-n-b", "power-pop"];
  //       console.log("Libra selected");
  //       break;

  //     // Water sign, intense, sensual, romance, dark, emotional
  //     case "Scorpio":
  //       genres = ["soul", "goth", "r-n-b", "trip-hop"];
  //       console.log("Scorpio selected");
  //       break;

  //     // Fiery, high-energy, dance, pop, active
  //     case "Sagittarius":
  //       genres = ["pop", "dance", "idm", "reggaeton", "honky-tonk"];
  //       console.log("Sagittarius selected");
  //       break;

  //     // Sophisticated, intelligent, jazz, lyrical, soulful
  //     case "Capricorn":
  //       genres = ["jazz", "soul", "idm", "classical", "rock"];
  //       console.log("Capricorn selected");
  //       break;

  //     // Deep thinker, chilled-out, mellow, thought-provoking, electronic, experimental
  //     case "Aquarius":
  //       genres = ["chill", "songwriter", "minimal-techno", "indie-pop"];
  //       console.log("Aquarius selected");
  //       break;

  //     // Water sign, trippy, melancholy, nostalgic, emotive,
  //     case "Pisces":
  //       genres = ["psych-rock", "synth-pop", "emo"];
  //       console.log("Pisces selected");
  //       break;
  //   }
  // }

  // ----- END OF SWITCH CASE STATEMENT -----
  //------------------------------------------

  const classes = useStyles();

  return (
    <React.Fragment>

      {/* <button
        onClick={() => {
          console.log(userData);
        }}
      >
        CLICK
      </button> */}

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
              align="justify"
              display="block"
              color="textSecondary"
              paragraph
            >
              {loading?"loading...":horoscope}
            </Typography>
          </Container>
        </div>
        {/* Horoscope ends here */}

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container>
            <Grid >
              <div className={classes.cardRow}>
                {/* Card #1 */}
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={artistImage1}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.artistName}>
                      <b>{artistName1}</b>
                    </Typography>
                    <Typography>
                      <b>Genre(s): </b>{artistGenre1}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button className={classes.button}
                      startIcon={<MusicNote />}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      <a href={spotifyLink1}>Listen on Spotify</a>
                    </Button>{" "}
                  </CardActions>
                </Card>

                {/* Card #2 */}
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={artistImage2}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.artistName}>
                      <b>{artistName2}</b>
                    </Typography>
                    <Typography>
                      <b>Genre(s): </b>{artistGenre2}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button className={classes.button}
                      startIcon={<MusicNote />}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      <a href={spotifyLink2}>Listen on Spotify</a>
                    </Button>{" "}
                  </CardActions>
                </Card>

                {/* Card #3 */}
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={artistImage3}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.artistName}>
                      <b>{artistName3}</b>
                    </Typography>
                    <Typography>
                      <b>Genre(s): </b>{artistGenre3}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button className={classes.button}
                      startIcon={<MusicNote />}
                      variant="outlined"
                      size="small"
                      color="primary"
                    >
                      <a href={spotifyLink3}>Listen on Spotify</a>
                    </Button>{" "}
                  </CardActions>
                </Card>
              </div>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
