import React from 'react';
import { QUERY_GIFTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
//import { SAVE_GIFT } from '../utils/mutations';

const GiftsList = () => {
    //const [saveGift] = useMutation(SAVE_GIFT);

    const { loading, error, data } = useQuery(QUERY_GIFTS, {
        data: {},
    });

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error {error}</div>;

    const potentialGifts = data.bgifts;

    const handleClick = async (event) => {
        console.log("Handle Click");
        console.log(event.target.name);

    };


    return (
        <div>
            <h3>This will show Users A List of All the Gifts</h3>
            <h2>And give them the option to Add to their wishlist</h2>
            {potentialGifts.map(gift => (
                //console.log(`Gift ID: ${gift._id}  -- Title: ${gift.title} -- Descr: ${gift.description}`)

                <button class='button' id='giftBox' name={gift._id} onClick={handleClick}>
                    {gift.title}
                    <br /> <br />
                    {gift.description}
                    {/* <img src={gift.image} alt={gift.image} /> */}
                </button>

            ))
            }
        </div >
    );
};

export default GiftsList;