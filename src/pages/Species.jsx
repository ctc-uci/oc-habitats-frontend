import { Box, Center, Flex, Spacer, Stack, Text, VStack, HStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DropdownSearch from '../components/DropdownSearch';
import DroppableList from '../components/DroppableList';
import NewSpeciesModal from '../components/NewSpeciesModal';
import NewPredatorModal from '../components/NewPredatorModal';

const initialData = {
  endangered: {
    id: 'listed',
    name: 'Listed Species',
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
const createLists = (columns, searchItem, editSpecies, deleteSpecies) => {
  // Create DroppableLists by iterating over each column in columns
  // Will pass in the species that belong to each list as well as their titles and ids
  return Object.entries(columns).map(([id, col]) => {
    // const specieNames = col.speciesIds.map(specie => specie.name);
    return (
      <>
        {/* <Text>{col.title}</Text> */}
        <VStack align="left">
          {col.title !== '' && (
            <Text fontWeight={550} align="left">
              {col.title}
            </Text>
          )}
          {/* <Text fontWeight={550} align="left">
            {col.title}
          </Text> */}
          <Text as="i" fontWeight={450}>
            {col.text}
          </Text>
        </VStack>
        <DroppableList
          key={id}
          name={col.name}
          species={col.speciesIds}
          colID={id}
          searchItem={searchItem}
          editSpecies={editSpecies}
          deleteSpecies={deleteSpecies}
        />
      </>
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
      // console.log(res.data);
      const formattedData = {
        endangered: {
          id: 'listed',
          title: 'Listed Species',
          text: 'Note: Adding a listed species will create a new section on the monitor log.',
          speciesIds: res.data.filter(specie => specie.isListed),
        },
        predators: {
          id: 'predators',
          title: 'Predators',
          text: 'Note: To mark a tracked non-listed species as a predator, click on the species, select "Edit", and select "Yes" on the "Is a Predator" field.',
          speciesIds: res.data.filter(specie => specie.isPredator),
        },
        nonListed: {
          id: 'nonListed',
          title: 'Non-Listed Species',
          text: '',
          speciesIds: res.data.filter(specie => specie.isPredator && !specie.isListed),
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
      isListed: newSpecies.group === 'listed',
      isPredator: newSpecies.predator === 'Yes',
      isAssigned: false,
    });
    setChange(!change);
  };

  const addNewPredator = async newSpecies => {
    await axios.post(`${process.env.REACT_APP_API_URL}/species/`, {
      name: newSpecies.name,
      code: newSpecies.code,
      isListed: newSpecies.group === 'listed',
      isPredator: true,
      isAssigned: false,
    });
    setChange(!change);
  };

  const editSpecies = async (newSpecies, oldSpecies) => {
    // eslint-disable-next-line dot-notation
    await axios.put(`${process.env.REACT_APP_API_URL}/species/${oldSpecies['_id']}`, {
      name: newSpecies.name,
      code: newSpecies.code,
      isListed: newSpecies.group === 'listed',
      isPredator: newSpecies.predator === 'Yes',
      isAssigned: false,
    });
    setChange(c => !c);
  };

  const deleteSpecies = async deletedSpecie => {
    console.log(deletedSpecie);
    // eslint-disable-next-line dot-notation
    await axios.delete(`${process.env.REACT_APP_API_URL}/species/${deletedSpecie}`);
    setChange(c => !c);
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
            <HStack>
              <Box w="100%">
                <Flex justifyContent="space-between" flexDir="row">
                  <Box w="32.5%">
                    <DropdownSearch options={options} handleSelectedValue={highlightSearch} />
                  </Box>
                  <HStack>
                    <NewSpeciesModal addNewSpecies={addNewSpecies} />
                    <NewPredatorModal addNewPredator={addNewPredator} />
                  </HStack>
                </Flex>
              </Box>
            </HStack>
          </VStack>
          {createLists(columns, searchItem, editSpecies, deleteSpecies)}
        </VStack>
      </Stack>
    </Center>
  );
};
export default Species;
