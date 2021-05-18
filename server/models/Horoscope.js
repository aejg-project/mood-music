const { Schema, model } = require('mongoose');

const horoscopeSchema = new Schema(
  {
    sign: {
      type: String
    },
    date: {
      type: Date
    },
    body: {
      type: String
    }
  }
)

const Horoscope = model('Horoscope', horoscopeSchema);

module.exports = Horoscope;