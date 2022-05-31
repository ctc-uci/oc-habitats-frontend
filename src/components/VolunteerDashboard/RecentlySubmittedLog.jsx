import React from 'react';
import { Flex, Button, Badge, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../../common/dateUtils';

const details = {
  EDITS_REQUESTED: {
    borderColor: 'red',
    badge: 'EDITS REQUESTED',
    badgeColor: '#C53030',
    goToLogButton: true,
  },
  UNDER_REVIEW: {
    borderColor: 'lightgray',
    badge: 'UNDER REVIEW',
    badgeColor: '#3182CE',
    goToLogButton: false,
  },
  APPROVED: {
    borderColor: 'lightgray',
    badge: 'APPROVED',
    badgeColor: '#38A169',
    goToLogButton: false,
  },
};

const RecentlySubmittedLog = ({ segment, date, timeDescription, status, logId }) => {
  const formattedDate = formatDate(date);
  const submissionDate = formatDate(timeDescription);
  const formattedTime = formatTime(timeDescription);

  return (
    <Flex
      direction="column"
      align="flex-start"
      border="2px"
      borderRadius="md"
      borderColor={details[status].borderColor}
      w={{ lg: '100%', sm: '100%' }}
      maxW={{ md: '420px' }}
      h={{ lg: '155px', md: '170px', base: 'fit-content' }}
      px={5}
      py={4}
    >
      <Text fontSize="16px">
        {segment} — {formattedDate}
      </Text>
      <Text fontSize="16px" color="#4A5568">
        Submitted: {submissionDate} @ {formattedTime}
      </Text>
      <Badge mt={1} bg={details[status].badgeColor} textColor="white">
        {details[status].badge}
      </Badge>
      {details[status].goToLogButton && (
        <Link to={`/create-log/${logId}`}>
          <Button w="100%" bgColor="#2BC0E3" size="sm" mt={3} rightIcon={<ArrowForwardIcon />}>
            Go to Log
          </Button>
        </Link>
      )}
    </Flex>
  );
};

RecentlySubmittedLog.propTypes = {
  segment: PropTypes.string.isRequired,
  logId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeDescription: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default RecentlySubmittedLog;
