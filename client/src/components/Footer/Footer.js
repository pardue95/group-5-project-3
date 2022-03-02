
import { Stack, IconButton, Container, Text, Box } from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'


const Footer = () => (
    
//   <Container display="flex" justify-content="spaceBetween" >
//     <Stack spacing={{ base: '10', md: '5' }}>
//       <Text fontSize="sm" color="subtle">
//         &copy; {new Date().getFullYear()} Project 3 - Group 5 All rights reserved.
//       </Text>
//     </Stack>
//       <Stack justify="space-between" direction="row" align="right">
//         <ButtonGroup variant="ghost" align="right">
//           <IconButton
//             as="a"
//             href="#"
//             aria-label="LinkedIn"
//             icon={<FaLinkedin fontSize="1.25rem" />}
//           />
//           <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
//         </ButtonGroup>
//       </Stack>
//   </Container>
 
// )
<Box>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text fontSize="sm" color="subtle">
             &copy; {new Date().getFullYear()} Project 3 - Group 5 All rights reserved.
        </Text>
        <Stack direction={'row'} spacing={6}>
        <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
        </Stack>
      </Container>
    </Box>
)
export default Footer;