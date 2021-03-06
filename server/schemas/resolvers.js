const { User, Horoscope, Song } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({
          _id: context.user._id
        })
        .select('-__v -password')
        // .populate('dailyHoroscope')
        // .populate('dailySong');

        return userData;
      }

      throw new AuthenticationError('Please log in to allow us to curate!');
    },
  },
  Mutation: {
    signUp: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
  },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const validPassword = await user.isCorrectPassword(password);

      if (!validPassword) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);
      return { token, user };
    }
  }
};


module.exports = resolvers;
