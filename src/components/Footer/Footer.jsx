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
      h="100px"
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
        <Link href="ochabitats.org" isExternal>
          ochabitats.org
        </Link>
        <Text>EIN # 82-2478090</Text>
        <HStack align="center" justify="center" spacing={1}>
          <Image src={facebook} />
          <Image src={twitter} />
          <Image src={instagram} />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Footer;
