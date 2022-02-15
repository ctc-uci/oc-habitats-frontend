import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import AdditionalSpecies from '../components/monitorLog/AdditionalSpecies';
import PredatorsHumanActivity from '../components/monitorLog/PredatorsHumanActivity';
import SectionName from '../components/monitorLog/SectionName';

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
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>General Info</Tab>
          <Tab>Least Tern</Tab>
          <Tab>Snowy Polvers</Tab>
          <Tab>Additional Species</Tab>
          <Tab>Predators</Tab>
          <Tab>Human Activity</Tab>
          <Tab>Review and Submit</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SectionName options={options} />
          </TabPanel>
          <TabPanel>
            <p>Least Tern</p>
          </TabPanel>
          <TabPanel>
            <p>Snowy Plovers</p>
          </TabPanel>
          <TabPanel>
            <AdditionalSpecies />
          </TabPanel>
          <TabPanel>
            <PredatorsHumanActivity />
          </TabPanel>
          <TabPanel>
            <p>Human Activity</p>
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
