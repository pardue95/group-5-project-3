const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    userWishlists: [Wishlist]
    mother: Boolean
  }

  type Gift {
    _id: ID
    description: String
    image: String
    title: String
  }

  type Wishlist {
    _id: ID
    title: String
    description: String
    gender: String
    presentCount: Int
    presents: [Gift]
    created: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input GiftInput {
    description: String
    image: String
    title: String
  }

  type Query {
    me: User
    userInfo(_id: ID!): User
    users: [User]
    userWishlists: [Wishlist]
    userWishlist(_id: ID!): Wishlist
    bgift(_id: ID!): Gift
    bgifts: [Gift]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addWishlist(userId: ID!, title: String!, description: String!, gender: String!): User
    removeWishlist( wishlistId: ID!): User
    saveGift(wishlistId: ID!, title: String!, description: String!, image: String!): Wishlist
    removeGift( GiftId: ID!): Wishlist
  }
`;

module.exports = typeDefs;
