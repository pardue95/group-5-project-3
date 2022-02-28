import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { useMutation } from "@apollo/client";
  import { ADD_USER } from "../../utils/mutations";
  import { HeartSwitch } from '@anatoliygatt/heart-switch';

  import Auth from "../../utils/auth";

  
    const Signup = () => {
    // const [showPassword, setShowPassword] = useState(false);
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        mother: false
      });
      const [addUser, { error }] = useMutation(ADD_USER);
    
      // update state based on form input changes
      const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    
      // submit form
      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await addUser({
            variables: { ...formState },
          });
    
          Auth.login(data.addUser.token);
        } catch (e) {
          console.error(e);
        }
      };
    
      // For Heart Slider
      const [checked, setChecked] = useState(false);
    
      // Conditional Message based on user type
      const checkMotherhood = () => {
        if (checked) {
          return <p>Congratulations!! Your going to be a Mother!</p>;
        } else {
          return <p>Gifter - Thank you!</p>;
        }
      }
    
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
       <Box
            rounded={'lg'}
            bg={useColorModeValue('beige', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to see all the great gifts! ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <form onSubmit={handleFormSubmit}>
           
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="Your username" isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="E-mail">
                    <FormLabel>E-mail address</FormLabel>
                    <Input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                <Input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
                </InputGroup>
                <Box>
                <Heading>Are you a Mother?</Heading>
                <HeartSwitch
                  size="lg"
                  inactiveTrackFillColor="#cffafe"
                  inactiveTrackStrokeColor="#22d3ee"
                  activeTrackFillColor="#06b6d4"
                  activeTrackStrokeColor="#0891b2"
                  inactiveThumbColor="#ecfeff"
                  activeThumbColor="#ecfeff"
                  checked={checked}
                  onChange={(event) => {
                    setChecked(event.target.checked);
                    formState.mother = !checked;
                  }}
                />
                {checkMotherhood()}
              </Box>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type='submit'
                  loadingText="Submitting"
                  className="btn d-block w-100"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link href="/login" color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
            </Stack>
            </form>
            {error && <div>Signup failed</div>}
          </Box>
        </Stack>
        </Box>
      </Flex>
    );
  }

  export default Signup;