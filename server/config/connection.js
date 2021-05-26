const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/mood-music',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

const connection = mongoose.connection;

connection.once("open", function() {
  // CONNECTION SUCCESSFUL MESSAGE
  console.log("Connection with MongoDB was successful");
});

// EXPORTS THE CONNECTION TO MONGODB
module.exports = mongoose.connection;
