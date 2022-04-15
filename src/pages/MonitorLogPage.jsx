import {
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { React, useEffect, useState } from 'react';
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

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    checkInModal.onOpen();
  }, []);

  return (
    <Box ml="171px" mr="171px">
      <FormProvider {...formMethods}>
        <Modal isOpen={checkInModal.isOpen} onClose={checkInModal.onClose}>
          <ModalOverlay />
          <ModalContent marginTop="100" rounded="none">
            <ModalHeader>Have You Checked In Yet?</ModalHeader>
            <ModalBody>
              Check in on <b>BetterImpact</b> or Text <b>949.697.8651</b>
            </ModalBody>

            <ModalFooter>
              <Button onClick={checkInModal.onClose} colorScheme="cyan">
                Yes, I&apos;m Checked In
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Heading px="32px" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
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
