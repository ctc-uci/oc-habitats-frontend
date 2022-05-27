/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Box,
  VStack,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  CloseButton,
  Button,
  Text,
  Tooltip,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { ArrowForwardIcon, InfoIcon } from '@chakra-ui/icons';
import SegmentAssignment from '../components/VolunteerDashboard/SegmentAssignment';
import UnsubmittedLogDraft from '../components/VolunteerDashboard/UnsubmittedLogDraft';
import RecentlySubmittedLog from '../components/VolunteerDashboard/RecentlySubmittedLog';
import { OCHBackend } from '../common/utils';

// TODO: go to log button functionality

// temporary (?) notification component until notification system is written
// TODO: replace notification
const Toast = props => {
  const [closed, setClosed] = useState();
  const { id, title, description, status, variant, closeButton, goToLogButton } = props;

  const close = () => {
    setClosed(true);
    OCHBackend.delete(`/notification/${id}`, { withCredentials: true });
  };

  return closed ? (
    ''
  ) : (
    <Alert borderRadius="md" status={status} variant={variant}>
      <AlertIcon />
      <Box flex="1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription display="block">{description}</AlertDescription>
        {closeButton && (
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => close()} />
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

const VolunteerDashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);

  // Get data from backend
  useEffect(async () => {
    try {
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

  useEffect(async () => {
    try {
      const notificationsRes = await OCHBackend.get('/notification/', { withCredentials: true });
      setUserNotifications(notificationsRes.data);
    } catch (err) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, []);

  const Notifications = () => {
    return userNotifications.map(notification => (
      <Toast
        key={notification._id}
        id={notification._id}
        title={notification.title}
        description={notification.message}
        status={notification.type === 'MONITOR_LOG_APPROVED' ? 'success' : 'error'}
        variant="left-accent"
        closeButton={notification.type === 'MONITOR_LOG_APPROVED' ? 'true' : 'false'}
      />
    ));
  };

  const Segments = () => {
    if (userData.segments.length === 0) {
      return (
        <Text fontSize={{ md: '16px', sm: '14px' }}>
          You have not been assigned any segments this month. If you believe this is a mistake,
          please contact ochabitats@ochabitats.org.
        </Text>
      );
    }

    return userData.segments
      .sort((a, b) => a.segmentId.localeCompare(b.segmentId))
      .map(segment => (
        <SegmentAssignment
          key={segment.segmentId}
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
      return (
        <Text fontSize={{ md: '16px', sm: '14px' }}>
          You do not have any unsubmitted log drafts.
        </Text>
      );
    }

    return userDrafts
      .sort((a, b) => b.lastEditedAt.localeCompare(a.lastEditedAt))
      .map((draft, idx) => (
        <UnsubmittedLogDraft
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          segment={draft.segment ? draft.segment.segmentId : ''}
          date={draft.date}
          lastSaved={draft.lastEditedAt}
        />
      ));
  };

  const Recents = () => {
    const notApproved = userSubmissions
      .filter(
        submission =>
          submission.status === 'EDITS_REQUESTED' || submission.status === 'UNDER_REVIEW',
      )
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
      .sort((a, b) => a.status.localeCompare(b.status));

    const recents = notApproved.concat(
      userSubmissions
        .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
        .filter(submission => submission.status === 'APPROVED')
        .slice(0, 6 - notApproved.length),
    );

    if (recents.length === 0) {
      return (
        <Text fontSize={{ md: '16px', sm: '14px' }}>
          You do not have any recently submitted logs.
        </Text>
      );
    }

    return recents.map((recent, idx) => (
      <RecentlySubmittedLog
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
        segment={recent.segment.segmentId}
        date={recent.date}
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
        {Notifications()}
      </VStack>
      <br />
      <Heading size="md">Segment Assignment(s)</Heading>
      <Text py="3" fontSize={{ md: '16px', sm: '14px' }} color="#4A5568">
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
      <Stack direction={{ md: 'row', sm: 'column' }} spacing="20px">
        {Unsubmitted()}
      </Stack>
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
      <SimpleGrid
        row={{ md: 2, sm: 1 }}
        columns={{ md: 3, sm: 1 }}
        mt={4}
        spacing="20px"
        maxW="1300px"
      >
        {Recents()}
      </SimpleGrid>
    </Container>
  );
};

export default VolunteerDashboardPage;
