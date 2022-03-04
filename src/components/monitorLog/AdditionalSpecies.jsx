import React, { useState } from 'react';
import {
  Text,
  VStack,
  SimpleGrid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
} from '@chakra-ui/react';

import AddSpeciesModal from './AddSpeciesModal';
import EditSpeciesModal from './EditSpeciesModal';

const rows = [
  { name: 'Sandpiper: Long-billed Curlew (LBCU)', total: 2, notes: 'testing' },
  { name: 'Test', total: 1, notes: null },
];

const AdditionalSpecies = () => {
  const [species, setSpecies] = useState(rows);

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
                <EditSpeciesModal
                  specie={getSpecie(row.name)}
                  editRow={handleEditRow}
                  deleteRow={handleDeleteRows}
                />
              </Td>
              <Td border="none">
                <Text fontSize="1.05em">{row.name}</Text>
              </Td>
              <Td border="none">
                <AccordionButton w="2em" h="2em">
                  <AccordionIcon w="inherit" h="inherit" />
                </AccordionButton>
              </Td>
            </Tr>
            <Tr w="100%">
              {isExpanded && (
                <>
                  <Td colSpan={3}>
                    <AccordionPanel>
                      <VStack w="97.5%" spacing="1.5em" mb=".5em">
                        <Flex justifyContent="space-between" w="100%">
                          <Text fontWeight={500}>Total</Text>
                          <Text>{row.total}</Text>
                        </Flex>

                        <Flex justifyContent="space-between" w="100%">
                          <Text fontWeight={500}>Notes (Optional)</Text>
                          <Text>{row.notes ? row.notes : '--'}</Text>
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
    <Container maxW="100vw">
      <VStack align="left" spacing="29px">
        <Text fontWeight="600" fontSize="2xl">
          Additional Species
        </Text>
        <FormControl>
          <SimpleGrid columns={2} h="166px" columnGap="26px">
            <GridItem colSpan={1}>
              <Accordion as={Table} allowToggle width="50em" reduceMotion>
                <Thead w="100%" bg="#F7FAFC">
                  <Tr>
                    <Th />
                    <Th w="100%">Specie</Th>
                    <Th />
                  </Tr>
                </Thead>
                {createTable(species)}
              </Accordion>
            </GridItem>
            <GridItem colSpan={2} mt="2em">
              <AddSpeciesModal addNewRow={handleAddRow} />
            </GridItem>
          </SimpleGrid>
        </FormControl>
      </VStack>
    </Container>
  );
};

export default AdditionalSpecies;
