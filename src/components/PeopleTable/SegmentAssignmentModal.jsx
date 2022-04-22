import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  chakra,
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
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { chakraComponents, Select } from 'chakra-react-select';

const util = require('util');
// import { OCHBackend } from '../../common/utils';

// eslint-disable-next-line no-unused-vars
const SegmentDropdown = ({ allSegments, selectedSegments, setSelectedSegments }) => {
  const customSelectComponents = {
    /* eslint-disable react/prop-types, react/jsx-props-no-spreading */
    Menu: ({ children, ...props }) => (
      <chakraComponents.Menu {...props}>
        {children}
        <chakraComponents.Option
          {...props}
          innerProps={{
            sx: {
              _hover: { bg: 'gray.100' },
              _active: { bg: 'gray.200' },
              d: 'flex',
              w: '100%',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: 'md',
              m: '0.3rem 0',
              p: '0.4rem 0.8rem',
              bg: 'white',
              border: '1px solid',
              borderRadius: '0.375rem',
              borderColor: 'gray.100',
              color: 'red.600',
            },
            onClick: e => {
              setSelectedSegments([]);
            },
            ...props.innerProps,
          }}
        >
          Clear All
        </chakraComponents.Option>
      </chakraComponents.Menu>
    ),
    ClearIndicator: () => null,
    DropdownIndicator: () => (
      <Box
        alignItems="center"
        border="none"
        cursor="pointer"
        display="flex"
        fontSize="20px"
        px="4"
        h="10"
      >
        <ChevronDownIcon />
      </Box>
    ),
    MultiValueContainer: ({ ...props }) => (
      <chakraComponents.MultiValueContainer {...props}>
        <Text color="gray.500">
          {selectedSegments && selectedSegments.length !== 0
            ? `${selectedSegments.length} selected...`
            : 'No segments selected'}
        </Text>
      </chakraComponents.MultiValueContainer>
    ),
    /* eslint-enable react/prop-types, react/jsx-props-no-spreading */
  };

  return (
    <Box>
      <Text mb="8px">Segments</Text>
      <Box w="400px">
        <Select
          placeholder={
            selectedSegments && selectedSegments.length !== 0
              ? `${selectedSegments.length} selected...`
              : 'No segments selected'
          }
          value={selectedSegments}
          options={allSegments}
          onChange={setSelectedSegments}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          selectedOptionStyle="check"
          controlShouldRenderValue={false}
          components={customSelectComponents}
        />
      </Box>
    </Box>
  );
};

const AssignedSegmentsTags = ({ segments }) => (
  <Box>
    <Text mb="8px">Assigned Segment(s)</Text>
    <VStack
      bgColor="gray.100"
      p="10px"
      w="fit-content"
      minW="100%"
      minH="40px"
      borderRadius="6px"
      alignItems="flex-start"
    >
      {segments?.map(segment => (
        <Tag
          key={segment}
          size="lg"
          display="flex"
          justifyContent="space-between"
          variant="solid"
          bgColor="white"
          borderRadius="6px"
          boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
          padding="0 20px"
        >
          <TagLabel color="ochBlack" mr="20px">
            {segment.label}
          </TagLabel>
          <TagCloseButton color="ochBlack" />
        </Tag>
      ))}
    </VStack>
  </Box>
);

const SegmentDetails = ({ segments }) => (
  <Box>
    <Text mb="8px">Segment Details</Text>
    <VStack w="100%">
      {segments?.map(segment => (
        <HStack
          key={segment}
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
      ))}
    </VStack>
  </Box>
);

const formatOptions = options =>
  options?.map(segment => ({
    label: `${segment.segmentId} - ${segment.name}`,
    // eslint-disable-next-line no-underscore-dangle
    value: segment._id,
  }));

const SegmentAssignmentModal = ({ userData, segmentData, isOpen, onClose }) => {
  const [selectedSegments, setSelectedSegments] = useState([]);
  const allSegments = formatOptions(segmentData);

  const closeWrapper = () => {
    setSelectedSegments([]);
    onClose();
  };

  useEffect(() => {
    // TODO
    setSelectedSegments(formatOptions(userData.segments));
  }, [userData, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={closeWrapper} size="lg" scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent maxW="1000px" minH="600px">
        <ModalHeader>{userData.name}&apos;s Segments</ModalHeader>
        <ModalBody>
          <HStack gap="80px" mb="32px" alignItems="flex-start" w="100%">
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
          <Button w="120px" colorScheme="gray" mr="12px" onClick={closeWrapper}>
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

SegmentAssignmentModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  segmentData: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SegmentAssignmentModal;
