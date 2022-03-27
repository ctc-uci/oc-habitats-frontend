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
}) => {
  const [filterValue, setFilterValue] = useState('');

  const debounceSetFilter = useAsyncDebounce(value => {
    setNameFilter(value || undefined);
  }, 200);

  return (
    <Flex direction="row" justifyContent="space-between" m="20px 0 30px">
      <Box>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="ochGrey" />
          </InputLeftElement>
          <Input
            placeholder={`Search ${variant}s...`}
            htmlSize={30}
            width="auto"
            value={filterValue}
            onChange={e => {
              setFilterValue(e.target.value);
              debounceSetFilter(e.target.value);
            }}
          />
        </InputGroup>
      </Box>
      <Flex direction="row">
        {variant === 'volunteer' ? (
          <Flex flexDir="row" justifyItems="center" mr="30px">
            <Text fontWeight="bold" color="ochGrey" mr="15px" alignSelf="center">
              FILTER BY SEGMENT
            </Text>
            <Select placeholder="All" w={40} onChange={e => setSegmentFilter(e.target.value)}>
              {segments.map(segment => {
                return (
                  <option key={segment.id} value={segment.id}>
                    {segment.name}
                  </option>
                );
              })}
            </Select>
          </Flex>
        ) : null}
        <Flex flexDir="row" justifyItems="center">
          <Text fontWeight="bold" color="ochGrey" mr="15px" alignSelf="center">
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
  segments: PropTypes.object.isRequired,
  setNameFilter: PropTypes.func.isRequired,
  setSegmentFilter: PropTypes.func.isRequired,
  sortOptions: PropTypes.objectOf(PropTypes.array).isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default PeopleTableFilters;
