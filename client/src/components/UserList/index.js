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
        console.log("Handle Click");
        console.log(event.target.name);
    };


    return (
        <div>
            {users.map(user => (
                <button class='button' id='userBox' name={user._id} key={user._id} onClick={handleClick}>
                    {user.username}
                </button>
            ))
            }
        </div >
    );
};

export default UserList;