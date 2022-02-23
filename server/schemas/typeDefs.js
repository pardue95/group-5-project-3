const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    wishlists: [Wishlist]
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
    giftCount: Int
    gifts: [Gift]
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
    users: [User]
    wishlists: [Wishlist]
    wishlist(_id: ID!): Wishlist
    gifts: [Gift]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGift(GiftData: GiftInput!): User
    removeGift(GiftId: ID!): User
  }
`;

module.exports = typeDefs;
