import React from 'react';
import PropTypes from 'prop-types';
import { Tbody, Th, Tr, Td, VStack, Box, Text } from '@chakra-ui/react';
import { CommonTable, CommonTableHeader, CommonRowFiller } from '../../common/CommonTable';

const EmptySection = () => (
  <Text fontWeight="600" fontSize="16px">
    There are no segments in this section
  </Text>
);

const SegmentNameCol = ({ segment }) => {
  return (
    <VStack alignItems="flex-start">
      <Box>
        <Text color="gray.700">
          {segment.segmentId} {segment.name}
        </Text>
      </Box>
      <Text color="gray.500">{segment.streets}</Text>
    </VStack>
  );
};

const SegmentAssignmentsTable = ({ segmentData }) => {
  return (
    <CommonTable>
      <CommonTableHeader>
        <Th fontSize="12px" maxW="420px" minW="420px">
          Segment Name
        </Th>
        <Th fontSize="12px" maxW="135px" minW="135px">
          Last Updated
        </Th>
        <Th fontSize="12px" maxW="475px" minW="475px">
          Assigned Volunteer(s)
        </Th>
      </CommonTableHeader>
      <Tbody>
        {segmentData?.length === 0 ? (
          <CommonRowFiller colCount={3}>
            <EmptySection />
          </CommonRowFiller>
        ) : (
          segmentData?.map(segment => (
            <Tr key={segment.segmentId} fontSize="14px">
              <Td>
                <SegmentNameCol segment={segment} />
              </Td>
              <Td>XX-XX-20XX</Td>
              <Td>{segment.volunteers}</Td>
            </Tr>
          ))
        )}
      </Tbody>
    </CommonTable>
  );
};

SegmentNameCol.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  segment: PropTypes.object.isRequired,
};

SegmentAssignmentsTable.propTypes = {
  segmentData: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default SegmentAssignmentsTable;
