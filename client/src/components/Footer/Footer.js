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
                <Text md='4' className='footer-copy'>
                    <h3>Designed and Developed by John Nguyen</h3>
                </Text>
                <Text md='4' className='footer-copy'>
                    <h3>Copyright © {year}</h3>
                </Text>
                <Text md='4' className='footer-social'>
                    <ul className='footer-icons'>
                        <li className='social-icons'>
                            <a
                                href="https://github.com/JoNoC0"
                                style={{ color: "white" }}
                                target="_blank" 
                                rel="noopener noreferrer"
                                alt='JoNoC0 GitHub Page'
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