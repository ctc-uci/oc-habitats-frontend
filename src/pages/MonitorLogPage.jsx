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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import AdditionalSpecies from '../components/monitorLog/AdditionalSpecies';
import Predators from '../components/monitorLog/Predators';
import HumanActivity from '../components/monitorLog/HumanActivity';
import GeneralInfo from '../components/monitorLog/GeneralInfo';
import ReviewElementTooltip from '../components/monitorLog/ReviewElementTooltip';
import MonitorLogSection from '../components/monitorLog/MonitorLogSection';

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
              Snow Plover
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
            <GeneralInfo options={options} />
          </TabPanel>
          <TabPanel>
            <p>Least Terns</p>
          </TabPanel>
          <TabPanel>
            <p>Snowy Plovers</p>
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
            <Box>
              <Accordion allowMultiple="true" defaultIndex={[0]}>
                <AccordionItem borderColor="white">
                  <HStack>
                    <Text fontSize="24px" fontWeight={550}>
                      Predators
                    </Text>
                    <AccordionButton _hover="white">
                      <AccordionIcon />
                    </AccordionButton>
                  </HStack>
                  <AccordionPanel>
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
                    <Text fontSize="24px" fontWeight={550} width="30%">
                      Human Activity
                    </Text>
                    <AccordionButton _hover="white">
                      <AccordionIcon />
                    </AccordionButton>
                  </HStack>
                  <AccordionPanel>
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
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MonitorLogPage;
