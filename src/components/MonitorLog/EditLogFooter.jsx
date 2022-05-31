import {
  ButtonGroup,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const ExitModal = (editForm, submissionId) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        variant="outline"
        color="white"
        _hover={{ color: 'black', backgroundColor: 'gray.200' }}
        onClick={onOpen}
      >
        Exit Edit Mode
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginTop="100">
          <ModalHeader>Exit Edit Mode?</ModalHeader>
          <ModalBody>You are about to exit edit mode. Any unread changes will be lost.</ModalBody>
          <ModalFooter>
            <ButtonGroup gap="2px">
              <Button onClick={onClose}>Cancel</Button>
              <Link to={`/review-log/${submissionId}`}>
                <Button colorScheme="red" onClick={editForm}>
                  Yes, Exit
                </Button>
              </Link>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const EditLogFooter = ({ editForm, submissionId }) => {
  const toast = useToast();
  return (
    <>
      <ButtonGroup>
        <ExitModal editForm={editForm} submissionId={submissionId} />
        <Button
          colorScheme="cyan"
          type="submit"
          onClick={async () => {
            await editForm();
            toast({
              title: 'Log saved.',
              status: 'success',
            });
          }}
        >
          {/* {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker */}
          Save Changes
        </Button>
      </ButtonGroup>
    </>
  );
};

EditLogFooter.propTypes = {
  submissionId: PropTypes.string.isRequired,
  editForm: PropTypes.func.isRequired,
};

export default EditLogFooter;
