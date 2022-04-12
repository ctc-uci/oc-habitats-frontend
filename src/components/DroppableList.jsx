/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { Flex, Grid, GridItem, Heading, VStack } from '@chakra-ui/react';
import DraggableItem from './DraggableItem';

const DroppableList = ({ name, species, colID, searchItem, editSpecies }) => {
  return (
    <Flex
      border="1px"
      borderRadius="5px"
      borderColor="#A0AEC0"
      bgColor="#F7F7F7"
      justifyContent="center"
    >
      <VStack w="93%" align="left" m="1.75em 0" spacing="1.6em">
        <Grid
          templateColumns="repeat(3, 1fr)"
          autoFlow="row dense"
          w="100%"
          columnGap="5em"
          rowGap="1em"
          minHeight="7em"
        >
          {species.map((specie, index) => {
            return (
              <GridItem key={specie}>
                <DraggableItem
                  key={specie}
                  specie={specie}
                  index={index}
                  searchItem={searchItem}
                  col={colID}
                  editSpecies={editSpecies}
                />
              </GridItem>
            );
          })}
        </Grid>
      </VStack>
    </Flex>
  );
};

DroppableList.propTypes = {
  name: PropTypes.string.isRequired,
  species: PropTypes.arrayOf(PropTypes.string).isRequired,
  colID: PropTypes.string.isRequired,
  searchItem: PropTypes.string.isRequired,
  editSpecies: PropTypes.func.isRequired,
};

export default DroppableList;
