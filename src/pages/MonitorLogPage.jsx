import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { React, useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowUp, FiCheck } from 'react-icons/fi';
import { OCHBackend } from '../common/utils';
import AdditionalSpeciesTab from '../components/MonitorLog/AdditionalSpeciesTab';
import GeneralInfoTab from '../components/MonitorLog/GeneralInfoTab';
import HumanActivity from '../components/MonitorLog/HumanActivityTab';
import ListedSpeciesTab from '../components/MonitorLog/ListedSpeciesTab';
import PredatorsTab from '../components/MonitorLog/PredatorsTab';
import ReviewSubmitTab from '../components/MonitorLog/ReviewSubmitTab';

const MonitorTabButton = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return (
    <Tab
      height="40px"
      borderColor="ochBlack"
      borderWidth="1px"
      _selected={{ borderColor: 'ochOrange', color: 'ochBlack', bg: 'ochOrange' }}
      {...props}
    >
      {children}
    </Tab>
  );
};

const MonitorLogPage = () => {
  const formMethods = useForm({});

  const checkInModal = useDisclosure();

<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState(0);
  // tab # will be dynamic with dynamic listed species
  const totalTabs = 7;
||||||| parent of 590a24e (Human activity RHF + start review/submit)
  const GeneralInformationItems = [
    // { sectionTitle: 'Survey Segment', value: surveySegment },
    // { sectionTitle: 'Date (MM/DD/YYY)', value: dayjs(surveyDate).format('MM/DD/YYYY') },
    // { sectionTitle: 'Survey Start Time', value: startTime + (startTimeAM ? ' AM' : ' PM') },
    // { sectionTitle: 'Survey End Time', value: endTime + (endTimeAM ? ' AM' : ' PM') },
    // { sectionTitle: 'Temperature (F)', value: temperature },
    // { sectionTitle: 'Cloud Cover (%)', value: cloudCover },
    // { sectionTitle: 'Precipitation', value: precipitation },
    // { sectionTitle: 'Wind (Speed/Direction)', value: `${windSpeed}/${windDirection}` },
    // { sectionTitle: 'Tides (ft)', value: tides },
    // { sectionTitle: 'Overall Habitat Type', value: habitatType, toolTip: 'hi' },
    // { sectionTitle: 'Habitat Width', value: habitatWidth },
  ];
  const predatorItems = [
    { sectionTitle: 'Crows', value: totalCrows },
    { sectionTitle: 'Ravens', value: totalRavens },
    { sectionTitle: 'Raptors', value: totalRaptors },
    { sectionTitle: 'Horses', value: totalHorses },
    { sectionTitle: 'Coyotes', value: totalCoyotes },
    { sectionTitle: 'Foxes', value: totalFoxes },
    { sectionTitle: 'Cats', value: totalCats },
  ];
  const humanActivityItems = [
    { sectionTitle: 'Humans Sitting', value: totalSitting },
    { sectionTitle: 'Humans Walking/Running', value: totalWalkingRunning },
    { sectionTitle: 'Bikes', value: totalBikes },
    { sectionTitle: 'Surfers', value: totalSurfers },
    { sectionTitle: 'Sports', value: totalSports },
    { sectionTitle: 'Fires', value: totalFires },
    { sectionTitle: 'Fishing', value: totalFishing },
    { sectionTitle: 'Vehicles', value: totalVehicles },
    { sectionTitle: 'Equipment & ATV', value: totalEquipmentATV },
    { sectionTitle: 'Dogs ON Leash', value: totalDogsOnLeash },
    { sectionTitle: 'Dogs OFF Leash', value: totalDogsOffLeash },
  ];
=======
  const GeneralInformationItems = [
    // { sectionTitle: 'Survey Segment', value: surveySegment },
    // { sectionTitle: 'Date (MM/DD/YYY)', value: dayjs(surveyDate).format('MM/DD/YYYY') },
    // { sectionTitle: 'Survey Start Time', value: startTime + (startTimeAM ? ' AM' : ' PM') },
    // { sectionTitle: 'Survey End Time', value: endTime + (endTimeAM ? ' AM' : ' PM') },
    // { sectionTitle: 'Temperature (F)', value: temperature },
    // { sectionTitle: 'Cloud Cover (%)', value: cloudCover },
    // { sectionTitle: 'Precipitation', value: precipitation },
    // { sectionTitle: 'Wind (Speed/Direction)', value: `${windSpeed}/${windDirection}` },
    // { sectionTitle: 'Tides (ft)', value: tides },
    // { sectionTitle: 'Overall Habitat Type', value: habitatType, toolTip: 'hi' },
    // { sectionTitle: 'Habitat Width', value: habitatWidth },
  ];
  const predatorItems = [
    // { sectionTitle: 'Crows', value: totalCrows },
    // { sectionTitle: 'Ravens', value: totalRavens },
    // { sectionTitle: 'Raptors', value: totalRaptors },
    // { sectionTitle: 'Horses', value: totalHorses },
    // { sectionTitle: 'Coyotes', value: totalCoyotes },
    // { sectionTitle: 'Foxes', value: totalFoxes },
    // { sectionTitle: 'Cats', value: totalCats },
  ];
  const humanActivityItems = [
    { sectionTitle: 'Humans Sitting', value: totalSitting },
    { sectionTitle: 'Humans Walking/Running', value: totalWalkingRunning },
    { sectionTitle: 'Bikes', value: totalBikes },
    { sectionTitle: 'Surfers', value: totalSurfers },
    { sectionTitle: 'Sports', value: totalSports },
    { sectionTitle: 'Fires', value: totalFires },
    { sectionTitle: 'Fishing', value: totalFishing },
    { sectionTitle: 'Vehicles', value: totalVehicles },
    { sectionTitle: 'Equipment & ATV', value: totalEquipmentATV },
    { sectionTitle: 'Dogs ON Leash', value: totalDogsOnLeash },
    { sectionTitle: 'Dogs OFF Leash', value: totalDogsOffLeash },
  ];
>>>>>>> 590a24e (Human activity RHF + start review/submit)

  const topRef = useRef();

  const returnToTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const [user, setUser] = useState(null);
  const [monitorPartners, setMonitorPartners] = useState([]);

  useEffect(async () => {
    checkInModal.onOpen();

    try {
      const [userData, monitorPartnersData] = await Promise.all([
        OCHBackend.get('users/me', { withCredentials: true }),
        OCHBackend.get('users/monitorPartners', { withCredentials: true }),
      ]);
      setUser(userData.data);
      setMonitorPartners(monitorPartnersData.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  }, []);

  const assignedSegments = useMemo(() => user?.segments || [], [user]);

  return (
<<<<<<< HEAD
    <Flex w="100%" justifyContent="center">
      <Box w="1500px">
        <FormProvider {...formMethods}>
          <Modal isOpen={checkInModal.isOpen} onClose={checkInModal.onClose}>
            <ModalOverlay />
            <ModalContent marginTop="100" rounded="none">
              <ModalHeader>Have You Checked In Yet?</ModalHeader>
              <ModalBody>
                Check in on <b>BetterImpact</b> or Text <b>949.697.8651</b>
              </ModalBody>
||||||| parent of 590a24e (Human activity RHF + start review/submit)
    <Box ml="171px" mr="171px">
      <FormProvider {...formMethods}>
        <Heading align="center" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
          Coastal Dune Habitat Survey Log
        </Heading>
        <Tabs variant="solid-rounded" size="lg" align="start" colorScheme="orange">
          <TabList p="32px" alignItems="center">
            <HStack spacing="24px">
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                General Info
              </Tab>
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                Least Tern
              </Tab>
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                Snowy Plover
              </Tab>
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                Additional Species
              </Tab>
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                Predators
              </Tab>
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                Human Activity
              </Tab>
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                Review and Submit
              </Tab>
            </HStack>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GeneralInfoTab ochUsers={options} />
            </TabPanel>
            <TabPanel>
              <ListedSpeciesTab tab={0} speciesName="Least Tern" speciesCode="LETE" />
            </TabPanel>
            <TabPanel>
              <ListedSpeciesTab tab={1} speciesName="Snowy Plover" speciesCode="WSPL" />
            </TabPanel>
            <TabPanel>
              <AdditionalSpeciesTab />
            </TabPanel>
            <TabPanel>
              <PredatorsTab />
            </TabPanel>
            <TabPanel>
              <HumanActivity
                setTotalSitting={setTotalSitting}
                setTotalWalkingRunning={setTotalWalkingRunning}
                setTotalBikes={setTotalBikes}
                setTotalSurfers={setTotalSurfers}
                setTotalSports={setTotalSports}
                setTotalFires={setTotalFires}
                setTotalFishing={setTotalFishing}
                setTotalVehicles={setTotalVehicles}
                setTotalEquipmentATV={setTotalEquipmentATV}
                setTotalDogsOnLeash={setTotalDogsOnLeash}
                setTotalDogsOffLeash={setTotalDogsOffLeash}
                setOutreachNotes={setOutreachNotes}
                setOtherNotes={setOtherNotes}
              />
            </TabPanel>
            <TabPanel>
              <Stack spacing={8}>
                <Accordion allowMultiple="true" defaultIndex={[0]}>
                  <AccordionItem borderColor="white" spacing={10}>
                    <HStack>
                      <AccordionButton
                        padding="0"
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ backgroundColor: 'none' }}
                      >
                        <Text mr="10px" fontSize="24px" fontWeight={550}>
                          General Information
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </HStack>
                    <AccordionPanel padding="0">
                      <MonitorLogSection reviewElements={GeneralInformationItems} />
                      <VStack align="left" pt={8}>
                        <Text fontSize="21px" fontWeight={550} width="30%">
                          Monitoring Session Partners
                        </Text>
                        <Box
                          overflow="hidden"
                          w="50%"
                          borderWidth="1px"
                          borderColor="gray.200"
                          rounded="md"
                        >
                          <Table id="partnertable">
                            {/* TODO: make ochGrey */}
                            <Th h="32px" bgColor="#4E4E4E" color="white" textTransform="none">
                              Partner Information
                            </Th>
                            <Tbody h="72px" bg="#FFFFFF" align="left">
                              {/* {createTable(popup)} */}
                            </Tbody>
                          </Table>
                        </Box>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Accordion allowMultiple="true" defaultIndex={[0]}>
                  <AccordionItem borderColor="white">
                    <HStack>
                      <AccordionButton
                        padding="0"
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ backgroundColor: 'none' }}
                      >
                        <Text mr="10px" fontSize="24px" fontWeight={550}>
                          Predators
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </HStack>
                    <AccordionPanel padding="0">
                      <MonitorLogSection reviewElements={predatorItems} />
                      <ReviewElementTooltip
                        sectionTitle="Other Predator(s)"
                        value={otherPredators}
                        label="Any potential predator species not listed above"
                        toggle="true"
                      />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Accordion allowMultiple="true" defaultIndex={[0]}>
                  <AccordionItem borderColor="white">
                    <HStack>
                      <AccordionButton
                        padding="0"
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ backgroundColor: 'none' }}
                      >
                        <Text mr="10px" fontSize="24px" fontWeight={550}>
                          Human Activity
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </HStack>
                    <AccordionPanel padding="0">
                      <MonitorLogSection reviewElements={humanActivityItems} />
                      <ReviewElementTooltip
                        sectionTitle="Outreach"
                        value={outreachNotes}
                        label="Any potential human activities not listed above"
                        toggle="true"
                      />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
=======
    <Box ml="171px" mr="171px">
      <FormProvider {...formMethods}>
        <Heading align="center" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
          Coastal Dune Habitat Survey Log
        </Heading>
        <Tabs variant="solid-rounded" size="lg" align="start" colorScheme="orange">
          <TabList p="32px" alignItems="center">
            <HStack spacing="24px">
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                General Info
              </Tab>
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                Least Tern
              </Tab>
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                Snowy Plover
              </Tab>
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                Additional Species
              </Tab>
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                Predators
              </Tab>
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                Human Activity
              </Tab>
              <Tab style={{ height: '40px' }} _selected={{ color: 'ochBlack', bg: 'ochOrange' }}>
                Review and Submit
              </Tab>
            </HStack>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GeneralInfoTab ochUsers={options} />
            </TabPanel>
            <TabPanel>
              <ListedSpeciesTab tab={0} speciesName="Least Tern" speciesCode="LETE" />
            </TabPanel>
            <TabPanel>
              <ListedSpeciesTab tab={1} speciesName="Snowy Plover" speciesCode="WSPL" />
            </TabPanel>
            <TabPanel>
              <AdditionalSpeciesTab />
            </TabPanel>
            <TabPanel>
              <PredatorsTab />
            </TabPanel>
            <TabPanel>
              <HumanActivity
                setTotalSitting={setTotalSitting}
                setTotalWalkingRunning={setTotalWalkingRunning}
                setTotalBikes={setTotalBikes}
                setTotalSurfers={setTotalSurfers}
                setTotalSports={setTotalSports}
                setTotalFires={setTotalFires}
                setTotalFishing={setTotalFishing}
                setTotalVehicles={setTotalVehicles}
                setTotalEquipmentATV={setTotalEquipmentATV}
                setTotalDogsOnLeash={setTotalDogsOnLeash}
                setTotalDogsOffLeash={setTotalDogsOffLeash}
                setOutreachNotes={setOutreachNotes}
                setOtherNotes={setOtherNotes}
              />
            </TabPanel>
            <TabPanel>
              <Stack spacing={8}>
                <Accordion allowMultiple="true" defaultIndex={[0]}>
                  <AccordionItem borderColor="white" spacing={10}>
                    <HStack>
                      <AccordionButton
                        padding="0"
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ backgroundColor: 'none' }}
                      >
                        <Text mr="10px" fontSize="24px" fontWeight={550}>
                          General Information
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </HStack>
                    <AccordionPanel padding="0">
                      <GeneralInfoTab ochUsers={options} />
                      <MonitorLogSection reviewElements={GeneralInformationItems} />
                      <VStack align="left" pt={8}>
                        <Text fontSize="21px" fontWeight={550} width="30%">
                          Monitoring Session Partners
                        </Text>
                        <Box
                          overflow="hidden"
                          w="50%"
                          borderWidth="1px"
                          borderColor="gray.200"
                          rounded="md"
                        >
                          <Table id="partnertable">
                            {/* TODO: make ochGrey */}
                            <Th h="32px" bgColor="#4E4E4E" color="white" textTransform="none">
                              Partner Information
                            </Th>
                            <Tbody h="72px" bg="#FFFFFF" align="left">
                              {/* {createTable(popup)} */}
                            </Tbody>
                          </Table>
                        </Box>
                      </VStack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Accordion allowMultiple="true" defaultIndex={[0]}>
                  <AccordionItem borderColor="white">
                    <HStack>
                      <AccordionButton
                        padding="0"
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ backgroundColor: 'none' }}
                      >
                        <Text mr="10px" fontSize="24px" fontWeight={550}>
                          Predators
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </HStack>
                    <AccordionPanel padding="0">
                      <MonitorLogSection reviewElements={predatorItems} />
                      <ReviewElementTooltip
                        sectionTitle="Other Predator(s)"
                        // value={otherPredators}
                        label="Any potential predator species not listed above"
                        toggle="true"
                      />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <Accordion allowMultiple="true" defaultIndex={[0]}>
                  <AccordionItem borderColor="white">
                    <HStack>
                      <AccordionButton
                        padding="0"
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ backgroundColor: 'none' }}
                      >
                        <Text mr="10px" fontSize="24px" fontWeight={550}>
                          Human Activity
                        </Text>
                        <AccordionIcon />
                      </AccordionButton>
                    </HStack>
                    <AccordionPanel padding="0">
                      <MonitorLogSection reviewElements={humanActivityItems} />
                      <ReviewElementTooltip
                        sectionTitle="Outreach"
                        value={outreachNotes}
                        label="Any potential human activities not listed above"
                        toggle="true"
                      />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
>>>>>>> 590a24e (Human activity RHF + start review/submit)

              <ModalFooter>
                <Button onClick={checkInModal.onClose} colorScheme="cyan">
                  Yes, I&apos;m Checked In
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Heading ref={topRef} px="32px" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
            OCH Monitor Log
          </Heading>
          <Tabs
            variant="solid-rounded"
            size="lg"
            align="start"
            colorScheme="orange"
            index={activeTab}
            onChange={setActiveTab}
            isLazy
          >
            <TabList px="32px" alignItems="center">
              <HStack spacing="24px">
                <MonitorTabButton>General Info</MonitorTabButton>
                <MonitorTabButton>Least Tern</MonitorTabButton>
                <MonitorTabButton>Snowy Plover</MonitorTabButton>
                <MonitorTabButton>Additional Species</MonitorTabButton>
                <MonitorTabButton>Predators</MonitorTabButton>
                <MonitorTabButton>Human Activity</MonitorTabButton>
                <MonitorTabButton>Review and Submit</MonitorTabButton>
              </HStack>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Container maxW="100vw">
                  <GeneralInfoTab
                    assignedSegments={assignedSegments}
                    monitorPartners={monitorPartners}
                  />
                </Container>
              </TabPanel>
              <TabPanel>
                <Container maxW="100vw">
                  <ListedSpeciesTab tab={0} speciesName="Least Tern" speciesCode="LETE" />
                </Container>
              </TabPanel>
              <TabPanel>
                <Container maxW="100vw">
                  <ListedSpeciesTab tab={1} speciesName="Snowy Plover" speciesCode="WSPL" />
                </Container>
              </TabPanel>
              <TabPanel>
                <Container maxW="100vw">
                  <AdditionalSpeciesTab />
                </Container>
              </TabPanel>
              <TabPanel>
                <Container maxW="100vw">
                  <PredatorsTab />
                </Container>
              </TabPanel>
              <TabPanel>
                <Container maxW="100vw">
                  <HumanActivity />
                </Container>
              </TabPanel>
              <TabPanel>
                <Container maxW="100vw">
                  <ReviewSubmitTab jumpToTab={setActiveTab} />
                </Container>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Flex
            alignItems="center"
            justifyContent="center"
            bg="ochGrey"
            position="fixed"
            w="100%"
            left="0"
            bottom="0"
            h="16"
            zIndex="banner"
          >
            <Flex width="100%" maxWidth="1500px" p="32px">
              <Button
                onClick={returnToTop}
                variant="outline"
                color="white"
                _hover={{ color: 'black', backgroundColor: 'white' }}
              >
                Return to Top <FiArrowUp style={{ marginLeft: '4px' }} />
              </Button>
              <Spacer />
              {activeTab !== totalTabs - 1 && (
                <Button
                  colorScheme="cyan"
                  type="submit"
                  //  onClick={handleSubmit}
                >
                  {/* {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker */}
                  Save Changes
                </Button>
              )}
              {activeTab === totalTabs - 1 && (
                <Button
                  colorScheme="green"
                  type="submit"
                  //  onClick={handleSubmit}
                >
                  {/* {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker */}
                  Submit Log <FiCheck style={{ marginLeft: '4px' }} />
                </Button>
              )}
            </Flex>
          </Flex>
        </FormProvider>
      </Box>
    </Flex>
  );
};

export default MonitorLogPage;
