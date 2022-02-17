import { Box, HStack, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
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
            <Predators />
          </TabPanel>
          <TabPanel>
            <HumanActivity />
          </TabPanel>
          <TabPanel>
            <p>Review and Submit!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MonitorLogPage;
