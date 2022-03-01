import React from 'react';
import {
    Box,
    Button,
    // Image,
    HStack,
    VStack,
    Text,
    // Flex,
    Stack
} from '@chakra-ui/react'
// import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';

const UserList = () => {

    const { loading, error, data } = useQuery(QUERY_USERS, {
        data: {}
    });
    if (loading) return <div>Loading ...</div>;
    if (error) return <div>Error {error}</div>;

    const users = data.users;

    const handleClick = async (event) => {

    };

    return (
        <HStack>
            <VStack>
                <Box
                    m={4}>
                    {users.map(user => (
                        <Button
                            m={4}
                            _hover={{ fontWeight: 'semibold' }}
                            shadow='base'
                            height='200px'
                            width='150px'
                            border='2px'
                            size='md'
                            as="a"
                            href={`/profile/${user._id}`}
                            params={user._id}>
<<<<<<< HEAD
    <Box
        class='button'
        id='userBox'
        name={user._id}
        key={user._id}
=======
                            <Box
                                className='button'
                                id='userBox'
                                name={user._id}
                                key={user._id}
>>>>>>> 7d9f46c3c594fc29c57ef93abdbcb6639f369244
        onClick={handleClick}>
        <Stack
            pos={'bottom'}
            fontSize='sm'
            alignItems='baseline'>
            <Text
            >{user.username}</Text>
            <Text
<<<<<<< HEAD
            >{user.userWishlists.length} Available Gifts</Text>
        </Stack>
=======
                                        >{user.userWishlists.length} Available Wishlists</Text>
                                </Stack >                            
>>>>>>> 7d9f46c3c594fc29c57ef93abdbcb6639f369244
                            </Box >
                        </Button >
                    ))
                    }
                </Box >
            </VStack >
<<<<<<< HEAD
        </HStack >



=======
        </HStack>   
>>>>>>> 7d9f46c3c594fc29c57ef93abdbcb6639f369244
    );
};

export default UserList;