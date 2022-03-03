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
  { name: 'Test', total: 1, notes: 'hi' },
];

const AdditionalSpecies = () => {
  const [species, setSpecies] = useState(rows);

  const handleAddRow = newSpecie => {
    const newSpecies = [...species, newSpecie];

    setSpecies(newSpecies);
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

  const createTable = m => {
    return m.map(row => (
      <Tr height="72px" key={row.name}>
        <Td w="100%">
          <Accordion allowToggle>
            <AccordionItem id={row.name} borderColor="transparent">
              <h2>
                <AccordionButton>
                  <Flex flex="1" alignItems="center">
                    <EditSpeciesModal
                      specie={getSpecie(row.name)}
                      editRow={handleEditRow}
                      deleteRow={handleDeleteRows}
                    />
                    <Text ml="1.25em" fontSize="1.05em">
                      {row.name}
                    </Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel mt=".75em">
                <SimpleGrid columns={1} rowGap="1.5em">
                  <GridItem>
                    <Flex justifyContent="space-between" w="100%">
                      <Text fontWeight={500}>Total</Text>
                      <Text>{row.total}</Text>
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Flex justifyContent="space-between" w="100%">
                      <Text fontWeight={500}>Notes (Optional)</Text>
                      <Text>{row.notes ? row.notes : '--'}</Text>
                    </Flex>
                  </GridItem>
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Td>
      </Tr>
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
              <Table
                id="speciesTable"
                variant="simple"
                borderRadius="10px"
                overflow="hidden"
                w="50em"
              >
                <Thead>
                  <Tr>
                    <Th pl="8.5em" backgroundColor="#F7FAFC">
                      Species
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>{createTable(species)}</Tbody>
              </Table>
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
