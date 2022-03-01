import React from 'react';
import { QUERY_GIFTS, QUERY_SINGLEGIFT } from '../../utils/queries';
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
        const selectedTitle = event.target.attributes.title.nodeValue;
        const selectedDescription = event.target.attributes.description.nodeValue;
        const selectedImage = event.target.attributes.image.nodeValue;

        console.log("Handle Click");
        console.log("wishlistID" + wishlistID);
        console.log("Title " + selectedTitle);
        console.log("Description " + selectedDescription);
        console.log("Image " + selectedImage);


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
                <button className='button' id='giftBox' key={gift._id} title={gift.title}
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