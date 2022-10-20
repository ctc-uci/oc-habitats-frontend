import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Text,
  Spacer,
  Box,
  Select,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useMediaQuery,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';

const approvalStatues = {
  UNDER_REVIEW: 'Ready To Review',
  RESUBMITTED: 'Resubmitted',
  EDITS_REQUESTED: 'Edits Requested',
  APPROVED: 'Approved',
  UNSUBMITTED: 'Draft',
};

// set the filters when the user selects them
const AdminPageFilters = ({
  segments,
  segmentFilter,
  setSegmentFilter,
  dateFilter,
  setDateFilter,
  approvalFilter,
  setApprovalFilter,
  searchFilter,
  setSearchFilter,
  checked,
}) => {
  const [searchTerm, setSearchTerm] = useState(searchFilter);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Flex
      bg={{ md: '#4E4E4E', base: 'transparent' }}
      pt="14px"
      px={{ md: '28px', base: '0' }}
      borderTopRadius={10}
      direction={{ base: 'column', md: 'row' }}
      w="100%"
      gap="8px"
      // h={{ base: '240px', md: 'auto' }}
    >
      {!isMobile && (
        <Flex alignItems="center">
          <Text color="white">{checked} Selected</Text>
        </Flex>
      )}
      <Spacer />
      <Box>
        <Select
          value={segmentFilter}
          backgroundColor="white"
          color="black"
          placeholder="Segment"
          onChange={event => {
            setSegmentFilter(event.target.value);
          }}
        >
          {segments.map(s => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
      </Box>
      <Spacer />
      <Box>
        <DatePicker
          selected={dateFilter}
          onChange={date => {
            setDateFilter(date);
          }}
          dateFormat="MMMM, yyyy"
          showMonthYearPicker
          placeholderText="Select a month"
          isClearable
        />
      </Box>
      <Spacer />
      <Box>
        <Select
          value={approvalFilter}
          backgroundColor="white"
          color="black"
          placeholder="Approval status"
          onChange={event => {
            setApprovalFilter(event.target.value);
          }}
        >
          {Object.keys(approvalStatues).map(key => (
            <option key={key} value={key}>
              {approvalStatues[key]}
            </option>
          ))}
        </Select>
      </Box>
      <Spacer />
      <Box pb={{ base: '14px', md: '0' }}>
        <InputGroup>
          <Input
            value={searchTerm}
            bg="#FFFFFF"
            color="#2D3748"
            onChange={event => {
              setSearchTerm(event.target.value);
            }}
            placeholder="Search volunteer"
          />
          <InputRightElement w="84px">
            <Button
              onClick={() => {
                setSearchFilter(searchTerm);
              }}
            >
              search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      {isMobile && (
        <Flex
          alignItems="center"
          w="100%"
          bgColor="#4E4E4E"
          borderTopRadius={10}
          pl="10px"
          pt="10px"
        >
          <Text color="white">{checked} Selected</Text>
        </Flex>
      )}
    </Flex>
  );
};

AdminPageFilters.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSegmentFilter: PropTypes.func.isRequired,
  setDateFilter: PropTypes.func.isRequired,
  setApprovalFilter: PropTypes.func.isRequired,
  setSearchFilter: PropTypes.func.isRequired,
  dateFilter: PropTypes.instanceOf(Date).isRequired,
  segmentFilter: PropTypes.string.isRequired,
  approvalFilter: PropTypes.string.isRequired,
  searchFilter: PropTypes.string.isRequired,
  checked: PropTypes.number.isRequired,
};

export default AdminPageFilters;
