import React, { useState, useEffect } from 'react';
import { Container, Heading } from '@chakra-ui/react';
import { OCHBackend } from '../common/utils';

import { SectionSelector, SegmentAssignmentTable } from '../components/SegmentAssignmentsTable';

const sortSections = sectionsArray => {
  const compare = (a, b) => {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    return 0;
  };
  return sectionsArray.sort(compare);
};

const SegmentAssignments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sectionData, setSectionData] = useState([]);
  const [segmentData, setSegmentData] = useState(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

  useEffect(async () => {
    try {
      const res = await OCHBackend.get('sections/');
      const sortedSections = sortSections(res?.data);
      setSectionData(sortedSections);
      setSegmentData(sortedSections[selectedSectionIndex].segments);

      setIsLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, []);

  useEffect(() => {
    setSegmentData(sectionData[selectedSectionIndex]?.segments);
  }, [selectedSectionIndex]);

  return (
    <Container maxW={{ md: 'container.xl', base: 'container.sm' }} mb={{ md: '0', base: '5em' }}>
      <Heading fontWeight="600" fontSize="36px" m="30px 0" align="left">
        All Segment Assignments
      </Heading>
      <SectionSelector
        sectionList={sectionData?.map(section => section.name)}
        selectedSectionIndex={selectedSectionIndex}
        setSelectedSectionIndex={setSelectedSectionIndex}
      />
      <SegmentAssignmentTable segmentData={segmentData} />
    </Container>
  );
};

export default SegmentAssignments;
