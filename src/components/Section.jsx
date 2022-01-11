import { React } from 'react';
import { Text, Box, Flex, Table, Thead, Tbody, Tfoot, Tr, Th, Spacer } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { PropTypes } from 'prop-types';
import Segment from './Segment';

const Section = ({ title, segments }) => {
  return (
    <Box ml="27px" mr="15px">
      <Box align="left">
        {/* was center */}
        <Flex align="left" justify="space-between" pb="7px">
          <h1>
            <Text fontSize="24px"> {title}</Text>
          </h1>
          <Spacer />
          <Box paddingTop="6px">
            <EditIcon size="18px" />
          </Box>
        </Flex>
      </Box>
      <Box border="1px" borderRadius="12px" color="#E2E8F0">
        <Table color="#2D3748" colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th fontWeight="bold" style={{ width: '33%' }}>
                SEGMENT
              </Th>
              <Th fontWeight="bold" style={{ width: '33%' }}>
                SEGMENT NAME(LOCATION)
              </Th>
              <Th fontWeight="bold" style={{ width: '34%' }}>
                DISTANCE
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {segments.map(segmentItem => {
              return (
                <Segment
                  key={segmentItem.segment}
                  segment={segmentItem.segment}
                  segmentName={segmentItem.segmentName}
                  distance={segmentItem.distance}
                />
              );
            })}
          </Tbody>
          <Tfoot />
        </Table>
      </Box>
    </Box>
  );

  // return (
  //   <Box align="center">
  //     <Flex align="left" w="90%" justify="space-between">
  //       <h1 ml="100px">{title}</h1>
  //       <EditIcon />
  //     </Flex>

  //     <Box borderWidth="1px" borderRadius="md" w="90%">
  //       <Box h="10px" />
  //       <Segment
  //         segment="SEGMENT"
  //         segmentName="SEGMENT NAME(LOCATION)"
  //         distance="DISTANCE"
  //         showUpdate={false}
  //       />
  //       <>
  //         {segments.map(segmentItem => {
  //           return (
  //               <Segment
  //                 key={segmentItem.segment}
  //                 segment={segmentItem.segment}
  //                 segmentName={segmentItem.segmentName}
  //                 distance={segmentItem.distance}
  //               />
  //           );
  //         })}
  //       </>
  //       <Button size="sm" variant="ghost">
  //         + Add Segment
  //       </Button>
  //     </Box>
  //   </Box>
  // );
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
