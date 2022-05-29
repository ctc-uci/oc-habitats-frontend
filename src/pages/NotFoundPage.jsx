import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Box } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

const VolunteerDashboardPage = () => {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = '/.';
    navigate(path);
  };

  return (
    <Box textAlign="left" position="absolute" top="15%" left="4%">
      <Text fontSize="60px" fontFamily="Inter" fontWeight="bold">
        404 Error
      </Text>
      <br />
      <Text fontSize="24px">Sorry...the page you were looking for could not be found.</Text>
      <br />
      <br />
      <Text onClick={routeChange} fontsize="24px">
        <ArrowBackIcon />
        &nbsp; Return to Home
      </Text>
    </Box>
  );
};

export default VolunteerDashboardPage;
