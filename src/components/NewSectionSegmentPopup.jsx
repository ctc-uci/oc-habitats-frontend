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
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';
import Section from './Section';

function NewSectionSegmentPopup(onAddSection, onAddSegment) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('0');
  const [volInput, setVolInput] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  // const volHandleChange = event => setVolInput(event.target.value);
  // const adminNameHandleChange = event => setAdminName(event.target.value);
  // const adminEmailHandleChange = event => setAdminEmail(event.target.value);
  let newSecId = '';
  let newSecName = '';
  let newSecMapLink = '';
  let newSegId = '';
  let newSegName = '';
  let newSegLocation = '';
  let newSegLink = '';
  let newSegParking = '';
  return (
    <>
      <Button
        onClick={onOpen}
        size="md"
        bg="ochBlue"
        variant="solid"
        rightIcon={<AddIcon />}
        value="0"
      >
        Create New Section or Segment
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>User Type</Text>
            <RadioGroup onChange={setValue} value={value}>
              <Stack column="vertical">
                <Radio value="1">Section</Radio>
                <Radio value="2">Segment</Radio>
              </Stack>
            </RadioGroup>
            {value === '2' && (
              <Stack columnt="vertical">
                <ModalHeader>Add Segment</ModalHeader>
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
              </Stack>
            )}
            {value === '1' && (
              <Stack columnt="vertical">
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
            {value === '1' && (
              <Button
                colorScheme="blue"
                bg="ochBlue"
                color="#F7FAFC"
                variant="solid"
                onClick={() => {
                  onAddSection(newSecName);
                  onClose();
                }}
              >
                Create New Section
              </Button>
            )}
            {value === '2' && (
              <Button
                colorScheme="blue"
                bg="ochBlue"
                color="#F7FAFC"
                variant="solid"
                onClick={() => {
                  onAddSegment(newSegId, newSegName, newSegLocation, newSegLink, newSegParking);
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
