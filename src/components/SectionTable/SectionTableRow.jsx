/* eslint-disable no-unused-vars */
import { React, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tr,
  Td,
  VStack,
  HStack,
  Text,
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
  Link,
  Select,
  useToast,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './SectionTableRow.css';
import { OCHBackend } from '../../common/utils';

// Custom component to render Name
const SegmentNameColumn = ({ data }) => {
  return (
    <VStack>
      <div className="segmentname-container">
        {data.segmentId} {data.name}
      </div>
      <div className="location-container">{data.streets}</div>
    </VStack>
  );
};

const ParkingColumn = ({ data }) => {
  return (
    <HStack w="100%" justifyContent="space-between">
      <VStack align="normal">
        <Text>{data}</Text>
      </VStack>
    </HStack>
  );
};

const MapLinkColumn = ({ data }) => {
  return (
    <Link href={data} isExternal>
      <u>Link</u>
    </Link>
  );
};

const UpdateSegmentPopupColumn = ({ data, allSections, updateSections, currentSection }) => {
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const [sectionID, setSectionID] = useState(currentSection);
  const [segId, setSegId] = useState(data.segmentId);
  const [segName, setSegName] = useState(data.name);
  const [segLocation, setSegLocation] = useState(data.streets);
  const [segLink, setSegLink] = useState(data.mapLink);
  const [segParking, setSegParking] = useState(data.parking);
  const toast = useToast();

  const deleteSegment = async () => {
    try {
      await OCHBackend.delete(`/segment/${data._id}`, {
        sectionId: sectionID,
      });
      toast({
        title: `Successfully deleted Segment ${segId}.`,
        status: 'success',
        isClosable: true,
      });
      updateSections();
      onCloseEdit();
    } catch (err) {
      toast({
        title: `Unable to delete Segment ${segId}.`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const editSegment = async () => {
    try {
      const putData = {
        section: sectionID,
        segmentId: segId,
        name: segName,
        streets: segLocation,
        mapLink: segLink,
        parking: segParking,
      };
      await OCHBackend.put(`/segment/${data._id}`, putData);
      toast({
        title: `Successfully updated Segment ${segId}.`,
        description: `Segment ${segId} has been updated.`,
        status: 'success',
        isClosable: true,
      });
      updateSections();
      onCloseEdit();
    } catch (err) {
      toast({
        title: `Unable to update Segment ${segId}.`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <div style={{ textAlign: 'right' }}>
      <Menu>
        <MenuButton size="xl">
          <BsThreeDotsVertical color="ochBlack" />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpenEdit}>Edit Segment</MenuItem>
          <MenuItem onClick={deleteSegment}>
            <Text color="red">Delete Segment</Text>
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal size="xl" isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent p={3}>
          <ModalHeader>Edit Segment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Section</Text>
            <Select
              value={sectionID}
              defaultValue={sectionID}
              onChange={e => setSectionID(e.target.value)}
            >
              {allSections?.map(section => (
                <option key={section._id} value={section._id}>
                  {section.name}
                </option>
              ))}
            </Select>
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
          <ModalFooter pr={0}>
            <Button colorScheme="gray" mr={3} onClick={onCloseEdit}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              bg="ochBlue"
              color="ochBlack"
              variant="solid"
              mr={3}
              onClick={editSegment}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
const SectionTableRow = ({ row }) => {
  return (
    <Tr {...row.getRowProps()}>
      {row.cells.map(cell => {
        return (
          <Td key={row.id} {...cell.getCellProps()}>
            {cell.render('Cell')}
          </Td>
        );
      })}
    </Tr>
  );
};

SegmentNameColumn.propTypes = {
  data: PropTypes.shape({
    segmentId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    streets: PropTypes.string.isRequired,
  }).isRequired,
};

SectionTableRow.propTypes = {
  row: PropTypes.string.isRequired,
};
MapLinkColumn.propTypes = {
  data: PropTypes.string.isRequired,
};
ParkingColumn.propTypes = {
  data: PropTypes.string.isRequired,
};

UpdateSegmentPopupColumn.propTypes = {
  data: PropTypes.string.isRequired,
  allSections: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  updateSections: PropTypes.func.isRequired,
  currentSection: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export {
  SectionTableRow,
  SegmentNameColumn,
  MapLinkColumn,
  ParkingColumn,
  UpdateSegmentPopupColumn,
};
