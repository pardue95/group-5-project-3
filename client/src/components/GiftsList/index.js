import React from 'react';
import { QUERY_GIFTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const GiftsList = () => {

    const { loading, error, data } = useQuery(QUERY_GIFTS, {
        data: {},
    });

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error {error}</div>;

    const potentialGifts = data.bgifts;
    console.log(potentialGifts);

    // const giftObj = useQuery(QUERY_GIFTS);
    // const giftArray = giftObj.data;
    // const potentialGifts = giftArray.bgifts;
    // console.log(potentialGifts[0]);


    return (
        <div>
            <h3>This will show Users A List of All the Gifts</h3>
            <h2>And give them the option to Add to their wishlist</h2>
            {potentialGifts.map(gift => (
                //console.log(`Gift ID: ${gift._id}  -- Title: ${gift.title} -- Descr: ${gift.description}`)
                <div key={gift._id}>
                    <p>{gift.title}</p>
                    <p>{gift.description}</p>
                    <img src={gift.image} alt={gift.image} />
                </div>
            ))}
        </div>
    );
};

export default GiftsList;