import React, { useState } from 'react';
import GiftsList from '../components/GiftsList';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_ME, QUERY_ONE_WISHLIST } from '../utils/queries';

const AddWishlist = () => {
    const { id: wishlistID } = useParams();
    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const user = meData?.me || {};
    const { loading: wishlistLoading, error: wishlistError, data: wishlistData } = useQuery(QUERY_ONE_WISHLIST, { //NOT WORKING
        variables: { id: wishlistID }
    });
    var presentsArray = [];


    if (wishlistLoading) {
        return <div>Loading...</div>;
    } else {
        presentsArray = wishlistData?.userWishlist.presents;
    }

    console.log(wishlistID);
    console.log(presentsArray);


    // console.log(user);

    return (
        <div>
            <h2>Editing {wishlistData?.userWishlist.title}'s Wishlist</h2>
            <div>
                <h3>Added Gifts</h3>
                {presentsArray && presentsArray.map(gift => {
                    <button class='button' id='giftBox' name={gift._id} key={gift._id} >
                        <h3>{gift.title}</h3>
                        <p>{gift.description}</p>
                        {/* <p>Unpuchased Gifts: {wishlist.presents.length}</p> */}
                    </button>
                })}


            </div>
            <div>
                <h3>Select any gift you wish to add to your wishlist!</h3>
                <h4>You can add multiple of any item by simply clicking it again</h4>
                <GiftsList wishlistID={wishlistID} key={user._id} userID={user._id}></GiftsList>
            </div>
        </div>
    );
};

export default AddWishlist;