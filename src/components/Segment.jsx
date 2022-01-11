import { React } from 'react';
import { Button, Tr, Td, Text, Flex } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

const Segment = ({ segment, segmentName, distance }) => {
  return (
    <Tr>
      <Td>{segment}</Td>
      <Td>{segmentName}</Td>
      <Td>
        <Flex justifyContent="space-between">
          <Text>{distance}</Text>
          <Button backgroundColor="#A0AEC0" color="white" size="sm">
            Update
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
};

// const Segment = ({ segment, segmentName, distance, showUpdate }) => {
//   return (
//     <Box align="center">
//       <Flex direction="row">
//         <Box flex="0.5">
//           <Text>segment</Text>
//           <Text>{segment}</Text>
//         </Box>
//         <Box flex="0.75" />
//         <Box flex="1.5">
//           <Text>name</Text>
//           <Text>{segmentName}</Text>
//         </Box>
//         <Box flex="1">
//           <Text>distance</Text>
//           <Text>{distance}</Text>
//         </Box>
//         <Box flex="1">
//           {showUpdate ? (
//             <Button colorScheme="gray" size="sm">
//               Update
//             </Button>
//           ) : (
//             <></>
//           )}
//         </Box>
//         <Box flex="1" />
//       </Flex>
//     </Box>
//   );
// };

Segment.propTypes = {
  segment: PropTypes.string.isRequired,
  segmentName: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
};

export default Segment;
