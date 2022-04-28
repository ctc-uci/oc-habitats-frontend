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

  const [activeTab, setActiveTab] = useState(0);
  // tab # will be dynamic with dynamic listed species
  const totalTabs = 7;

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

  const submitForm = async e => {
    console.log(formMethods.getValues());
    const res = await OCHBackend.post('submission', formMethods.getValues(), {
      withCredentials: true,
    });
    console.log(res.data);
  };

  const assignedSegments = useMemo(() => user?.segments || [], [user]);

  return (
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
                  <ListedSpeciesTab
                    tab={0}
                    speciesName="Least Tern"
                    speciesCode="LETE"
                    speciesId="625f3e3781fa433b5d2efa4c"
                  />
                </Container>
              </TabPanel>
              <TabPanel>
                <Container maxW="100vw">
                  <ListedSpeciesTab
                    tab={1}
                    speciesName="Snowy Plover"
                    speciesCode="SNPL"
                    speciesId="625f3e2b81fa433b5d2efa49"
                  />
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
                  <ReviewSubmitTab
                    jumpToTab={setActiveTab}
                    assignedSegments={assignedSegments}
                    monitorPartners={monitorPartners}
                  />
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
                <Button colorScheme="green" type="submit" onClick={submitForm}>
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
