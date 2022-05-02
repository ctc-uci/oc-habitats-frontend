import React from 'react';
import { Box, Button, Badge, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const RecentlySubmittedLog = props => {
  const { title, timeDescription, status } = props;

  // badge color, description, borderColor, button, and margin all depend on status
  const borderColor = status === 'EDITS_REQUESTED' ? 'red' : 'lightgray';
  const badgeColor = status === 'EDITS_REQUESTED' ? '#C53030' : '#38A169';
  const marginAmt = status === 'EDITS_REQUESTED' ? '230' : '275';
  const goToLogButton = status === 'EDITS_REQUESTED';

  return (
    <Box
      align="center"
      border="2px"
      borderRadius="md"
      borderColor={borderColor}
      w="400px"
      h="155px"
    >
      <Box w="400px" h="15px" />
      <Text fontSize="16px" pl="6" textAlign="left">
        {title}
      </Text>
      <Text fontSize="16px" pl="6" textAlign="left" color="#4A5568">
        Submitted: {timeDescription}
      </Text>
      <Badge marginRight={marginAmt} bg={badgeColor} textColor="white">
        {status}
      </Badge>
      <Box w="400px" h="15px" />
      {goToLogButton && (
        <Button w="350px" bgColor="#2BC0E3" size="sm" rightIcon={<ArrowForwardIcon />}>
          Go to Log
        </Button>
      )}
    </Box>
  );
};

RecentlySubmittedLog.propTypes = {
  title: PropTypes.string.isRequired,
  timeDescription: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default RecentlySubmittedLog;
