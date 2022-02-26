import React from 'react';
import { QUERY_GIFTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
//import { SAVE_GIFT } from '../utils/mutations';

const GiftsList = (user) => {
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

        console.log(user);
    };


    return (
        <div>
            {potentialGifts.map(gift => (
                //console.log(`Gift ID: ${gift._id}  -- Title: ${gift.title} -- Descr: ${gift.description}`)

                <button class='button' id='giftBox' name={gift._id} key={gift._id} onClick={handleClick}>
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