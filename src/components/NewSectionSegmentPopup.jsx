import { useState, React } from 'react';
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Stack,
  Input,
  Textarea,
  Text,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';
import axios from 'axios';

function NewSectionSegmentPopup(onAddSection) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState(0);
  const [step, setStep] = useState('0');
  const [change, setChange] = useState(true);
  // const [volInput, setVolInput] = useState('');
  // const [adminName, setAdminName] = useState('');
  // const [adminEmail, setAdminEmail] = useState('');
  // const volHandleChange = event => setVolInput(event.target.value);
  // const adminNameHandleChange = event => setAdminName(event.target.value);
  // const adminEmailHandleChange = event => setAdminEmail(event.target.value);
  let newSection = '';
  let newSecId = '';
  let newSecName = '';
  let newSecMapLink = '';
  let newSegId = '';
  let newSegName = '';
  let newSegLocation = '';
  let newSegLink = '';
  let newSegParking = '';
  const handButtonClick = () => {
    onOpen();
    setValue(0);
    setStep('0');
  };

  const addNewSegment = ({ newSegment }) => {
    axios.post(`${process.env.REACT_APP_API_URL}/segment/`, {
      deadline: null,
      section: newSegment.section,
      segmentId: newSegment.segmentId,
      name: newSegment.name,
      streets: newSegment.streets,
      mapLink: newSegment.mapLink,
      parking: newSegment.parking,
      volunteers: [],
    });
    setChange(!change);
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
          <ModalHeader>Create New:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {step === '0' && (
              <>
                <Text>User Type</Text>
                <RadioGroup onChange={setStep} step={value}>
                  <Stack column="vertical">
                    <Radio value="1">Section</Radio>
                    <Radio value="2">Segment</Radio>
                  </Stack>
                </RadioGroup>
              </>
            )}
            {step === '2' && (
              <Stack column="vertical">
                <ModalHeader>Add Segment</ModalHeader>
                <Text>Section</Text>
                <Input
                  onChange={event => {
                    newSection = event.target.value;
                  }}
                />
                <Text>Segment ID</Text>
                <Input
                  onChange={event => {
                    newSegId = event.target.value;
                  }}
                />
                <Select>
                  <option value="option1">Option 1</option>
                </Select>
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
              </Stack>
            )}
            {step === '1' && (
              <Stack column="vertical">
                <ModalHeader>Add Section</ModalHeader>
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
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            {step === '1' && (
              <Button
                colorScheme="blue"
                bg="ochBlue"
                color="#F7FAFC"
                variant="solid"
                onClick={() => {
                  onAddSection(newSecId, newSecName, newSecMapLink);
                  onClose();
                }}
              >
                Create New Section
              </Button>
            )}
            {step === '2' && (
              <Button
                colorScheme="blue"
                bg="ochBlue"
                color="#F7FAFC"
                variant="solid"
                onClick={() => {
                  addNewSegment({
                    section: newSection,
                    segmentId: newSegId,
                    name: newSegName,
                    streets: newSegLocation,
                    mapLink: newSegLink,
                    parking: newSegParking,
                  });
                  // onAddSegment(newSegId, newSegName, newSegLocation, newSegLink, newSegParking);
                  onClose();
                }}
              >
                Create New Segment
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const CreateNew = ({ onAddSection, onAddSegment }) => {
  return <Box align="left">{NewSectionSegmentPopup(onAddSection, onAddSegment)}</Box>;
};

CreateNew.propTypes = {
  onAddSection: PropTypes.func.isRequired,
  onAddSegment: PropTypes.func.isRequired,
};
export default CreateNew;
