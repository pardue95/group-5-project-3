import React from 'react';
import { Link } from 'react-router-dom';
import { QUERY_USERINFO } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const Wishlist = ({ user, selectedId }) => {

    var userWishlists = [];

    if (user._id === selectedId && !user.userWishlists.length) {
        return (
            <div>
                <h3>{user.username} has no Wishlists</h3>
            </div>
        );
    } else {
        userWishlists = user.userWishlists;
    }

    console.log(userWishlists);

    if (user._id === selectedId && user.userWishlists.length) {

        return (
            <div>
                <h3>{user.username} has {user.userWishlists.length} Wishlist(s)</h3>
                <div>
                    {userWishlists.map(wishlist => (
                        <div>
                            <h3>{wishlist.title}</h3>
                            <p>Gender: {wishlist.gender}</p>
                            <p>Description: {wishlist.description} </p>
                            <p>Unpurchased Gifts: {wishlist.presents.length}</p>
                        </div>
                    ))
                    }
                </div>
            </div>
        )
    }

    const handleClick = () => {

    }

    if (!selectedId) {
        return (
            <div>
                <Link to="/addWishlist">
                    <button>Create A New Wishlist</button>
                </Link>


                <div>
                    {userWishlists.map(wishlist => (
                        <Link to={`/editWishlist/${wishlist._id}`} user={user}>
                            <button className='button' id='userBox' name={wishlist._id} key={wishlist._id} onClick={handleClick}>
                                <h3>{wishlist.title}</h3>
                                <p>Gender: {wishlist.gender}</p>
                                <p>Description: {wishlist.description} </p>
                                <p>Unpurchased Gifts: {wishlist.giftCount}</p>
                            </button>
                        </Link>
                    ))
                    }
                </div>

            </div>
        );
    } else {
        userWishlists = user.userWishlists;
    }
};

export default Wishlist;