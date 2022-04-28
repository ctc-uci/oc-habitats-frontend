import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  FormControl,
  Grid,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import AddSpeciesModal from './AddSpeciesModal';
import EditSpeciesModal from './EditSpeciesModal';

const FORM_PREFIX = 'additionalSpecies.';

const AdditionalSpeciesTab = ({ showHeader, isDisabled }) => {
  const { getValues, setValue } = useFormContext();
  const [species, setSpecies] = useState(getValues(`${FORM_PREFIX}entries`) || []);

  useEffect(() => {
    setValue(`${FORM_PREFIX}entries`, species);
  }, [species]);

  const handleAddRow = newSpecie => {
    setSpecies(prevSpecies => {
      return [...prevSpecies, newSpecie];
    });
  };

  const handleEditRow = updatedSpecie => {
    const oldSpecieIndex = species.findIndex(specie => {
      return updatedSpecie.oldName === specie.name;
    });
    const newRows = [...species];
    const updated = updatedSpecie;
    delete updated.oldName;
    newRows[oldSpecieIndex] = updated;

    setSpecies(newRows);
  };

  const handleDeleteRows = specieName => {
    const newRows = species.filter(specie => specie.name !== specieName);
    setSpecies(newRows);
  };

  const getSpecie = name => {
    const specie = species.filter(currSpecie => {
      return currSpecie.name === name;
    });
    return specie[0];
  };

  const createTable = data => {
    return data.map((row, n) => (
      // eslint-disable-next-line react/no-array-index-key
      <AccordionItem key={n} as={Tbody}>
        {({ isExpanded }) => (
          <>
            <Tr>
              <Td border="none">
                {!isDisabled && (
                  <EditSpeciesModal
                    specie={getSpecie(row.name)}
                    editRow={handleEditRow}
                    deleteRow={handleDeleteRows}
                  />
                )}
              </Td>
              <Td border="none">
                <Text fontSize="1.05em" color="#2D3748" fontWeight={450}>
                  {row.name}
                </Text>
              </Td>
              <Td border="none" color="#2D3748" fontWeight={450}>
                {row.total}
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
      <FormControl>
        <Grid marginTop="20px" minH="200px" templateColumns="repeat(6, 1fr)" gap="150">
          <GridItem colSpan={3}>
            <Box overflow="hidden" border="1px solid darkgray" rounded="md" mb="4">
              <Accordion as={Table} allowToggle reduceMotion>
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
                {species.length === 0 && (
                  <Tbody>
                    <Tr>
                      <Td colSpan={4} textAlign="center">
                        No species added
                      </Td>
                    </Tr>
                  </Tbody>
                )}
                {createTable(species)}
              </Accordion>
            </Box>
            {!isDisabled && <AddSpeciesModal addNewRow={handleAddRow} />}
          </GridItem>
          <GridItem colSpan="2">
            <VStack alignItems="start">
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
          </GridItem>
        </Grid>
      </FormControl>
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
};

export default AdditionalSpeciesTab;
