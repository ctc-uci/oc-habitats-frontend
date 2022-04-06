import React from 'react';
import { Flex, Text, StackDivider, HStack, Link, Image } from '@chakra-ui/react';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.svg';
import twitter from '../../assets/twitter.png';

const Footer = () => {
  return (
    <Flex
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
      <HStack spacing={6} divider={<StackDivider borderColor="white" borderStyle="dashed" />}>
        <Text>949.697.8651</Text>
        <Flex direction="column" align="center">
          <Text>och@ochabitats.org</Text>
        </Flex>
        <Link href="http://www.ochabitats.org" isExternal>
          ochabitats.org
        </Link>
        <HStack spacing={3}>
          <Link href="https://www.facebook.com/ochabitats" isExternal>
            <Image maxH="52px" src={facebook} _hover={{ opacity: '0.8' }} />
          </Link>
          <Link href="https://twitter.com/ochabitats" isExternal>
            <Image maxH="52px" src={twitter} _hover={{ opacity: '0.8' }} />
          </Link>
          <Link href="https://www.instagram.com/ochabitats/" isExternal>
            <Image maxH="52px" src={instagram} _hover={{ opacity: '0.8' }} />
          </Link>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Footer;
