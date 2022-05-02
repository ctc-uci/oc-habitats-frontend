import React from 'react';
import { Flex, Box, Button, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const UnsubmittedLogDraft = ({ title, timeDescription }) => {
  return (
    <Flex
      direction="column"
      align="flex-start"
      border="2px"
      borderRadius="md"
      borderColor="lightgray"
      w={{ lg: '420px', md: '310px', sm: '100%' }}
      h={{ lg: '125px', md: '175px' }}
      px={5}
      py={4}
    >
      <Text fontSize="16px">{title}</Text>
      <Text fontSize="16px" color="#4A5568">
        Last Saved: {timeDescription}
      </Text>
      <Button w="100%" bgColor="#2BC0E3" size="sm" mt={2} rightIcon={<ArrowForwardIcon />}>
        Go to Log
      </Button>
    </Flex>
  );
};

UnsubmittedLogDraft.propTypes = {
  title: PropTypes.string.isRequired,
  timeDescription: PropTypes.string.isRequired,
};

export default UnsubmittedLogDraft;
