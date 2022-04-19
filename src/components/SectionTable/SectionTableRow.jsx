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
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
// import axios from 'axios'; // new
// const express = require('express') // new
// const app = express() // new

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

const UpdateSegmentPopupColumn = ({ data }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const [segId, setSegId] = useState('');
  const [segName, setSegName] = useState('');
  const [segLocation, setSegLocation] = useState('');
  const [segLink, setSegLink] = useState('');
  const [segParking, setSegParking] = useState('');
  const [change, setChange] = useState(false); // new

  // const addNewSpecies = async newSpecies => {
  //   await axios.post(`${process.env.REACT_APP_API_URL}/species/`, {
  //     name: newSpecies.name,
  //     code: newSpecies.code,
  //     isEndangered: newSpecies.group === 'endangered',
  //     isAssigned: false,
  //   });
  //   setChange(change);
  // };

  const handleDeleteClick = async () => {
    // await axios.delete(`${process.env.REACT_APP_API_URL}/sections/`, {
    //   id: data,
    // });
    // console.log('Clicked');
    setChange(change);
  };

  return (
    <>
      <Menu>
        <MenuButton>
          <BsThreeDotsVertical />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpenEdit}>Edit Segment</MenuItem>
          {/* <MenuItem><Text color='red' onClick={onOpenDelete}>Delete Segment</Text></MenuItem> */}
          <MenuItem onClick={handleDeleteClick}>
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
            <Button colorScheme="gray" mr={3} onClick={onCloseEdit}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                // onUpdateSegment(segId, segName, segLocation, segLink, segParking);
                onCloseEdit();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
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
MapLinkColumn.propTypes = {
  data: PropTypes.string.isRequired,
};
ParkingColumn.propTypes = {
  data: PropTypes.string.isRequired,
};

UpdateSegmentPopupColumn.propTypes = {
  data: PropTypes.string.isRequired,
};

export { SegmentNameColumn, MapLinkColumn, ParkingColumn, UpdateSegmentPopupColumn };
