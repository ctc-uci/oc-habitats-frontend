import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import AddSpeciesModal from './AddSpeciesModal';
import EditSpeciesModal from './EditSpeciesModal';

const FORM_PREFIX = 'additionalSpecies.';

const AdditionalSpeciesTab = ({ showHeader, isDisabled, species }) => {
  const { getValues, setValue } = useFormContext();
  const [speciesEntries, setSpeciesEntries] = useState(getValues(`${FORM_PREFIX}entries`) || []);

  useEffect(() => {
    setValue(`${FORM_PREFIX}entries`, speciesEntries);
  }, [speciesEntries]);

  const speciesOptions = useMemo(
    () =>
      species.map(s => ({
        value: s._id,
        label: `${s.name} (${s.code})`,
      })),
    [species],
  );

  const getSpeciesLabel = speciesId => speciesOptions.find(s => s.value === speciesId)?.label;

  const handleAddRow = newSpecies => {
    setSpeciesEntries(prevSpecies => {
      const existingIndex = speciesEntries.findIndex(s => newSpecies.species === s.species);
      if (existingIndex !== -1) {
        const newEntries = [...speciesEntries];
        newEntries[existingIndex].count += newSpecies.count;
        if (newSpecies.notes !== '') {
          if (newEntries[existingIndex].notes !== '') {
            newEntries[existingIndex].notes += `\n${newSpecies.notes}`;
          } else {
            newEntries[existingIndex].notes = newSpecies.notes;
          }
        }
        return newEntries;
      }
      return [...prevSpecies, newSpecies];
    });
  };

  const handleDeleteRow = speciesId => {
    setSpeciesEntries(entries => entries.filter(s => s.species !== speciesId));
  };

  const handleEditRow = newSpecies => {
    const { oldId } = newSpecies;
    const newRow = newSpecies;
    delete newRow.oldId;
    const indexToModify = speciesEntries.findIndex(s => oldId === s.species);
    setSpeciesEntries(prevSpecies => {
      let newEntries = [...prevSpecies];
      if (oldId !== newRow.species) {
        // if we're changing the species ID, check if the new species is already in the table
        const newSpeciesIndex = prevSpecies.findIndex(s => newRow.species === s.species);
        if (newSpeciesIndex !== -1) {
          // if it is, merge the two rows
          newRow.count += prevSpecies[newSpeciesIndex].count;
          if (prevSpecies[newSpeciesIndex].notes) {
            newRow.notes += `\n${prevSpecies[newSpeciesIndex].notes}`;
          }
          newEntries = newEntries.filter(s => s.species !== newRow.species);
        }
      }
      newEntries[indexToModify] = newRow;
      return newEntries;
    });
  };

  const createTable = data => {
    return data.map(row => (
      <AccordionItem key={row.species} as={Tbody}>
        {({ isExpanded }) => (
          <>
            <Tr>
              <Td border="none">
                {!isDisabled && (
                  <EditSpeciesModal
                    speciesRow={row}
                    editRow={handleEditRow}
                    deleteRow={handleDeleteRow}
                    speciesOptions={speciesOptions}
                  />
                )}
              </Td>
              <Td border="none">
                <Text fontSize="1.05em" color="#2D3748" fontWeight={450}>
                  {getSpeciesLabel(row.species)}
                </Text>
              </Td>
              <Td border="none" color="#2D3748" fontWeight={450}>
                {row.count}
              </Td>
              <Td border="none">
                <Flex justifyContent="flex-end">
                  <AccordionButton w="2em" h="2em">
                    <AccordionIcon w="inherit" h="inherit" />
                  </AccordionButton>
                </Flex>
              </Td>
            </Tr>
            <Tr w="100%">
              {isExpanded && (
                <>
                  <Td colSpan={4}>
                    <AccordionPanel>
                      <VStack w="97.5%" spacing="1.5em" mb=".5em">
                        <Flex justifyContent="space-between" w="100%">
                          <Text fontSize=".95em" color="#2D3748" fontWeight={500}>
                            Notes (Optional)
                          </Text>
                          <Text color="#2D3748" fontSize=".95em">
                            {row.notes ? row.notes : '--'}
                          </Text>
                        </Flex>
                      </VStack>
                    </AccordionPanel>
                  </Td>
                </>
              )}
            </Tr>
          </>
        )}
      </AccordionItem>
    ));
  };

  return (
    <VStack align="left" spacing="29px">
      {showHeader && (
        <Text fontWeight="600" fontSize="2xl">
          Additional Species
        </Text>
      )}
      <Stack
        mt="20px"
        minH="200px"
        direction={{ lg: 'row', base: 'column' }}
        spacing={{ lg: '100px', base: '30px' }}
      >
        <VStack w={{ lg: '650px', base: '100%' }} align="start">
          <Box
            w="100%"
            border="1px solid darkgray"
            rounded="md"
            overflow="scroll"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <Accordion as={Table} width="100%" allowToggle reduceMotion>
              <Thead w="100%" bg="#4E4E4E" borderColor="gray.200">
                <Tr>
                  <Th w="8%" bgColor="none" />
                  <Th
                    w="65%"
                    fontWeight={600}
                    color="#FFFFFF"
                    textTransform="capitalize"
                    fontSize=".8em"
                  >
                    Species
                  </Th>
                  <Th
                    bgColor="none"
                    fontWeight={600}
                    color="#FFFFFF"
                    textTransform="capitalize"
                    fontSize=".8em"
                  >
                    Total
                  </Th>
                  <Th />
                </Tr>
              </Thead>
              {speciesEntries.length === 0 && (
                <Tbody>
                  <Tr>
                    <Td colSpan={4} textAlign="center">
                      No species added
                    </Td>
                  </Tr>
                </Tbody>
              )}
              {createTable(speciesEntries)}
            </Accordion>
          </Box>
          {!isDisabled && (
            <AddSpeciesModal addNewRow={handleAddRow} speciesOptions={speciesOptions} />
          )}
        </VStack>
        <VStack alignItems="start" maxW="768px">
          <Text fontWeight="600" fontSize="xl">
            Injured Terrestrial Wildlife
          </Text>
          {showHeader && (
            <Text>
              To report sick or injured terrestrial wildlife, contact the WWCC at 714.374.5587
            </Text>
          )}
          <FormControl>
            <NumberInput
              min={0}
              isDisabled={isDisabled}
              onChange={val => setValue(`${FORM_PREFIX}injuredCount`, parseInt(val, 10))}
              defaultValue={getValues(`${FORM_PREFIX}injuredCount`) || 0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Text fontWeight="600" fontSize="xl">
            Beach Cast
          </Text>
          <FormControl>
            <NumberInput
              mb="50px"
              min={0}
              isDisabled={isDisabled}
              onChange={val => setValue(`${FORM_PREFIX}beachCast`, parseInt(val, 10))}
              defaultValue={getValues(`${FORM_PREFIX}beachCast`) || 0}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </VStack>
      </Stack>
    </VStack>
  );
};

AdditionalSpeciesTab.defaultProps = {
  isDisabled: false,
  showHeader: true,
};

AdditionalSpeciesTab.propTypes = {
  isDisabled: PropTypes.bool,
  showHeader: PropTypes.bool,
  species: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string,
    }),
  ).isRequired,
};

export default AdditionalSpeciesTab;
