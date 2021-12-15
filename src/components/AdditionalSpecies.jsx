import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons';
import DropdownSearch from './DropdownSearch';

// const rows = [
//   {
//     id: nanoid(),
//     check: null,
//     name: <Input size="lg" backgroundColor="#EDF2F7" defaultValue="Beach Cast" isReadOnly />,
//     total: (
//       <NumberInput size="lg" defaultValue={0}>
//         <NumberInputField />
//       </NumberInput>
//     ),
//   },
// ];

const rows = new Map([[nanoid(), { name: 'Beach Cast', total: 0, isChecked: false }]]);

const sp = [
  {
    value: 'Corvid: Common Raven',
    label: 'Corvid: Common Raven (CORA)',
  },
  {
    value: 'Cormorant: Double Crested',
    label: 'Cormorant: Double Crested (BRAC)',
  },
  {
    value: "Hummingbird: Alan's",
    label: "Hummingbird: Alan's (ALHU)",
  },
  {
    value: 'Pelican: American White',
    label: 'Pelican: American White (AWPE)',
  },
  {
    value: 'Sandpiper: Long-billed Curlew',
    label: 'Sandpiper: Long-billed Curlew (LBCU)',
  },
];

const AdditionalSpecies = () => {
  const [species, setSpecies] = useState(rows);
  useEffect(() => {
    // Update the document title using the browser API
    console.log(species);
  }, [species]);

  // const handleAddInputChange = event => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute('check');
  //   const fieldValue = event.target.value;

  //   const newTotalData = addTotalData.concat(fieldValue);

  //   setSpecies(newTotalData);
  // };

  const handleCheckedItems = id => {
    const newCheckedData = new Map(species);
    // const currentValue = newCheckedData.get(id);

    // newCheckedData.set(id, { ...currentValue, isChecked: true });
    console.log(id);
    setSpecies(newCheckedData);
  };

  const handleAddRow = () => {
    const newData = {
      name: 'Input Name',
      total: 0,
      isChecked: false,
    };

    const newSpecies = new Map(species);
    newSpecies.set(nanoid(), newData);

    setSpecies(newSpecies);
  };

  const handleDeleteRows = () => {
    const newSpecies = new Map(species);

    newSpecies.forEach(function (value, key) {
      if (value.isChecked) {
        newSpecies.delete(key);
      }
    });

    setSpecies(newSpecies);
  };

  const createTable = m => {
    return m.forEach((key, value) => (
      <Tr height="72px" key={key}>
        <Td paddingRight="8px">
          <Checkbox
            size="md"
            isChecked={value.isChecked}
            onChange={() => handleCheckedItems(key)}
          />
        </Td>
        <Td>
          <Input size="lg" backgroundColor="#EDF2F7" defaultValue={value.name} isReadOnly />
        </Td>
        <Td>
          <NumberInput size="lg" defaultValue={0}>
            <NumberInputField defaultValue={value.total} />{' '}
          </NumberInput>
        </Td>
      </Tr>
    ));
  };
  return (
    <Container maxW="container.xl">
      <VStack w="full" h="full" spacing="29px" alignItems="flex.start">
        <Heading size="2xl">Additional Species</Heading>
        <FormControl>
          <FormLabel>Search for a Species:</FormLabel>
          <SimpleGrid columns={2} columnGap="26px">
            <GridItem colSpan={1}>
              <SimpleGrid columns={6} columnGap="9px">
                <GridItem colSpan={5}>
                  <VStack w="full" spacing="70px" alignItems="flex.start">
                    <DropdownSearch options={sp} />
                    <Button w="full" onClick={() => handleDeleteRows()} rightIcon={<DeleteIcon />}>
                      Delete Selected
                    </Button>
                  </VStack>
                </GridItem>
                <GridItem colSpan={1}>
                  <IconButton
                    w="full"
                    onClick={() => handleAddRow()}
                    aria-label="Enter"
                    icon={<ChevronDownIcon />}
                  />
                </GridItem>
              </SimpleGrid>
            </GridItem>
            <GridItem colSpan={1}>
              <Table id="speciesTable" variant="simple" borderRadius="10px" overflow="hidden">
                <Thead>
                  <Tr>
                    <Th w="48px" h="40px" paddingRight="8px" backgroundColor="#F7FAFC">
                      <Checkbox backgroundColor="#ffffff" />
                    </Th>
                    <Th backgroundColor="#F7FAFC">Species</Th>
                    <Th w="200px" h="40px" backgroundColor="#F7FAFC">
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

export default AdditionalSpecies;
