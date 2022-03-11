import { React, useState } from 'react';
import {
  Text,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Button,
  Spacer,
  IconButton,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';
import Segment from './Segment';

function AddSegmentPopup(onAddSegment) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let newSegId = '';
  let newSegName = '';
  let newSegDist = '';

  return (
    <>
      <Button color="#2D3748" colorScheme="white" variant="ghost" fontSize="16px" onClick={onOpen}>
        + Add a segment
      </Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a segment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter segment id here"
              onChange={event => {
                newSegId = event.target.value;
              }}
            />
            <Input
              placeholder="Enter segment name here"
              onChange={event => {
                newSegName = event.target.value;
              }}
            />

            <Input
              placeholder="Enter segment distance here"
              onChange={event => {
                newSegDist = event.target.value;
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onAddSegment(newSegId, newSegName, newSegDist);
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

function EditSectionNamePopup(title, onUpdateSectionTitle, onDeleteSection) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newTitle, setNewTitle] = useState(title);

  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        bg="#2BC0E3"
        variant="solid"
        aria-label="Edit Section"
        rightIcon={<EditIcon />}
        onClick={onOpen}
      >
        Edit Section
      </MenuButton>
      <MenuList>
        <MenuItem onClick={onOpen}>
          <Text fontSize="16px" color="black">
            Edit Section
          </Text>
        </MenuItem>
        <MenuDivider />
        <MenuItem>
          <Text fontSize="16px" color="red">
            Delete Section
          </Text>
        </MenuItem>
      </MenuList>
      {/* <Button
        size="sm"
        bg="#2BC0E3"
        variant="solid"
        aria-label="Edit Section"
        rightIcon={<EditIcon />}
        onClick={onOpen}
      >
        Edit Section
      </Button> */}
    </Menu>
    /* {<Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Section Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newTitle}
              onChange={event => {
                setNewTitle(event.target.value);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                onDeleteSection();
                onClose();
              }}
            >
              Delete
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onUpdateSectionTitle(newTitle);
                onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */
    /* </> */
  );
}

const Section = ({
  title,
  segments,
  onAddSegment,
  onUpdateSegment,
  onDeleteSegment,
  onDeleteSection,
  onUpdateSectionTitle,
}) => {
  return (
    <Box ml="27px" mr="15px">
      <Box align="left">
        {/* was center */}
        <Flex align="left" justify="space-between" pb="7px">
          <h1>
            <Text fontSize="24px">{title}</Text>
          </h1>
          <Spacer />
          <Box paddingTop="6px">
            {EditSectionNamePopup(title, onUpdateSectionTitle, onDeleteSection)}
          </Box>
        </Flex>
      </Box>
      <Box border="1px" borderRadius="12px" color="#E2E8F0">
        <Table color="#2D3748" colorScheme="gray" variant="striped">
          <Thead>
            <Tr>
              <Th fontWeight="bold" style={{ width: '33%' }}>
                SEGMENT
              </Th>
              <Th fontWeight="bold" style={{ width: '33%' }}>
                SEGMENT NAME(LOCATION)
              </Th>
              <Th fontWeight="bold" style={{ width: '34%' }}>
                DISTANCE
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {segments.map(segmentItem => {
              return (
                <Segment
                  key={segmentItem.segment}
                  segment={segmentItem.segment}
                  segmentName={segmentItem.segmentName}
                  distance={segmentItem.distance}
                  onUpdateSegment={
                    (updatedSeg, updatedSegName, updatedSegDist) =>
                      onUpdateSegment(
                        segmentItem.segment,
                        updatedSeg,
                        updatedSegName,
                        updatedSegDist,
                      )
                    // eslint-disable-next-line no-use-before-define
                  }
                  onDeleteSegment={() => onDeleteSegment(segmentItem.segment)}
                />
              );
            })}
          </Tbody>
          <Tr>{AddSegmentPopup(onAddSegment)}</Tr>
        </Table>
      </Box>
    </Box>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      segment: PropTypes.string.isRequired,
      segmentName: PropTypes.string.isRequired,
      distance: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddSegment: PropTypes.func.isRequired,
  onUpdateSegment: PropTypes.func.isRequired,
  onDeleteSegment: PropTypes.func.isRequired,
  onDeleteSection: PropTypes.func.isRequired,
  onUpdateSectionTitle: PropTypes.func.isRequired,
};

export default Section;
