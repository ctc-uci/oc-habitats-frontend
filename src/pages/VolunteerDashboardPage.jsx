/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Box,
  VStack,
  HStack,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  CloseButton,
  Button,
  Text,
} from '@chakra-ui/react';
import { ArrowForwardIcon, InfoIcon } from '@chakra-ui/icons';
import SegmentAssignment from '../components/VolunteerDashboard/SegmentAssignment';
import UnsubmittedLogDraft from '../components/VolunteerDashboard/UnsubmittedLogDraft';
import RecentlySubmittedLog from '../components/VolunteerDashboard/RecentlySubmittedLog';
import { OCHBackend } from '../common/utils';

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
  useEffect(async () => {
    try {
      const res = await OCHBackend.get('users/me', { withCredentials: true });
      setUserData(res.data);
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
        title={`${segment.segmentId} — ${segment.name}`}
        place={segment.streets}
        mapLink={segment.mapLink}
        description={segment.parking}
      />
    ));
  };

  return (
    <div>
      <Container maxW="90vw">
        <Heading size="lg" py="10">
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
        <Box w="1200px" h="60px" />
        <Heading size="md">Segment Assignment(s)</Heading>
        <Text py="3" fontSize="16px" color="#4A5568">
          Note on Parking: If you pay for parking (not to exceed $6 without approval), please submit
          your receipts for reimbursement with your name and segment.
        </Text>
        <HStack spacing="50px" align="flex-start">
          {userData != null && Segments()}
        </HStack>
        <Heading size="md" py="5">
          Unsubmitted Log Drafts
        </Heading>
        <UnsubmittedLogDraft
          title="OC01 - 02/22/2022"
          timeDescription="Last Saved: 02/23/2022 @ 07:34 PM"
        />
        <Heading size="md" pt="50">
          Recently Submitted Logs &nbsp;&nbsp;
          <InfoIcon w={6} h={6} color="#156071" />
        </Heading>
        <Box w="400px" h="20px" />
        <HStack spacing="10px">
          <RecentlySubmittedLog
            title="OC09b - 02/16/2022"
            timeDescription="Submitted: 02/17/2022 @ 01:27 PM"
            badgeColor="#C53030"
            badgeDescription="EDITS REQUESTED"
            borderColor="red"
            goToLogButton
            marginAmt="230"
          />
          <RecentlySubmittedLog
            title="OC09a - 02/16/2022"
            timeDescription="Submitted: 02/17/2022 @ 11:56 PM"
            badgeColor="#38A169"
            badgeDescription="APPROVED"
            borderColor="lightgray"
            marginAmt="275"
          />
          <RecentlySubmittedLog
            title="OC13 - 01/24/2022"
            timeDescription="Submitted: 01/26/2022 @ 12:35 PM"
            badgeColor="#38A169"
            badgeDescription="APPROVED"
            borderColor="lightgray"
            marginAmt="275"
          />
        </HStack>
        <Box w="400px" h="10px" />
        <HStack spacing="10px">
          <RecentlySubmittedLog
            title="OC12 - 01/24/2022"
            timeDescription="Submitted: 01/26/2022 @ 12:35 PM"
            badgeColor="#38A169"
            badgeDescription="APPROVED"
            borderColor="lightgray"
            marginAmt="275"
          />
          <RecentlySubmittedLog
            title="OC11 - 01/24/2022"
            timeDescription="Submitted: 01/26/2022 @ 12:35 PM"
            badgeColor="#38A169"
            badgeDescription="APPROVED"
            borderColor="lightgray"
            marginAmt="275"
          />
          <RecentlySubmittedLog
            title="OC10 - 01/24/2022"
            timeDescription="Submitted: 01/26/2022 @ 12:35 PM"
            badgeColor="#38A169"
            badgeDescription="APPROVED"
            borderColor="lightgray"
            marginAmt="275"
          />
        </HStack>
      </Container>
    </div>
  );
};

export default VolunteerDashboardPage;
