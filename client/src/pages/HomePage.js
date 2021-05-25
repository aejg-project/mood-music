import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: "#B350A5",
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
    height: '33%',
    display: 'flex',
    flexDirection: 'column',
    margin: "1rem",
  },
  cardRow: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
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

// const cards = [1, 2, 3];

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
              Welcome!
            </Typography>
            <Typography variant="h5" display="block" align="center" color="textSecondary" paragraph>
              This is your home on the web for music curated for your personality. Come for your daily horoscope and stay for music customized for your mood. 
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
                    image="https://source.unsplash.com/user/timmossholder"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      About Us
                    </Typography>
                    <Typography>
                      We are here to help you find great music!
                    </Typography>
                  </CardContent>
                </Card>

                {/* Card #2 */}
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/user/bekkybekks"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Contact
                    </Typography>
                    <Typography>
                      Connect with us on social media or Github.
                    </Typography>
                  </CardContent>
                </Card>

                {/* Card #3 */}
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/user/solenfeyissa"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      How it works
                    </Typography>
                    <Typography>
                      First time? Signup. Back for more? Log In.
                    </Typography>
                  </CardContent>
                </Card>
                </div>
              </Grid>
             
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}