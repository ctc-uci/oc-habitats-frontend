/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Grid, GridItem, VStack } from '@chakra-ui/react';
import SpeciesItem from './SpeciesItem';

const SpeciesList = ({ species, colID, searchItem, editSpecies, deleteSpecies }) => {
  return (
    <Flex
      border="1px"
      borderRadius="5px"
      borderColor="#A0AEC0"
      bgColor="#F7F7F7"
      justifyContent="center"
    >
      <VStack w="93%" align="left" m={{ md: '1.75em 0', sm: '1em 0' }} spacing="1.6em">
        <Grid
          templateColumns={{ md: 'repeat(3, 1fr)', sm: 'repeat(1, 1fr)' }}
          autoFlow="row dense"
          w="100%"
          columnGap="5em"
          rowGap={{ md: '1em', sm: '.5em' }}
          minHeight={{ md: '7em', sm: '.5em' }}
        >
          {species.map((specie, index) => {
            return (
              <GridItem key={specie}>
                <SpeciesItem
                  key={specie}
                  specie={specie}
                  index={index}
                  searchItem={searchItem}
                  col={colID}
                  editSpecies={editSpecies}
                  deleteSpecies={deleteSpecies}
                />
              </GridItem>
            );
          })}
        </Grid>
      </VStack>
    </Flex>
  );
};

SpeciesList.propTypes = {
  species: PropTypes.arrayOf(PropTypes.string).isRequired,
  colID: PropTypes.string.isRequired,
  searchItem: PropTypes.string.isRequired,
  editSpecies: PropTypes.func.isRequired,
  deleteSpecies: PropTypes.func.isRequired,
};

export default SpeciesList;
