/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const DraggableItem = ({ specie, index, searchItem }) => {
  return (
    <Draggable draggableId={specie} index={index}>
      {provided => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          borderColor="#CBD5E0"
          borderWidth="1px"
          borderRadius="6px"
          pl=".75em"
          w="100%"
          bgColor={searchItem === specie ? 'skyblue' : 'white'}
        >
          <Text fontSize="1em" fontWeight={450} color="#2D3748" p=".5em">
            {specie}
          </Text>
        </Box>
      )}
    </Draggable>
  );
};

DraggableItem.defaultProps = {
  specie: PropTypes.string,
  index: PropTypes.number,
  searchItem: PropTypes.string,
};

DraggableItem.propTypes = {
  specie: PropTypes.string,
  index: PropTypes.number,
  searchItem: PropTypes.string,
};

export default DraggableItem;
