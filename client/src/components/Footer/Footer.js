// import React from 'react';
// import { Flex, Box, Text } from "@chakra-ui/react";
// import {
//   AiFillGithub,
//   AiOutlineTwitter,
// } from "react-icons/ai";
// import { FaLinkedinIn } from "react-icons/fa";
// import '../Footer/style.css'


// function Footer() {
//     let date = new Date();
//     let year = date.getFullYear();
//     return (
//         <Flex fluid className='footer'>
//             <Box>
//                 <Text size='md' className='footer-copy'>
//                     Designed and Developed by Group 5
//                 </Text>
//                 <Text size='md' className='footer-copy'>
//                     <h3>Copyright © {year}</h3>
//                 </Text>
//                 <Text size='md' className='footer-social'>
//                     <ul className='footer-icons'>
//                         <li className='social-icons'>
//                             <a
//                                 href="https://github.com/pardue95/group-5-project-3"
//                                 style={{ color: "white" }}
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                                 alt='Baby Registry GitHub Page'
//                             >
//                                 <AiFillGithub />
//                             </a>
//                         </li>
//                         <li className="social-icons">
//                             <a
//                                 href="https://www.linkedin.com/in/john-jonoc0/"
//                                 style={{ color: "white" }}
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                                 alt='John Nguyen linkedIn'
//                             >
//                                 <FaLinkedinIn />
//                             </a>
//                         </li>
//                         <li className="social-icons">
//                             <a
//                                 href="https://twitter.com/MyOHMyJohnny"
//                                 style={{ color: "white" }}
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                             >
//                                 <AiOutlineTwitter />
//                             </a>
//                         </li>
                        
//                     </ul>
//                 </Text>
//             </Box>
//         </Flex>
//     )
// }


import { ButtonGroup, IconButton, Stack, Text, Container } from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'


const Footer = () => (
    
  <Container m={4} p={6} w='full' px={{ base: 6, sm: 8 }} py={20}
   position='absolute' bottom={10} as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
    <Stack spacing={{ base: '4', md: '5' }}>
      <Stack justify="space-between" direction="row" align="center">
        <ButtonGroup variant="ghost">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()} Project 3 - Group 5 All rights reserved.
      </Text>
    </Stack>
  </Container>
 
)



export default Footer;