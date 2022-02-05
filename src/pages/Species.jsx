import React from 'react';
import { Button, Box, Heading, Flex, Spacer, Text, VStack } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';

import DropdownSearch from '../components/DropdownSearch';
import DroppableList from '../components/DroppableList';

const Species = () => {
  const initialData = {
    species: { endangered: ['end1', 'end2', 'end3'], additional: ['add1', 'add2', 'add3'] },
    columns: {
      'col-1': { id: 'col-1', name: 'Listed Species (Endangered)', speciesSet: 'endangered' },
      'col-2': { id: 'col-2', name: 'Additional Species', speciesSet: 'additional' },
    },
  };

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
        <DragDropContext>
          <DroppableList
            name={initialData.columns['col-1'].name}
            species={initialData.species.endangered}
            colID={initialData.columns[0].id}
          />
          <DroppableList
            name={initialData.columns['col-2'].name}
            species={initialData.species.additional}
            colID={initialData.columns[1].id}
          />
        </DragDropContext>
      </VStack>
    </Box>
  );
};
export default Species;
