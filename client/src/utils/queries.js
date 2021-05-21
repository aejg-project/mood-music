import gql from 'graphql-tag';

export const GET_USER = gql`
  {
    me {
      _id
      email
      zodiacSign
      preferredGenre
      dailyHoroscope {
        sign
        date
        body
      }
      songSchema {
        song
        title
        artist
        albumArt
        linkToSong
      }
    }
  }
`;
