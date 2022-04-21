import React from 'react';
import { Flex, Link, Image, Box, Stack } from '@chakra-ui/react';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.svg';
import twitter from '../../assets/twitter.png';
import './Footer.css';

const Footer = () => {
  return (
    <Flex
      id="footer-flex"
      as="footer"
      position="absolute"
      bottom={0}
      w="100%"
      h="90px"
      align="center"
      justify="center"
      color="white"
      bgColor="ochGrey"
    >
      <Stack direction="horizontal" id="footer-content">
        <Box className="footer-box" p="2">
          949.697.8651
        </Box>
        <Box className="footer-box" p="2">
          och@ochabitats.org
        </Box>
        <Box className="footer-box" p="2">
          <Link href="http://www.ochabitats.org" isExternal>
            ochabitats.org
          </Link>
        </Box>
        <Flex>
          <Box className="icon" p="2">
            <Link href="https://www.facebook.com/ochabitats" isExternal>
              <Image maxH="50px" src={facebook} _hover={{ opacity: '0.8' }} />
            </Link>
          </Box>
          <Box className="icon" p="2">
            <Link href="https://twitter.com/ochabitats" isExternal>
              <Image maxH="50px" src={twitter} _hover={{ opacity: '0.8' }} />
            </Link>
          </Box>
          <Box className="icon" p="2">
            <Link href="https://www.instagram.com/ochabitats/" isExternal>
              <Image maxH="50px" src={instagram} _hover={{ opacity: '0.8' }} />
            </Link>
          </Box>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Footer;
