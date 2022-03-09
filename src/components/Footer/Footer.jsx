import React from 'react';
import { Flex, Text, StackDivider, HStack, Link, Image } from '@chakra-ui/react';
// temporary logo files — need to get source from designers
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import twitter from '../../assets/twitter.svg';

const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="center"
      mt={14}
      h="90px"
      color="white"
      bgColor="ochGrey"
    >
      <HStack spacing={6} divider={<StackDivider borderColor="white" borderStyle="dashed" />}>
        <Text>949.697.8651</Text>
        <Flex direction="column" align="center">
          <Text>ochmonitors@ochabitats.org</Text>
          <Text>info@ochabitats.org</Text>
        </Flex>
        <Flex direction="column" align="center">
          <Text>15333 Culver Drive, Suite</Text>
          <Text>240-763, Irvine, CA 92604</Text>
        </Flex>
        <Link href="http://www.ochabitats.org" isExternal>
          ochabitats.org
        </Link>
        <Text>EIN # 82-2478090</Text>
        <HStack spacing={1}>
          <Link href="https://www.facebook.com/ochabitats" isExternal>
            <Image src={facebook} />
          </Link>
          <Link href="https://twitter.com/ochabitats" isExternal>
            <Image src={twitter} />
          </Link>
          <Link href="https://www.instagram.com/ochabitats/" isExternal>
            <Image src={instagram} />
          </Link>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Footer;
