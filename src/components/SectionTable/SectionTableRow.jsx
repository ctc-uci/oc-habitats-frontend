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
import axios from 'axios';
import './SectionTableRow.css';

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

  // fixme this is editing a segment?

  const deleteSegment = async id => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/segment/${id}`);
      // eslint-disable-next-line no-console
      console.log('Clicked Delete Segment');
      setChange(change);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      // eslint-disable-next-line no-alert
      alert(err);
    }
  };

  const editSegment = async id => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/segment/${id}`);
      // eslint-disable-next-line no-console
      console.log('Clicked Edit Segment');
      setChange(change);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      // eslint-disable-next-line no-alert
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

      <Modal size="xl" isOpen={isOpenEdit} onClose={editSegment}>
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
            <Button colorScheme="gray" mr={3} onClick={editSegment}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={editSegment}
              // onClick={() => {
              //   // onUpdateSegment(segId, segName, segLocation, segLink, segParking);
              //   editSegment;
              // }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
const SectionTableRow = ({ row }) => {
  // return (
  //   <Tr {...row.getRowProps()}>
  //     {row.cells.map(cell => {
  //       return (
  //         <Td fontSize="14px" key={row.id} {...cell.getCellProps()}>
  //           {cell.render('Cell')}
  //         </Td>
  //       );
  //     })}
  //   </Tr>
  // );

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

export {
  SectionTableRow,
  SegmentNameColumn,
  MapLinkColumn,
  ParkingColumn,
  UpdateSegmentPopupColumn,
};
