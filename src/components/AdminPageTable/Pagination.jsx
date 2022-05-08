import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Select, Text, IconButton, Spacer } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

// pagination that is represented at the bottom of the table
const Pagination = ({
  canPreviousPage,
  canNextPage,
  pageSize,
  pageIndex,
  setPageSize,
  previousPage,
  nextPage,
  totalData,
}) => {
  const rowText = () => {
    const left = pageIndex === 0 ? 1 : pageIndex * pageSize + 1;
    const right = Math.min(totalData, pageSize * (pageIndex + 1));
    return totalData === 0 ? `0` : `${left}-${right} of ${totalData}`;
  };

  return (
    <>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              canPreviousPage,
              canNextPage,
              pageSize,
              pageIndex,
              totalData,
            },
            null,
            2,
          )}
        </code>
      </pre> */}
      <Flex
        bg="#4E4E4E"
        alignItems="center"
        pl="24px"
        pt="8px"
        pb="8px"
        pr="24px"
        borderBottomRadius={10}
      >
        <Flex alignItems="center">
          <Flex pr="8px">
            <Text color="white">Show rows per page</Text>
          </Flex>
          <Flex>
            <Select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
              bg="white"
              w="75px"
            >
              {[10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
        <Spacer />
        <Flex>
          <Flex alignItems="center" pr="15px">
            <Text color="white">{rowText()}</Text>
          </Flex>
          <Flex alignItems="center" pr="4px">
            <IconButton
              style={{ backgroundColor: 'transparent' }}
              icon={<ChevronLeftIcon color="white" />}
              isDisabled={!canPreviousPage}
              onClick={() => {
                previousPage();
              }}
            />
          </Flex>
          <Flex>
            <IconButton
              style={{ backgroundColor: 'transparent' }}
              icon={<ChevronRightIcon color="white" />}
              isDisabled={!canNextPage}
              onClick={() => {
                nextPage();
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

Pagination.propTypes = {
  canPreviousPage: PropTypes.bool.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  totalData: PropTypes.number.isRequired,
};

export default Pagination;
