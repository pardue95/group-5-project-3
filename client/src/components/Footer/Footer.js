import React from 'react';
import { Flex, Box, Text } from "@chakra-ui/react";
import {
  AiFillGithub,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";


function Footer() {
    let date = new Date();
    let year = date.getFullYear();
    return (
        <Flex fluid className='footer'>
            <Box>
                <Text size='md' className='footer-copy'>
                    Designed and Developed by Group 5
                </Text>
                <Text size='md' className='footer-copy'>
                    <h3>Copyright © {year}</h3>
                </Text>
                <Text size='md' className='footer-social'>
                    <ul className='footer-icons'>
                        <li className='social-icons'>
                            <a
                                href="https://github.com/pardue95/group-5-project-3"
                                style={{ color: "white" }}
                                target="_blank" 
                                rel="noopener noreferrer"
                                alt='Baby Registry GitHub Page'
                            >
                                <AiFillGithub />
                            </a>
                        </li>
                        <li className="social-icons">
                            <a
                                href="https://www.linkedin.com/in/john-jonoc0/"
                                style={{ color: "white" }}
                                target="_blank" 
                                rel="noopener noreferrer"
                                alt='John Nguyen linkedIn'
                            >
                                <FaLinkedinIn />
                            </a>
                        </li>
                        <li className="social-icons">
                            <a
                                href="https://twitter.com/MyOHMyJohnny"
                                style={{ color: "white" }}
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                <AiOutlineTwitter />
                            </a>
                        </li>
                        
                    </ul>
                </Text>
            </Box>
        </Flex>
    )
}

export default Footer;