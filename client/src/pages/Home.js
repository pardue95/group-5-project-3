import React from 'react';
import UserList from '../components/UserList';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME_BASIC, QUERY_USERS, QUERY_USERSWISHLISTS } from '../utils/queries';

const Home = () => {
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const { data: usersData, isLoading } = useQuery(QUERY_USERS);




  const loggedIn = Auth.loggedIn();

  if (isLoading) return <div>Loading ...</div>

  const handleClick = async (event) => {
    console.log("Handle Click");
    console.log(event.target);

  };

  return (
    <main>
      <h1>Welcome</h1>
      {loggedIn ? (
        <div>
          <h2>Select a User to View Thier Wishlist</h2>
          <UserList />
          {/* <UserList users={users} /> */}
        </div>
      ) : null}
    </main>
  );
};

export default Home;
