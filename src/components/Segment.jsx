/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import {
  IconButton,
  Button,
  Tr,
  Td,
  Text,
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
  Textarea,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';
import './Segment.css';

function UpdateSegmentPopup(
  segment,
  segmentName,
  segmentLocation,
  link,
  parking,
  onUpdateSegment,
  onDeleteSegment,
) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [segId, setSegId] = useState(segment);
  const [segName, setSegName] = useState(segmentName);
  const [segLocation, setSegLocation] = useState(segmentLocation);
  const [segLink, setSegLink] = useState(link);
  const [segParking, setSegParking] = useState(parking);

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
            <Text>Segment ID</Text>
            <Input
              value={segId}
              onChange={event => {
                setSegId(event.target.value);
              }}
            />
            <Text>Segment Name</Text>
            <Input
              value={segName}
              onChange={event => {
                setSegName(event.target.value);
              }}
            />
            <Text>Section Map Link</Text>
            <Textarea
              value={segLink}
              onChange={event => {
                setSegLink(event.target.value);
              }}
            />
            <Text>Street Names</Text>
            <Input
              value={segLocation}
              onChange={event => {
                setSegLocation(event.target.value);
              }}
            />
            <Text>Parking Information</Text>
            <Textarea
              value={segParking}
              onChange={event => {
                setSegParking(event.target.value);
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
                onUpdateSegment(segId, segName, segLocation, segLink, segParking);
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
  parking,
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
        <Text>{parking}</Text>
      </Td>
      <Td isNumeric>
        {UpdateSegmentPopup(
          segment,
          segmentName,
          segmentLocation,
          link,
          parking,
          onUpdateSegment,
          onDeleteSegment,
        )}
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
  parking: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  onUpdateSegment: PropTypes.func.isRequired,
  onDeleteSegment: PropTypes.func.isRequired,
};

export default Segment;
