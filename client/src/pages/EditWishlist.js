import React, { useState } from 'react';
import GiftsList from '../components/GiftsList';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_ME, QUERY_ONE_WISHLIST } from '../utils/queries';

const EditWishlist = () => {
    const { id: wishlistID } = useParams();
    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const user = meData?.me || {};
    const { loading: wishlistLoading, error: wishlistError, data: wishlistData } = useQuery(QUERY_ONE_WISHLIST, { //NOT WORKING
        variables: { id: wishlistID }
    });

    if (wishlistLoading) {
        return <div>Loading...</div>;
    }

    var presentsArray = wishlistData?.userWishlist.presents;


    // console.log(user);

    return (
        <div>
            <h2>Editing {wishlistData?.userWishlist.title}'s Wishlist</h2>
            <div>
                <h3>Added Gifts</h3>
                <div>
                    {presentsArray.map(gift => (
                        <button className='button' id='giftBox' key={gift._id} title={gift.title}
                            description={gift.description} image={gift.image} >
                            {gift.title}
                            <br /> <br />
                            {gift.description}
                            {/* <img src={gift.image} alt={gift.image} /> */}
                        </button>
                    ))}
                </div>
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