import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_ME_BASIC } from '../../utils/queries';


const Wishlist = ({ user, selectedId }) => {

    console.log(user);
    console.log(selectedId);

    if (user._id === selectedId && !user.userWishlists.length) {
        return (
            <div>
                <h3>{user.username} has no Wishlists</h3>
            </div>
        );
    } else {
        userWishlists = user.userWishlists;
    }

    if (user._id === selectedId && user.userWishlists.length) {
        return (
            <div>
                <h3>{user.username} has {user.userWishlists.length - 1} Wishlist(s)</h3>
            </div>
        )
    }

    if (!selectedId) {
        return (
            <div>
                <h3>You have {user.userWishlists.length} Wishlist(s)</h3>
                <Link to="/addWishlist">
                    <button>Create new Wishlist</button>
                </Link>
            </div>
        );
    }
};

export default Wishlist;