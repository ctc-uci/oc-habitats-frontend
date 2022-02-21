import { Box, HStack, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useState } from 'react';
import AdditionalSpecies from '../components/monitorLog/AdditionalSpecies';
import Predators from '../components/monitorLog/Predators';
import HumanActivity from '../components/monitorLog/HumanActivity';
import GeneralInfo from '../components/monitorLog/GeneralInfo';

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
  return (
    <Box ml="171px" mr="171px">
      <Heading align="center" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
        Coastal Dune Habitat Survey Log
      </Heading>
      <Tabs variant="solid-rounded" size="lg" align="start" colorScheme="orange">
        <TabList p="32px" alignItems="center">
          <HStack spacing="24px">
            <Tab style={{ height: '40px' }} _selected={{ color: 'black', bg: '#F49923' }}>
              General Info
            </Tab>
            <Tab style={{ height: '40px' }} _selected={{ color: 'black', bg: '#F49923' }}>
              Least Tern
            </Tab>
            <Tab style={{ height: '40px' }} _selected={{ color: 'black', bg: '#F49923' }}>
              Snow Plover
            </Tab>
            <Tab style={{ height: '40px' }} _selected={{ color: 'black', bg: '#F49923' }}>
              Additional Species
            </Tab>
            <Tab style={{ height: '40px' }} _selected={{ color: 'black', bg: '#F49923' }}>
              Predators
            </Tab>
            <Tab style={{ height: '40px' }} _selected={{ color: 'black', bg: '#F49923' }}>
              Human Activity
            </Tab>
            <Tab style={{ height: '40px' }} _selected={{ color: 'black', bg: '#F49923' }}>
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
            <p>
              {/* Printing values to avoid not-used eslint error */}
              {/* Pass all these values into review and submit component */}
              Review and Submit!{totalCrows} {totalRavens} {totalRaptors} {totalHorses}{' '}
              {totalCoyotes} {totalFoxes} {totalCats} {otherPredators} {totalSitting}{' '}
              {totalWalkingRunning} {totalBikes}
              {totalSurfers} {totalSports} {totalFires} {totalFishing} {totalVehicles}{' '}
              {totalEquipmentATV}
              {totalDogsOnLeash} {totalDogsOffLeash} {outreachNotes} {otherNotes}
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MonitorLogPage;
