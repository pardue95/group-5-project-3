const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    GiftCount: Int
    savedGifts: [Gift]
  }

  type Gift {
    GiftId: ID!
    description: String
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  input GiftInput {
    description: String!
    GiftId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveGift(GiftData: GiftInput!): User
    removeGift(GiftId: ID!): User
  }
`;

module.exports = typeDefs;
