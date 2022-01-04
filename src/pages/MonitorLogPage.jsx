import { Box, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import AdditionalSpecies from '../components/AdditionalSpecies';
import PredatorsHumanActivity from '../components/PredatorsHumanActivity';
import SectionName from '../components/SectionName';

const MonitorLogPage = () => {
  return (
    <Box ml="171px" mr="171px">
      <Heading align="center" fontWeight="600" fontSize="36px" mb="40px" mt="40px">
        Coastal Dune Habitat Survey Log
      </Heading>
      <VStack spacing="72px" align="left">
        <SectionName />
        <AdditionalSpecies />
        <PredatorsHumanActivity />
      </VStack>
    </Box>
  );
};

export default MonitorLogPage;
