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

export const SAVE_GIFT = gql`
  mutation saveGift($wishlistId: ID!, $title: String!, $description: String!, $image: String!) {
    saveGift(wishlistId: $wishlistId, title: $title, description: $description, image: $image) {
    _id
    title
    description
      presents {
        _id
        title
        description
        image
      }
    }
  }
`;

export const REMOVE_GIFT = gql`
  mutation removeGift($GiftId: ID!) {
    removeGift(GiftId: $GiftId) {
      _id
    }
  }
`;

export const SAVE_WISHLIST = gql`
  mutation addWishlist($userId: ID!, $title: String!, $description: String! $gender: String!) {
    addWishlist(userId: $userId, title: $title, description: $description, gender: $gender) {
      _id
    }
  }
`;

export const REMOVE_WISHLIST = gql`
  mutation removeWishlist($wishlistId: ID!) {
    removeWishlist(wishlistId: $wishlistId) {
      _id
    }
  }
`;
