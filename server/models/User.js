const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const horoscopeSchema = require('./Horoscope');
const songSchema = require('./Song');

// SCHEMA OPTIONS
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: true
    },
    zodiacSign: {
      type: String,
      required: true
    },
    preferredGenre: {
      type: String,
      required: true
    },
    dailyHoroscope: [horoscopeSchema],
    dailySong: [songSchema]
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const salRounds = 10;
    this.password = await bcrypt.hash(this.password, salRounds);
  }
  next();
})

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

// Exports the user model
module.exports = User