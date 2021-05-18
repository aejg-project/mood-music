const { Schema, model } = require('mongoose');

const songSchema = new Schema(
  {
    song: {
      type: String,
    },
    title: {
      type: String
    },
    artist: {
      type: String
    },
    albumArt: {
      type: String
    },
    linkToSong: {
      type: String
    }
  }
)

const Song = model('Song', songSchema);

// Exports the user model
module.exports = Song;