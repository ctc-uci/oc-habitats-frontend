import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import { React, useState, useEffect } from 'react';

const SubmitSurvey = ({ setModalStep, onClose, submit }) => {
  console.log('entered');
  return (
    <>
      <ModalHeader>Are you sure you want to submit your survey log?</ModalHeader>
      <ModalFooter>
        <Button onClick={() => onClose()}>No</Button>
        <Button
          onClick={() => {
            submit();
            setModalStep('submitted');
          }}
        >
          Yes, Submit My Log
        </Button>
      </ModalFooter>
    </>
  );
};

const Submitted = ({ onClose }) => {
  return (
    <>
      <ModalBody>Congratulations! You’ve submitted your monitor log for review.</ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </>
  );
};

function ReturnPopup({ submitForm }) {
  const [modalStep, setModalStep] = useState('submitSurvey');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setModalStep('reminderSelect');
  });

  const modalContent = {
    submitSurvey: (
      <SubmitSurvey setModalStep={setModalStep} onClose={onClose} submit={submitForm} />
    ),
    submitted: <Submitted onSubmit={submitForm} onClose={onClose} />,
  };

  console.log('Entered Popup');
  return (
    <>
      <Button colorScheme="green" type="submit" onClick={onOpen}>
        {/* {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker */}
        Submit Log <FiCheck style={{ marginLeft: '4px' }} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>{modalContent[modalStep]}</ModalContent>
      </Modal>
    </>
  );
}

SubmitSurvey.propTypes = {
  setModalStep: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

Submitted.propTypes = {
  onClose: PropTypes.func.isRequired,
};

ReturnPopup.propTypes = {
  submitForm: PropTypes.func.isRequired,
};

export default ReturnPopup;
