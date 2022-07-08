import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const ApproveLogPopup = ({ approveLog }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button type="submit" colorScheme="green" onClick={onOpen}>
        Approve
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          {' '}
          <ModalHeader>Approve Log?</ModalHeader>
          <ModalBody>
            You are about to approve this log. Are you sure you&apos;d like to approve?
          </ModalBody>
          <ModalFooter>
            <ButtonGroup gap="2">
              <Button
                onClick={() => {
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" colorScheme="green" onClick={approveLog}>
                Yes, Approve Log
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

ApproveLogPopup.propTypes = {
  approveLog: PropTypes.func.isRequired,
};

export default ApproveLogPopup;
