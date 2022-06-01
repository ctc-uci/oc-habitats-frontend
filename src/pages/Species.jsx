import { Box, Center, Flex, Stack, Text, VStack, HStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DropdownSearch from '../components/DropdownSearch';
import SpeciesList from '../components/Species/SpeciesList';
import NewSpeciesModal from '../components/Species/NewSpeciesModal';
import NewPredatorModal from '../components/Species/NewPredatorModal';
import { OCHBackend } from '../common/utils';

const initialData = {
  endangered: {
    id: 'listed',
    name: 'Listed Species',
    speciesIds: [],
  },
  additional: { id: 'additional', name: 'Additional Species', speciesIds: [] },
};

/*
  input: columns - contains id, names of columns, and species that belong to each column
  populates the page with each type of column and the species that belong to them
*/
const createLists = (columns, searchItem, editSpecies, deleteSpecies, isLoading) => {
  // Create DroppableLists by iterating over each column in columns
  // Will pass in the species that belong to each list as well as their titles and ids
  return Object.entries(columns).map(([id, col]) => {
    return (
      <>
        <VStack align="left">
          {col.title !== '' && (
            <Text fontWeight={550} align="left">
              {col.title}
            </Text>
          )}
          <Text as="i" fontWeight={450}>
            {col.text}
          </Text>
        </VStack>
        <SpeciesList
          key={id}
          name={col.name}
          species={col.speciesIds}
          colID={id}
          searchItem={searchItem}
          editSpecies={editSpecies}
          deleteSpecies={deleteSpecies}
          loading={isLoading}
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
      const res = await OCHBackend.get('species', {
        withCredentials: true,
      });
      const formattedData = {
        listed: {
          id: 'listed',
          title: 'Listed Species',
          text: 'Note: Adding a listed species will create a new section on the monitor log.',
          speciesIds: res.data.filter(specie => specie.category === 'LISTED'),
        },
        predators: {
          id: 'predators',
          title: 'Predators',
          text: 'Note: To mark a tracked non-listed species as a predator, click on the species, select "Edit", and select "Yes" on the "Is a Predator" field.',
          speciesIds: res.data.filter(
            specie =>
              specie.category === 'JUST_PREDATOR' || specie.category === 'NON_LISTED_PREDATOR',
          ),
        },
        nonListed: {
          id: 'nonListed',
          title: 'Non-Listed Species',
          text: '',
          speciesIds: res.data.filter(
            specie => specie.category === 'NON_LISTED' || specie.category === 'NON_LISTED_PREDATOR',
          ),
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
    await OCHBackend.post(
      'species',
      {
        name: newSpecies.name,
        code: newSpecies.code,
        category: newSpecies.category,
        isAssigned: false,
      },
      { withCredentials: true },
    );
    setChange(!change);
  };

  const addNewPredator = async newSpecies => {
    await OCHBackend.post(
      'species',
      {
        name: newSpecies.name,
        code: newSpecies.code,
        category: newSpecies.category,
        isAssigned: false,
      },
      { withCredentials: true },
    );
    setChange(!change);
  };

  const editSpecies = async (newSpecies, oldSpecies) => {
    // eslint-disable-next-line no-underscore-dangle
    await OCHBackend.put(
      `species/${oldSpecies._id}`,
      {
        name: newSpecies.name,
        code: newSpecies.code,
        category: newSpecies.category,
        isAssigned: false,
      },
      { withCredentials: true },
    );
    setChange(c => !c);
  };

  const deleteSpecies = async deletedSpecie => {
    // eslint-disable-next-line dot-notation
    await OCHBackend.delete(`species/${deletedSpecie}`, {
      withCredentials: true,
    });
    setChange(c => !c);
  };
  const isAdmin = true;
  return (
    <Center>
      <Stack w="container.xl" justify-content="center" mb="4em" mx="1.5em">
        <VStack align="left" spacing="1.5em" w="100%">
          <Text fontWeight="600" fontSize="36px" mt="40px">
            Species List
          </Text>
          <VStack spacing={2} align="stretch">
            <strong>Search for a Species:</strong>
            <HStack>
              <Box w="100%">
                <Flex justifyContent="space-between" flexDir={{ md: 'row', base: 'column' }}>
                  <Box w={{ md: '32.5%', base: '100%' }} my={{ md: '0', base: '5' }}>
                    <DropdownSearch options={options} handleSelectedValue={highlightSearch} />
                  </Box>
                  {isAdmin && (
                    <HStack>
                      <NewSpeciesModal addNewSpecies={addNewSpecies} />
                      <NewPredatorModal addNewPredator={addNewPredator} />
                    </HStack>
                  )}
                </Flex>
              </Box>
            </HStack>
          </VStack>
          {createLists(columns, searchItem, editSpecies, deleteSpecies, isLoading)}
        </VStack>
      </Stack>
    </Center>
  );
};

export default Species;
