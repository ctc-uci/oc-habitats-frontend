import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAsyncDebounce } from 'react-table';
import { Flex, Input, Select, Text, Box, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

const PeopleTableFilters = ({
  variant,
  segments,
  setNameFilter,
  setSegmentFilter,
  sortOptions,
  setSortBy,
  isMobile,
}) => {
  const [filterValue, setFilterValue] = useState('');

  const debounceSetFilter = useAsyncDebounce(value => {
    setNameFilter(value || undefined);
  }, 200);

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      m="20px 0 0"
      wrap="wrap"
    >
      <Box borderBottom="16px solid transparent">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="ochGrey" />
          </InputLeftElement>
          <Input
            placeholder={`Search ${variant}s...`}
            maxW="320px"
            w="100%"
            value={filterValue}
            onChange={e => {
              setFilterValue(e.target.value);
              debounceSetFilter(e.target.value);
            }}
          />
        </InputGroup>
      </Box>
      <Flex direction="row" gap="15px" wrap="wrap" borderBottom="16px solid transparent">
        {!isMobile && (
          <Flex flexDir="row" gap="15px">
            <Text fontWeight="bold" color="ochGrey" alignSelf="center">
              FILTER BY SEGMENT
            </Text>
            <Select
              placeholder="All"
              w={40}
              flexShrink="1"
              onChange={e => setSegmentFilter(e.target.value)}
            >
              {segments.map(segment => {
                return (
                  <option key={segment.id} value={segment.id}>
                    {segment.name}
                  </option>
                );
              })}
            </Select>
          </Flex>
        )}
        <Flex flexDir="row" justifyItems="center" gap="15px">
          <Text fontWeight="bold" color="ochGrey" alignSelf="center">
            SORT BY
          </Text>
          <Select w={40} onChange={e => setSortBy(sortOptions[e.target.value])}>
            <option value="nameDesc">Name: A - Z</option>
            <option value="nameAsc">Name: Z - A</option>
            <option value="lastUpdated">Last Updated</option>
          </Select>
        </Flex>
      </Flex>
    </Flex>
  );
};

PeopleTableFilters.propTypes = {
  variant: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  segments: PropTypes.array.isRequired,
  setNameFilter: PropTypes.func.isRequired,
  setSegmentFilter: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sortOptions: PropTypes.objectOf(PropTypes.array).isRequired,
  setSortBy: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default PeopleTableFilters;
