import React from 'react';
import UserList from '../components/UserList/index';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC, QUERY_USERS } from '../utils/queries';
import {
  Container,
  Text,
  // Heading,
  Stack
} from '@chakra-ui/react'

const Home = () => {
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const { data: usersData, isLoading } = useQuery(QUERY_USERS);
  // const { data: userDatas } = useQuery(QUERY_USERSWISHLISTS);

  const loggedIn = Auth.loggedIn();

  if (isLoading) return <div>Loading ...</div>

  const handleClick = async (event) => {

  };

  return (
    <Container maxW='container.xl'>
      <Stack 
        pt={3}
        align={'center'}>
        {loggedIn ? (
          <>
            <Text
              fontWeight={800}
              fontSize={'xl'}>Select a User to View Their Profile</Text>
            <UserList />
            {/* <UserList users={users} /> */}
          </>
        ) : null}
      </Stack>
    </Container>
  );
};

export default Home;
