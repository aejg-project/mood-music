import gql from "graphql-tag";

export const GET_USER = gql`
  {
    me {
      _id
      email
      zodiacSign
      dailyHoroscope {
        sign
        date
        body
      }
    }
  }
`;


// go back to try and add artist/song schema

/* 
songSchema {
        song
        title
        artist
        albumArt
        linkToSong
      }
*/