import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Select, Text, Tooltip, IconButton, Box } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

const PeopleTableFooter = ({
  rowCount,
  pageIndex,
  rowsPerPageSelect,
  pageSize,
  pageControl,
  isMobile,
}) => {
  const rowText = () => {
    const left = pageIndex === 0 ? 1 : pageIndex * pageSize + 1;
    const right = Math.min(rowCount, pageSize * (pageIndex + 1));
    return rowCount === 0 ? `0` : `${left}-${right}`;
  };
  return (
    <Box backgroundColor="ochGrey" color="white" p="8px 1em" w="100%" borderRadius="0 0 10px 10px">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center">
          <Text flexShrink="0">Show rows per page</Text>
          <Select
            backgroundColor="white"
            color="ochGrey"
            ml={2}
            w="auto"
            value={pageSize}
            onChange={e => {
              pageControl.setPageSize(Number(e.target.value));
            }}
          >
            {rowsPerPageSelect.map(rowVal => (
              <option key={rowVal} value={rowVal}>
                {rowVal}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex alignItems="center">
          {!isMobile && (
            <Text flexShrink="0" mr={8}>
              <Text as="span">{rowText()}</Text>
              <Text as="span" color="gray.300">
                {' '}
                of {rowCount}
              </Text>
            </Text>
          )}

          <Tooltip label="Previous Page">
            <IconButton
              background="transparent"
              color="white"
              icon={<ChevronLeftIcon h={6} w={6} />}
              isDisabled={!pageControl.canPreviousPage}
              variant="noHover"
              onClick={() => pageControl.previousPage()}
            />
          </Tooltip>
          <Tooltip label="Next Page">
            <IconButton
              background="transparent"
              color="white"
              variant="noHover"
              icon={<ChevronRightIcon h={6} w={6} />}
              ml={4}
              isDisabled={!pageControl.canNextPage}
              onClick={() => pageControl.nextPage()}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};

PeopleTableFooter.propTypes = {
  rowCount: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  rowsPerPageSelect: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSize: PropTypes.number.isRequired,
  pageControl: PropTypes.exact({
    setPageSize: PropTypes.func,
    nextPage: PropTypes.func,
    previousPage: PropTypes.func,
    canNextPage: PropTypes.bool,
    canPreviousPage: PropTypes.bool,
  }).isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default PeopleTableFooter;
