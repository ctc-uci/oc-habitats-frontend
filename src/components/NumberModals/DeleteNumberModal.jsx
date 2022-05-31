import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Text,
  VStack,
  Stack,
} from '@chakra-ui/react';

const DeleteNumberModal = ({ deleteNumber, disclosure }) => {
  const checkInput = () => {
    deleteNumber();
    disclosure.onClose();
  };

  return (
    <Modal size="xl" isOpen={disclosure.isOpen} onClose={disclosure}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader align="left" fontWeight={700} fontSize="18px" mb="1em">
          Delete Contact
        </ModalHeader>

        <ModalCloseButton onClick={disclosure.onClose} />
        <ModalBody>
          <Stack spacing="2em" direction="column">
            <VStack align="left">
              <Text fontWeight={500} fontSize="16px">
                Are you sure you want to delete this contact? This action cannot be undone.
              </Text>
            </VStack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <VStack>
            <HStack spacing={4} mt="2em">
              <Button colorScheme="teal" variant="outline" mr={3} onClick={disclosure.onClose}>
                Cancel
              </Button>
              <Button background="#C53030" variant="solid" onClick={checkInput}>
                Yes, Delete
              </Button>
            </HStack>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

DeleteNumberModal.defaultProps = {
  deleteNumber: PropTypes.func,
};

DeleteNumberModal.propTypes = {
  deleteNumber: PropTypes.func,
  disclosure: PropTypes.shape({
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  }).isRequired,
};

export default DeleteNumberModal;
