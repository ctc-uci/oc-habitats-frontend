import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';
import { OCHBackend } from '../../common/utils';
import AUTH_ROLES from '../../common/auth_config';

const { ADMIN_ROLE, VOLUNTEER_ROLE } = AUTH_ROLES.AUTH_ROLES;

const DeletePendingAccountModal = ({ userData, isOpen, onClose }) => {
  // Workaround for responsive modal sizes
  const size = useBreakpointValue({ base: 'sm', md: 'md' });
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Pending Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <br />
          <Text>
            Are you sure you want to <Text as="b">delete {userData.email}</Text>&apos;s pending
            account? This action cannot be undone.
          </Text>
          <br />
        </ModalBody>
        <ModalFooter>
          <Button w="120px" colorScheme="gray" mr="12px" onClick={onClose}>
            No
          </Button>
          <Button w="120px" variant="solid" bg="red.600" color="white">
            Yes, Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ClearSegmentModal = ({ userData, isOpen, onClose, refreshData }) => {
  // Workaround for responsive modal sizes
  const size = useBreakpointValue({ base: 'sm', md: 'md' });

  const clearSegmentAssignments = async () => {
    await OCHBackend.put('/users/setSegmentAssignments', {
      profileId: userData?.userId,
      segmentIds: [],
    });
    await refreshData();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Clear Segment Assignments</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <br />
          <Text>
            Are you sure you want to{' '}
            <Text as="b">clear {userData.name}&apos;s segment assignments?</Text> This action cannot
            be undone.
          </Text>
          <br />
        </ModalBody>
        <ModalFooter>
          <Button w="120px" colorScheme="gray" mr="12px" onClick={onClose}>
            No
          </Button>
          <Button variant="solid" bg="red.600" color="white" onClick={clearSegmentAssignments}>
            Yes, Clear Assignment(s)
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ConvertAccountTypeModal = ({ userData, isOpen, onClose }) => {
  // Workaround for responsive modal sizes
  const modalSizes = useBreakpointValue({ base: 'sm', md: 'md' });
  const modalText = {
    [ADMIN_ROLE]: (
      <>
        Admin account to a <Text as="b">Volunteer account</Text>?
      </>
    ),
    [VOLUNTEER_ROLE]: (
      <>
        Volunteer account to an <Text as="b">Admin account</Text>?{' '}
      </>
    ),
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSizes} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Convert Account Type</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <br />
          <Text>
            Are you sure you want to convert <Text as="b">{userData.name}</Text>&apos;s{' '}
            {modalText[userData.role]}
          </Text>
          <br />
        </ModalBody>
        <ModalFooter>
          <Button w="120px" colorScheme="gray" mr="12px" onClick={onClose}>
            No
          </Button>
          <Button w="200px" variant="solid" bg="green.500" color="white">
            Yes, Convert Account
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

DeletePendingAccountModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ClearSegmentModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.object.isRequired,
  refreshData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ConvertAccountTypeModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { DeletePendingAccountModal, ClearSegmentModal, ConvertAccountTypeModal };
