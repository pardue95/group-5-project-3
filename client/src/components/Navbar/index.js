import React from "react";

import {
  chakra,
  Link,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import Auth from '../../utils/auth'
import '../Navbar/style.css'

function Navbar() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Fullfill!"
              display="flex"
              alignItems="center"
            >
             
              <VisuallyHidden>
              FULLfill! <br />
              Babies Everywhere!
              </VisuallyHidden>
              
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                FULLfill!
            </chakra.h1>
          </Flex>
          <HStack as="nav" display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Link 
                variant="ghost"
                href="/">
                Baby Gift Registry</Link>
              
                {Auth.loggedIn() ? (
                  <>
              <Link 
                variant="ghost"
                to="/profile">Me</Link>
              <Button
                className="linkButton"
                variant="ghost"
                to="/"
                onClick={logout}>Logout</Button>
                  </>
                ) : (
                  <>
              <Button 
                className="linkButton"
                variant="ghost"
                as="a"
                href="/login">
                Login
                </Button>
              <Button 
                className="linkButton"
                variant="ghost"
                as="a" 
                href="/signup">
                Sign up</Button>
                </>
                )}
              
            </HStack>
            <Button colorScheme="brand" size="sm">
              Get Started
            </Button>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Link w="full" variant="ghost">
                  Baby Gift Registry
                </Link>
                <Link to="/profile" w="full" variant="ghost">
                  Me
                </Link>
                <Button to="/logout" w="full" variant="ghost">
                  Logout
                </Button>
                <Button to="/login" w="full" variant="ghost">
                  Login
                </Button>
                <Button to="/signup" w="full" variant="ghost">
                  <Link a href="/signup">
                  Sign up
                  </Link>
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}

export default Navbar;
