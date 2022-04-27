import { React } from 'react';
import { Text, Grid, GridItem, Box } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

import SightedListedSpeciesTable from './SightedListedSpeciesTable';

const SightedListedSpecies = ({ month, year, speciesData }) => {
  return (
    <Box>
      <Text fontSize="24px" fontWeight="600" mt="64px">
        {month} {year} Sighted Listed Species
      </Text>

      <Grid mt="24px" mb="136px" templateColumns="repeat(2, 0.1fr)" gap="40px">
        {speciesData.map(sData => {
          return (
            <GridItem key={sData.id}>
              <SightedListedSpeciesTable name={sData.speciesName} speciesData={sData.data} />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

SightedListedSpecies.propTypes = {
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  speciesData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      speciesName: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          segment: PropTypes.string.isRequired,
          adults: PropTypes.number.isRequired,
          fledges: PropTypes.number.isRequired,
          chicks: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default SightedListedSpecies;
