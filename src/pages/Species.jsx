import { Box, Center, Flex, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
// import config from 'config';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DropdownSearch from '../components/DropdownSearch';
import DroppableList from '../components/DroppableList';
import NewSpeciesModal from '../components/NewSpeciesModal';
// import router from '../species'
const initialData = {
  endangered: {
    id: 'endangered',
    name: 'Listed Species (Endangered)',
    speciesIds: ['Plover: Snowy (WSPL)', 'end2', 'end3', 'add1', 'add2', 'add3'],
  },
  additional: { id: 'additional', name: 'Additional Species', speciesIds: [] },
};
const dummyOptions = [
  { value: 'Plover: Snowy (WSPL)', label: 'Plover: Snowy (WSPL)' },
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
  // eslint-disable-next-line no-unused-vars
  const [options, setOptions] = useState(dummyOptions);
  const [searchItem, setSearchItem] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const [species, setSpecies] = useState([]);
  const highlightSearch = e => {
    if (e) setSearchItem(e.value);
    else setSearchItem('');
  };
  // const speciesID = searchParams.get('id');
  const getSpecies = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/species`);
      // eslint-disable-next-line no-console
      console.log(res);

      const formattedData = {
        endangered: {
          id: 'endangered',
          name: 'Listed Species (Endangered)',
          speciesIds: species.filter(specie => specie.isEndangered).map(specie => specie.name),
        },
        additional: {
          id: 'additional',
          name: 'Additional Species',
          speciesIds: species.filter(specie => !specie.isEndangered).map(specie => specie.name),
        },
      };

      const formattedOptions = species.map(specie => ({
        value: specie.name,
        label: specie.name,
      }));

      setSpecies(res.data);
      setColumns(formattedData);
      setOptions(formattedOptions);
      setIsLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };
  useEffect(() => {
    getSpecies();
  }, []);
  const addNewSpecies = newSpecies => {
    setOptions(prev => {
      return [...prev, { value: newSpecies.name, label: newSpecies.name }];
    });
    setColumns({
      ...columns,
      [newSpecies.group]: {
        ...columns[newSpecies.group],
        speciesIds: [...columns[newSpecies.group].speciesIds, newSpecies.name],
      },
    });
  };
  return (
    <Center>
      <Stack w="container.xl" justify-content="center" mb="4em">
        <VStack align="left" spacing="1.5em" w="100%">
          <Text fontWeight="600" fontSize="36px" mt="40px">
            Species List
          </Text>
          <VStack spacing={2} align="stretch">
            <strong>Search for a Species:</strong>
            <Box w="32.5%">
              <DropdownSearch options={options} highlightSearch={highlightSearch} />
            </Box>
            <Flex align="end">
              <Flex align="center">
                <Text as="i" fontWeight={450}>
                  Note: Adding a listed species will create a new section on the monitor log.
                </Text>
              </Flex>
              <Spacer />
              <NewSpeciesModal addNewSpecies={addNewSpecies} />
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
