import { React } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Segment = () => {
  return (
    <Box align="center">
      <Flex direction="row">
        <Box flex="0.5">
          <Text>segment</Text>
        </Box>
        <Box flex="1.5">
          <Text>name</Text>
        </Box>
        <Box flex="1">
          <Text>distance</Text>
        </Box>
        <Box flex="1" />
      </Flex>
    </Box>
  );
};

export default Segment;
