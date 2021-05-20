const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    users: [User]
    me: User
    songs: [Song]
    song: Song
  }

  type User {
    _id: ID!
    email: String!
    zodiacSign: String!
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
    signUp(email: String! password: String!, zodiacSign: String!, preferredGenre: String): Auth

  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
