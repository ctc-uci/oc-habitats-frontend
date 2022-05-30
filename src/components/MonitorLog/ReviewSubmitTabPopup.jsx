import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Image,
  Center,
  Text,
  ButtonGroup,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { FiCheck } from 'react-icons/fi';
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import confirmSubmission from '../../assets/confirmSubmission.svg';
import monitorLogSubmissionComplete from '../../assets/monitorLogSubmissionComplete.svg';

const SubmitSurvey = ({ setModalStep, onClose, submit, formMethods }) => {
  return (
    <>
      <ModalHeader>Are you sure you want to submit your survey log?</ModalHeader>
      <ModalBody>
        <Center>
          <Image maxH="270px" maxW="300px" src={confirmSubmission} alt="Are you sure?" />
        </Center>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup gap="2">
          <Button onClick={() => onClose()}>No</Button>
          <Button
            type="submit"
            colorScheme="green"
            onClick={() => {
              formMethods.setValue({
                status: 'UNDER_REVIEW',
              });
              submit();
              setModalStep('submitted');
            }}
            variant="solidNoHover"
          >
            Yes, Submit My Log
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </>
  );
};

const Submitted = ({ onClose }) => {
  return (
    <>
      <ModalBody>
        <Center>
          <Text fontSize="2xl">Congratulations! You’ve submitted your monitor log for review.</Text>
        </Center>
        <br />
        <Center>
          <Image maxH="326px" maxW="362px" src={monitorLogSubmissionComplete} alt="Confirmation" />
        </Center>
      </ModalBody>
      <ModalFooter>
        <Link to="/">
          <Button onClick={onClose}>Close</Button>
        </Link>
      </ModalFooter>
    </>
  );
};

function ReturnPopup({ submitForm, formMethods }) {
  const [modalStep, setModalStep] = useState('submitSurvey');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // useEffect(() => {
  //   setModalStep('reminderSelect');
  // });

  const modalContent = {
    submitSurvey: (
      <SubmitSurvey
        setModalStep={setModalStep}
        onClose={onClose}
        submit={submitForm}
        formMethods={formMethods}
      />
    ),
    submitted: <Submitted onSubmit={submitForm} onClose={onClose} />,
  };

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
  // eslint-disable-next-line react/forbid-prop-types
  formMethods: PropTypes.object.isRequired,
};

Submitted.propTypes = {
  onClose: PropTypes.func.isRequired,
};

ReturnPopup.propTypes = {
  submitForm: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formMethods: PropTypes.object.isRequired,
};

export default ReturnPopup;
