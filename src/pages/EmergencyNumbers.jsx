import { PhoneIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { Button, Box, Stack, Text, VStack, Center, Tbody, Th, Tr, Td } from '@chakra-ui/react';
import CommonTable from '../common/CommonTable/CommonTable';
import { CommonTableHeader, CommonTableFooter } from '../common/CommonTable/CommonTableHeader';

const DefaultTable = () => (
  <CommonTable>
    <CommonTableHeader>
      <Th fontWeight="500">Contact Name</Th>
      <Th>Number</Th>
    </CommonTableHeader>
    <Tbody>
      <Tr>
        <Td fontWeight="500">Emergency</Td>
        <Td>911</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">OC Sheriff</Td>
        <Td>714.628.7170</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">OC Park Ranger</Td>
        <Td>714.973.6855</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">OC Lifeguards</Td>
        <Td>949.276.5050</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">CalTip</Td>
        <Td>888.334.2258</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">Ross Grisworld</Td>
        <Td>714.262.0352 (Text Only, note your name and OCH)</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">WWCC</Td>
        <Td>714.374.5587 (Sick or injured birds or terrestrial wildlife)</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">PMMC</Td>
        <Td>949.494.3050</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">USFWS</Td>
        <Td>503.231.6125</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">CCC</Td>
        <Td>562.590.0701</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">CA State Parks</Td>
        <Td>714.536.1454</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">CA State Park Patrol</Td>
        <Td>951.943.1582</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">North Co.</Td>
        <Td>714.647.7000</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">South Co.</Td>
        <Td>949.770.6011</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">Oiled Bird Network</Td>
        <Td>877.823.6926</Td>
      </Tr>
      <Tr>
        <Td fontWeight="500">Report a Non-Emergency</Td>
        <Td>
          Call the non-emergency number for the local police of the segment you are in (e.g. Seal
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
          <Text fontWeight="500" fontSize="16px" mt="24px">
            In the case of an emergency or situation beyond your authorizations, call for
            assistance.
          </Text>
          <Text>REMEMBER, YOUR SAFETY IS OUR PRIORITY.</Text>

          {/* <VStack spacing={2} align="stretch">
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

          </VStack> */}
          <Box w="900px">
            <DefaultTable />
          </Box>
        </VStack>
      </Stack>
    </Center>
  );
};

export default Numbers;
