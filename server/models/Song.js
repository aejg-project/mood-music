const { Schema } = require('mongoose');

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



module.exports = songSchema;