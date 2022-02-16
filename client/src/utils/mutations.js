import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_Gift = gql`
  mutation saveGift($GiftData: GiftInput!) {
    saveGift(GiftData: $GiftData) {
      _id
      username
      email
      savedGifts {
        GiftId
        image
        description
        title
        link
      }
    }
  }
`;

export const REMOVE_Gift = gql`
  mutation removeGift($GiftId: ID!) {
    removeGift(GiftId: $GiftId) {
      _id
      username
      email
      savedGifts {
        GiftId
        image
        description
        title
        link
      }
    }
  }
`;
