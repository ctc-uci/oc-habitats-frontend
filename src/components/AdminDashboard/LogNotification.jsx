import { React } from 'react';
import { Text, Box, Button, Spacer, Flex } from '@chakra-ui/react';
import { CheckCircleIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const LogNotification = ({ numNotifications }) => {
  return (
    <Box bg="#C6F6D5" h="56px" maxH="56px" ml="110px" mr="110px">
      <Flex h="100%" justify="space-between" align="center">
        <CheckCircleIcon ml="18px" mr="14px" color="green" />
        <Text fontSize="16px">
          There are <b>{numNotifications}</b> new monitor logs to review
        </Text>
        <Spacer />
        <Link to="/logs">
          <Button colorScheme="green" variant="solid" fontWeight="600">
            <Text mr="8px">Review Logs</Text>
            <ArrowForwardIcon />
          </Button>
        </Link>
        <Button colorScheme="#C6F6D5" variant="ghost" ml="21.64px" mr="21.64px">
          <CloseIcon fontSize="13px" />
        </Button>
      </Flex>
    </Box>
  );
};

LogNotification.propTypes = {
  numNotifications: PropTypes.number.isRequired,
};

export default LogNotification;
