import { React } from 'react';
import { Text, Box, Button, Spacer, Flex } from '@chakra-ui/react';
import { CheckCircleIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const LogNotification = ({ numNotifications }) => {
  return (
    <Box bg="#C6F6D5" h="fit-content" borderRadius="6px">
      <Flex
        h="100%"
        direction="row"
        justify="space-between"
        align={{ md: 'center', sm: 'flex-start' }}
        p="8px"
      >
        <Flex direction="row" align={{ md: 'center', sm: 'flex-start' }}>
          <CheckCircleIcon mx="14px" mt={{ lg: 0, sm: '3px' }} color="green" />
          <Text fontSize="16px">
            There are <b>{numNotifications}</b> monitor logs to review
          </Text>
        </Flex>
        <Flex
          direction={{ md: 'row', sm: 'column-reverse' }}
          align={{ md: 'center', sm: 'flex-end' }}
          gap="10px"
        >
          <Link to="/logs">
            <Button size="sm" colorScheme="green" variant="solid" fontWeight="600">
              <Text mr="8px">Review Logs</Text>
              <ArrowForwardIcon />
            </Button>
          </Link>
          <Button colorScheme="#C6F6D5" p={0} variant="ghost">
            <CloseIcon fontSize="13px" />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

LogNotification.propTypes = {
  numNotifications: PropTypes.number.isRequired,
};

export default LogNotification;
