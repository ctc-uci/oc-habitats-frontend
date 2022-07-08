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
  approved: 'success',
  changes: 'error',
  status: 'info',
};

const Notification = ({ id, title, description, type, closeable, logId }) => {
  const [closed, setClosed] = useState(false);

  const onClose = async () => {
    try {
      await OCHBackend.delete(`/notification/${id}`, { withCredentials: true });
      setClosed(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.message);
    }
  };

  return closed ? (
    ''
  ) : (
    <Alert borderRadius="md" status={status[type]} variant="left-accent">
      <AlertIcon />
      <Flex w="100%" direction={{ md: 'row', base: 'column' }}>
        <Flex w="100%" direction="row" justify="space-between">
          <Box>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </Box>
          {closeable && <CloseButton position="relative" right={-1} top={-1} onClick={onClose} />}
        </Flex>
        {type === 'changes' && (
          <Link alignSelf="flex-end" href={`/create-log/${logId}`}>
            <Button
              mt={{ md: '0', base: '8px' }}
              colorScheme="red"
              size="sm"
              rightIcon={<FiArrowRight />}
            >
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
