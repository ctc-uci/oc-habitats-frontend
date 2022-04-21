import { useState, React } from 'react';
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  RadioGroup,
  Radio,
  Stack,
  Input,
  Textarea,
  Text,
} from '@chakra-ui/react';
import Select from 'react-select';
import { AddIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';
import { OCHBackend } from '../common/utils';

const ModalContentStepOne = ({ step, setStep }) => (
  <>
    <ModalHeader>Create New:</ModalHeader>
    <ModalBody>
      <Text>User Type</Text>
      <RadioGroup onChange={setStep} value={step}>
        <Stack column="vertical">
          <Radio value="1">Section</Radio>
          <Radio value="2">Segment</Radio>
        </Stack>
      </RadioGroup>
    </ModalBody>
  </>
);

const ModalContentAddSection = ({ newSecId, newSecName, newSecMapLink }) => (
  <>
    <ModalHeader>Add Section</ModalHeader>
    <ModalBody>
      <Stack column="vertical">
        <Text>Section Id</Text>
        <Input
          onChange={event => {
            newSecId = event.target.value;
          }}
        />
        <Text>Section Name</Text>
        <Input
          onChange={event => {
            newSecName = event.target.value;
          }}
        />
        <Text>Section Map Link</Text>
        <Textarea
          onChange={event => {
            newSecMapLink = event.target.value;
          }}
        />
      </Stack>
    </ModalBody>
  </>
);

const ModalContentAddSegment = ({
  sectionOptions,
  newSection,
  newSegId,
  newSegName,
  newSegLink,
  newSegLocation,
  newSegParking,
}) => (
  <>
    <ModalHeader>Add Segment</ModalHeader>
    <Stack column="vertical">
      <ModalBody>
        <Stack column="vertical"></Stack>
        <Text>Section</Text>

        <Select
          options={sectionOptions}
          onChange={event => {
            newSection = event.value;
          }}
        />
        <Text>Segment ID</Text>
        <Input
          onChange={event => {
            newSegId = event.target.value;
          }}
        />
        <Text>Segment Name</Text>
        <Input
          onChange={event => {
            newSegName = event.target.value;
          }}
        />
        <Text>Section Map Link</Text>
        <Textarea
          onChange={event => {
            newSegLink = event.target.value;
          }}
        />
        <Text>Street Names</Text>
        <Input
          onChange={event => {
            newSegLocation = event.target.value;
          }}
        />
        <Text>Parking Information</Text>
        <Textarea
          onChange={event => {
            newSegParking = event.target.value;
          }}
        />
      </ModalBody>
    </Stack>
  </>
);

const CreateNewSectionButton = ({ onClick }) => (
  <Button
    colorScheme="blue"
    bg="ochBlue"
    color="ochBlack"
    variant="solid"
    onClick={() => onClick()}
  >
    Create New Section
  </Button>
);

const CreateNewSegmentButton = ({ onClick }) => (
  <Button
    colorScheme="blue"
    bg="ochBlue"
    color="ochBlack"
    variant="solid"
    onClick={() => onClick()}
  >
    Create New Segment
  </Button>
);

const NewSectionSegmentPopup = ({ sectionOptions, onAddSection }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState(0);
  const [step, setStep] = useState('0');
  const [newSectionId, setNewSectionId] = useState('');
  const [newSecName, setNewSecName] = useState('');
  const [newSecMapLink, setNewSecMapLink] = useState('');
  const [newSegId, setNewSegId] = useState('');
  const [newSegName, setNewSegName] = useState('');
  const [newSegLocation, setNewSegLocation] = useState('');
  const [newSegLink, setNewSegLink] = useState('');
  const [newSegParking, setNewSegParking] = useState('');

  const handButtonClick = () => {
    onOpen();
    setValue(0);
    setStep('0');
  };

  const addNewSection = async newSection => {
    try {
      // eslint-disable-next-line no-console
      console.log(newSection);
      await OCHBackend.post('/section/', {
        _id: newSection._id,
        name: newSection.name,
        map: newSection.map,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const addNewSegment = async newSegment => {
    try {
      // eslint-disable-next-line no-console
      console.log(newSegment);
      await OCHBackend.post('/segment/', {
        section: newSegment.section,
        segmentId: newSegment.segmentId,
        name: newSegment.name,
        streets: newSegment.streets,
        mapLink: newSegment.mapLink,
        parking: newSegment.parking,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const modalSteps = {
    0: <ModalContentStepOne step={step} setStep={setStep} />,
    1: (
      <ModalContentAddSection
        newSecId={newSectionId}
        newSecName={newSecName}
        newSecMapLink={newSecMapLink}
      />
    ),
    2: (
      <ModalContentAddSegment
        sectionOptions={sectionOptions}
        newSection={newSectionId}
        newSegId={newSegId}
        newSegName={newSegName}
        newSegLink={newSegLink}
        newSegLocation={newSegLocation}
        newSegParking={newSegParking}
      />
    ),
  };

  const modalFooterButtons = {
    0: null,
    1: (
      <CreateNewSectionButton
        onClick={() => {
          addNewSection({
            _id: newSecId,
            name: newSecName,
            map: newSecMapLink,
          });
          onClose();
        }}
      />
    ),
    2: (
      <CreateNewSegmentButton
        onClick={() => {
          addNewSegment({
            section: newSectionId,
            segmentId: newSegId,
            name: newSegName,
            streets: newSegLocation,
            mapLink: newSegLink,
            parking: newSegParking,
          });
          onClose();
        }}
      />
    ),
  };

  return (
    <>
      <Button
        onClick={handButtonClick}
        size="md"
        bg="ochBlue"
        variant="solid"
        rightIcon={<AddIcon />}
      >
        Create New Section or Segment
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {modalSteps[step]}

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            {modalFooterButtons[step]}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

NewSectionSegmentPopup.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sectionOptions: PropTypes.array.isRequired,
  onAddSection: PropTypes.func.isRequired,
};

ModalContentStepOne.propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
};

ModalContentAddSection.propTypes = {
  newSecId: PropTypes.number.isRequired,
  newSecName: PropTypes.string.isRequired,
  newSecMapLink: PropTypes.string.isRequired,
};

ModalContentAddSegment.propTypes = {
  sectionOptions: PropTypes.array.isRequired,
  newSection: PropTypes.number.isRequired,
  newSegId: PropTypes.number.isRequired,
  newSegName: PropTypes.string.isRequired,
  newSegLink: PropTypes.string.isRequired,
  newSegLocation: PropTypes.string.isRequired,
  newSegParking: PropTypes.string.isRequired,
};

CreateNewSectionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

CreateNewSegmentButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NewSectionSegmentPopup;
