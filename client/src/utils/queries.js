import { gql } from '@apollo/client';


export const QUERY_USER = gql`
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
      gender
    }
  }
`;
