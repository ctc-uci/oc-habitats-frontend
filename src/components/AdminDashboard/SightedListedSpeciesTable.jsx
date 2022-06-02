import { React } from 'react';
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
} from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

const SightedListedSpeciesTable = ({ name, speciesData }) => {
  return (
    <Flex direction="column" h="fit-content" w={{ lg: 'fit-content', sm: '100%' }}>
      <Text fontSize="20px" fontWeight="600" mt="24px">
        {name}
      </Text>

      <TableContainer mt="8px" borderRadius="6px" border="1px solid" borderColor="ochLightGrey">
        <Table>
          <Thead>
            <Tr bg="ochGrey">
              <Th textAlign="left" fontSize={{ md: '16px', sm: '12px' }} color="white">
                Segment
              </Th>
              <Th textAlign="center" fontSize={{ md: '16px', sm: '12px' }} color="white">
                Adults
              </Th>
              <Th textAlign="center" fontSize={{ md: '16px', sm: '12px' }} color="white">
                Fledges
              </Th>
              <Th textAlign="center" fontSize={{ md: '16px', sm: '12px' }} color="white">
                Chicks
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(speciesData).length === 0 && (
              <Tr>
                <Td>{'  '}</Td>
              </Tr>
            )}
            {Object.entries(speciesData).map(([segment, data]) => {
              return (
                <Tr key={segment}>
                  <Td>
                    <Text>{segment}</Text>
                  </Td>
                  <Td>
                    <Text align="center">{data.totalAdults}</Text>
                  </Td>
                  <Td>
                    <Text align="center">{data.totalFledges}</Text>
                  </Td>
                  <Td>
                    <Text align="center">{data.totalChicks}</Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot bg="ochGrey">
            <Tr>
              <Th textAlign="left" fontSize={{ md: '16px', sm: '12px' }} color="white">
                Total
              </Th>
              <Th fontSize="16px" color="white">
                <Text align="center">
                  {Object.values(speciesData).reduce(
                    (totVal, currVal) => totVal + currVal.totalAdults,
                    0,
                  )}
                </Text>
              </Th>
              <Th fontSize="16px" color="white">
                <Text align="center">
                  {Object.values(speciesData).reduce(
                    (totVal, currVal) => totVal + currVal.totalFledges,
                    0,
                  )}
                </Text>
              </Th>
              <Th fontSize="16px" color="white">
                <Text align="center">
                  {Object.values(speciesData).reduce(
                    (totVal, currVal) => totVal + currVal.totalChicks,
                    0,
                  )}
                </Text>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Flex>
  );
};

SightedListedSpeciesTable.propTypes = {
  name: PropTypes.string.isRequired,
  speciesData: PropTypes.shape({
    totalAdults: PropTypes.number,
    totalFledges: PropTypes.number,
    totalChicks: PropTypes.number,
  }).isRequired,
};

export default SightedListedSpeciesTable;
