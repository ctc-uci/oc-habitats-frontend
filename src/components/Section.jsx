import { React } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';
import Segment from './Segment';

const Section = ({ title, segments }) => {
  return (
    <Box align="center">
      <Flex align="left" w="90%" justify="space-between">
        <h1 ml="100px">{title}</h1>
        <EditIcon />
      </Flex>

      <Box borderWidth="1px" borderRadius="md" w="90%">
        <Box h="10px" />
        <Segment
          segment="SEGMENT"
          segmentName="SEGMENT NAME(LOCATION)"
          distance="DISTANCE"
          showUpdate={false}
        />
        <>
          {segments.map(segmentItem => {
            return (
              <>
                <Box h="10px" />
                <Segment
                  key={segmentItem.segment}
                  segment={segmentItem.segment}
                  segmentName={segmentItem.segmentName}
                  distance={segmentItem.distance}
                  showUpdate
                />
                <Box h="10px" />
              </>
            );
          })}
        </>
        <Button size="sm" variant="ghost">
          + Add Segment
        </Button>
      </Box>
    </Box>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      segment: PropTypes.string.isRequired,
      segmentName: PropTypes.string.isRequired,
      distance: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Section;
