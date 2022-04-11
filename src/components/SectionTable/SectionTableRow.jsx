import { React, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tr,
  Td,
  VStack,
  HStack,
  Flex,
  Avatar,
  Badge,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  Button,
  Input,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

// Custom component to render Name
const SegmentNameColumn = ({ data }) => {
  return (
    <>
      <VStack>
        <div className="segmentname-container">{data.name}</div>
        <div className="location-container">{data.description}</div>
      </VStack>
    </>
  );
};

const ParkingColumn = ({ data }) => {
  return (
    <>
      <HStack w="100%" justifyContent="space-between">
        <VStack align="normal">
          <Text>{data}</Text>
        </VStack>
        <div>
          <UpdateSegmentPopup />
        </div>
      </HStack>
    </>
  );
};

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
        size="xl"
        variant="ghost"
        colorScheme="white"
        aria-label="Edit Segment"
        icon={<BsThreeDotsVertical />}
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
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
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
const SectionTableRow = ({ row }) => {
  return (
    <Tr {...row.getRowProps()}>
      {row.cells.map(cell => {
        return (
          <Td fontSize="14px" key={row.id} {...cell.getCellProps()}>
            {cell.render('Cell')}
          </Td>
        );
      })}
    </Tr>
  );
};
SegmentNameColumn.propTypes = {
  data: PropTypes.string.isRequired,
};

SectionTableRow.propTypes = {
  row: PropTypes.string.isRequired,
};

ParkingColumn.propTypes = {
  data: PropTypes.string.isRequired,
};

export { SegmentNameColumn, ParkingColumn, UpdateSegmentPopup };
