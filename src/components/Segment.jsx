import { React } from 'react';
import {
  Button,
  Tr,
  Td,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

function UpdateSegmentPopup(onUpdateSegment) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let editedSegID = '[update] default id';
  let editedSegName = '[update] default name';
  let editedSegDist = '[update] default dist';
  return (
    <>
      <Button backgroundColor="#A0AEC0" color="white" size="sm" onClick={onOpen}>
        Update
      </Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Segment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <div>*UPDATE SEGMENT HERE*</div> */}
            <Input
              placeholder="Edit segment id here"
              onChange={event => {
                editedSegID = event.target.value;
              }}
            />
            <Input
              placeholder="Edit segment name here"
              onChange={event => {
                editedSegName = event.target.value;
              }}
            />
            <Input
              placeholder="Edit segment distance here"
              onChange={event => {
                editedSegDist = event.target.value;
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onUpdateSegment(editedSegID, editedSegName, editedSegDist);
                onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const Segment = ({ segment, segmentName, distance, onUpdateSegment }) => {
  return (
    <Tr>
      <Td>{segment}</Td>
      <Td>{segmentName}</Td>
      <Td>
        <Flex justifyContent="space-between">
          <Text>{distance}</Text>
          {UpdateSegmentPopup(onUpdateSegment)}
        </Flex>
      </Td>
    </Tr>
  );
};

Segment.propTypes = {
  segment: PropTypes.string.isRequired,
  segmentName: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  onUpdateSegment: PropTypes.func.isRequired,
};

export default Segment;
