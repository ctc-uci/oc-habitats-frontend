import React, { useState } from 'react';
import { Box, Center, Flex, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import NewSpeciesModal from '../components/NewSpeciesModal';
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

const dummyOptions = [
  { value: 'end1', label: 'end1' },
  { value: 'end2', label: 'end2' },
  { value: 'end3', label: 'end3' },
  { value: 'add1', label: 'add1' },
  { value: 'add2', label: 'add2' },
  { value: 'add3', label: 'add3' },
];

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
const createLists = (columns, searchItem) => {
  // Sort the species alphabetically for each column in case stored data is out of order
  Object.entries(columns).forEach(column => {
    column[1].speciesIds.sort();
  });

  // Create DroppableLists by iterating over each column in columns
  // Will pass in the species that belong to each list as well as their titles and ids
  return Object.entries(columns).map(([id, col]) => {
    return (
      <DroppableList
        key={id}
        name={col.name}
        species={col.speciesIds}
        colID={id}
        searchItem={searchItem}
      />
    );
  });
};

const Species = () => {
  const [columns, setColumns] = useState(initialData);
  const [options] = useState(dummyOptions);
  const [searchItem, setSearchItem] = useState('');
  const highlightSearch = e => {
    if (e) setSearchItem(e.value);
    else setSearchItem('');
  };

  return (
    <Center>
      <Stack w="container.xl" justify-content="center">
        <VStack align="left" spacing="1.5em" w="100%">
          <Text fontWeight="600" fontSize="36px" mt="40px">
            Species List
          </Text>
          <VStack spacing={2} align="stretch">
            <strong>Search for a Species:</strong>
            <Box w="32.5%">
              <DropdownSearch options={options} highlightSearch={highlightSearch} />
            </Box>
            <Flex align="center">
              <Flex align="flex-end">
                <Text as="i">
                  Note: Adding a listed species will create a new section on the monitor log.
                </Text>
              </Flex>
              <Spacer />
              <NewSpeciesModal />
            </Flex>
          </VStack>
          <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {createLists(columns, searchItem)}
          </DragDropContext>
        </VStack>
      </Stack>
    </Center>
  );
};
export default Species;
