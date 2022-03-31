import React from 'react';
import { Box, Text, Tbody, Th, Tr, Td } from '@chakra-ui/react';
import CommonTable from './CommonTable';
import CommonTableHeader from './CommonTableHeader';

const CommonTableExample = () => {
  return (
    <>
      <Box w="900px" mt="20px">
        <Text fontSize="3xl">Default Common Table</Text>
        <CommonTable>
          <CommonTableHeader>
            <Th>Planet</Th>
            <Th>Mass (10^24kg)</Th>
            <Th>Diameter (km)</Th>
            <Th>Density (kg/m^3)</Th>
            <Th>Gravity (m/s^2)</Th>
            <Th>Length of day (hours)</Th>
          </CommonTableHeader>
          <Tbody>
            <Tr>
              <Td>Mercury</Td>
              <Td>0.330</Td>
              <Td>4,879</Td>
              <Td>5427</Td>
              <Td>3.7</Td>
              <Td>4222.6</Td>
            </Tr>
            <Tr>
              <Td>Venus</Td>
              <Td>4.87</Td>
              <Td>12,104</Td>
              <Td>5243</Td>
              <Td>8.9</Td>
              <Td>2802.0</Td>
            </Tr>
            <Tr>
              <Td>Earth</Td>
              <Td>5.97</Td>
              <Td>12,756</Td>
              <Td>5514</Td>
              <Td>9.8</Td>
              <Td>24.0</Td>
            </Tr>
            <Tr>
              <Td>Mars</Td>
              <Td>0.642</Td>
              <Td>6,792</Td>
              <Td>3933</Td>
              <Td>3.7</Td>
              <Td>24.7</Td>
            </Tr>
            <Tr>
              <Td>Jupiter</Td>
              <Td>1898</Td>
              <Td>142,984</Td>
              <Td>1326</Td>
              <Td>23.1</Td>
              <Td>9.9</Td>
            </Tr>
            <Tr>
              <Td>Saturn</Td>
              <Td>568</Td>
              <Td>120,536</Td>
              <Td>687</Td>
              <Td>9.0</Td>
              <Td>10.7</Td>
            </Tr>
            <Tr>
              <Td>Uranus</Td>
              <Td>86.8</Td>
              <Td>51,118</Td>
              <Td>1271</Td>
              <Td>8.7</Td>
              <Td>17.2</Td>
            </Tr>
            <Tr>
              <Td>Neptune</Td>
              <Td>102</Td>
              <Td>49,528</Td>
              <Td>1638</Td>
              <Td>11.0</Td>
              <Td>16.1</Td>
            </Tr>
            <Tr>
              <Td>Pluto</Td>
              <Td>0.0146</Td>
              <Td>2,370</Td>
              <Td>2095</Td>
              <Td>0.7</Td>
              <Td>153.3</Td>
            </Tr>
          </Tbody>
        </CommonTable>
      </Box>
    </>
  );
};

export default CommonTableExample;
