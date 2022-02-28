import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = ({ user }) => {

    console.log("wishlist index" + user.userWishlists);
    if (!user.userWishlists.length) {
        return (
            <div>
                <h3>No Saved Gifts Yet</h3>
                <Link to="/addWishlist">
                    <button>Create A Wishlist</button>
                </Link>
            </div>

        );
    }

    return (
        <div>
            <Link to="/addWishlist">
                <button>Create A Wishlist</button>
            </Link>
        </div>
    );
};

export default Wishlist;