import React from 'react';
import { BsPencil } from 'react-icons/bs';
import {
  Text,
  Grid,
  GridItem,
  Container,
  Tooltip,
  HStack,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Box,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Collapse,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@chakra-ui/icons';

const ListedSpeciesTab = ({ speciesName }) => {
  return (
    <Container maxW="100vw">
      <Text fontWeight="600" fontSize="2xl">
        {speciesName}s
      </Text>
      <Grid marginTop="20px" minH="200px" templateColumns="repeat(3, 1fr)" gap="200">
        <GridItem>
          <HStack marginBottom="5px">
            <Text fontWeight="600" fontSize="xl">
              Total {speciesName}s
            </Text>
            <Tooltip label="Test" fontSize="md">
              <InfoIcon boxSize={5} />
            </Tooltip>
          </HStack>
          <Box overflow="hidden" border="1px solid darkgray" rounded="md">
            <Table>
              <Thead bg="#F7FAFC">
                <Tr>
                  <Th>Adults</Th>
                  <Th>Fledges</Th>
                  <Th>Chicks</Th>
                </Tr>
              </Thead>
              <Tbody size="xs">
                <Tr>
                  <Td>0</Td>
                  <Td>0</Td>
                  <Td>0</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
          <Box marginTop="10px">
            <Text as="em">
              Note: This table is not meant to be edited. It shows the total from the “{speciesName}{' '}
              Tracker” table.
            </Text>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <HStack marginBottom="5px">
            <Text fontWeight="600" fontSize="xl">
              {speciesName} Tracker
            </Text>
          </HStack>
          <Box overflow="hidden" border="1px solid darkgray" rounded="md">
            <Accordion as={Table} allowToggle width="100%" reduceMotion>
              <Thead bg="#F7FAFC">
                <tr>
                  <Th width="0" />
                  <Th>Group</Th>
                  <Th>Adults</Th>
                  <Th>Fledges</Th>
                  <Th>Chicks</Th>
                  <Th width="0" />
                </tr>
              </Thead>
              {/* <Tbody> */}
              {[1, 2, 3].map(n => (
                <AccordionItem key={n} as={Tbody}>
                  {({ isExpanded }) => (
                    <>
                      <Tr>
                        <Td width="0" borderBottomWidth="0">
                          <IconButton icon={<BsPencil />} />
                        </Td>
                        <Td borderBottomWidth="0">WSPL {n}</Td>
                        <Td borderBottomWidth="0">3</Td>
                        <Td borderBottomWidth="0">2</Td>
                        <Td borderBottomWidth="0">{isExpanded ? '1' : '2'}</Td>
                        <Td width="0" borderBottomWidth="0">
                          <AccordionButton fontSize="2xl">
                            <AccordionIcon />
                          </AccordionButton>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td colspan="6" padding="0">
                          <Collapse in={isExpanded} as="td" colspan="6">
                            <Table>
                              <Tbody>
                                <Tr>
                                  <Td border="0">Time</Td>
                                  <Td border="0" isNumeric>
                                    07:05 AM
                                  </Td>
                                </Tr>
                              </Tbody>
                            </Table>
                          </Collapse>
                        </Td>
                        {/* {isExpanded && (
                          <Collapse in={isExpanded} as="td" colspan="6" unmountOnExit>
                            <Table>
                              <Tbody>
                                <Tr>
                                  <Td>Time</Td>
                                  <Td isNumeric>07:05 AM</Td>
                                </Tr>
                              </Tbody>
                            </Table>
                          </Collapse>
                        )} */}
                      </Tr>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

ListedSpeciesTab.propTypes = {
  speciesName: PropTypes.string.isRequired,
};

export default ListedSpeciesTab;
