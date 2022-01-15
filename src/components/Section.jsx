import { React } from 'react';
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
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';
import Segment from './Segment';

function AddSegmentPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <div>*ADD A SEGMENT HERE*</div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function EditSectionNamePopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <ModalHeader>*EDIT SECTION TITLE HERE*</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>Testing testing</div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const Section = ({ title, segments }) => {
  return (
    <Box ml="27px" mr="15px">
      <Box align="left">
        {/* was center */}
        <Flex align="left" justify="space-between" pb="7px">
          <h1>
            <Text fontSize="24px"> {title}</Text>
          </h1>
          <Spacer />
          <Box paddingTop="6px">{EditSectionNamePopup()}</Box>
        </Flex>
      </Box>
      <Box border="1px" borderRadius="12px" color="#E2E8F0">
        <Table color="#2D3748" colorScheme="whiteAlpha">
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
                />
              );
            })}
          </Tbody>
          <Tr>{AddSegmentPopup()}</Tr>
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
};

export default Section;
