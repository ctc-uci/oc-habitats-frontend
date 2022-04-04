import { PhoneIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { Button, Box, Stack, Text, VStack, Center, Tbody, Th, Tr, Td } from '@chakra-ui/react';
import CommonTable from '../common/CommonTable/CommonTable';
import { CommonTableHeader, CommonTableFooter } from '../common/CommonTable/CommonTableHeader';

const DefaultTable = () => (
  <CommonTable>
    <CommonTableHeader>
      <Th>Contact Name</Th>
      <Th>Number</Th>
    </CommonTableHeader>
    <Tbody>
      <Tr>
        <Td>Emergency</Td>
        <Td>911</Td>
      </Tr>
      <Tr>
        <Td>OC Sheriff</Td>
        <Td>714.628.7170</Td>
      </Tr>
      <Tr>
        <Td>OC Park Ranger</Td>
        <Td>714.973.6855</Td>
      </Tr>
      <Tr>
        <Td>OC Lifeguards</Td>
        <Td>949.276.5050</Td>
      </Tr>
      <Tr>
        <Td>CalTip</Td>
        <Td>888.334.2258</Td>
      </Tr>
      <Tr>
        <Td>Ross Grisworld</Td>
        <Td>714.262.0352 (Text Only, note your name and OCH)</Td>
      </Tr>
      <Tr>
        <Td>WWCC</Td>
        <Td>714.374.5587 (Sick or injured birds or terrestrial wildlife</Td>
      </Tr>
      <Tr>
        <Td>PMMC</Td>
        <Td>949.494.3050</Td>
      </Tr>
      <Tr>
        <Td>USFWS</Td>
        <Td>503.231.6125</Td>
      </Tr>
      <Tr>
        <Td>CCC</Td>
        <Td>562.590.0701</Td>
      </Tr>
      <Tr>
        <Td>CA State Parks</Td>
        <Td>714.536.1454</Td>
      </Tr>
      <Tr>
        <Td>CA State Park Patrol</Td>
        <Td>951.943.1582</Td>
      </Tr>
      <Tr>
        <Td>North Co.</Td>
        <Td>714.647.7000</Td>
      </Tr>
      <Tr>
        <Td>South Co.</Td>
        <Td>949.770.6011</Td>
      </Tr>
      <Tr>
        <Td>Oiled Bird Network</Td>
        <Td>877.823.6926</Td>
      </Tr>
      <Tr>
        <Td>Report a Non-Emergency</Td>
        <Td>
          Call the non-ermergency number for the local police of the segment you are in (e.g. Seal
          Beach, Huntington Beach, Newport Beach, San Clemente, etc
        </Td>
      </Tr>
    </Tbody>
  </CommonTable>
);

const Numbers = props => {
  return (
    <Center>
      <Stack w="container.xl" justify-content="center" mb="4em">
        <VStack align="left" spacing="1.5em" w="100%">
          <Text fontWeight="600" fontSize="36px" mt="40px">
            Emergency Numbers
          </Text>
          <VStack spacing={2} align="stretch">
            <Button
              rightIcon={<PhoneIcon />}
              bg="#2BC0E3"
              color="#231F20"
              variant="solid"
              width="200px"
              height="40px"
            >
              Add Contact
            </Button>
          </VStack>
          <Box w="900px">
            <DefaultTable />
          </Box>
        </VStack>
      </Stack>
    </Center>
  );
};

export default Numbers;
