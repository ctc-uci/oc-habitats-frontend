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
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  ButtonGroup,
} from '@chakra-ui/react';
import { React, useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowUp, FiCheck } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import { useUserContext } from '../common/UserContext/UserContext';
import { OCHBackend } from '../common/utils';
import AdditionalSpeciesTab from '../components/MonitorLog/AdditionalSpeciesTab';
import GeneralInfoTab from '../components/MonitorLog/GeneralInfoTab';
import HumanActivity from '../components/MonitorLog/HumanActivityTab';
import ListedSpeciesTab from '../components/MonitorLog/ListedSpeciesTab';
import PredatorsTab from '../components/MonitorLog/PredatorsTab';
import ReviewSubmitTab from '../components/MonitorLog/ReviewSubmitTab';
import ReviewSubmitTabPopup from '../components/MonitorLog/ReviewSubmitTabPopup';
import EditLogPopup from '../components/MonitorLog/EditLogPopup';
import EditLogFooter from '../components/MonitorLog/EditLogFooter';

const MonitorTabButton = props => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  return (
    <Tab
      height="40px"
      borderColor="ochBlack"
      borderWidth="1px"
      whiteSpace="nowrap"
      _selected={{ borderColor: 'ochOrange', color: 'ochBlack', bg: 'ochOrange' }}
      {...props}
    >
      {children}
    </Tab>
  );
};

const MonitorLogPage = ({ mode }) => {
  const userDataContext = useUserContext();
  const userData = useParams();
  const formMethods = useForm();

  const checkInModal = useDisclosure();

  const [activeTab, setActiveTab] = useState(0);
  // tab # will be dynamic with dynamic listed species
  const totalTabs = 7;

  const topRef = useRef();

  const returnToTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [user, setUser] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [segmentData, setSegmentData] = useState(null);
  const [monitorPartners, setMonitorPartners] = useState([]);
  const [predators, setPredators] = useState([]);
  const [listedSpecies, setListedSpecies] = useState([]);
  const [additionalSpecies, setAdditionalSpecies] = useState([]);

  useEffect(async () => {
    if (mode === 'edit' || mode === 'review') {
      try {
        const submission = await OCHBackend.get(`submission/${userData.id}`);
        console.log(submission.data);
        submission.data.date = parseISO(submission.data.date);
        formMethods.reset(submission.data);
        setSubmissionData(submission.data);
        if (submission.data.segment) {
          setSegmentData(
            userDataContext.userData.segments.find(s => s._id === submission.data.segment),
          );
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err.message);
      }
    }
  }, []);

  useEffect(async () => {
    checkInModal.onOpen();
    try {
      const [userD, monitorPartnersData, speciesData] = await Promise.all([
        OCHBackend.get('users/me', { withCredentials: true }),
        OCHBackend.get('users/monitorPartners', { withCredentials: true }),
        OCHBackend.get('species', { withCredentials: true }),
      ]);
      setUser(userD.data);
      setMonitorPartners(monitorPartnersData.data);
      setPredators(
        speciesData.data
          .filter(s => s.isPredator && (!s.isListed || s.isNeither))
          .map(s => ({
            name: s.name,
            _id: s._id,
          })),
      );
      setListedSpecies(
        speciesData.data
          .filter(s => s.isListed && !s.isPredator)
          .map(s => ({
            name: s.name,
            code: s.code,
            _id: s._id,
          })),
      );
      setAdditionalSpecies(
        speciesData.data
          .filter(s => !s.isListed && !s.isPredator)
          .map(s => ({
            name: s.name,
            code: s.code,
            _id: s._id,
          })),
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  }, []);

  const submitForm = async () => {
    // eslint-disable-next-line no-console
    console.log(formMethods.getValues());
    const res = await OCHBackend.post('submission', formMethods.getValues(), {
      withCredentials: true,
    });
    // eslint-disable-next-line no-console
    console.log(res.data);
  };

  const assignedSegments = useMemo(() => user?.segments || [], [user]);

  const request = () => {
    if (submissionData != null && submissionData.requestedEdits && segmentData) {
      const d = new Date(submissionData.requestedEdits.requestDate);
      return (
        <>
          <Alert status="error">
            <AlertIcon />
            <Box>
              <AlertTitle>
                Edits have been requested for your {segmentData.segmentId} log on {d.getMonth() + 1}
                -{d.getDate()}-{d.getFullYear()}
              </AlertTitle>
              <AlertDescription>
                Request Reason: {submissionData.requestedEdits.requests}{' '}
              </AlertDescription>
            </Box>
          </Alert>
          <br />
        </>
      );
    }
    return null;
  };

  return (
    <Flex w="100%" justifyContent="center">
      <Box w="100%">
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
          <Heading
            ref={topRef}
            px="32px"
            fontWeight="600"
            fontSize={{ md: '4xl', base: '3xl' }}
            my="40px"
          >
            OCH Monitor Log
          </Heading>
          {request()}

          <Tabs
            variant="solid-rounded"
            size="md"
            align="start"
            colorScheme="orange"
            index={activeTab}
            onChange={setActiveTab}
            isLazy
          >
            <TabList
              px="32px"
              maxW="100vw"
              alignItems="center"
              overflowX="scroll"
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              <HStack spacing="24px">
                <MonitorTabButton>General Info</MonitorTabButton>
                {listedSpecies.map(s => (
                  <MonitorTabButton key={s._id}>{s.code}</MonitorTabButton>
                ))}
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
                    isDisabled={mode === 'review' && userDataContext.userData.role === 'admin'}
                  />
                </Container>
              </TabPanel>
              {listedSpecies.map((s, idx) => (
                <TabPanel key={s._id} px={{ base: 0, lg: 4 }}>
                  <Container maxW="100vw">
                    <ListedSpeciesTab
                      tab={idx}
                      speciesName={s.name}
                      speciesCode={s.code}
                      speciesId={s._id}
                      isDisabled={mode === 'review' && userDataContext.userData.role === 'admin'}
                    />
                  </Container>
                </TabPanel>
              ))}
              <TabPanel>
                <Container maxW="100vw">
                  <AdditionalSpeciesTab
                    species={additionalSpecies}
                    isDisabled={mode === 'review' && userDataContext.userData.role === 'admin'}
                  />
                </Container>
              </TabPanel>
              <TabPanel>
                <Container maxW="100vw">
                  <PredatorsTab
                    predators={predators}
                    isDisabled={mode === 'review' && userDataContext.userData.role === 'admin'}
                  />
                </Container>
              </TabPanel>
              <TabPanel>
                <Container maxW="100vw">
                  <HumanActivity
                    isDisabled={mode === 'review' && userDataContext.userData.role === 'admin'}
                  />
                </Container>
              </TabPanel>
              <TabPanel>
                <Container maxW="100vw">
                  <ReviewSubmitTab
                    jumpToTab={setActiveTab}
                    assignedSegments={assignedSegments}
                    monitorPartners={monitorPartners}
                    predators={predators}
                    listedSpecies={listedSpecies}
                    additionalSpecies={additionalSpecies}
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
            <Flex width="100%" p="32px">
              <Button
                onClick={returnToTop}
                variant="outline"
                color="white"
                _hover={{ color: 'black', backgroundColor: 'white' }}
              >
                Return to Top <FiArrowUp style={{ marginLeft: '4px' }} />
              </Button>
              <Spacer />
              {mode === 'review' && (
                <ButtonGroup>
                  <EditLogPopup user={userData.id} />
                  <Button
                    type="submit"
                    onClick={() => {
                      formMethods.setValue({
                        status: 'APPROVED',
                      });
                      submitForm();
                    }}
                  >
                    Approve
                  </Button>
                </ButtonGroup>
              )}
              {activeTab !== totalTabs - 1 && mode === 'edit' && (
                <EditLogFooter
                  role={userDataContext.userData.role}
                  submitForm={submitForm}
                  formMethods={formMethods}
                />
              )}
              {activeTab === totalTabs - 1 && (
                <ReviewSubmitTabPopup submitForm={submitForm} formMethods={formMethods} />
              )}
            </Flex>
          </Flex>
        </FormProvider>
      </Box>
    </Flex>
  );
};

MonitorLogPage.defaultProps = {
  mode: 'create',
};

MonitorLogPage.propTypes = {
  mode: PropTypes.string,
};

export default MonitorLogPage;
