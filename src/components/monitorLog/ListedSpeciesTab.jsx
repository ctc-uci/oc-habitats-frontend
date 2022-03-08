import React, { useState, useCallback, useEffect } from 'react';
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
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@chakra-ui/icons';
import EndangeredSpeciesPopup from '../../pages/EndangeredSpeciesPopup';

const ListedSpeciesTab = ({ speciesName, speciesCode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [totals, setTotals] = useState([0, 0, 0]);

  useEffect(() => {
    setTotals(
      data
        .map(row => [row.totalAdults, row.totalFledges, row.totalChicks])
        .reduce((l, r) => [l[0] + r[0], l[1] + r[1], l[2] + r[2]], [0, 0, 0]),
    );
  }, [data]);

  const addRow = useCallback(
    formData => {
      setData([...data, formData]);
    },
    [data, setData],
  );

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
                  <Td>{totals[0]}</Td>
                  <Td>{totals[1]}</Td>
                  <Td>{totals[2]}</Td>
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
              {data.map((row, n) => (
                // eslint-disable-next-line react/no-array-index-key
                <AccordionItem key={n} as={Tbody}>
                  {({ isExpanded }) => (
                    <>
                      <Tr>
                        <Td width="0" borderBottomWidth="0">
                          <IconButton icon={<BsPencil />} />
                        </Td>
                        <Td borderBottomWidth="0">
                          {speciesCode} {n + 1}
                        </Td>
                        <Td borderBottomWidth="0">{row.totalAdults}</Td>
                        <Td borderBottomWidth="0">{row.totalFledges}</Td>
                        <Td borderBottomWidth="0">{row.totalChicks}</Td>
                        <Td width="0" borderBottomWidth="0">
                          <AccordionButton fontSize="2xl">
                            <AccordionIcon />
                          </AccordionButton>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td colSpan="6" padding="0">
                          <Collapse in={isExpanded} as="td" colSpan="6">
                            <Table>
                              <Tbody>
                                <Tr>
                                  <Td border="0">
                                    <Text fontWeight="500">Time</Text>
                                  </Td>
                                  <Td border="0" isNumeric>
                                    {row.time.value} {row.time.meridiem}
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td border="0">
                                    <Text fontWeight="500">Map #</Text>
                                  </Td>
                                  <Td border="0" isNumeric>
                                    1
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td border="0">
                                    <Text fontWeight="500">GPS</Text>
                                  </Td>
                                  <Td border="0" isNumeric>
                                    {row.gps[0].latitude}, {row.gps[0].longitude}
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td border="0">
                                    <Text fontWeight="500">Cross Street/Towers</Text>
                                  </Td>
                                  <Td border="0" isNumeric>
                                    {row['cross-street']}
                                  </Td>
                                </Tr>
                                <Tr>
                                  <Td border="0">
                                    <Text fontWeight="500">Habitat Description</Text>
                                  </Td>
                                  <Td border="0" isNumeric>
                                    {row.habitat}
                                  </Td>
                                </Tr>
                              </Tbody>
                            </Table>
                          </Collapse>
                        </Td>
                      </Tr>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
          <Button onClick={onOpen} width="100%" marginTop="10px" colorScheme="cyan">
            Add New Row +
          </Button>
          <Modal size="full" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent margin={0} rounded="none">
              <EndangeredSpeciesPopup
                closeModal={onClose}
                adultName={speciesName}
                addRow={addRow}
              />
            </ModalContent>
          </Modal>
        </GridItem>
      </Grid>
    </Container>
  );
};

ListedSpeciesTab.propTypes = {
  speciesName: PropTypes.string.isRequired,
  speciesCode: PropTypes.string.isRequired,
};

export default ListedSpeciesTab;
