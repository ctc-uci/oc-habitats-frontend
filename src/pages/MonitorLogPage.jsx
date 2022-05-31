import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
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
  useToast,
} from '@chakra-ui/react';
import { intlFormat, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import { React, useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiArrowUp, FiCheck } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmissionStatusBadge } from '../common/SubmissionStatusBadge';
import { useUserContext } from '../common/UserContext/UserContext';
import { OCHBackend } from '../common/utils';
import AdditionalSpeciesTab from '../components/MonitorLog/AdditionalSpeciesTab';
import EditLogFooter from '../components/MonitorLog/EditLogFooter';
import EditLogPopup from '../components/MonitorLog/EditLogPopup';
import GeneralInfoTab from '../components/MonitorLog/GeneralInfoTab';
import HumanActivity from '../components/MonitorLog/HumanActivityTab';
import ListedSpeciesTab from '../components/MonitorLog/ListedSpeciesTab';
import PredatorsTab from '../components/MonitorLog/PredatorsTab';
import ReviewSubmitTab from '../components/MonitorLog/ReviewSubmitTab';
import ReviewSubmitTabPopup from '../components/MonitorLog/ReviewSubmitTabPopup';

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
  const userContext = useUserContext();
  const { id: submissionId } = useParams();
  const formMethods = useForm();
  const toast = useToast();
  const navigate = useNavigate();

  const checkInModal = useDisclosure();

  const [activeTab, setActiveTab] = useState(0);
  // tab # will be dynamic with dynamic listed species
  const totalTabs = 7;

  const topRef = useRef();

  const returnToTop = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const [user, setUser] = useState(false);
  const [submitterData, setSubmitterData] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);
  const [segmentData, setSegmentData] = useState(null);
  const [monitorPartners, setMonitorPartners] = useState([]);
  const [predators, setPredators] = useState([]);
  const [listedSpecies, setListedSpecies] = useState([]);
  const [additionalSpecies, setAdditionalSpecies] = useState([]);

  useEffect(async () => {
    if (submissionId) {
      try {
        const [submission, segments] = await Promise.all([
          OCHBackend.get(`submission/${submissionId}`),
          OCHBackend.get(`segments`),
        ]);
        if (submission.data.date) {
          submission.data.date = parseISO(submission.data.date);
        }
        formMethods.reset(submission.data);
        setSubmissionData(submission.data);
        if (submission.data.segment) {
          setSegmentData(segments.data.find(s => s._id === submission.data.segment));
        }
        const submitter = await OCHBackend.get(`users/${submission.data.submitter}`);
        setSubmitterData(submitter.data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err.message);
      }
    }
  }, []);

  useEffect(async () => {
    if (!submissionId) {
      checkInModal.onOpen();
    }
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
          .filter(s => s.category === 'JUST_PREDATOR' || s.category === 'NON_LISTED_PREDATOR')
          .map(s => ({
            name: s.name,
            _id: s._id,
          })),
      );
      setListedSpecies(
        speciesData.data
          .filter(s => s.category === 'LISTED')
          .map(s => ({
            name: s.name,
            code: s.code,
            _id: s._id,
          })),
      );
      setAdditionalSpecies(
        speciesData.data
          .filter(s => s.category === 'NON_LISTED')
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
    return res.data;
  };

  const editForm = async () => {
    // eslint-disable-next-line no-console
    console.log(formMethods.getValues());
    const res = await OCHBackend.post(`submission/${submissionId}`, formMethods.getValues(), {
      withCredentials: true,
    });
    // eslint-disable-next-line no-console
    console.log(res.data);
    return res.data;
  };

  const approveLog = () => {
    formMethods.setValue('status', 'APPROVED');
    editForm();
    toast({
      title: 'Log Approved!',
      description: `Sucessfully approved ${submitterData.firstName} ${
        submitterData.lastName
      }'s log for segment ${segmentData.segmentId} from ${intlFormat(submissionData.date)}.`,
      status: 'warning',
    });
    navigate('/logs');
  };

  const onSaveChangesButton = async () => {
    try {
      if (!formMethods.getValues('segment')) {
        toast({
          title: 'Missing information',
          description: 'Please select a segment before saving.',
          status: 'error',
        });
        return;
      }
      if (!formMethods.getValues('_id')) {
        formMethods.setValue('status', 'UNSUBMITTED');
        const res = await submitForm();
        navigate(`/create-log/${res._id}`);
      } else {
        editForm();
      }
      toast({
        title: 'Draft saved.',
        status: 'success',
      });
    } catch (e) {
      toast({
        title: 'Could not save.',
        description: e?.message,
        status: 'error',
      });
    }
  };

  const assignedSegments = useMemo(() => user?.segments || [], [user]);

  const EditingAlert = () => {
    if (
      mode === 'create' &&
      submissionData != null &&
      submissionData.status === 'EDITS_REQUESTED' &&
      submissionData.requestedEdits &&
      segmentData
    ) {
      const d = new Date(submissionData.requestedEdits.requestDate);
      return (
        <>
          <Alert status="error" marginTop="-20px">
            <AlertIcon />
            <Box>
              <AlertTitle>
                Edits were requested for your {segmentData.segmentId} log on {intlFormat(d)}
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
    if (mode !== 'create' && segmentData !== undefined && submissionId !== undefined) {
      return (
        <>
          <Alert status={mode === 'edit' ? 'info' : 'success'} marginTop="-20px" paddingLeft="35px">
            <Box>
              <AlertTitle>
                You are currently {mode}ing {submitterData?.firstName} {submitterData?.lastName}
                &apos;s log for {segmentData?.segmentId} from {intlFormat(submissionData?.date)}.
              </AlertTitle>
              <AlertDescription>
                <SubmissionStatusBadge status={submissionData?.status} />
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
          <EditingAlert />

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
                    isDisabled={mode === 'review' && userContext.userData.role === 'admin'}
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
                      isDisabled={mode === 'review' && userContext.userData.role === 'admin'}
                    />
                  </Container>
                </TabPanel>
              ))}
              <TabPanel>
                <Container maxW="100vw">
                  <AdditionalSpeciesTab
                    species={additionalSpecies}
                    isDisabled={mode === 'review' && userContext.userData.role === 'admin'}
                  />
                </Container>
              </TabPanel>
              <TabPanel>
                <Container maxW="100vw">
                  <PredatorsTab
                    predators={predators}
                    isDisabled={mode === 'review' && userContext.userData.role === 'admin'}
                  />
                </Container>
              </TabPanel>
              <TabPanel>
                <Container maxW="100vw">
                  <HumanActivity
                    isDisabled={mode === 'review' && userContext.userData.role === 'admin'}
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
                  <EditLogPopup
                    submissionId={submissionId}
                    editForm={editForm}
                    formMethods={formMethods}
                    submitterData={submitterData}
                    submissionData={submissionData}
                    segmentData={segmentData}
                  />
                  <Button type="submit" colorScheme="green" onClick={approveLog}>
                    Approve <FiCheck style={{ marginLeft: '4px' }} />
                  </Button>
                </ButtonGroup>
              )}
              {mode === 'edit' && <EditLogFooter editForm={editForm} submissionId={submissionId} />}
              {activeTab === totalTabs - 1 &&
                (submissionData?.status === undefined ||
                  submissionData?.status === 'UNSUBMITTED' ||
                  submissionData?.status === 'EDITS_REQUESTED') &&
                mode === 'create' && (
                  <ReviewSubmitTabPopup
                    submitForm={submitForm}
                    editForm={editForm}
                    formMethods={formMethods}
                  />
                )}
              {(activeTab !== totalTabs - 1 ||
                !(
                  submissionData?.status === undefined ||
                  submissionData?.status === 'UNSUBMITTED' ||
                  submissionData?.status === 'EDITS_REQUESTED'
                )) &&
                mode === 'create' && (
                  <Button colorScheme="cyan" type="submit" onClick={onSaveChangesButton}>
                    {/* {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker */}
                    Save Changes
                  </Button>
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
