import React, { useState } from 'react';
import GiftsList from '../components/GiftsList';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_ME, QUERY_USERSWISHLISTS } from '../utils/queries';
import { SAVE_WISHLIST } from '../utils/mutations';

const EditWishlist = () => {
    const { _id: wishlistID } = useParams();
    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const user = meData?.me || {};
    const { loading: wishlistLoading, error: wishlistError, data: wishlistData } = useQuery(QUERY_USERSWISHLISTS, { //NOT WORKING
        variables: { _id: wishlistID }
    });
    var presentsArray = [];

    const [saveWishList] = useMutation(SAVE_WISHLIST);

    const saveToWishList = async (gift) => {
        console.log(gift)
        const {data} = await saveWishList({
            variables: {...gift}
        })
    }
    if (wishlistLoading) {
        return <div>Loading...</div>;
    } else {
        presentsArray = wishlistData?.userWishlist.presents;
    }


    return (
        <div>
            <h2>Editing {wishlistData?.userWishlist.title}'s Wishlist</h2>
            <div>
                <h3>Added Gifts</h3>
                {presentsArray && presentsArray.map(gift => {
                    <button onClick={() => saveToWishList(gift)} class='button' id='giftBox' name={gift._id} key={gift._id} >
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

export default EditWishlist;