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
  Box,
} from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

const SightedListedSpeciesTable = ({ name, speciesData }) => {
  return (
    <Box h="224px" w="505px">
      <Text fontSize="20px" fontWeight="600" ml="110px" mt="24px">
        {name}
      </Text>

      <TableContainer mt="8px" borderRadius="6px">
        <Table>
          <Thead>
            <Tr bg="#4E4E4E">
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
          <Tfoot bg="#4E4E4E">
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
    </Box>
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
