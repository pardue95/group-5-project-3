import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import GiftsList from '../components/GiftsList';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME, QUERY_GIFTS } from '../utils/queries';
import { SAVE_GIFT } from '../utils/mutations';
import Auth from '../utils/auth';

const AddWishlist = (props) => {
    const { userParam } = useParams();

    const [saveGift] = useMutation(SAVE_GIFT);
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });
    const giftsList = useQuery(QUERY_GIFTS);
    console.log(giftsList);

    const user = data?.me || data?.user || {};

    // redirect to personal profile page if username is yours
    // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    //     return <Redirect to="/profile" />;
    // }

    if (loading) {
        return <div>Loading...</div>;
    }

    // checks you are logged in and a mother
    if (!user?.username || user.mother) {
        return (
            <h4>
                You need to be logged and be a Mother in order to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    const handleClick = async () => {
        try {
            await saveGift({
                variables: { id: user._id },
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <h2>Create a New Wishlist</h2>
            <div>
                <GiftsList giftList={giftsList}></GiftsList>
            </div>
        </div>
    );
};

export default AddWishlist;
