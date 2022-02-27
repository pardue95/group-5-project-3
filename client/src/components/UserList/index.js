import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';

const UserList = () => {

    const { loading, error, data } = useQuery(QUERY_USERS, {
        data: {}
    });
    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error {error}</div>;

    const users = data.users;
    console.log(users);

    const handleClick = async (event) => {

    };


    return (
        <div>
            {users.map(user => (
                <Link to={`/profile/${user.username}`} params={user.username}>
                    <button class='button' id='userBox' name={user._id} key={user._id} onClick={handleClick}>
                        <h3>{user.username}</h3>
                        <p>{user.userWishlists.length} Unpuchased Gifts</p>
                    </button>
                </Link>

            ))
            }
        </div >
    );
};

export default UserList;