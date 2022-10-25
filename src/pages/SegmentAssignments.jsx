import React, { useState, useEffect } from 'react';
import { Container, Heading, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
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
      const res = await OCHBackend.get('populatedSections/', { withCredentials: true });
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
      <Link to="/people">
        <IconButton
          variant="ghost"
          colorScheme="white"
          m="15px 0"
          aria-label="Back to People Page"
          icon={<ArrowBackIcon w="35px" h="35px" />}
        />
      </Link>
      <Heading fontWeight="600" fontSize="36px" mb="30px" align="left">
        All Segment Assignments
      </Heading>
      <SectionSelector
        sectionList={sectionData?.map(section => section.name)}
        selectedSectionIndex={selectedSectionIndex}
        setSelectedSectionIndex={setSelectedSectionIndex}
      />
      <SegmentAssignmentTable segmentData={segmentData} isLoading={isLoading} />
    </Container>
  );
};

export default SegmentAssignments;
