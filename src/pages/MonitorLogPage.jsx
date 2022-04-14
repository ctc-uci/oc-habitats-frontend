import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  HStack,
  Stack,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { React, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AdditionalSpeciesTab from '../components/MonitorLog/AdditionalSpeciesTab';
import GeneralInfoTab from '../components/MonitorLog/GeneralInfoTab';
import HumanActivity from '../components/MonitorLog/HumanActivity';
import ListedSpeciesTab from '../components/MonitorLog/ListedSpeciesTab';
import MonitorLogSection from '../components/MonitorLog/MonitorLogSection';
import PredatorsTab from '../components/MonitorLog/PredatorsTab';
import ReviewElementTooltip from '../components/MonitorLog/ReviewElementTooltip';

const options = [
  {
    name: 'Dave',
    email: 'dave@gmail.com',
  },
  {
    name: 'Brenda',
    email: 'brenda@gmail.com',
  },
  {
    name: 'Chris',
    email: 'chris@gmail.com',
  },
  {
    name: 'Chad',
    email: 'chad@gmail.com',
  },
  {
    name: 'Steve',
    email: 'steve@gmail.com',
  },
  {
    name: 'Daniel',
    email: 'daniel@gmail.com',
  },
  {
    name: 'Ryan',
    email: 'ryan@gmail.com',
  },
  {
    name: 'Jamie',
    email: 'jamie@gmail.com',
  },
  {
    name: 'Alexa',
    email: 'alexa@gmail.com',
  },
  {
    name: 'Julie',
    email: 'julie@gmail.com',
  },
  {
    name: 'Carmen',
    email: 'carmen@gmail.com',
  },
];

const MonitorLogPage = () => {
  const formMethods = useForm({
    defaultValues: {
      segment: 'segment0',
      startTime: '03:36',
      temperature: '123',
      cloudCover: '66',
      precipitation: 'drizzle',
      windSpeed: '123',
      windDirection: 'NW',
      tides: '3123',
      habitatType: 'vegetation-native',
      habitatWidth: '100-300',
      partners: [],
    },
  });

  const [totalSitting, setTotalSitting] = useState(0);
  const [totalWalkingRunning, setTotalWalkingRunning] = useState(0);
  const [totalBikes, setTotalBikes] = useState(0);
  const [totalSurfers, setTotalSurfers] = useState(0);
  const [totalSports, setTotalSports] = useState(0);
  const [totalFires, setTotalFires] = useState(0);
  const [totalFishing, setTotalFishing] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalEquipmentATV, setTotalEquipmentATV] = useState(0);
  const [totalDogsOnLeash, setTotalDogsOnLeash] = useState(0);
  const [totalDogsOffLeash, setTotalDogsOffLeash] = useState(0);
  const [outreachNotes, setOutreachNotes] = useState();
  const [otherNotes, setOtherNotes] = useState();

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

  const createTable = m => {
    return m.map(row => (
      <Tr height="72px" key={row.id}>
        <Td>
          <HStack spacing="26px">
            <VStack alignItems="flex.start">
              <Text>{row.name}</Text>
              <Text color="gray.500">{row.email}</Text>
            </VStack>
          </HStack>
        </Td>
      </Tr>
    ));
  };

  return (
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

                <ReviewElementTooltip
                  sectionTitle="Other Notes"
                  value={otherNotes}
                  label="Additional notes that have not been listed above"
                  toggle="false"
                />
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </FormProvider>
    </Box>
  );
};

export default MonitorLogPage;
