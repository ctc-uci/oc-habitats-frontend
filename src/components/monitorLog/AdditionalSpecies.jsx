/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Text,
  VStack,
  SimpleGrid,
  GridItem,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  IconButton,
  Container,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ChevronDownIcon } from '@chakra-ui/icons';
import Select from 'react-select';
import PropTypes from 'prop-types';
import AddSpeciesModal from './AddSpeciesModal';
import EditSpeciesModal from './EditSpeciesModal';

const rows = [
  { name: 'Sandpiper: Long-billed Curlew (LBCU)', total: 2, notes: 'testing' },
  { name: 'Test', total: 1, notes: 'hi' },
];

const AdditionalSpecies = () => {
  const [species, setSpecies] = useState(rows);
  const [allChecked, setAllChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [option, setOption] = useState('');
  // const [isOpen, setIsOpen, onClose] = useState(false);

  const findChecked = value => {
    return value.isChecked;
  };

  const handleAddTotalChange = (value, id) => {
    const newTotalData = [...species];
    newTotalData[id].total = value;

    setSpecies(newTotalData);
  };

  const handleAllChecked = () => {
    const newCheckedData = [...species];
    if (allChecked) {
      for (let i = 1; i < newCheckedData.length; i += 1) {
        newCheckedData[i].isChecked = false;
      }
    } else {
      for (let i = 1; i < newCheckedData.length; i += 1) {
        newCheckedData[i].isChecked = true;
      }
    }
    setDisabled(!newCheckedData.some(findChecked));
    setAllChecked(!allChecked);
    setSpecies(newCheckedData);
  };

  const handleRowCheckedItems = id => {
    const newCheckedData = [...species];
    newCheckedData[id].isChecked = !newCheckedData[id].isChecked;
    setDisabled(!newCheckedData.some(findChecked));
    setSpecies(newCheckedData);
  };

  const handleAddRow = newSpecie => {
    console.log('newSpecie', newSpecie);
    const newSpecies = [...species, newSpecie];

    setSpecies(newSpecies);
  };

  const handleDeleteRows = () => {
    const newSpecies = species.filter(row => !row.isChecked);
    setDisabled(!newSpecies.some(findChecked));
    setSpecies(newSpecies);
  };

  const getSpecie = name => {
    console.log('in func', name);
    const specie = species.filter(currSpecie => {
      return currSpecie.name === name;
    });
    console.log('passing in ', specie);
    return specie[0];
  };

  const createTable = m => {
    return m.map((row, index) => (
      <Tr height="72px" key={row.name}>
        <Td w="100%">
          <Accordion allowToggle>
            <AccordionItem id={row.name} borderColor="transparent">
              <h2>
                <AccordionButton>
                  <Flex flex="1" alignItems="center">
                    <EditSpeciesModal specie={getSpecie(row.name)} />
                    <Text ml="1.25em" fontSize="1.05em">
                      {row.name}
                    </Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <SimpleGrid columns={1}>
                  <Flex justifyContent="space-between" w="100%">
                    <Text fontWeight={600}>Total</Text>
                    <Text>{row.total}</Text>
                  </Flex>
                  <Flex justifyContent="space-between" w="100%">
                    <Text fontWeight={600}>Notes (Optional)</Text>
                    <Text>{row.notes ? row.notes : '--'}</Text>
                  </Flex>
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
                    <Th pl="10em" backgroundColor="#F7FAFC">
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
