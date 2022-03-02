import React from 'react';
import {
    Box,
    Button,
    HStack,
    VStack,
    Text,
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
                            m={1}
                            _hover={{ fontWeight: 'semibold' }}
                            shadow='base'
                            height='75px'
                            width='150px'
                            border='2px'
                            size='sm'
                            as="a"
                            href={`/profile/${user._id}`}
                            params={user._id}>
                            <Box
                                className='button'
                                id='userBox'
                                name={user._id}
                                key={user._id}
                                onClick={handleClick}>
                                <Stack
                                    pos={'bottom'}
                                    fontSize='sm'
                                    alignItems='baseline'>                                  
                                    <Text>
                                        {user.username}
                                    </Text>
                                    <Text>
                                        {user.userWishlists.length} Available Wishlists
                                    </Text>
                                </Stack >
                            </Box >
                        </Button >
                    ))
                    }
                </Box >
            </VStack >
        </HStack>
    );
};

export default UserList;