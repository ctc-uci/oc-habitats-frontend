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
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';

const approvalStatues = {
  readyToReview: 'Ready To Review',
  resubmitted: 'Resubmitted',
  editsRequested: 'Edits Requested',
  approved: 'Approved',
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

  return (
    <Flex bg="#4E4E4E" pt="14px" pr="28px" pl="28px" borderTopRadius={10}>
      <Flex alignItems="center">
        <Text color="white">{checked} Selected</Text>
      </Flex>
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
          {segments.map(val => (
            <option key={val} value={val}>
              {val}
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
          placeholder="Approval"
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
      <Box>
        <InputGroup>
          <Input
            value={searchTerm}
            bg="#FFFFFF"
            color="#2D3748"
            onChange={event => {
              setSearchTerm(event.target.value);
            }}
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
  dateFilter: PropTypes.string.isRequired,
  segmentFilter: PropTypes.string.isRequired,
  approvalFilter: PropTypes.string.isRequired,
  searchFilter: PropTypes.string.isRequired,
  checked: PropTypes.number.isRequired,
};

export default AdminPageFilters;
