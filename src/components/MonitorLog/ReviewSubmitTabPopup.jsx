import {
  Button,
  ButtonGroup,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import confirmSubmission from '../../assets/confirmSubmission.svg';
import monitorLogSubmissionComplete from '../../assets/monitorLogSubmissionComplete.svg';

const SubmitSurvey = ({ setModalStep, onClose, submit, editForm, formMethods }) => {
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
              const currentStatus = formMethods.getValues('status');
              if (!currentStatus || currentStatus === 'UNSUBMITTED') {
                formMethods.setValue('status', 'UNDER_REVIEW');
              } else {
                formMethods.setValue('status', 'RESUBMITTED');
              }
              formMethods.setValue('submittedAt', new Date());
              if (formMethods.getValues('_id')) {
                editForm();
              } else {
                submit();
              }
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
        <Center marginTop="20px">
          <Text textAlign="center" fontWeight="bold" fontSize="2xl">
            Congratulations! You’ve submitted your monitor log for review.
          </Text>
        </Center>
        <br />
        <Center>
          <Image maxH="326px" maxW="362px" src={monitorLogSubmissionComplete} alt="Confirmation" />
        </Center>
      </ModalBody>
      <ModalFooter>
        <Link to="/">
          <Button colorScheme="cyan" onClick={onClose}>
            Done
          </Button>
        </Link>
      </ModalFooter>
    </>
  );
};

function ReturnPopup({ submitForm, editForm, formMethods }) {
  const [modalStep, setModalStep] = useState('submitSurvey');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onSubmitButton = () => {
    if (!formMethods.getValues('segment')) {
      toast({
        title: 'Missing information',
        description: 'Please select a segment before submitting.',
        status: 'error',
      });
      return;
    }
    if (!formMethods.getValues('date')) {
      toast({
        title: 'Missing information',
        description: 'Please input a date before submitting.',
        status: 'error',
      });
      return;
    }
    onOpen();
  };

  // useEffect(() => {
  //   setModalStep('reminderSelect');
  // });

  const modalContent = {
    submitSurvey: (
      <SubmitSurvey
        setModalStep={setModalStep}
        onClose={onClose}
        submit={submitForm}
        editForm={editForm}
        formMethods={formMethods}
      />
    ),
    submitted: <Submitted onSubmit={submitForm} onClose={onClose} />,
  };

  return (
    <>
      <Button colorScheme="green" type="submit" onClick={onSubmitButton}>
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
  editForm: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formMethods: PropTypes.object.isRequired,
};

Submitted.propTypes = {
  onClose: PropTypes.func.isRequired,
};

ReturnPopup.propTypes = {
  submitForm: PropTypes.func.isRequired,
  editForm: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formMethods: PropTypes.object.isRequired,
};

export default ReturnPopup;
