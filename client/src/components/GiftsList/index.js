import React from 'react';
import { QUERY_GIFTS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { SAVE_GIFT } from '../../utils/mutations';

const GiftsList = ({ wishlistID, userID }) => {
    const [saveGift] = useMutation(SAVE_GIFT);

    const { loading, error, data } = useQuery(QUERY_GIFTS, {
        data: {},
    });

    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error {error}</div>;

    const potentialGifts = data.bgifts;

    const handleClick = async (event) => {
        const selectedTitle = event.target.title;
        const selectedDescription = event.target.description;
        const selectedImage = event.target.image;

        console.log("Handle Click");
        console.log("Gift ID" + event.target.name);
        console.log("wishlistID" + wishlistID);
        console.log("userID " + userID);
        console.log(event.target);

        try {
            await saveGift({ //NOT WORKING
                variables: {
                    wishlistId: wishlistID, title: selectedTitle, description: selectedDescription, image: selectedImage
                }
            });
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <div>
            {potentialGifts.map(gift => (
                //console.log(`Gift ID: ${gift._id}  -- Title: ${gift.title} -- Descr: ${gift.description}`)

                <button class='button' id='giftBox' giftID={gift._id} title={gift.title}
                    description={gift.description} image={gift.image} onClick={handleClick}>
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