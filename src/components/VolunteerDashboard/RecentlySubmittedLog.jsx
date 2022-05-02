import React from 'react';
import { Flex, Button, Badge, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const setDetails = status => {
  if (status === 'EDITS_REQUESTED') {
    return {
      borderColor: 'red',
      badge: 'EDITS REQUESTED',
      badgeColor: '#C53030',
      goToLogButton: true,
    };
  }
  if (status === 'UNDER_REVIEW') {
    return {
      borderColor: 'lightgray',
      badge: 'UNDER REVIEW',
      badgeColor: '#3182CE',
      goToLogButton: false,
    };
  }
  return {
    borderColor: 'lightgray',
    badge: 'APPROVED',
    badgeColor: '#38A169',
    goToLogButton: false,
  };
};

const RecentlySubmittedLog = ({ title, timeDescription, status }) => {
  const details = setDetails(status);

  return (
    <Flex
      direction="column"
      align="flex-start"
      border="2px"
      borderRadius="md"
      borderColor={details.borderColor}
      w="400px"
      h="155px"
      px={5}
      py={4}
    >
      <Text fontSize="16px">{title}</Text>
      <Text fontSize="16px" color="#4A5568">
        Submitted: {timeDescription}
      </Text>
      <Badge mt={1} bg={details.badgeColor} textColor="white">
        {details.badge}
      </Badge>
      {details.goToLogButton && (
        <Button w="100%" bgColor="#2BC0E3" size="sm" mt={3} rightIcon={<ArrowForwardIcon />}>
          Go to Log
        </Button>
      )}
    </Flex>
  );
};

RecentlySubmittedLog.propTypes = {
  title: PropTypes.string.isRequired,
  timeDescription: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default RecentlySubmittedLog;
