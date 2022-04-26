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
  Badge,
  Text,
  Link,
} from '@chakra-ui/react';
import { ArrowForwardIcon, InfoIcon } from '@chakra-ui/icons';
import { FiMapPin, FiImage } from 'react-icons/fi';
import { OCHBackend } from '../common/utils';

// COMPONENTS
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

const SegAssignment = props => {
  const { title, place, description } = props;
  return (
    <Box w="400px">
      <Text fontSize="16px" color="#231F20">
        {title}
      </Text>
      <Text fontSize="16px" color="#4A5568">
        {place}
      </Text>
      <FiMapPin color="#156071" style={{ display: 'inline' }} />
      <Text marginLeft="3" as="u" fontSize="16px" color="#156071">
        <Link href="https://www.google.com/maps" isExternal>
          Google Maps Link
        </Link>
      </Text>
      <Text />
      <FiImage color="#156071" style={{ display: 'inline' }} />
      <Text marginLeft="3" as="u" fontSize="16px" color="#156071">
        <Link href="https://www.google.com/maps" isExternal>
          Map Image
        </Link>
      </Text>
      <Text fontSize="16px" color="#4A5568">
        {description}
      </Text>
    </Box>
  );
};

const UnsubmittedLogDraft = props => {
  const { title, timeDescription } = props;
  return (
    <Box align="center" border="2px" borderRadius="md" borderColor="lightgray" w="400px" h="125px">
      <Box w="400px" h="15px" />
      <Text fontSize="16px" pl="6" textAlign="left">
        {title}
      </Text>
      <Text fontSize="16px" pl="6" textAlign="left" color="#4A5568">
        {timeDescription}
      </Text>
      <Box w="400px" h="10px" />
      <Button w="350px" bgColor="#2BC0E3" size="sm" rightIcon={<ArrowForwardIcon />}>
        Go to Log
      </Button>
    </Box>
  );
};

const RecentlySubmittedLog = props => {
  const {
    title,
    timeDescription,
    badgeColor,
    badgeDescription,
    borderColor,
    goToLogButton,
    marginAmt,
  } = props;
  return (
    <Box
      align="center"
      border="2px"
      borderRadius="md"
      borderColor={borderColor}
      w="400px"
      h="155px"
    >
      <Box w="400px" h="15px" />
      <Text fontSize="16px" pl="6" textAlign="left">
        {title}
      </Text>
      <Text fontSize="16px" pl="6" textAlign="left" color="#4A5568">
        {timeDescription}
      </Text>
      <Badge marginRight={marginAmt} bg={badgeColor} textColor="white">
        {badgeDescription}
      </Badge>
      <Box w="400px" h="15px" />
      {goToLogButton && (
        <Button w="350px" bgColor="#2BC0E3" size="sm" rightIcon={<ArrowForwardIcon />}>
          Go to Log
        </Button>
      )}
    </Box>
  );
};

// GET BACKEND DATA
const HomePage = props => {
  const [userData, setUserData] = useState(null);
  useEffect(async () => {
    try {
      const res = await OCHBackend.get('users/me', { withCredentials: true });
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log(userData);
  console.log(userData?.segments);

  return (
    <div>
      <Container maxW="90vw">
        <Heading size="lg" py="10">
          Welcome Back, Peter!
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
        <HStack spacing="50px">
          {userData != null &&
            userData.segments.map(segment => (
              <SegAssignment
                key={segment.segmentID}
                title={`${segment.name} - ${segment.segmentId}`}
                place={segment.streets}
                description={segment.parking}
              />
            ))}
          <SegAssignment
            title="OC09 &nbsp;&nbsp;&nbsp; Huntington State Beach State Beach 1"
            place="Beach Blvd to Magnolia"
            description="Park in Huntington State Beach if you have a pass, or park on Seashore Drive at Orange
         Street in Newport Beach."
          />
          <SegAssignment
            title="OC01 &nbsp;&nbsp;&nbsp; Huntington State Beach State Beach 1"
            place="Magnolia to Santa Ana River/Least Tern Preserve"
            description="Park in Huntington State Beach if you have a pass, or park on Seashore Drive at Orange
         Street in Newport Beach."
          />
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

export default HomePage;
