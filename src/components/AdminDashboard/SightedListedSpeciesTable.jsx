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
              <Th fontSize="16px" color="white">
                Segment
              </Th>
              <Th fontSize="16px" color="white">
                Adults
              </Th>
              <Th fontSize="16px" color="white">
                Fledges
              </Th>
              <Th fontSize="16px" color="white">
                Chicks
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {speciesData.length === 0 && (
              <Tr>
                <Td>{'  '}</Td>
              </Tr>
            )}
            {speciesData.map(data => {
              return (
                <Tr key={data.segment}>
                  <Td>
                    <Text>{data.segment}</Text>
                  </Td>
                  <Td>
                    <Text align="center">{data.adults}</Text>
                  </Td>
                  <Td>
                    <Text align="center">{data.fledges}</Text>
                  </Td>
                  <Td>
                    <Text align="center">{data.chicks}</Text>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot bg="ochGrey">
            <Tr>
              <Th fontSize="16px" color="white">
                Total
              </Th>
              <Th fontSize="16px" color="white">
                <Text align="center">
                  {speciesData.reduce((totVal, currVal) => totVal + currVal.adults, 0)}
                </Text>
              </Th>
              <Th fontSize="16px" color="white">
                <Text align="center">
                  {speciesData.reduce((totVal, currVal) => totVal + currVal.fledges, 0)}
                </Text>
              </Th>
              <Th fontSize="16px" color="white">
                <Text align="center">
                  {speciesData.reduce((totVal, currVal) => totVal + currVal.chicks, 0)}
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
  speciesData: PropTypes.arrayOf(
    PropTypes.shape({
      segment: PropTypes.string.isRequired,
      adults: PropTypes.number.isRequired,
      fledges: PropTypes.number.isRequired,
      chicks: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default SightedListedSpeciesTable;
