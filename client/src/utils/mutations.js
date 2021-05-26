// IMPORT GRAPHQL DEPENDENCIIES
import gql from 'graphql-tag';

// GRAPHQL MUTATION FOR LOGIN
export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`;
// GRAPHQL MUTATION FOR SIGNUP
export const ADD_USER = gql`
mutation signUp($firstName: String!, $email: String!, $password: String!, $zodiacSign: String) { 
  signUp(firstName: $firstName, email:$email, password: $password, zodiacSign: $zodiacSign) {
    token
    user {
      _id
    }
  }
}
`;