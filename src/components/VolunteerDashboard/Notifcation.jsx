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
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { OCHBackend } from '../../common/utils';

const status = {
  MONITOR_LOG_APPROVED: 'success',
  CHANGES_REQUESTED: 'error',
  SUBMISSION_STATUS: 'info',
};

const Notification = ({ id, title, description, type, closeable }) => {
  const [closed, setClosed] = useState(false);

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
      <Flex w="100%" direction="row" justify="space-between">
        <Box>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Box>
        {closeable && <CloseButton position="relative" right={-1} top={-1} onClick={onClose} />}
      </Flex>
      {type === 'CHANGES_REQUESTED' && (
        <Button float="right" colorScheme="red" size="sm" rightIcon={<FiArrowRight />} />
      )}
    </Alert>
  );
};

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  closeable: PropTypes.bool.isRequired,
};

export default Notification;
