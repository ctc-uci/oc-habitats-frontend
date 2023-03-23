import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  FormControl,
  HStack,
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
import { FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AddSpeciesModal from './AddSpeciesModal';
import EditSpeciesModal from './EditSpeciesModal';

const FORM_PREFIX = 'additionalSpecies.';

const AdditionalSpeciesTab = ({ showHeader, isDisabled, isTemplate, species }) => {
  const { getValues, setValue } = useFormContext();
  const [speciesEntries, setSpeciesEntries] = useState(getValues(`${FORM_PREFIX}entries`) || {});

  useEffect(() => {
    console.log(speciesEntries);
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
  const getOtherSpecies = () => speciesOptions.find(s => s.label === 'Other (Other)');

  const handleAddRow = newSpecies => {
    setSpeciesEntries(prevSpecies => {
      const { species: speciesId, ...newSpeciesObj } = newSpecies;
      const newEntries = { ...prevSpecies };
      if (speciesId === getOtherSpecies().value) {
        if (Object.prototype.hasOwnProperty.call(prevSpecies, speciesId)) {
          newEntries[speciesId] = [...newEntries[speciesId], { ...newSpeciesObj }];
        } else {
          newEntries[speciesId] = [{ ...newSpeciesObj }];
        }
      } else if (Object.prototype.hasOwnProperty.call(prevSpecies, speciesId)) {
        if (newSpecies.notes !== '') {
          if (newEntries[speciesId].notes !== '') {
            newEntries[speciesId].notes += `\n${newSpecies.notes}`;
          } else {
            newEntries[speciesId].notes = newSpecies.notes;
          }
        }
        newEntries[speciesId].count += newSpecies.count;
      } else {
        newEntries[speciesId] = newSpeciesObj;
      }
      return newEntries;
    });
  };

  const handleDeleteRow = (speciesId, index = 0) => {
    setSpeciesEntries(entries => {
      const newEntries = { ...entries };
      if (speciesId === getOtherSpecies().value) {
        newEntries[speciesId].splice(index, 1);
      } else {
        delete newEntries[speciesId];
      }
      return newEntries;
    });
  };

  // const handleEditRow = newSpecies => {
  //   const { oldId, species: speciesId, ...newRow } = newSpecies;
  //   setSpeciesEntries(prevSpecies => {
  //     let newEntries = { ...prevSpecies };
  //     if (oldId !== speciesId) {
  //       // if we're changing the species ID, check if the new species is already in the table
  //       if (Object.prototype.hasOwnProperty.call(prevSpecies, speciesId)) {
  //         // if it is, merge the two rows
  //         newRow.count += prevSpecies[speciesId].count;
  //         if (prevSpecies[speciesId].notes) {
  //           newRow.notes += `\n${prevSpecies[speciesId].notes}`;
  //         }
  //         newEntries = newEntries.filter(s => s.species !== newRow.species);
  //       }
  //     }
  //     newEntries[newEntries] = newRow;
  //     return newEntries;
  //   });
  // };

  const handleEditRow = editedSpecies => {
    const { oldId, species: speciesId, index, ...newRow } = editedSpecies;
    setSpeciesEntries(prevSpecies => {
      let newEntries = { ...prevSpecies };
      if (speciesId === getOtherSpecies().value) {
        if (oldId !== speciesId) {
          if (Object.prototype.hasOwnProperty.call(prevSpecies, speciesId)) {
            newEntries[speciesId] = [...newEntries[speciesId], ...newRow];
          } else {
            newEntries[speciesId] = [...newEntries[speciesId], ...newRow];
          }
          delete newEntries[oldId];
        } else {
          newEntries[speciesId][index] = newRow;
        }
      } else {
        if (oldId !== speciesId) {
          // if we're changing the species ID, check if the new species is already in the table
          if (Object.prototype.hasOwnProperty.call(prevSpecies, speciesId)) {
            // if it is, merge the two rows
            newRow.count += prevSpecies[speciesId].count;
            if (prevSpecies[speciesId].notes) {
              newRow.notes += `\n${prevSpecies[speciesId].notes}`;
            }
            newEntries = newEntries.filter(s => s.species !== newRow.species);
          }
          delete newEntries[oldId];
        }
        newEntries[speciesId] = newRow;
      }
      return newEntries;
    });
  };

  const createTable = data => {
    return Object.entries(data).map(([speciesId, row]) => {
      return speciesId !== getOtherSpecies().value ? (
        <AccordionItem key={speciesId} as={Tbody}>
          {({ isExpanded }) => (
            <>
              <Tr>
                <Td border="none">
                  {!isDisabled && (
                    <EditSpeciesModal
                      speciesId={speciesId}
                      speciesRow={row}
                      editRow={handleEditRow}
                      deleteRow={handleDeleteRow}
                      speciesOptions={speciesOptions}
                    />
                  )}
                </Td>
                <Td border="none">
                  <Text fontSize="1.05em" color="#2D3748" fontWeight={450}>
                    {getSpeciesLabel(speciesId)}
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
                            <Text color="#2D3748" fontSize=".95em" ml={5} mr={1}>
                              {row.notes ?? '--'}
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
      ) : (
        row.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <AccordionItem key={`${speciesId} ${index}`} as={Tbody}>
            {({ isExpanded }) => (
              <>
                <Tr>
                  <Td border="none">
                    {!isDisabled && (
                      <EditSpeciesModal
                        speciesId={speciesId}
                        speciesRow={{ ...item }}
                        editRow={handleEditRow}
                        deleteRow={handleDeleteRow}
                        speciesOptions={speciesOptions}
                        index={index}
                      />
                    )}
                  </Td>
                  <Td border="none">
                    <Text fontSize="1.05em" color="#2D3748" fontWeight={450}>
                      {getSpeciesLabel(speciesId)}
                    </Text>
                  </Td>
                  <Td border="none" color="#2D3748" fontWeight={450}>
                    {item.count.toLocaleString()}
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
                              <Text color="#2D3748" fontSize=".95em" ml={5} mr={1}>
                                {item.notes ?? '--'}
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
        ))
      );
    });
  };
  // TODO: UPDATE SPECIES CATALOG LINK BEFORE HANDING OFF THE PROJECT
  return (
    <>
      {isTemplate && (
        <>
          <Text mt="30px" color="ochPurple" fontWeight="500">
            The Non-Listed Species section of the Monitor Log Template cannot be edited.
          </Text>
          <HStack mb="30px">
            <Text color="ochPurple" fontWeight="500">
              To view or edit the current catalogue of Non-Listed Species,
            </Text>
            <Link to="/species">
              <Text color="#2B6CB0" fontWeight="500" maxW="100vw">
                Open Species Catalog
              </Text>
            </Link>
            <Link to="/species">
              <Text color="#2B6CB0" fontWeight="500" maxW="100vw">
                <FiExternalLink />
              </Text>
            </Link>
          </HStack>
        </>
      )}
      <VStack align="left" spacing="29px">
        {showHeader && (
          <Text fontWeight="600" fontSize="2xl">
            Non-Listed Species
          </Text>
        )}
        <FormControl>
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
                  {Object.keys(speciesEntries).length === 0 && (
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
              <Text>
                To report sick or injured terrestrial wildlife, contact the WWCC at 714.374.5587
              </Text>
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
        </FormControl>
      </VStack>
    </>
  );
};

AdditionalSpeciesTab.defaultProps = {
  isDisabled: false,
  showHeader: true,
  isTemplate: false,
  species: [],
};

AdditionalSpeciesTab.propTypes = {
  isDisabled: PropTypes.bool,
  showHeader: PropTypes.bool,
  isTemplate: PropTypes.bool,
  species: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string,
    }),
  ),
};

export default AdditionalSpeciesTab;
