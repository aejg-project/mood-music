const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    users: [User]
  }

  type User {
    _id: ID!
    firstName: String!
    email: String!
    zodiacSign: String
    dailyHoroscope: [Horoscope]
    dailySong: [Song]
  }

  type Song {
    title: String!
    artist: String!
    albumArt: String!
    linkToSong: String!
  }

  type Horoscope {
    sign: String!
    date: Int!
    body: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signUp(firstName: String!, email: String! password: String!, zodiacSign: String): Auth
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
