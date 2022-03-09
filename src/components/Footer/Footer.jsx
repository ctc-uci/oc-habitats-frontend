import React from 'react';
import { Flex, Text, StackDivider, HStack } from '@chakra-ui/react';

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
        <Flex align="center" direction="column">
          <Text>949.697.8651</Text>
        </Flex>
        <Flex align="center" direction="column">
          <Text>ochmonitors@ochabitats.org</Text>
          <Text>info@ochabitats.org</Text>
        </Flex>
        <Flex align="center" direction="column">
          <Text>1533 Culver Drive, Suite</Text>
          <Text>240-763, Irvine, CA 92604</Text>
        </Flex>
        <Flex align="center" justify="center">
          <Text align="center">ochabitats.org</Text>
        </Flex>
        <Flex align="center" justify="center">
          <Text align="center">EIN # 82-2478090</Text>
        </Flex>
        <Flex align="center" justify="center">
          social media
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Footer;
