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
          borderColor="black"
          borderWidth="1px"
          pl=".75em"
          w="40%"
          bgColor={searchItem === specie ? 'skyblue' : 'white'}
        >
          <Text fontSize="1em" fontWeight={400}>
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
