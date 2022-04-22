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
  Select,
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

const MonitorLogEditPage = () => {
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

  const assignedSegments = useMemo(() => user?.segments || [], [user]);

  return (
    <Flex w="100%" justifyContent="center">
      <Box w="1500px">
        <FormProvider {...formMethods}>
          <Heading ref={topRef} px="32px" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
            Monitor Log Template
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
                <Select placeholder="Select option">
                  <option value="option1">General Info</option>
                  <option value="option2">Least Tern</option>
                  <option value="option3">Snowy Plover</option>
                  <option value="option4">Additional Species</option>
                  <option value="option5">Predators</option>
                  <option value="option6">Human Activity</option>
                  <option value="option7">Review and Submit</option>
                </Select>
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

export default MonitorLogEditPage;
