// IMPORT GRAPHQL DEPENDENCIIES
import gql from "graphql-tag";

// GRAPHQL QUERY (GET) FOR GETTING A SINGLE USER
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