import { Box, Center, Flex, Spacer, Stack, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DropdownSearch from '../components/DropdownSearch';
import DroppableList from '../components/DroppableList';
import NewSpeciesModal from '../components/NewSpeciesModal';

const initialData = {
  endangered: {
    id: 'endangered',
    name: 'Listed Species (Endangered)',
    speciesIds: [],
  },
  additional: { id: 'additional', name: 'Additional Species', speciesIds: [] },
};

const onDragEnd = async (result, columns, setColumns) => {
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
    const newColumns = {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        speciesIds: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        speciesIds: destItems,
      },
    };
    Object.entries(newColumns).forEach(column => {
      column[1].speciesIds.sort((a, b) => (a.name > b.name ? 1 : -1));
    });
    setColumns(newColumns);

    const specie = columns[source.droppableId].speciesIds[source.index];
    // eslint-disable-next-line no-underscore-dangle
    const speciesID = specie._id;
    const newListing = destination.droppableId === 'endangered';
    await axios.put(`${process.env.REACT_APP_API_URL}/species/${speciesID}/${newListing}`);
  }
};
/*
  input: columns - contains id, names of columns, and species that belong to each column
  populates the page with each type of column and the species that belong to them
*/
const createLists = (columns, searchItem) => {
  // Create DroppableLists by iterating over each column in columns
  // Will pass in the species that belong to each list as well as their titles and ids
  return Object.entries(columns).map(([id, col]) => {
    const specieNames = col.speciesIds.map(specie => specie.name);
    return (
      <DroppableList
        key={id}
        name={col.name}
        species={specieNames}
        colID={id}
        searchItem={searchItem}
      />
    );
  });
};
const Species = () => {
  const [columns, setColumns] = useState(initialData);
  const [options, setOptions] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [change, setChange] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const highlightSearch = e => {
    if (e) setSearchItem(e.value);
    else setSearchItem('');
  };
  const getSpecies = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/species`);
      const formattedData = {
        endangered: {
          id: 'endangered',
          name: 'Listed Species (Endangered)',
          speciesIds: res.data.filter(specie => specie.isEndangered),
        },
        additional: {
          id: 'additional',
          name: 'Additional Species',
          speciesIds: res.data.filter(specie => !specie.isEndangered),
        },
      };
      Object.entries(formattedData).forEach(column => {
        column[1].speciesIds.sort((a, b) => (a.name > b.name ? 1 : -1));
      });
      setColumns(formattedData);
      const formattedOptions = res.data.map(specie => ({
        value: specie.name,
        label: specie.name,
      }));
      setOptions(formattedOptions);
      setIsLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };
  useEffect(() => {
    getSpecies();
  }, [change]);

  const addNewSpecies = async newSpecies => {
    await axios.post(`${process.env.REACT_APP_API_URL}/species/`, {
      name: newSpecies.name,
      code: newSpecies.code,
      isEndangered: newSpecies.group === 'endangered',
      isAssigned: false,
    });
    setChange(!change);
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
              <DropdownSearch options={options} handleSelectedValue={highlightSearch} />
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
