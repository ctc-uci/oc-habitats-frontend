import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  RadioGroup,
  Radio,
  Textarea,
  Text,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import { React, useState, useEffect } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const EditLog = ({ setModalStep, onClose, user }) => {
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
                navigate(`/edit-log/${user}`);
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
  segmentData,
}) => {
  const toast = useToast();
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
              editForm();
              onClose();
              toast({
                title: <Text>Requested Edits!</Text>,
                description: (
                  <Text>
                    You&apos;ve requested edits to {submitterData.firstName}{' '}
                    {submitterData.lastName}
                    &apos;s log for segment {segmentData.segmentId} on {date.getMonth() + 1}-
                    {date.getDate()}-{date.getFullYear()}.
                  </Text>
                ),
                status: 'warning',
              });
              setModalStep('editLog');
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

const EditLogPopup = ({ user, editForm, formMethods, submitterData, segmentData }) => {
  const [modalStep, setModalStep] = useState('editLog');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalContent = {
    editLog: <EditLog setModalStep={setModalStep} onClose={onClose} user={user} />,
    request: (
      <RequestEdits
        setModalStep={setModalStep}
        onClose={onClose}
        editForm={editForm}
        formMethods={formMethods}
        submitterData={submitterData}
        segmentData={segmentData}
      />
    ),
  };

  return (
    <>
      <Button colorScheme="green" type="submit" onClick={onOpen}>
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
  user: PropTypes.string.isRequired,
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
  segmentData: PropTypes.object.isRequired,
};

EditLogPopup.propTypes = {
  user: PropTypes.string.isRequired,
  editForm: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formMethods: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  submitterData: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  segmentData: PropTypes.object.isRequired,
};

export default EditLogPopup;
