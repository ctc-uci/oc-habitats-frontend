/* eslint-disable react/prop-types */
import { InfoIcon } from '@chakra-ui/icons';
import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { React, useEffect, useState } from 'react';
import { OCHBackend } from '../common/utils';
import { formatDate } from '../common/dateUtils';
import RecentlySubmittedLog from '../components/VolunteerDashboard/RecentlySubmittedLog';
import SegmentAssignment from '../components/VolunteerDashboard/SegmentAssignment';
import UnsubmittedLogDraft from '../components/VolunteerDashboard/UnsubmittedLogDraft';
import Notification from '../components/VolunteerDashboard/Notification';

const VolunteerDashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const currentDate = new Date();

  // Get data from backend
  useEffect(async () => {
    try {
      const [userRes, submissionRes, notificationsRes] = await Promise.all([
        OCHBackend.get('/users/me', { withCredentials: true }),
        OCHBackend.get('/users/userSubmissions', { withCredentials: true }),
        OCHBackend.get('/notification/', { withCredentials: true }),
      ]);
      setUserData(userRes.data);
      setUserSubmissions(submissionRes.data);
      setUserNotifications(notificationsRes.data);
    } catch (err) {
      // TODO: handle error
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, []);

  const Notifications = () => {
    // There are 3 kinds of notifications:
    // segment submission status, approval notification, and edits requested reminder
    const editsRequested = userSubmissions.filter(
      submission => submission.status === 'EDITS_REQUESTED',
    );

    const submissionMonth = datetime => {
      const submissionDate = new Date(datetime);
      return submissionDate.getMonth();
    };

    const segments = userData.segments.map(segment => segment.segmentId);
    const monthlySubmissions = userSubmissions
      .filter(submission => submissionMonth(submission.submittedAt) === currentDate.getMonth())
      .map(submission => submission.segment.segmentId);

    const submitted = segments.filter(segment => monthlySubmissions.includes(segment));
    const unsubmitted = segments.filter(segment => !monthlySubmissions.includes(segment));
    const submissionDescription = unsubmitted.length
      ? `You have not submitted a log for: ${unsubmitted.toString()}`
      : 'You have submitted logs for all of your assigned sections!';
    const submissionTitle = submitted.length
      ? `You have submitted a log for: ${submitted.toString()}`
      : 'You have not submitted any logs this month.';

    return (
      <>
        <Notification title={submissionTitle} description={submissionDescription} type="status" />
        {userNotifications.map(notification => (
          <Notification
            key={notification._id}
            id={notification._id}
            title={notification.message}
            description="Thank you for your hard work, and keep it up!"
            type="approved"
            closeable
          />
        ))}
        {editsRequested.map(requested => (
          <Notification
            key={requested._id}
            title={`Edits have been requested for your ${
              requested.segment.segmentId
            } log on ${formatDate(requested.requestedEdits.requestDate)}`}
            description={`Request Reason: ${requested.requestedEdits.requests}`}
            type="changes"
            logId={requested._id}
          />
        ))}
      </>
    );
  };

  const Segments = () => {
    if (userData.segments.length === 0) {
      return (
        <Text as="i" fontSize={{ md: '16px', sm: '14px' }}>
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
        <Text as="i" fontSize={{ md: '16px', sm: '14px' }}>
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
          segment={draft.segment?.segmentId}
          date={draft.date}
          lastSaved={draft.lastEditedAt}
          logId={draft._id}
        />
      ));
  };

  const Recents = () => {
    // get at most 6 submissions that have not been approved, sorted by date then status
    const notApproved = userSubmissions
      .filter(
        submission =>
          submission.status === 'EDITS_REQUESTED' || submission.status === 'UNDER_REVIEW',
      )
      .sort((a, b) => b.lastEditedAt.localeCompare(a.lastEditedAt))
      .sort((a, b) => a.status.localeCompare(b.status))
      .slice(0, 6);

    // if # not approved is not 6, fill the rest of the array with recently approved logs
    const recents = notApproved.concat(
      userSubmissions
        .sort((a, b) => b?.submittedAt?.localeCompare(a?.submittedAt))
        .filter(submission => submission.status === 'APPROVED')
        .slice(0, 6 - notApproved.length),
    );

    if (recents.length === 0) {
      return (
        <Text as="i" fontSize={{ md: '16px', sm: '14px' }}>
          You do not have any recently submitted logs.
        </Text>
      );
    }

    return recents.map((recent, idx) => (
      <RecentlySubmittedLog
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
        segment={recent.segment?.segmentId}
        date={recent.date}
        timeDescription={recent.submittedAt}
        status={recent.status}
        logId={recent._id}
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
        {userNotifications.length ? (
          Notifications()
        ) : (
          <Text as="i" fontSize={{ md: '16px', sm: '14px' }}>
            There are no new notifications.
          </Text>
        )}
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
      <Heading size="md" pt="5" mt={4}>
        Monitor Log Drafts
      </Heading>
      <Text py="3" fontSize={{ md: '16px', sm: '14px' }} color="#4A5568">
        Note: This is a list of Monitor Logs that you have yet to submit for review.
      </Text>
      <Stack direction={{ md: 'row', sm: 'column' }} overflowX="auto" spacing="20px">
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
