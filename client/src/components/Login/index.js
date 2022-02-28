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
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { useMutation } from '@apollo/client';
  import { LOGIN_USER } from '../../utils/mutations';

  import Auth from '../../utils/auth';
  
  const Login = (props) => {
    // const [showPassword, setShowPassword] = useState(false);
    const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  
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
              Login
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
                  <FormControl id="Your Email" isRequired>
                    <FormLabel>Email</FormLabel>
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
                <Box>
                  <FormControl id="password">
                    <FormLabel>password</FormLabel>
                    <Input 
                        className="form-input"
                        placeholder="******"
                        name="password"
                        type="password"
                        id="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <Stack spacing={10} pt={2}>
                <Button
                  className="btn d-block w-100"
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Not a user? <Link href="/signup" color={'blue.400'}>Signup</Link>
                </Text>
              </Stack>
            </Stack>
            </form>
            {error && <div>Login failed</div>}
          </Box>
        </Stack>
        </Box>
      </Flex>
    );
  }

  export default Login;