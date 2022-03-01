import React from 'react';
import { Link } from 'react-router-dom';
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const Wishlist = ({ user }) => {
    const { id: useParam } = useParams();

    console.log(user);

    var userWishlists = [];

    if (!user.userWishlists.length) {
        return (
            <div>
                <h3>No Saved Gifts Yet</h3>
            </div>
        );
    } else {
        userWishlists = user.userWishlists;
    }


    return (
        <div>
            {!useParam && (
                <Link to="/addWishlist">
                    <button>Create A New Wishlist</button>
                </Link>
            )}

            <div>
                {userWishlists.map(wishlist => (
                    <Link to={`/editWishlist/${wishlist._id}`} user={user}>
                        <button class='button' id='userBox' name={wishlist._id} key={wishlist._id}>
                            <h3>{wishlist.title}</h3>
                            <p>Gender: {wishlist.gender}</p>
                            <p>Description: {wishlist.description} </p>
                            {/* <p>Unpuchased Gifts: {wishlist.presents.length}</p> */}
                        </button>
                    </Link>
                ))}
            </div>
        </div>


    );
};

export default Wishlist;