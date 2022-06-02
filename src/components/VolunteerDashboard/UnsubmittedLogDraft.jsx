import React from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../../common/dateUtils';

const UnsubmittedLogDraft = ({ segment, date, lastSaved, logId }) => {
  const formattedDate = formatDate(date);
  const formattedSaveDate = formatDate(lastSaved);
  const formattedSaveTime = formatTime(lastSaved);

  return (
    <Flex
      direction="column"
      align="flex-start"
      border="2px"
      borderRadius="md"
      borderColor="lightgray"
      w={{ lg: '420px', sm: '100%' }}
      h={{ base: 'fit-content' }}
      px={5}
      py={4}
      minW="420px"
    >
      <Text fontSize="16px">
        {segment} — {formattedDate}
      </Text>
      <Text fontSize="16px" color="#4A5568">
        Last Saved: {formattedSaveDate} @ {formattedSaveTime}
      </Text>
      <Link to={`/create-log/${logId}`}>
        <Button w="100%" bgColor="#2BC0E3" size="sm" p="2" mt={2} rightIcon={<ArrowForwardIcon />}>
          Go to Log
        </Button>
      </Link>
    </Flex>
  );
};

UnsubmittedLogDraft.propTypes = {
  segment: PropTypes.string.isRequired,
  logId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  lastSaved: PropTypes.string.isRequired,
};

export default UnsubmittedLogDraft;
