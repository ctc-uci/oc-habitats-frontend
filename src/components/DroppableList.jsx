/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { Container, Flex, Heading } from '@chakra-ui/react';
import DraggableItem from './DraggableItem';

const DroppableList = ({ name, species, colID }) => {
  return (
    <Container border="2px" borderColor="black" bgColor="#FBFBFB" width="container.xl">
      <Heading>{name}</Heading>
      <Flex d="flex" gridGap={8} wrap="wrap" w="inherit" m="1em auto">
        <Droppable droppableId={colID}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {species.map((specie, index) => {
                return <DraggableItem key={specie} specie={specie} index={index} />;
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Flex>
    </Container>
  );
};

DroppableList.defaultProps = {
  name: PropTypes.string,
  species: PropTypes.arrayOf(PropTypes.string),
  colID: PropTypes.string,
};

DroppableList.propTypes = {
  name: PropTypes.string,
  species: PropTypes.arrayOf(PropTypes.string),
  colID: PropTypes.string,
};

export default DroppableList;
