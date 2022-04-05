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
  VStack,
  Link,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';
import './Segment.css';

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

// Custom component to render Name
const Name = ({ segment, segmentName, segmentLocation }) => {
  return (
    <>
      <VStack>
        <div className="segmentname-container">
          {segment} {segmentName}
        </div>
        <div className="location-container">{segmentLocation}</div>
      </VStack>
    </>
  );
};

const Segment = ({
  segment,
  segmentName,
  segmentLocation,
  link,
  distance,
  onUpdateSegment,
  onDeleteSegment,
}) => {
  return (
    <Tr>
      <Td>
        <Name segment={segment} segmentName={segmentName} segmentLocation={segmentLocation} />
      </Td>
      <Td>
        <Link href={link} isExternal>
          <u>Link</u>
        </Link>
      </Td>
      <Td>
        <Flex justifyContent="space-between">
          <Text>{distance}</Text>
          {UpdateSegmentPopup(segment, segmentName, distance, onUpdateSegment, onDeleteSegment)}
        </Flex>
      </Td>
    </Tr>
  );
};
Name.propTypes = {
  segment: PropTypes.string.isRequired,
  segmentName: PropTypes.string.isRequired,
  segmentLocation: PropTypes.string.isRequired,
};
Segment.propTypes = {
  segment: PropTypes.string.isRequired,
  segmentName: PropTypes.string.isRequired,
  segmentLocation: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  onUpdateSegment: PropTypes.func.isRequired,
  onDeleteSegment: PropTypes.func.isRequired,
};

export default Segment;
