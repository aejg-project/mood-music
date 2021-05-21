const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const path = require('path');
const { User } = require('./models');
const router = express.Router();
const { authMiddleware } = require('./utils/auth')


const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.use("/", router);

router.route('/getUsers').get(function(req, res) {
  User.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.route('/me').get(function({ user = null, params }, res) {
  const returnedUser = User.findOne({
    //$or : [{ _id: user ? user._id : params.id }, { email: params.email }]
     _id: user ? user._id : params.id 
  });

  if (!returnedUser) {
    return res.status(400).json({ message: 'This is not the droid you are looking for' });
  }

  res.json(returnedUser);
});

router.route('/signUp').post(function (req, res) {
  const user = User.create(req);

  if (!user) {
    return res.status(400).json({ message: 'Something went wrong'});
  }
});

router.route('/login').post(function({ body }, res) {
    const user = User.findOne({  email: body.email  });
    if (!user) {
      return res.status(400).json({ message: "This is not the droid you are looking for" });
    }

    const validPassword = user.isCorrectPassword(body.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  
});



db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port http://localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
