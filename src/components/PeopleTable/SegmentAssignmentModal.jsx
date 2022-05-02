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
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { chakraComponents, Select } from 'chakra-react-select';
import { OCHBackend } from '../../common/utils';

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
            onClick: () => {
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
      <Box w="320px">
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

const AssignedSegmentsTags = ({ segments, setSelectedSegments }) => {
  const removeSegment = segment => {
    const filteredSegments = segments.filter(seg => seg.value !== segment.value);
    setSelectedSegments(filteredSegments);
  };

  return (
    <Box>
      <Text mb="8px">Assigned Segment(s)</Text>
      <VStack
        bgColor="gray.100"
        p="10px"
        maxW="95%"
        minH="40px"
        borderRadius="6px"
        alignItems="flex-start"
      >
        {segments?.map(segment => (
          <Tooltip key={segment} label={segment.label}>
            <Tag
              size="lg"
              display="flex"
              justifyContent="space-between"
              variant="solid"
              bgColor="white"
              borderRadius="6px"
              boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)"
              padding="0 20px"
              alt={segment.label}
            >
              <TagLabel color="ochBlack" mr="20px">
                {segment.label}
              </TagLabel>
              <TagCloseButton onClick={() => removeSegment(segment)} color="ochBlack" />
            </Tag>
          </Tooltip>
        ))}
      </VStack>
    </Box>
  );
};

const SegmentCards = ({ allSegments, selectedSegments, currUserId }) => {
  const cardColor = userCount => {
    switch (userCount) {
      case 0:
      case 1:
        return 'green.600';
      case 2:
        return 'yellow.400';
      default:
        return 'red.600';
    }
  };
  // Use allSegments to populate selectedSegments with additional user information
  const populatedSelectedSegments = allSegments.filter(
    (
      set => a =>
        set.has(a.id)
    )(new Set(selectedSegments?.map(b => b.id))),
  );

  const currentSegment = segmentId => populatedSelectedSegments.find(seg => seg.id === segmentId);

  const alsoAssigned = segment => {
    const otherAssignedUsers = currentSegment(segment.id)?.volunteerData.reduce((result, user) => {
      if (user.id !== currUserId) {
        result.push(`${user.firstName} ${user.lastName}`);
      }
      return result;
    }, []);

    return otherAssignedUsers.join(', ');
  };

  return (
    <Box fontSize="14px">
      <Text mb="8px">Segment Details</Text>
      <VStack w="100%">
        {selectedSegments?.map(segment => (
          <HStack
            key={segment}
            w="100%"
            borderTop="1.5px solid"
            borderRight="1.5px solid"
            borderBottom="1.5px solid"
            borderLeft="8px solid"
            borderColor="gray.200"
            borderLeftColor={cardColor(currentSegment(segment.id)?.volunteerData?.length)}
            borderRadius="6px"
            padding="12px"
          >
            <VStack alignItems="flex-start" spacing="2px">
              <Text>{segment.label}</Text>
              <Text color="gray.500">Last Updated: XX-XX-XXXX</Text>
              <Text color="gray.500" display="inline-flex">
                Also Assigned: {alsoAssigned(segment)}
              </Text>
            </VStack>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

const formatOptions = options =>
  options?.map(segment => ({
    label: `${segment.segmentId} - ${segment.name}`,
    // eslint-disable-next-line no-underscore-dangle
    value: segment.id,
    ...segment,
  }));

const SegmentAssignmentModal = ({ userData, segmentData, refreshData, isOpen, onClose }) => {
  // Workaround for responsive modal sizes
  const modalSizes = useBreakpointValue({ base: 'sm', md: 'lg' });
  const [dirty, setDirty] = useState(false);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const allSegments = formatOptions(segmentData);

  const closeWrapper = () => {
    setSelectedSegments([]);
    onClose();
  };

  const handleSubmit = async () => {
    await OCHBackend.put('/users/setSegmentAssignments', {
      profileId: userData?.userId,
      segmentIds: selectedSegments.map(segment => segment.id),
    });
    await refreshData();
    closeWrapper();
  };

  useEffect(() => {
    setSelectedSegments(formatOptions(userData.segments));
    setDirty(false);
  }, [userData, isOpen]);

  // Check if data changed
  useEffect(() => {
    if (
      !dirty &&
      JSON.stringify(formatOptions(userData.segments)) !== JSON.stringify(selectedSegments)
    ) {
      setDirty(true);
    }
  }, [selectedSegments]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeWrapper}
      size={modalSizes}
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW={{ base: '95%', md: '1000px' }} minH={{ base: '100px', md: '600px' }}>
        <ModalHeader>{userData.name}&apos;s Segments</ModalHeader>
        <ModalBody>
          <Flex
            flexDir="row"
            columnGap="80px"
            rowGap="24px"
            w="100%"
            wrap="wrap"
            alignItems="flex-start"
            mb="32px"
          >
            <SegmentDropdown
              allSegments={allSegments}
              selectedSegments={selectedSegments}
              setSelectedSegments={setSelectedSegments}
            />

            <AssignedSegmentsTags
              segments={selectedSegments}
              setSelectedSegments={setSelectedSegments}
            />
          </Flex>
          <SegmentCards
            allSegments={allSegments}
            selectedSegments={selectedSegments}
            currUserId={userData?.userId}
          />
        </ModalBody>
        <ModalFooter>
          <Button w="120px" colorScheme="gray" mr="12px" onClick={closeWrapper}>
            Cancel
          </Button>
          <Button variant="solid" bg="ochBlue" isDisabled={!dirty} onClick={handleSubmit}>
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
  setSelectedSegments: PropTypes.func.isRequired,
};

SegmentCards.propTypes = {
  allSegments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  selectedSegments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  currUserId: PropTypes.string.isRequired,
};

SegmentAssignmentModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  segmentData: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.object.isRequired,
  refreshData: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SegmentAssignmentModal;
