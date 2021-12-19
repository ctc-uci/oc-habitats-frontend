import React, { useState } from 'react';
import { BsPersonFill, BsArrowDown } from 'react-icons/bs';
import { nanoid } from 'nanoid';
import {
  Heading,
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
  Input,
  NumberInput,
  NumberInputField,
  Checkbox,
  FormLabel,
  FormControl,
  IconButton,
  Container,
  Icon,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Select from 'react-select';
import PropTypes from 'prop-types';

const rows = [
  { name: 'Beach Cast', total: 0, isChecked: false, isVisible: 'hidden', isDisabled: true },
];

const AdditionalSpecies = ({ options }) => {
  const [species, setSpecies] = useState(rows);
  const [allChecked, setAllChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [option, setOption] = useState('');

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

  const handleAddRow = () => {
    if (option !== '') {
      const newData = {
        name: option.label,
        total: 0,
        isChecked: false,
        isVisible: 'visible',
        isDisabled: false,
      };
      const newSpecies = [...species, newData];

      setOption('');
      setSpecies(newSpecies);
    }
  };

  const handleDeleteRows = () => {
    const newSpecies = species.filter(row => !row.isChecked);
    setDisabled(!newSpecies.some(findChecked));
    setSpecies(newSpecies);
  };

  const handleSelectedOption = v => {
    setOption(v);
  };

  const createTable = m => {
    return m.map((row, index) => (
      <Tr height="72px" key={nanoid()}>
        <Td paddingRight="8px">
          <Checkbox
            size="md"
            isChecked={row.isChecked}
            onChange={() => handleRowCheckedItems(index)}
            visibility={row.isVisible}
            isDisabled={row.isDisabled}
          />
        </Td>
        <Td>
          <Input size="lg" backgroundColor="#EDF2F7" value={row.name} isReadOnly />
        </Td>
        <Td>
          <NumberInput size="lg" value={row.total} onChange={v => handleAddTotalChange(v, index)}>
            <NumberInputField />
          </NumberInput>
        </Td>
      </Tr>
    ));
  };

  return (
    <Container maxW="container.xl">
      <VStack w="full" h="full" spacing="29px" alignItems="flex.start">
        <Heading fontWeight="600" size="2xl">
          Additional Species
        </Heading>
        <FormControl>
          <FormLabel fontWeight="600">Search for a Species:</FormLabel>
          <SimpleGrid columns={2} h="166px" columnGap="26px">
            <GridItem colSpan={1}>
              <SimpleGrid columns={6} h="100%" columnGap="9px">
                <GridItem colSpan={5}>
                  <VStack w="full" h="100%" position="relative" alignItems>
                    <Select
                      value={option}
                      options={options}
                      onChange={v => handleSelectedOption(v)}
                    />
                    <Button
                      w="full"
                      position="absolute"
                      bottom={0}
                      fontWeight="700"
                      isDisabled={disabled}
                      onClick={() => handleDeleteRows()}
                      rightIcon={<DeleteIcon />}
                    >
                      Delete Selected
                    </Button>
                  </VStack>
                </GridItem>
                <GridItem colSpan={1}>
                  <IconButton
                    w="full"
                    onClick={() => handleAddRow()}
                    aria-label="Enter"
                    icon={<BsArrowDown />}
                  />
                </GridItem>
              </SimpleGrid>
            </GridItem>
            <GridItem colSpan={1}>
              <Table id="speciesTable" variant="simple" borderRadius="10px" overflow="hidden">
                <Thead>
                  <Tr>
                    <Th w="48px" h="40px" paddingRight="8px" backgroundColor="#F7FAFC">
                      <Checkbox
                        backgroundColor="#ffffff"
                        isChecked={allChecked}
                        onChange={() => handleAllChecked()}
                      />
                    </Th>
                    <Th fontWeight="700" backgroundColor="#F7FAFC">
                      <Icon as={BsPersonFill} w={7} h={3.5} /> Species
                    </Th>
                    <Th fontWeight="700" w="200px" h="40px" backgroundColor="#F7FAFC">
                      <Icon as={BsPersonFill} w={7} h={3.5} />
                      Total
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>{createTable(species)}</Tbody>
              </Table>
            </GridItem>
          </SimpleGrid>
        </FormControl>
      </VStack>
    </Container>
  );
};

AdditionalSpecies.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default AdditionalSpecies;
