import { React } from 'react';
import { Text, Box, Flex } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

import SightedListedSpeciesTable from './SightedListedSpeciesTable';

const SightedListedSpecies = ({ month, year, speciesData }) => {
  return (
    <Box>
      <Text fontSize="24px" fontWeight="600" mt="64px">
        {month} {year} Sighted Listed Species
      </Text>

      <Flex bgColor="red" direction={{ lg: 'row', sm: 'column' }} wrap="wrap" mb="136px" gap="24px">
        {speciesData.map(sData => {
          return (
            <SightedListedSpeciesTable
              key={sData._id}
              name={sData._id}
              speciesData={sData.segments}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

SightedListedSpecies.propTypes = {
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  speciesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      speciesName: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          segment: PropTypes.string,
          adults: PropTypes.number,
          fledges: PropTypes.number,
          chicks: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
};

export default SightedListedSpecies;
