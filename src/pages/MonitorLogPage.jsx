import { Box, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { React, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AdditionalSpeciesTab from '../components/MonitorLog/AdditionalSpeciesTab';
import GeneralInfoTab from '../components/MonitorLog/GeneralInfoTab';
import HumanActivity from '../components/MonitorLog/HumanActivityTab';
import ListedSpeciesTab from '../components/MonitorLog/ListedSpeciesTab';
import PredatorsTab from '../components/MonitorLog/PredatorsTab';
import ReviewSubmitTab from '../components/MonitorLog/ReviewSubmitTab';

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
  const formMethods = useForm({});

  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box ml="171px" mr="171px">
      <FormProvider {...formMethods}>
        <Heading align="center" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
          Coastal Dune Habitat Survey Log
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
              <HumanActivity />
            </TabPanel>
            <TabPanel>
              <ReviewSubmitTab jumpToTab={setActiveTab} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </FormProvider>
    </Box>
  );
};

export default MonitorLogPage;
