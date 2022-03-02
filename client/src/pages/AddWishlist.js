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
    Textarea,
    Radio,
    RadioGroup,
    FormHelperText
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { SAVE_WISHLIST } from '../utils/mutations';


const AddWishlist = (props) => {
    const [newDescription, setDescription] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [newTitle, setTitle] = useState('');
    const [titleCount, setTitleCount] = useState(0);
    const [selectedGender, setGender] = useState('');

    const [createNewWishlist] = useMutation(SAVE_WISHLIST);

    const { loading, data } = useQuery(QUERY_ME);
    const user = data?.me || {};
    const userID = user._id;

    if (loading) {
        return <div>Loading...</div>;
    }

    // checks you are logged in and a mother
    if (!user?.username || user.mother) {
        return (
            <h4>
                You need to be logged and be a Mother in order to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    const handleDescriptionChange = (event) => {
        if (event.target.value.length <= 280) {
            setDescription(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };
    const handleTitleChange = (event) => {
        if (event.target.value.length <= 280) {
            setTitle(event.target.value);
            setTitleCount(event.target.value.length);
        }
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(selectedGender);
        try {
            await createNewWishlist({
                variables: { userId: userID, title: newTitle, description: newDescription, gender: selectedGender }
            });
            
            window.location.replace("/profile");
            
        } catch (e) {
            console.error(e);
        }
    }
    console.log(document.getElementById('gender'))



    return (
        <Flex
            minH={'70vh'}
            align={'center'}
            justify={'center'}
        // bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Box

                rounded={'lg'}
                bg={('beige')}
                boxShadow={'lg'}
                p={3}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={8} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Create a new Wishlist!
                        </Heading>
                    </Stack>
                    <Box

                        rounded={'lg'}
                        bg={('white')}
                        boxShadow={'lg'}
                        p={8}

                    >
                        <form onSubmit={handleFormSubmit}>
                            <Stack spacing={4}>
                                <HStack display-flex="column">
                                    <Box>
                                        <FormControl id="title" isRequired>
                                            <FormLabel>Name of Wishlist:</FormLabel>
                                            <Input
                                                placeholder="Your wishlist"
                                                name="title"
                                                type="text"
                                                id="title"
                                                value={newTitle}
                                                onChange={handleTitleChange}
                                            />
                                        </FormControl>
                                    </Box>
                                    <br />
                                    <Box>
                                        <FormControl id="message">
                                            <FormLabel>Message:</FormLabel>
                                            <Textarea
                                                placeholder='Leave a note for your guests...'
                                                value={newDescription}
                                                onChange={handleDescriptionChange}
                                            />
                                        </FormControl>
                                        <Box>
                                            <FormControl >
                                                <FormLabel >Baby's Gender</FormLabel>
                                                <RadioGroup onChange={setGender} value={selectedGender} defaultValue='Girl'>
                                                    <HStack spacing='24px'>
                                                        <Radio value='Girl'>Girl</Radio>
                                                        <Radio value='Boy'>Boy</Radio>
                                                        <Radio value='N/A'>N/A</Radio>
                                                    </HStack>
                                                </RadioGroup>
                                                <FormHelperText>Please select gender</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Box>
                                </HStack>
                                <Stack spacing={10} pt={2}>
                                    <Button
                                        onClick={handleFormSubmit}
                                        type='submit'
                                        loadingText="Submitting"
                                        className="btn d-block w-100"
                                        size="lg"
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        Save New Wishlist
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Box>
        </Flex>
    );
}


{/* <form>
                <label for='title'>Wishlist Title:  </label>
                <input 
                type="text" 
                id='title' 
                name='title' 
                value={newTitle} 
                onChange={handleTitleChange} /> <br /><br />
                <textarea
                    placeholder='Leave a note for your guests...'
                    value={newDescription}
                    onChange={handleDescriptionChange}
                ></textarea><br />
                <label for='gender'>Baby's Gender  </label>
                <select id='gender' name='gender'>
                    <option value='Boy'>Boy</option>
                    <option value='Girl'>Girl</option>
                    <option value='n/a'>N/A</option>
                </select>
            </form>
            <button type='submit' onClick={handleFormSubmit}>Save New Wishlist</button> */}

export default AddWishlist;
