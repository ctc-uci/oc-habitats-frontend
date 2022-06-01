import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { intlFormat } from 'date-fns';
import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const EditLog = ({ setModalStep, onClose, submissionId }) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  return (
    <>
      <ModalHeader>Edit Log</ModalHeader>
      <ModalBody>
        <Text>Would you rather...</Text>
        <RadioGroup
          value={selected}
          onChange={val => {
            setSelected(val);
          }}
        >
          <Radio value="directly">Directly edit the log</Radio>
          <Radio value="request">Request the surveyor to revise & resubmit the log</Radio>
        </RadioGroup>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup gap="2">
          <Button
            onClick={() => {
              onClose();
              setModalStep('editLog');
            }}
          >
            Cancel
          </Button>
          <Button
            bg="ochBlue"
            onClick={() => {
              if (selected === 'request') {
                setModalStep(selected);
              } else {
                navigate(`/edit-log/${submissionId}`);
              }
            }}
            variant="solidNoHover"
            isDisabled={!selected}
          >
            Next
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </>
  );
};

const RequestEdits = ({
  setModalStep,
  onClose,
  editForm,
  formMethods,
  submitterData,
  submissionData,
  segmentData,
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  return (
    <>
      <ModalHeader>You are requesting edits to this monitor log.</ModalHeader>
      <ModalBody>
        <Text>Reason</Text>
        <Textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Type here..."
        />
      </ModalBody>
      <ModalFooter>
        <ButtonGroup gap="2">
          <Button
            onClick={() => {
              onClose();
              setModalStep('editLog');
            }}
          >
            Cancel
          </Button>
          <Button
            bg="ochBlue"
            variant="solidNoHover"
            onClick={() => {
              const date = new Date();
              formMethods.setValue('requestedEdits', { requests: value, requestDate: date });
              formMethods.setValue('status', 'EDITS_REQUESTED');
              editForm();
              onClose();
              toast({
                title: <Text>Requested Edits!</Text>,
                description: (
                  <Text>
                    You&apos;ve requested edits to {submitterData.firstName}{' '}
                    {submitterData.lastName}
                    &apos;s log for segment {segmentData.segmentId} from{' '}
                    {intlFormat(submissionData.date)}.
                  </Text>
                ),
                status: 'warning',
              });
              setModalStep('editLog');
              navigate('/logs');
            }}
            isDisabled={value === ''}
          >
            Send Request
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </>
  );
};

const EditLogPopup = ({
  submissionId,
  editForm,
  formMethods,
  submitterData,
  submissionData,
  segmentData,
}) => {
  const [modalStep, setModalStep] = useState('editLog');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalContent = {
    editLog: <EditLog setModalStep={setModalStep} onClose={onClose} submissionId={submissionId} />,
    request: (
      <RequestEdits
        setModalStep={setModalStep}
        onClose={onClose}
        editForm={editForm}
        formMethods={formMethods}
        submitterData={submitterData}
        submissionData={submissionData}
        segmentData={segmentData}
      />
    ),
  };

  return (
    <>
      <Button
        type="submit"
        variant="outline"
        color="white"
        _hover={{ color: 'black', backgroundColor: 'gray.200' }}
        onClick={onOpen}
      >
        {/* {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker */}
        Edit Log <FiEdit2 style={{ marginLeft: '4px' }} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>{modalContent[modalStep]}</ModalContent>
      </Modal>
    </>
  );
};

EditLog.propTypes = {
  setModalStep: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  submissionId: PropTypes.string.isRequired,
};

RequestEdits.propTypes = {
  setModalStep: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  editForm: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formMethods: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  submitterData: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  submissionData: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  segmentData: PropTypes.object.isRequired,
};

EditLogPopup.propTypes = {
  submissionId: PropTypes.string.isRequired,
  editForm: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formMethods: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  submitterData: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  submissionData: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  segmentData: PropTypes.object.isRequired,
};

export default EditLogPopup;
