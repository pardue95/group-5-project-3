import React from 'react';
import UserList from '../components/UserList';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC, QUERY_USERS, QUERY_USERSWISHLISTS } from '../utils/queries';
import { Container } from '@chakra-ui/react'

const Home = () => {
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const { data: usersData, isLoading } = useQuery(QUERY_USERS);
  const { data: userDatas } = useQuery(QUERY_USERSWISHLISTS);




  const loggedIn = Auth.loggedIn();

  if (isLoading) return <div>Loading ...</div>

  const handleClick = async (event) => {
    console.log("Handle Click");
    console.log(event.target);

  };

  return (
    <Container maxW='container.xl' py={10}>
      <h1>Welcome</h1>
      {loggedIn ? (
        <div>
          <h2>Select a User to View Their Wishlist</h2>
          <UserList />
          {/* <UserList users={users} /> */}
        </div>
      ) : null}
    </Container>
  );
};

export default Home;
