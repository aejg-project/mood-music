const { Schema } = require('mongoose');

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

module.exports = horoscopeSchema;