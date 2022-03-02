import React from 'react';
import {
    Box,
    Button,
    Heading,
    Text,
    HStack,
    VStack,
    Stack
} from '@chakra-ui/react'
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

    if (user._id === selectedId && user.userWishlists.length) {

        return (
            <HStack>
                <VStack>
                    <Box
                        m={4}>
                            <Heading
                                size='lg'
                                textAlign='center'>
                                    {user.username} has {user.userWishlists.length} Wishlist(s)
                            </Heading>
                        <Box>
                            {userWishlists.map(wishlist => (
                            <Button
                                m={1}
                                hover={{ fontWeight: 'semibold' }}
                                shadow='base'
                                height='150px'
                                width='150px'
                                border='2px'
                                size='sm'
                                as='a'
                                href='{`/editWishlist/${wishlist._id}`}'
                                selectedId={selectedId}
                                className='button'
                                id='userBox'
                                name={wishlist._id}
                                key={wishlist._id}>
                    <Box>
                        <Heading
                            size='md'
                            textAlign='center'>
                                {wishlist.title}
                        </Heading>
                        <Stack>
                            <Text fontSize='sm'>
                                Gender: {wishlist.gender}
                            </Text>
                            <Text fontSize='sm'>
                                Description: {wishlist.description}
                            </Text>
                            <Text fontSize='sm'>
                                Unpurchased Gifts: {wishlist.presents.length}
                            </Text>
                        </Stack>
                    </Box>
                        </Button>
                                ))  
                            }
                        </Box>    
                    </Box>
                </VStack>
            </HStack>
            
)}

    if (!selectedId) {

        
        return (
                <HStack>
                <VStack>
                    <Button
                        as="a"
                        href='/addWishList'
                        bg={'blue.400'}
                        color={'black'}
                        size='lg'
                        type='submit'
                        _nohover={{
                            bg: 'blue.500',
                        }}>
                    Create A New Wishlist
                    </Button>
                    <Box
                        m={4}>
                            <Heading
                                size='lg'
                                textAlign='center'>
                                    {user.username} has {user.userWishlists.length} Wishlist(s)
                            </Heading>
                        <Box>
                            {userWishlists.map(wishlist => (
                            <Button
                                m={1}
                                hover={{ fontWeight: 'semibold' }}
                                shadow='base'
                                height='150px'
                                width='150px'
                                border='2px'
                                size='sm'
                                as='a'
                                href='{`/editWishlist/${wishlist._id}`}'
                                selectedId={selectedId}
                                className='button'
                                id='userBox'
                                name={wishlist._id}
                                key={wishlist._id}>
                    <Box>
                        <Heading
                            size='md'
                            textAlign='center'>
                                {wishlist.title}
                        </Heading>
                        <Stack>
                            <Text fontSize='sm'>
                                Gender: {wishlist.gender}
                            </Text>
                            <Text fontSize='sm'>
                                Description: {wishlist.description}
                            </Text>
                            <Text fontSize='sm'>
                                Unpurchased Gifts: {wishlist.giftCount}
                            </Text>
                        </Stack>
                    </Box>
                        </Button>
                                ))  
                            }
                        </Box>    
                    </Box>
                </VStack>
            </HStack>
                
        );
    } else {
        userWishlists = user.userWishlists;
    }
};

export default Wishlist;