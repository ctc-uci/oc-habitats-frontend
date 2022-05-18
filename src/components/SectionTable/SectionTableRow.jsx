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
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import './SectionTableRow.css';
// import UpdateDeleteSegmentMenu from './SectionTableEditDeleteMenu';

// Custom component to render Name
const SegmentNameColumn = ({ data }) => {
  return (
    <>
      <VStack>
        <div className="segmentname-container">
          {data.segmentId} {data.name}
        </div>
        <div className="location-container">{data.streets}</div>
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

        {/* <div>
          <UpdateSegmentPopup />
        </div> */}
      </HStack>
    </>
  );
};

const MapLinkColumn = ({ data }) => {
  return (
    <>
      <Link href={`${data}`} isExternal>
        <u>Link</u>
      </Link>
    </>
  );
};

const UpdateSegmentPopupColumn = ({ data, allSections, updateSections, currentSection }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const [sectionID, setSectionID] = useState(currentSection);
  const [segId, setSegId] = useState(data.segmentId);
  const [segName, setSegName] = useState(data.name);
  const [segLocation, setSegLocation] = useState(data.streets);
  const [segLink, setSegLink] = useState(data.mapLink);
  const [segParking, setSegParking] = useState(data.parking);
  console.log('DATA', sectionID);

  const deleteSegment = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/segment/${data._id}`);
      updateSections();
      onCloseEdit();
    } catch (err) {
      alert(err);
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
      await axios.put(`${process.env.REACT_APP_API_URL}/segment/${data._id}`, putData);
      updateSections();
      onCloseEdit();
    } catch (err) {
      console.log(err);
      alert(err);
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
          {/* <MenuItem><Text color='red' onClick={onOpenDelete}>Delete Segment</Text></MenuItem> */}
          <MenuItem onClick={deleteSegment}>
            <Text color="red">Delete Segment</Text>
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal size="xl" isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Segment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="left" spacing="20px">
              <FormLabel>Section</FormLabel>
              {/* <Text>Section</Text> */}
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
              <FormLabel>Segment Id</FormLabel>
              {/* <Text>Segment Id</Text> */}
              <Input
                value={segId}
                onChange={event => {
                  setSegId(event.target.value);
                }}
              />
              <FormLabel>Segment Name</FormLabel>
              {/* <Text>Segment Name</Text> */}
              <Input
                value={segName}
                onChange={event => {
                  setSegName(event.target.value);
                }}
              />
              <FormLabel>Segment Map Link</FormLabel>
              {/* <Text>Section Map Link</Text> */}
              <Textarea
                value={segLink}
                onChange={event => {
                  setSegLink(event.target.value);
                }}
              />
              <FormLabel>Street Names</FormLabel>
              {/* <Text>Street Names</Text> */}
              <Input
                value={segLocation}
                onChange={event => {
                  setSegLocation(event.target.value);
                }}
              />
              <FormLabel>Parking Information</FormLabel>
              {/* <Text>Parking Information</Text> */}
              <Textarea
                value={segParking}
                onChange={event => {
                  setSegParking(event.target.value);
                }}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
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
