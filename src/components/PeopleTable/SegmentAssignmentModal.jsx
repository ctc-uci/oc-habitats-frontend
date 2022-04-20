import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Flex,
  HStack,
  VStack,
  Box,
  Button,
  Select,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';

// eslint-disable-next-line camelcase
const test_segmentAssignment = [
  {
    segmentId: 'OC04',
    description: 'Bolsa Chica State Beach 1',
  },
  {
    segmentId: 'OC09a',
    description: 'Huntington State Beach 1',
  },
  {
    segmentId: 'OC09b',
    description: 'Huntington State Beach 2',
  },
];

// eslint-disable-next-line no-unused-vars
const SegmentDropdown = ({ allSegments, selectedSegments, setSelectedSegments }) => {
  return (
    <Box>
      <Text mb="8px">Segments</Text>
      <Select w="400px" placeholder={`${selectedSegments.length} selected...`}>
        {allSegments?.map(segment => (
          <option key={segment}>{segment}</option>
        ))}
      </Select>
    </Box>
  );
};

const AssignedSegmentsTags = ({ segments }) => (
  <Box>
    <Text mb="8px">Assigned Segment(s)</Text>
    <VStack bgColor="gray.100" p="10px" w="fit-content" borderRadius="6px">
      {segments?.map(segment => (
        <Tag
          key={segment}
          size="lg"
          display="flex"
          justifyContent="space-between"
          w="100%"
          variant="solid"
          bgColor="white"
          borderRadius="6px"
          boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
          padding="0 20px"
        >
          <TagLabel color="ochBlack" mr="20px">
            {segment.segmentId} - {segment.description}
          </TagLabel>
          <TagCloseButton color="ochBlack" />
        </Tag>
      ))}
    </VStack>
  </Box>
);

// eslint-disable-next-line no-unused-vars
const SegmentCard = ({ segmentData }) => (
  <HStack
    w="100%"
    padding="auto 0"
    borderTop="1.5px solid"
    borderRight="1.5px solid"
    borderBottom="1.5px solid"
    borderColor="gray.200"
    borderRadius="6px"
  >
    <Box bgColor="red.600" borderRadius="6px 0 0 6px" w="8px">
      ...
    </Box>
    <Box>Text Here</Box>
  </HStack>
);

const SegmentDetails = ({ segments }) => (
  <Box>
    <Text mb="8px">Segment Details</Text>
    <VStack w="100%">
      {segments?.map(segment => (
        <SegmentCard key={segment} segment={segment} />
      ))}
    </VStack>
  </Box>
);

const SegmentAssignmentModal = ({ userData, isOpen, onClose }) => {
  const [allSegments, setAllSegments] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);

  useEffect(() => {
    // TODO: fetch segment data
    setAllSegments([]);
    setSelectedSegments(test_segmentAssignment);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent maxW="1000px">
        <ModalHeader>{userData.name}&apos;s Segments</ModalHeader>
        <ModalBody>
          <HStack gap="80px" alignItems="flex-start" w="100%">
            <SegmentDropdown
              allSegments={allSegments}
              selectedSegments={selectedSegments}
              setSelectedSegments={setSelectedSegments}
            />
            <AssignedSegmentsTags segments={selectedSegments} />
          </HStack>
          <SegmentDetails segments={selectedSegments} />
        </ModalBody>
        <ModalFooter>
          <Button w="120px" colorScheme="gray" mr="12px" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="solid" bg="ochBlue" isDisabled>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

SegmentDropdown.propTypes = {
  allSegments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  selectedSegments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  setSelectedSegments: PropTypes.func.isRequired,
};

AssignedSegmentsTags.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

SegmentDetails.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

SegmentCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  segmentData: PropTypes.object.isRequired,
};

SegmentAssignmentModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SegmentAssignmentModal;
