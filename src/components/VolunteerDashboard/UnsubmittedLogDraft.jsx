import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const UnsubmittedLogDraft = ({ title, timeDescription }) => {
  return (
    <Box align="center" border="2px" borderRadius="md" borderColor="lightgray" w="400px" h="125px">
      <Box w="400px" h="15px" />
      <Text fontSize="16px" pl="6" textAlign="left">
        {title}
      </Text>
      <Text fontSize="16px" pl="6" textAlign="left" color="#4A5568">
        {timeDescription}
      </Text>
      <Box w="400px" h="10px" />
      <Button w="350px" bgColor="#2BC0E3" size="sm" rightIcon={<ArrowForwardIcon />}>
        Go to Log
      </Button>
    </Box>
  );
};

UnsubmittedLogDraft.propTypes = {
  title: PropTypes.string.isRequired,
  timeDescription: PropTypes.string.isRequired,
};

export default UnsubmittedLogDraft;
