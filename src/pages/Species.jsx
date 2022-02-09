import React, { useState } from 'react';
import { Button, Box, Container, Heading, Flex, Spacer, Text, VStack } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';

import DropdownSearch from '../components/DropdownSearch';
import DroppableList from '../components/DroppableList';

const initialData = {
  endangered: {
    id: 'endangered',
    name: 'Listed Species (Endangered)',
    speciesIds: ['end1', 'end2', 'end3', 'add1', 'add2', 'add3'],
  },
  additional: { id: 'additional', name: 'Additional Species', speciesIds: [] },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.speciesIds];
    const destItems = [...destColumn.speciesIds];
    const [removed] = sourceItems.splice(source.index, 1);
    sourceItems.sort();
    destItems.push(removed);
    destItems.sort();
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        speciesIds: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        speciesIds: destItems,
      },
    });
  }
};

/*
  input: columns - contains id, names of columns, and species that belong to each column
  populates the page with each type of column and the species that belong to them
*/
const createLists = columns => {
  // Sort the species alphabetically for each column in case stored data is out of order
  Object.entries(columns).forEach(column => {
    column[1].speciesIds.sort();
  });

  // Create DroppableLists by iterating over each column in columns
  // Will pass in the species that belong to each list as well as their titles and ids
  return Object.entries(columns).map(([id, col]) => {
    return <DroppableList key={id} name={col.name} species={col.speciesIds} colID={id} />;
  });
};

const Species = () => {
  const [columns, setColumns] = useState(initialData);

  return (
    <Box ml="171px" mr="171px">
      <Heading align="left" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
        Species List
      </Heading>
      <VStack spacing={4} align="stretch">
        <strong>Search for a Species:</strong>
        <DropdownSearch />
        <Flex align="center">
          <Flex align="flex-end">
            <Text as="i">
              {' '}
              Note: Adding a listed species will create a new section on the monitor log.{' '}
            </Text>
          </Flex>
          <Spacer />
          <Button bg="#2D3748" color="#F7FAFC">
            {' '}
            + New Species{' '}
          </Button>
        </Flex>
        <Container width="container.xl">
          <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {createLists(columns)}
          </DragDropContext>
        </Container>
      </VStack>
    </Box>
  );
};
export default Species;
