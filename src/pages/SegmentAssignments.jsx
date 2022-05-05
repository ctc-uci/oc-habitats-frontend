import React, { useState, useEffect } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import { OCHBackend } from '../common/utils';

import { SegmentSelector, SegmentAssignmentTable } from '../components/SegmentAssignmentsTable';

const SegmentAssignments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [segmentData, setSegmentData] = useState(null);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);

  useEffect(async () => {
    try {
      const res = await OCHBackend.get('segments/');
      // Format segment data as object, with segmentId as keys
      setSegmentData(
        res?.data.reduce((obj, item) => Object.assign(obj, { [item.segmentId]: { ...item } }), {}),
      );
      setIsLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, []);

  return (
    <Container maxW={{ md: 'container.xl', base: 'container.sm' }} mb={{ md: '0', base: '5em' }}>
      <Heading fontWeight="600" fontSize="36px" m="30px 0" align="left">
        All Segment Assignments
      </Heading>
      <SegmentSelector
        segmentList={segmentData ? Object.keys(segmentData) : []}
        selectedSegmentIndex={selectedSegmentIndex}
        setSelectedSegmentIndex={setSelectedSegmentIndex}
      />
      <SegmentAssignmentTable />
      {JSON.stringify(isLoading, null, 2)}
      <br />
      {JSON.stringify(selectedSegmentIndex, null, 2)}
      <br />
      {JSON.stringify(segmentData, null, 2)}
    </Container>
  );
};

export default SegmentAssignments;
