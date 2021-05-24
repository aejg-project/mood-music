import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../utils/queries";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useSetHoroscope = () => {

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

  // SET HOROSCOPE
  const [horoscope, setHoroscope] = useState("");
  // GETS USER DATA
  const { data: userData } = useQuery(GET_USER);

  // GETS ZODIAC SIGN
  const [zodiacSign, setZodiacSign] = useState(userData);

  useEffect(() => {
    setZodiacSign(userData?.me?.zodiacSign);
    console.log(zodiacSign);

    if (zodiacSign) {
      console.log(userData?.me?.zodiacSign);
    }

    axios
      .get(`http://localhost:3001/getHoroscope?zodiac=` + zodiacSign)
      .then((response) => {
        console.log(response.data);
        setHoroscope(response.data);
      });
  }, [zodiacSign, horoscope]);

  const classes = useStyles();

  return (
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
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          {horoscope}
        </Typography>
      </Container>
    </div>
  );
};

export default useSetHoroscope;
