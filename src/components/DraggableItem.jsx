/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Container } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const DraggableItem = ({ specie, index, searchItem }) => {
  return (
    <Draggable draggableId={specie} index={index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          borderColor="black"
          borderWidth="1px"
          bgColor={searchItem === specie ? 'skyblue' : 'white'}
        >
          {specie}
        </Container>
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
