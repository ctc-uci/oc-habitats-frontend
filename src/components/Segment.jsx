import { React } from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

const Segment = ({ segment, segmentName, distance, showUpdate }) => {
  return (
    <Box align="center">
      <Flex direction="row">
        <Box flex="0.5">
          <Text>{segment}</Text>
        </Box>
        <Box flex="0.75" />
        <Box flex="1.5">
          <Text>{segmentName}</Text>
        </Box>
        <Box flex="1">
          <Text>{distance}</Text>
        </Box>
        <Box flex="1">
          {showUpdate ? (
            <Button colorScheme="gray" size="sm">
              Update
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

Segment.propTypes = {
  segment: PropTypes.string.isRequired,
  segmentName: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  showUpdate: PropTypes.bool.isRequired,
};

export default Segment;
