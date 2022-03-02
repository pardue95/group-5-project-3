import React, { useState } from 'react';
import GiftsList from '../components/GiftsList';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_ME, QUERY_ONE_WISHLIST } from '../utils/queries';
import { REMOVE_GIFT } from '../utils/mutations';
import {
    HStack,
    VStack,
    Box,
    Heading,
    Text,
    Button,
    Stack
} from '@chakra-ui/react'
import "@fontsource/josefin-sans"

const EditWishlist = () => {
    const { id: wishlistID } = useParams();
    const [removeGift] = useMutation(REMOVE_GIFT);
    const { loading: meLoading, data: meData } = useQuery(QUERY_ME);
    const user = meData?.me || {};
    const { loading: wishlistLoading, error: wishlistError, data: wishlistData } = useQuery(QUERY_ONE_WISHLIST, { //NOT WORKING
        variables: { id: wishlistID }
    });

    if (wishlistLoading) {
        return <div>Loading...</div>;
    }

    const presentsArray = wishlistData.userWishlist?.presents;
    var yourWishlist = false;


    for (let i = 0; i < user.userWishlists?.length; i++) {
        const meWishlistID = user.userWishlists[i]._id;

        if (wishlistID === meWishlistID) {
            yourWishlist = true;
        }
    }

    var babyGender = "";
    if (wishlistData?.userWishlist.gender === "N/A") {
        babyGender = "Baby";
    } else {
        babyGender = wishlistData?.userWishlist.gender
    }

    if (!yourWishlist) {
        return (
            <HStack>
                <VStack>
                    <Stack>
                        <Box
                            align={'center'}>
                            <Heading
                                align={'center'}
                                fontSize='3xl'>
                            Its A... {babyGender} 
                            </Heading>
                            <Text
                                fontSize='lg'
                                align={'center'}>
                                Title: {wishlistData?.userWishlist.title}  
                            </Text>
                            <Text
                                fontSize='lg'
                                align={'center'}>
                                Description: {wishlistData?.userWishlist.description}  
                            </Text>
                        </Box>
                        <Box>
                            {presentsArray.map(gift => (
                                <Button
                                    width='100px'
                                    height='200px'
                                    className='button'
                                    id='giftBox'
                                    key={gift._id}
                                    title={gift.title}
                                    description={gift.description}
                                    image={gift.image}>    
                                    {gift.title}
                                    <br /> <br />
                                    {gift.description}
                                </Button>
                            ))
                            }
                        </Box>
                    </Stack>
                </VStack>
            </HStack>
        );
    };

    const handleRemove = async (event) => {
        const selectedId = event.target.attributes.giftId.nodeValue;
        console.log(selectedId);
        try {
            await removeGift({
                variables: {
                    GiftId: selectedId
                }
            });
        } catch (e) {
            console.error(e);
        }

        window.location.replace(`/editWishlist/${wishlistID}`);
    };

    return (
        <HStack>
                <VStack>
                    <Stack>
                        <Box>
                            <Heading
                                align={'center'}
                                fontSize='3xl'>
                            Editing {wishlistData?.userWishlist.title}'s Wishlist 
                            </Heading>
                            <Text
                                align={'center'}
                                fontSize='3xl'>
                                Added Gifts  
                            </Text>
                            <Box>
                                {presentsArray.map(gift => (
                                    <Button
                                        m={1}
                                        _hover={{ fontWeight: 'semibold' }}
                                        shadow='base'
                                        height='200px'
                                        width='150px'
                                        border='2px'
                                        size='sm'
                                        className='buttonDelete'
                                        id='giftBox'
                                        key={gift._id}
                                        title={gift.title}
                                        description={gift.description}
                                        image={gift.image}
                                        onClick={handleRemove} >
                                        {gift.title}
                                        <br /> <br />
                                        {gift.description}
                                    </Button>
                                ))}
                        </Box>
                        <Box>
                            <Heading
                                align={'center'}
                                fontSize='2xl'>
                            Select any gift you wish to add to your wishlist!
                            </Heading>
                            <Heading
                                m={2}
                                align={'center'}
                                fontSize='md'>
                            You can add multiple of any item by simply clicking it again
                            </Heading>
                                <GiftsList 
                                wishlistID={wishlistID} 
                                key={user._id} 
                                userID={user._id}>
                                </GiftsList>
                            </Box>
                        </Box>
                    </Stack>
                </VStack>
            </HStack>
    );
};
        

export default EditWishlist;

