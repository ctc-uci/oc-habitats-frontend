import { React, useState } from 'react';
import {
  IconButton,
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
import { EditIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';

function UpdateSegmentPopup(segment, segmentName, distance, onUpdateSegment, onDeleteSegment) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [segId, setSegId] = useState(segment);
  const [segName, setSegName] = useState(segmentName);
  const [segDist, setSegDist] = useState(distance);

  return (
    <>
      <IconButton
        size="sm"
        variant="ghost"
        colorScheme="white"
        aria-label="Edit Section"
        icon={<EditIcon />}
        onClick={onOpen}
      >
        opened
      </IconButton>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Segment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={segId}
              onChange={event => {
                setSegId(event.target.value);
              }}
            />
            <Input
              value={segName}
              onChange={event => {
                setSegName(event.target.value);
              }}
            />
            <Input
              value={segDist}
              onChange={event => {
                setSegDist(event.target.value);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                onDeleteSegment();
                onClose();
              }}
            >
              Delete Segment
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onUpdateSegment(segId, segName, segDist);
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

const Segment = ({ segment, segmentName, distance, onUpdateSegment, onDeleteSegment }) => {
  return (
    <Tr>
      <Td>{segment}</Td>
      <Td>{segmentName}</Td>
      <Td>
        <Flex justifyContent="space-between">
          <Text>{distance}</Text>
          {UpdateSegmentPopup(segment, segmentName, distance, onUpdateSegment, onDeleteSegment)}
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
  onDeleteSegment: PropTypes.func.isRequired,
};

export default Segment;
