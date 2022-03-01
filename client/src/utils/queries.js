import { gql } from '@apollo/client';

export const QUERY_GIFTS = gql`
  query {
    bgifts {
      _id
      description
      title
      image
    }
  }
`;

export const QUERY_USERINFO = gql`
    query userInfo($id: ID!) {
      userInfo(_id: $id) {
      username
      _id
      email
      mother
      userWishlists {
        _id
        title
        description
        gender
        created
        presents {
          _id
          title
          description
          image
        }
      }
    }
  }
`;

export const QUERY_USERS = gql`
  {
    users {
      _id
      username
      email
      userWishlists {
        _id
        title
        description
        presents {
          _id
          title
          description
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      username
      _id
      email
      mother
      userWishlists {
        _id
        title
        description
        gender
        created
        presents {
          _id
          title
          description
          image
        }

      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      mother
    }
  }
`;

export const QUERY_USERSWISHLISTS = gql`
  query userWishlist($id: ID!) {
      userWishlist(_id: $id) {
    _id
    description
    gender
    presentCount
    presents {
      _id
      title
      description
      image
    }
    created
  }
}
`;