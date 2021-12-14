import { React } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import Segment from './Segment';

const Section = () => {
  return (
    <Box align="center">
      <Flex align="left" w="90%" justify="space-between">
        <h1 ml="100px">Test Title</h1>
        <EditIcon />
      </Flex>

      <Box borderWidth="1px" borderRadius="md" w="90%">
        <Flex direction="row">
          <Box flex="0.5">
            <Text>SEGMENT</Text>
          </Box>
          <Box flex="1.5">
            <Text>SEGMENT NAME(LOCATION)</Text>
          </Box>
          <Box flex="1">
            <Text>DISTANCE</Text>
          </Box>
          <Box flex="1" />
        </Flex>

        <Segment />
      </Box>
    </Box>
  );
};

export default Section;
