// import React, { useEffect } from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import { useParams } from 'react-router-dom';

// import Book from '../components/Book';

// import { QUERY_BOOKS } from '../utils/queries';

// const Dashboard = ({ setCurrentBook, currentBook }) => {
//   const { bookId } = useParams();

//   const { data: bookData } = useQuery(QUERY_BOOKS);

//   const books = bookData?.books || [];

//   useEffect(() => {
//     setCurrentBook(books.find(({ _id }) => _id === bookId));

//     return () => {
//       setCurrentBook('');
//     };
//   });

//   return (
//     <main>
//       <div className="m-5">
//         {currentBook ? <Book {...currentBook} /> : <h2>Loading...</h2>}
//       </div>
//     </main>
//   );
// };

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MusicNote from '@material-ui/icons/MusicNote';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
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
    borderRadius: 10
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
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
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
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Horoscope Section */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Today's horoscope: 
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Eventually we can import the horoscope from the api here.
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
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                  <CardActions style={{justifyContent: 'center'}}>
                    <Button startIcon={<MusicNote />} variant="outlined" size="small" color="primary">
                      Listen on YouTube
                    </Button>                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}