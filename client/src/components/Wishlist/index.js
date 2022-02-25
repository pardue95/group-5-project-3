import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = ({ user }) => {
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
            <h3>This will show Users Wishlist</h3>
            <h2>And give them the option to Add another or edit a current one</h2>
        </div>
    );
};

export default Wishlist;