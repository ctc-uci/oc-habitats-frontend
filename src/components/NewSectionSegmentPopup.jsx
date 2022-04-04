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
  Text,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';
import Section from './Section';

function NewSectionSegmentPopup(onAddSegment) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('0');
  const [volInput, setVolInput] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  // const volHandleChange = event => setVolInput(event.target.value);
  // const adminNameHandleChange = event => setAdminName(event.target.value);
  // const adminEmailHandleChange = event => setAdminEmail(event.target.value);
  let newSegId = '';
  let newSegName = '';
  let newSegDist = '';
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
            <RadioGroup onChange={setValue} value={value}>
              <Stack column="vertical">
                <Radio value="1">Section</Radio>
                <Radio value="2">Segment</Radio>
              </Stack>
            </RadioGroup>
            {value === '1' && (
              <Stack columnt="vertical">
                <br />
                <Text>Section ID</Text>
                <Input
                  onChange={event => {
                    newSegId = event.target.value;
                  }}
                />
                <Text>Section Name</Text>
                <Input
                  onChange={event => {
                    newSegName = event.target.value;
                  }}
                />
                <Text>Section Distance</Text>
                <Input
                  onChange={event => {
                    newSegDist = event.target.value;
                  }}
                />
              </Stack>
            )}
            {value === '2' && <Text>Placeholder for Segment Form</Text>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              bg="ochBlue"
              color="#F7FAFC"
              variant="solid"
              onClick={() => {
                onAddSegment(newSegId, newSegName, newSegDist);
                onClose();
              }}
            >
              Create New User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const CreateNew = ({ onAddSegment }) => {
  return <Box align="left">{NewSectionSegmentPopup(onAddSegment)}</Box>;
};

CreateNew.propTypes = {
  onAddSegment: PropTypes.func.isRequired,
};
export default CreateNew;
