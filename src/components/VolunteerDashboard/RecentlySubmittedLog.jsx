import React from 'react';
import { Box, Button, Badge, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const RecentlySubmittedLog = props => {
  const {
    title,
    timeDescription,
    badgeColor,
    badgeDescription,
    borderColor,
    goToLogButton,
    marginAmt,
  } = props;
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
        {timeDescription}
      </Text>
      <Badge marginRight={marginAmt} bg={badgeColor} textColor="white">
        {badgeDescription}
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

RecentlySubmittedLog.defaultProps = {
  goToLogButton: false,
};

RecentlySubmittedLog.propTypes = {
  title: PropTypes.string.isRequired,
  timeDescription: PropTypes.string.isRequired,
  badgeColor: PropTypes.string.isRequired,
  badgeDescription: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  goToLogButton: PropTypes.bool,
  marginAmt: PropTypes.string.isRequired,
};

export default RecentlySubmittedLog;
