import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Flex,
  Link,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { OCHBackend } from '../../common/utils';

const status = {
  MONITOR_LOG_APPROVED: 'success',
  CHANGES_REQUESTED: 'error',
  SUBMISSION_STATUS: 'info',
};

const Notification = ({ id, title, description, type, closeable, logId }) => {
  const [closed, setClosed] = useState(false);
  console.log(logId);

  const onClose = async () => {
    try {
      await OCHBackend.delete(`/notification/${id}`, { withCredentials: true });
      setClosed(true);
      console.log('delete success');
    } catch (err) {
      // TODO: handle error
      console.log(err.message);
    }
  };

  return closed ? (
    ''
  ) : (
    <Alert borderRadius="md" status={status[type]} variant="left-accent">
      <AlertIcon />
      <Flex w="100%" direction={{ md: 'row', base: 'column' }} justify="space-between">
        <Box>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Box>
        {closeable && <CloseButton position="relative" right={-1} top={-1} onClick={onClose} />}
        {type === 'CHANGES_REQUESTED' && (
          <Link href={`/create-log/${logId}`}>
            <Button float="right" colorScheme="red" size="sm" rightIcon={<FiArrowRight />}>
              Go to log
            </Button>
          </Link>
        )}
      </Flex>
    </Alert>
  );
};

Notification.defaultProps = {
  id: '',
  closeable: false,
  logId: '',
};

Notification.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  closeable: PropTypes.bool,
  logId: PropTypes.string,
};

export default Notification;
