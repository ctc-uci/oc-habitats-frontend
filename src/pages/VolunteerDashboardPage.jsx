/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Box,
  VStack,
  Stack,
  Wrap,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  CloseButton,
  Button,
  Text,
  Tooltip,
  Flex,
} from '@chakra-ui/react';
import { ArrowForwardIcon, InfoIcon } from '@chakra-ui/icons';
import SegmentAssignment from '../components/VolunteerDashboard/SegmentAssignment';
import UnsubmittedLogDraft from '../components/VolunteerDashboard/UnsubmittedLogDraft';
import RecentlySubmittedLog from '../components/VolunteerDashboard/RecentlySubmittedLog';
import { OCHBackend } from '../common/utils';

// TODO: go to log button functionality
// TODO: format date and time

// temporary (?) notification component until notification system is written
// TODO: replace notification
const Toast = props => {
  const [closed, setClosed] = useState();
  const { title, description, status, variant, closeButton, goToLogButton } = props;
  return closed ? (
    ''
  ) : (
    <Alert borderRadius="md" status={status} variant={variant}>
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription display="block">{description}</AlertDescription>
        {closeButton && (
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setClosed(true)} />
        )}
        {goToLogButton && (
          <Button float="right" colorScheme="red" size="sm" rightIcon={<ArrowForwardIcon />}>
            Go to Log
          </Button>
        )}
      </Box>
    </Alert>
  );
};

// GET BACKEND DATA
const VolunteerDashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [userSubmissions, setUserSubmissions] = useState([]);

  useEffect(async () => {
    try {
      // const res = await OCHBackend.get('users/me', { withCredentials: true });
      const [userRes, submissionRes] = await Promise.all([
        OCHBackend.get('/users/me', { withCredentials: true }),
        OCHBackend.get('/users/userSubmissions', { withCredentials: true }),
      ]);
      setUserData(userRes.data);
      setUserSubmissions(submissionRes.data);
    } catch (err) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, []);

  const Segments = () => {
    if (userData.segments.length === 0) {
      return (
        <Text>
          You have not been assigned any segments this month. If you believe this is a mistake,
          please contact ochabitats@ochabitats.org.
        </Text>
      );
    }

    return userData.segments.map(segment => (
      <SegmentAssignment
        key={segment.segmentID}
        segment={segment.segmentId}
        name={segment.name}
        place={segment.streets}
        mapLink={segment.mapLink}
        description={segment.parking}
      />
    ));
  };

  const Unsubmitted = () => {
    const userDrafts = userSubmissions.filter(submission => submission.status === 'UNSUBMITTED');

    if (userDrafts.length === 0) {
      return <Text>You do not have any unsubmitted log drafts.</Text>;
    }

    return userDrafts.map((draft, idx) => (
      <UnsubmittedLogDraft
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
        title={`${draft.segment.segmentId} — ${draft.date}`}
        timeDescription={draft.submittedAt}
      />
    ));
  };

  const Recents = () => {
    const notApproved = userSubmissions
      .filter(
        submission =>
          submission.status === 'EDITS_REQUESTED' || submission.status === 'UNDER_REVIEW',
      )
      .sort((a, b) => b.submittedAt - a.submittedAt)
      .sort((a, b) => a.status - b.status);

    const recents = notApproved.concat(
      userSubmissions
        .sort((a, b) => a.submittedAt - b.submittedAt)
        .filter(submission => submission.status === 'APPROVED')
        .slice(0, 6 - notApproved.length),
    );

    if (recents.length === 0) {
      return <Text>You do not have any recently submitted logs.</Text>;
    }

    return recents.map((recent, idx) => (
      <RecentlySubmittedLog
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
        title={`${recent.segment.segmentId} — ${recent.date}`}
        timeDescription={recent.submittedAt}
        status={recent.status}
      />
    ));
  };

  return (
    <Container maxW="90vw" pb={{ sm: '100px', lg: '0px' }}>
      <Heading size="xl" py="10">
        Welcome Back, {userData?.firstName}!
      </Heading>
      <Heading size="md" py="1">
        Notifications
      </Heading>
      <VStack spacing="5px" align="left">
        <Toast
          title="You have submitted a log for: OC09c, OC09b"
          description="You have not submitted a log for: OC01"
          status="info"
          variant="left-accent"
          closeButton={false}
        />
        <Toast
          title="Your monitor log for OC09a on 02-16-2022 has been approved!"
          description="Thank you for your hard work, keep it up!"
          status="success"
          variant="left-accent"
          closeButton
        />
        <Toast
          title="Monitor logs for segment(s) OC01 have not been submitted yet."
          description="Please submit these logs by 02-28-2022 at 12:00PM."
          status="warning"
          variant="left-accent"
          closeButton
        />
        <Toast
          title="Edits have been requested for your OC09b log on 02-16-2022"
          description="Request Reason: [Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
           eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam volutpat commodo
           sed egestas egestas fringilla.]"
          status="error"
          variant="left-accent"
          goToLogButton
        />
      </VStack>
      <br />
      <Heading size="md">Segment Assignment(s)</Heading>
      <Text py="3" fontSize="16px" color="#4A5568">
        Note on Parking: If you pay for parking (not to exceed $6 without approval), please submit
        your receipts for reimbursement with your name and segment.
      </Text>
      <Stack
        direction={{ md: 'row', sm: 'column' }}
        spacing={{ md: '50px', sm: '20px' }}
        align="flex-start"
      >
        {userData != null && Segments()}
      </Stack>
      <Heading size="md" py="5" mt={4}>
        Unsubmitted Log Drafts
      </Heading>
      <Wrap spacing="20px">{Unsubmitted()}</Wrap>
      <Flex direction="row" align="center" pt="50">
        <Heading size="md">Recently Submitted Logs &nbsp;&nbsp;</Heading>
        <Tooltip
          hasArrow
          bg="black"
          label="Submitted monitor logs can be edited and resubmitted if they haven't been approved yet."
        >
          <InfoIcon w={5} h={5} color="ochBluePress" />
        </Tooltip>
      </Flex>
      <Wrap mt={4} spacing="20px">
        {Recents()}
      </Wrap>
    </Container>
  );
};

export default VolunteerDashboardPage;
