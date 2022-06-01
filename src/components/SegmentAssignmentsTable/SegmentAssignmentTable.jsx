import React from 'react';
import PropTypes from 'prop-types';
import { Tbody, Th, Tr, Td, VStack, Box, Text } from '@chakra-ui/react';
import {
  CommonTable,
  CommonTableHeader,
  CommonRowFiller,
  CommonLoadingRow,
} from '../../common/CommonTable';

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

const VolunteerCol = ({ volunteers }) => (
  <Text>
    {volunteers?.map(volunteer => `${volunteer.firstName} ${volunteer.lastName}`).join(', ')}
  </Text>
);

const tableContent = (segmentData, isLoading) => {
  if (isLoading) {
    return <CommonLoadingRow colCount={3} />;
  }
  if (segmentData?.length === 0) {
    return (
      <CommonRowFiller colCount={3}>
        <EmptySection />
      </CommonRowFiller>
    );
  }
  return segmentData?.map(segment => (
    <Tr key={segment.segmentId} fontSize="14px">
      <Td>
        <SegmentNameCol segment={segment} />
      </Td>
      <Td>
        <VolunteerCol volunteers={segment.volunteerData} />
      </Td>
    </Tr>
  ));
};

const SegmentAssignmentsTable = ({ segmentData, isLoading }) => {
  return (
    <CommonTable>
      <CommonTableHeader loading={isLoading}>
        <Th fontSize="12px" maxW="420px" minW="420px">
          Segment Name {isLoading}
        </Th>
        <Th fontSize="12px" maxW="475px" minW="475px">
          Assigned Volunteer(s)
        </Th>
      </CommonTableHeader>
      <Tbody>{tableContent(segmentData, isLoading)}</Tbody>
    </CommonTable>
  );
};

SegmentNameCol.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  segment: PropTypes.object.isRequired,
};

VolunteerCol.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  volunteers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SegmentAssignmentsTable.propTypes = {
  segmentData: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SegmentAssignmentsTable;
