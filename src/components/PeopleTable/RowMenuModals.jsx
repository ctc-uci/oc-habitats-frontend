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
} from '@chakra-ui/react';

const DeletePendingAccountModal = ({ userData, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Pending Account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <br />
          <Text>delete pending account</Text>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr="12px" onClick={onClose}>
            No
          </Button>
          <Button variant="solid" bg="red.600" color="white">
            Yes, Convert Account
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ConvertAccountTypeModal = ({ userData, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Convert Account Type</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <br />
          <Text>convert account</Text>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr="12px" onClick={onClose}>
            No
          </Button>
          <Button variant="solid" bg="green.500" color="white">
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

ConvertAccountTypeModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { DeletePendingAccountModal, ConvertAccountTypeModal };
