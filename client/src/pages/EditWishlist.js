import React, { useState } from 'react';
import GiftsList from '../components/GiftsList';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_ME, QUERY_USERSWISHLISTS } from '../utils/queries';

const AddWishlist = () => {
    const { id: wishlistID } = useParams();
    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me || {};

    // const { wishlistLoading, thisWishlist } = useQuery(QUERY_USERSWISHLISTS, { //NOT WORKING
    //     variable: { id: wishlistID }
    // });


    console.log(user);

    return (
        <div>
            Edit wishlist
            <div>
                <h3>Added Gifts</h3>
                <h4>This should show the gifts in the wishlist</h4>
            </div>
            <div>
                <h3>Select any gift you wish to add to your wishlist!</h3>
                <h4>You can add multiple of any item by simply clicking it again</h4>
                <GiftsList wishlistID={wishlistID} userID={user._id}></GiftsList>
            </div>

        </div>
    );
};

export default AddWishlist;