import { InfoIcon, AddIcon } from '@chakra-ui/icons';
import { GrEdit } from 'react-icons/gr';
import { FaRegSave } from 'react-icons/fa';
import {
  Button,
  Container,
  Flex,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  Tooltip,
  VStack,
  HStack,
  Table,
  Th,
  Tr,
  Td,
  Tbody,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SectionName.css';

function AddPartnersPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button w="50%" rightIcon={<AddIcon />} onClick={onOpen}>
        Add Partner
      </Button>

      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Monitoring Session Partners</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="14px" align="left">
              <Alert variant="solid">
                <AlertIcon />
                <AlertTitle>
                  Add or remove group members for this monitor log submission.
                </AlertTitle>
              </Alert>
              <Spacer />
              <Text>
                You may submit this monitoring log as a group if you completed this monitoring
                session as a group. You can change the goup below. Session Partners added/removed
                will be notified by email.
              </Text>
              <Spacer />
              <Text fontWeight="500" fontSize="md">
                Add Volunteer
              </Text>
              <Select placeholder="Search volunteer by name or email..." />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing="15px">
              <Button onClick={onClose} variant="ghost">
                Cancel
              </Button>
              <Button colorScheme="gray" rightIcon={<FaRegSave />}>
                Save
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function SectionName() {
  const [startDate, setDate] = useState(new Date());
  const [startPeriod, setStartPeriod] = useState(true);
  const [endPeriod, setEndPeriod] = useState(true);
  const handleStartTimeClick = () => setStartPeriod(!startPeriod);
  const handleEndTimeClick = () => setEndPeriod(!endPeriod);

  const user = {
    segments: [
      { id: '0', name: 'segment0' },
      { id: '1', name: 'segment1' },
    ],
  };

  const rows = [];

  const [partners, setSpecies] = useState(rows);

  const editInfo = () => {
    return ['Hello', 'World'];
  };

  const handleRowClick = index => {
    const newData = [...partners];
    const [name, email] = editInfo();
    newData[index].name = name;
    newData[index].name = email;
    setSpecies(newData);
  };

  const createTable = m => {
    return m.map((row, index) => (
      <Tr height="72px" key={row.id}>
        <Td paddingRight="8px">
          <IconButton size="md" onChange={() => handleRowClick(index)} icon={<GrEdit />} />
        </Td>
        <Td>
          {row.name}
          {row.email}
        </Td>
      </Tr>
    ));
  };

  return (
    <div>
      <Container maxW="100vw">
        <VStack spacing="23px" align="left">
          <Text fontWeight="600" fontSize="2xl">
            General Information
          </Text>
          <SimpleGrid columns={4} rows={3} spacingX="64px" spacingY="68px">
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Survey Segment
                </Text>
                <Select>
                  {user.segments.map(segment => (
                    <option value="" key="">
                      {segment.name}
                    </option>
                  ))}
                </Select>
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <Text fontWeight="500" fontSize="md">
                Date (MM/DD/YYYY)
              </Text>
              <DatePicker selected={startDate} onChange={e => setDate(e)} />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Survey Start Time
                </Text>
                <InputGroup>
                  <Input placeholder="7:00" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleStartTimeClick}>
                      {startPeriod ? 'AM' : 'PM'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Survey End Time
                </Text>
                <InputGroup>
                  <Input placeholder="7:00" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleEndTimeClick}>
                      {endPeriod ? 'AM' : 'PM'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Temperature (F)
                </Text>
                <Input placeholder="0" />
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Cloud Cover (%)
                </Text>
                <Select>
                  <option value="0">0</option>
                  <option value="33">33</option>
                  <option value="66">66</option>
                  <option value="100">100</option>
                </Select>
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Precipitation
                </Text>
                <Select>
                  <option value="none">None</option>
                  <option value="fog">Fog</option>
                  <option value="drizzle">Drizzle</option>
                  <option value="rain">Rain</option>
                </Select>
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Wind/Speed Direction
                </Text>
                <SimpleGrid columns={2} spacing="12px">
                  <GridItem>
                    <Input placeholder="0" />
                  </GridItem>
                  <GridItem>
                    <Select>
                      <option value="N">N</option>
                      <option value="NE">NE</option>
                      <option value="NW">NW</option>
                      <option value="S">S</option>
                      <option value="SE">SE</option>
                      <option value="SW">SW</option>
                      <option value="E">E</option>
                      <option value="W">W</option>
                    </Select>
                  </GridItem>
                </SimpleGrid>
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Tides (ft)
                </Text>
                <Input placeholder="00.00" />
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Flex align="center">
                  <Text fontWeight="500" fontSize="md">
                    Overall Habitat Type
                  </Text>
                  <Spacer />
                  <Tooltip
                    label="Habitat Type: (Sandy beach, Dunes, Vegetation-Native, Vegetation-Non-Native, Groomed, Stone/cobble, Rocky/outcroppings)"
                    placement="top"
                  >
                    <InfoIcon />
                  </Tooltip>
                </Flex>
                <Select>
                  <option value="sandy beach">Sandy beach</option>
                  <option value="dunes">Dunes</option>
                  <option value="vegetation-native">Vegetation-Native</option>
                  <option value="vegetation-non-native">Vegetation-Non-Native</option>
                  <option value="groomed">Groomed</option>
                  <option value="stone/cobble">Stone/cobble</option>
                  <option value="rocky/outcroppings">Rocky/outcroppings</option>
                </Select>
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Habitat Width (ft)
                </Text>
                <Select>
                  <option value="0=10">0-10</option>
                  <option value="10-50">10-50</option>
                  <option value="50-100">50-100</option>
                  <option value="100-300">100-300</option>
                  <option value="300+">300+</option>
                </Select>
              </VStack>
            </GridItem>
          </SimpleGrid>
          <Table w="50%">
            <Th h="32px" bg="#F7FAFC">
              Partner Information
            </Th>
            <Tbody h="72px" bg="#FFFFFF">
              {createTable(partners)}
            </Tbody>
          </Table>
          <Box>{AddPartnersPopup()}</Box>
        </VStack>
      </Container>
    </div>
  );
}

export default SectionName;
