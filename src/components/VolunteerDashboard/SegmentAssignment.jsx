import React from 'react';
import { VStack, Text, Link, Box } from '@chakra-ui/react';
import { FiMapPin } from 'react-icons/fi';
import { PropTypes } from 'prop-types';

const SegmentAssignment = ({ title, place, mapLink, description }) => {
  return (
    <VStack w="400px" spacing={1} align="flex-start">
      <Text fontSize="16px" color="#231F20">
        {title}
      </Text>
      <Text fontSize="16px" color="#4A5568">
        {place}
      </Text>
      <Box display="flex" directiom="row" alignItems="center">
        <FiMapPin color="#156071" style={{ display: 'inline' }} />
        <Text marginLeft="3" as="u" fontSize="16px" color="#156071">
          <Link href={mapLink} isExternal>
            Google Maps Link
          </Link>
        </Text>
      </Box>
      <Text />
      <Text fontSize="16px" color="#4A5568">
        {description}
      </Text>
    </VStack>
  );
};

SegmentAssignment.propTypes = {
  title: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  mapLink: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SegmentAssignment;
