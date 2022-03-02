import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Stack,
    Button,
    Heading,
    Text,
    
    Link,
  } from '@chakra-ui/react';
import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import Wishlist from '../components/Wishlist';

import { useQuery } from '@apollo/client';
import { QUERY_USERINFO, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
    const { id: selectedUserID } = useParams();

    const { loading, error, data } = useQuery(selectedUserID ? QUERY_USERINFO : QUERY_ME, {
        variables: { id: selectedUserID },
    });

    const user = data?.me || data?.userInfo || {};

    // redirect to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === selectedUserID) {
        return <Redirect to="/profile" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }


    return (
        <Flex
            minH={'70vh'}
            align={'center'}
            justify={'center'}
        >
            <Box
                rounded={'lg'}
                bg={('beige')}
                boxShadow={'lg'}
                p={3}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={8} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                        Viewing {selectedUserID ? `${user.username}'s` : 'your'} Profile
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                        Wishlist Title:
                        </Text>
                    </Stack>
                <Box
                    rounded={'lg'}
                    bg={('white')}
                    boxShadow={'lg'}
                    p={8}
                >
                <Stack spacing={4}>
                    <HStack display-flex="column">
                        <Box>
                            <FormControl id="viewUser">
                                <FormLabel>
                                    Viewing {selectedUserID ? `${user.username}'s` : 'your'} profile
                                </FormLabel>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel>
                                    <Wishlist
                                        user={user}
                                        selectedId={selectedUserID}
                                    />
                                </FormLabel>
                            </FormControl>
                        </Box>    
                    </HStack>
                    </Stack>
                </Box>
                </Stack>
            </Box>
        </Flex>
    );
};

export default Profile;
