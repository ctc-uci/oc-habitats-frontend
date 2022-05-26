import React from 'react';
import { Text, Box } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const VolunteerDashboardPage = () => {
  return (
    <Box textAlign="left" w="658px" position="absolute" top="15%" left="4%">
      <Text fontSize="60px" fontFamily="Inter" fontWeight="bold">
        404 Error
      </Text>
      <br />
      <Text fontSize="24px">Sorry...the page you were looking for could not be found.</Text>
      <br />
      <br />
      <Text fontsize="24px">
        <ArrowBackIcon />
        &nbsp; Return to Home
      </Text>
    </Box>
  );
};

export default VolunteerDashboardPage;
