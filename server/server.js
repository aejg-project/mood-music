const express = require("express");
const cors = require('cors');
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const path = require("path");
const { User } = require("./models");
const router = express.Router();
const { authMiddleware } = require("./utils/auth");
const axios = require('axios');
const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use("/", router);

router.route("/getUsers").get(function (_, res) {
  User.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Function to get daily horoscope
router.route("/getHoroscope").get(async function ({ query }, res) {

  // Make call to get user and pull zodic sign, update axios request below and plug-in the sign
  const response = await axios.get('https://ohmanda.com/api/horoscope/' + query.zodiac);
  res.send(response.data.horoscope);
});

// Function to get daily song
router.route("/getSong").get(async function (_ , res) {

  // Make call to get user and pull song, update axios request below and plug-in the song
  const response = await axios.get('https://accounts.spotify.com/authorize');
  res.send(response.data);
});

app.get('*', (_ , res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// CONNECTION TO DATABASE
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port http://localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
