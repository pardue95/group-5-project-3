import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import Wishlist from '../components/Wishlist';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USERINFO, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
    const { id: selectedUserID } = useParams();
    console.log("User Params: " + selectedUserID);

    const { loading, data } = useQuery(selectedUserID ? QUERY_USERINFO : QUERY_ME, {
        variables: { id: selectedUserID }
    });

    console.log(data);
    console.log(data?.me);
    console.log(data?.userInfo);
    const user = data?.me || data?.userInfo || {};

    // redirect to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === selectedUserID) {
        return <Redirect to="/profile" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }


    return (
        <div>
            <div className="flex-row mb-3">
                <h2 className="bg-dark text-secondary p-3 display-inline-block">
                    Viewing {selectedUserID ? `${user.username}'s` : 'your'} profile.
                </h2>

                {/* {user && (
                    <button className="btn ml-auto" onClick={handleClick}>
                        Add Gift
                    </button>
                )} */}
            </div>


            <div className="flex-row justify-space-between mb-3">
                <div className="col-12 mb-3 col-lg-8">
                    <Wishlist
                        user={user}
                    />
                </div>

            </div>
        </div>
    );
};

export default Profile;
