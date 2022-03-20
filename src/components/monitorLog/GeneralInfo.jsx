import { InfoIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
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
import React from 'react';
import DatePicker from 'react-datepicker';
import Search from 'react-select';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import './GeneralInfo.css';

function GeneralInfo({
  options,
  setSegment,
  setSurveyDate,
  setSurveyStart,
  setSurveyEnd,
  setTemperature,
  setCloudCover,
  setPrecipitation,
  setWindSpeed,
  setWindDirection,
  setTides,
  setHabitatType,
  setHabitatWidth,
  surveyDate,
  startTimeAM,
  toggleStartTimeAM,
  endTimeAM,
  toggleEndTimeAM,
  partners,
  setPartners,
  popup,
  setPopup,
}) {
  const user = {
    segments: [
      { id: '0', name: 'segment0' },
      { id: '1', name: 'segment1' },
    ],
  };

  let uniqueID = 1;

  // const [partners, setPartners] = useState([]);
  // const [popup, setPopup] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteRow = (table, index) => {
    const newData = table.filter((row, i) => i !== index);
    if (table === partners) {
      setPartners(newData);
      setPopup(newData);
    } else {
      setPopup(newData);
    }
  };

  const handleAddRow = v => {
    if (v !== null) {
      const newData = {
        id: uniqueID,
        name: v.name,
        email: v.email,
      };
      uniqueID += 1;
      setPopup(
        [...popup, newData].sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        }),
      );
    }
  };

  const createTable = m => {
    return m.map((row, index) => (
      <Tr height="72px" key={row.id}>
        <Td>
          <HStack spacing="26px">
            <IconButton size="md" icon={<DeleteIcon />} onClick={() => handleDeleteRow(m, index)} />
            <VStack alignItems="flex.start">
              <Text>{row.name}</Text>
              <Text>{row.email}</Text>
            </VStack>
          </HStack>
        </Td>
      </Tr>
    ));
  };

  const changeTable = () => {
    setPartners(popup);
    onClose();
  };

  const closeTable = () => {
    setPopup(partners);
    onClose();
  };

  function AddPartnersPopup() {
    return (
      <>
        <Button w="50%" rightIcon={<AddIcon />} onClick={onOpen}>
          Add Partner
        </Button>

        <Modal size="3xl" isOpen={isOpen} onClose={closeTable}>
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
                  session as a group. You can change the group below. Session Partners added/removed
                  will be notified by email.
                </Text>
                <Spacer />
                <Text fontWeight="500" fontSize="md">
                  Add Volunteer
                </Text>
                <Search
                  placeholder="Search volunteer by name or email..."
                  options={options.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                  })}
                  onChange={option => handleAddRow(option)}
                />
                <Table id="partnertable">
                  <Th h="32px" bg="#F7FAFC">
                    Partner Information
                  </Th>
                  <Tbody h="72px" bg="#FFFFFF">
                    {createTable(popup)}
                  </Tbody>
                </Table>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <HStack spacing="15px">
                <Button onClick={closeTable} variant="ghost">
                  Cancel
                </Button>
                <Button colorScheme="gray" rightIcon={<FaRegSave />} onClick={changeTable}>
                  Save
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <div>
      <Container maxW="100vw">
        <Text fontWeight="600" fontSize="2xl">
          General Information
        </Text>
        <VStack spacing="23px" align="left">
          <SimpleGrid columns={4} rows={3} spacingX="64px" spacingY="68px">
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Survey Segment
                </Text>
                <Select
                  onChange={e => {
                    setSegment(e.target.value);
                  }}
                >
                  {user.segments.map(segment => (
                    <option value={segment.name} key={segment.id}>
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
              <DatePicker selected={surveyDate} onChange={e => setSurveyDate(e)} />
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Survey Start Time
                </Text>
                <InputGroup>
                  <Input
                    className="without-meridiem"
                    defaultValue="07:00"
                    type="time"
                    onChange={e => {
                      setSurveyStart(e.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={toggleStartTimeAM}>
                      {startTimeAM ? 'AM' : 'PM'}
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
                  <Input
                    className="without-meridiem"
                    defaultValue="07:00"
                    type="time"
                    onChange={e => {
                      setSurveyEnd(e.target.value);
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={toggleEndTimeAM}>
                      {endTimeAM ? 'AM' : 'PM'}
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
                <Input
                  onChange={e => {
                    setTemperature(e.target.value);
                  }}
                  placeholder="0"
                />
              </VStack>
            </GridItem>
            <GridItem colSpan={1} rowSpan={1} width="200px">
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Cloud Cover (%)
                </Text>
                <Select
                  onChange={e => {
                    setCloudCover(e.target.value);
                  }}
                >
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
                <Select
                  onChange={e => {
                    setPrecipitation(e.target.value);
                  }}
                >
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
                    <Input
                      onChange={e => {
                        setWindSpeed(e.target.value);
                      }}
                      placeholder="0"
                    />
                  </GridItem>
                  <GridItem>
                    <Select
                      onChange={e => {
                        setWindDirection(e.target.value);
                      }}
                    >
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
                <Input
                  onChange={e => {
                    setTides(e.target.value);
                  }}
                  placeholder="00.00"
                />
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
                <Select
                  onChange={e => {
                    setHabitatType(e.target.value);
                  }}
                >
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
                <Select
                  onChange={e => {
                    setHabitatWidth(e.target.value);
                  }}
                >
                  <option value="0=10">0-10</option>
                  <option value="10-50">10-50</option>
                  <option value="50-100">50-100</option>
                  <option value="100-300">100-300</option>
                  <option value="300+">300+</option>
                </Select>
              </VStack>
            </GridItem>
          </SimpleGrid>
          <Table id="partnertable" w="50%" textTransform="none">
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

GeneralInfo.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setSegment: PropTypes.func.isRequired,
  setSurveyDate: PropTypes.func.isRequired,
  setSurveyStart: PropTypes.func.isRequired,
  setSurveyEnd: PropTypes.func.isRequired,
  setTemperature: PropTypes.func.isRequired,
  setCloudCover: PropTypes.func.isRequired,
  setPrecipitation: PropTypes.func.isRequired,
  setWindSpeed: PropTypes.func.isRequired,
  setWindDirection: PropTypes.func.isRequired,
  setTides: PropTypes.func.isRequired,
  setHabitatType: PropTypes.func.isRequired,
  setHabitatWidth: PropTypes.func.isRequired,
  surveyDate: PropTypes.instanceOf(Date).isRequired,
  toggleStartTimeAM: PropTypes.func.isRequired,
  toggleEndTimeAM: PropTypes.func.isRequired,
  startTimeAM: PropTypes.bool.isRequired,
  endTimeAM: PropTypes.bool.isRequired,
  partners: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPartners: PropTypes.func.isRequired,
  popup: PropTypes.arrayOf(PropTypes.string).isRequired,
  setPopup: PropTypes.func.isRequired,
};

export default GeneralInfo;
