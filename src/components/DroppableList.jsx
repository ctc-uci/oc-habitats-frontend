/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { Box, Flex, VStack, Heading } from '@chakra-ui/react';
import DraggableItem from './DraggableItem';

const DroppableList = ({ name, species, colID, searchItem }) => {
  return (
    <Flex
      border="1px"
      borderRadius="5px"
      borderColor="#A0AEC0"
      bgColor="#FBFBFB"
      justifyContent="center"
    >
      <VStack bgColor="green.200" w="93%" align="left">
        <Heading fontWeight={450} fontSize="1em">
          {name}
        </Heading>
        <Box bgColor="red.400" w="100%">
          <Droppable droppableId={colID} direction="row">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {species.map((specie, index) => {
                  return (
                    <DraggableItem
                      key={specie}
                      specie={specie}
                      index={index}
                      searchItem={searchItem}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Box>
      </VStack>
    </Flex>
  );
};

DroppableList.defaultProps = {
  name: PropTypes.string,
  species: PropTypes.arrayOf(PropTypes.string),
  colID: PropTypes.string,
  searchItem: PropTypes.string,
};

DroppableList.propTypes = {
  name: PropTypes.string,
  species: PropTypes.arrayOf(PropTypes.string),
  colID: PropTypes.string,
  searchItem: PropTypes.string,
};

export default DroppableList;
