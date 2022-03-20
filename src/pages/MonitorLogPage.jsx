import {
  Box,
  Text,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Stack,
  VStack,
  Tr,
  Td,
  Th,
  Table,
  Tbody,
} from '@chakra-ui/react';
import React, { useState, useReducer } from 'react';
import dayjs from 'dayjs';
import AdditionalSpecies from '../components/monitorLog/AdditionalSpecies';
import Predators from '../components/monitorLog/Predators';
import HumanActivity from '../components/monitorLog/HumanActivity';
import GeneralInfo from '../components/monitorLog/GeneralInfo';
import ReviewElementTooltip from '../components/monitorLog/ReviewElementTooltip';
import MonitorLogSection from '../components/monitorLog/MonitorLogSection';
import ListedSpeciesTab from '../components/monitorLog/ListedSpeciesTab';

const options = [
  {
    value: 'Dave (dave@gmail.com)',
    label: 'Dave (dave@gmail.com)',
    name: 'Dave',
    email: 'dave@gmail.com',
  },
  {
    value: 'Brenda (brenda@gmail.com)',
    label: 'Brenda (brenda@gmail.com)',
    name: 'Brenda',
    email: 'brenda@gmail.com',
  },
];

const MonitorLogPage = () => {
  const [surveySegment, setSegment] = useState();
  const [surveyDate, setSurveyDate] = useState(new Date());
  const [startTime, setSurveyStart] = useState('7:00');
  const [startTimeAM, toggleStartTimeAM] = useReducer(am => !am, true);
  const [endTime, setSurveyEnd] = useState('7:00');
  const [endTimeAM, toggleEndTimeAM] = useReducer(am => !am, true);
  const [temperature, setTemperature] = useState();
  const [cloudCover, setCloudCover] = useState();
  const [precipitation, setPrecipitation] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [windDirection, setWindDirection] = useState();
  const [tides, setTides] = useState();
  const [habitatType, setHabitatType] = useState();
  const [habitatWidth, setHabitatWidth] = useState();
  const [totalCrows, setTotalCrows] = useState(0);
  const [totalRavens, setTotalRavens] = useState(0);
  const [totalRaptors, setTotalRaptors] = useState(0);
  const [totalHorses, setTotalHorses] = useState(0);
  const [totalCoyotes, setTotalCoyotes] = useState(0);
  const [totalFoxes, setTotalFoxes] = useState(0);
  const [totalCats, setTotalCats] = useState(0);
  const [otherPredators, setOtherPredators] = useState();
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
  const [partners, setPartners] = useState([]);
  const [popup, setPopup] = useState([]);

  const GeneralInformationItems = [
    { sectionTitle: 'Survey Segment', value: surveySegment },
    { sectionTitle: 'Date (MM/DD/YYY)', value: dayjs(surveyDate).format('MM/DD/YYYY') },
    { sectionTitle: 'Survey Start Time', value: startTime + (startTimeAM ? ' AM' : ' PM') },
    { sectionTitle: 'Survey End Time', value: endTime + (endTimeAM ? ' AM' : ' PM') },
    { sectionTitle: 'Temperature (F)', value: temperature },
    { sectionTitle: 'Cloud Cover (%)', value: cloudCover },
    { sectionTitle: 'Precipitation', value: precipitation },
    { sectionTitle: 'Wind (Speed/Direction)', value: `${windSpeed}/${windDirection}` },
    { sectionTitle: 'Tides (ft)', value: tides },
    { sectionTitle: 'Overall Habitat Type', value: habitatType, toolTip: 'hi' },
    { sectionTitle: 'Habitat Width', value: habitatWidth },
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
            <GeneralInfo
              options={options}
              setSegment={setSegment}
              surveyDate={surveyDate}
              setSurveyDate={setSurveyDate}
              setSurveyStart={setSurveyStart}
              startTime={startTime}
              startTimeAM={startTimeAM}
              toggleStartTimeAM={toggleStartTimeAM}
              setSurveyEnd={setSurveyEnd}
              toggleEndTimeAM={toggleEndTimeAM}
              endTimeAM={endTimeAM}
              setTemperature={setTemperature}
              setCloudCover={setCloudCover}
              setPrecipitation={setPrecipitation}
              setWindSpeed={setWindSpeed}
              setWindDirection={setWindDirection}
              setTides={setTides}
              setHabitatType={setHabitatType}
              setHabitatWidth={setHabitatWidth}
              partners={partners}
              setPartners={setPartners}
              popup={popup}
              setPopup={setPopup}
            />
          </TabPanel>
          <TabPanel>
            <ListedSpeciesTab speciesName="Least Tern" speciesCode="LETE" />
          </TabPanel>
          <TabPanel>
            <ListedSpeciesTab speciesName="Snowy Plover" speciesCode="WSPL" />
          </TabPanel>
          <TabPanel>
            <AdditionalSpecies />
          </TabPanel>
          <TabPanel>
            <Predators
              setTotalCrows={setTotalCrows}
              setTotalRavens={setTotalRavens}
              setTotalRaptors={setTotalRaptors}
              setTotalHorses={setTotalHorses}
              setTotalCoyotes={setTotalCoyotes}
              setTotalFoxes={setTotalFoxes}
              setTotalCats={setTotalCats}
              setOtherPredators={setOtherPredators}
            />
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
                            {createTable(popup)}
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
                    <ReviewElementTooltip
                      sectionTitle="Other Notes"
                      value={otherNotes}
                      label="Additional notes that have not been listed above"
                      toggle="false"
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MonitorLogPage;
