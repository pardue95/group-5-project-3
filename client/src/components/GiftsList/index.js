import React from 'react';
import { Link } from 'react-router-dom';
//import { QUERY_GIFTS } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

const GiftsList = ({ giftsList }) => {
    // const giftsList = useQuery(QUERY_GIFTS);

    // const handleClick = async () => {
    //     try {
    //         await saveGift({
    //             variables: { id: user._id },
    //         });
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };
    console.log("inside client, src, componenet, giftlist " + { giftsList });

    return (
        <div>
            <h3>This will show Users A List of All the Gifts</h3>
            <h2>And give them the option to Add to their wishlist</h2>
            {/* {giftsList.map(gift => (
                <div key={gift.id}>
                    <p>{gift.titl}</p>
                    <p>{gift.description}</p>
                    <img src={gift.image} alt={gift.image} />
                </div>
            ))} */}
        </div>
    );
};

export default GiftsList;