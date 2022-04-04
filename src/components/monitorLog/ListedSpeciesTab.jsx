/* eslint-disable react/jsx-key */
import React, { useState, useCallback, useEffect } from 'react';
import {
  Text,
  Grid,
  GridItem,
  Container,
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
  Tfoot,
  FormControl,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { FiEdit3 } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useFormContext, useFieldArray } from 'react-hook-form';
import ListedSpeciesPopup from '../ListedSpecies/ListedSpeciesPopup';

const ListedSpeciesTab = ({ tab, speciesName, speciesCode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [totals, setTotals] = useState([0, 0, 0]);
  const { register, setValue, watch } = useFormContext();
  const formPrefix = `listedSpecies.${tab}.`;

  useEffect(() => {
    setTotals(
      data
        .map(row => [row.totalAdults, row.totalFledges, row.totalChicks])
        .reduce((l, r) => [l[0] + r[0], l[1] + r[1], l[2] + r[2]], [0, 0, 0]),
    );
  }, [data]);

  // const addRow = useCallback(
  //   formData => {
  //     setData([...data, formData]);
  //   },
  //   [data, setData],
  // );

  const openModal = () => {
    // append({
    //   totalAdults: 0,
    //   totalFledges: 0,
    //   totalChicks: 0,
    //   timeValue: 'a',
    //   timeMeridiem: 'PM',
    // });
    onOpen();
  };

  const addRow = formData => {
    setData([...data, formData]);
  };

  const createBirdInfo = row => {
    const birdInfo = [
      ['Time', row.time + row.meridiem],
      ['Map #', row.map],
      [
        'GPS',
        row.gps.map(gps => (
          <div key={gps.latitude + gps.longitude}>
            {gps.latitude || 'n/a'}, {gps.longitude || 'n/a'}
          </div>
        )),
      ],
      ['Cross Street/Towers', row.crossStreet || 'None'],
      ['Habitat Description', row.habitat || 'None'],
      [
        <div>
          <div># of Male Adults</div>
          <div># of Male Fledges</div>
          <div># of Male Chicks</div>
        </div>,
        <div>
          {row.sex.slice(0, 3).map(sex => (
            <div>{sex}</div>
          ))}
        </div>,
      ],
      [
        <div>
          <div># of Female Adults</div>
          <div># of Female Fledges</div>
          <div># of Female Chicks</div>
        </div>,
        <div>
          {row.sex.slice(3, 6).map(sex => (
            <div>{sex}</div>
          ))}
        </div>,
      ],
      ['Nest & Eggs', row.nesting.map(nest => nest.value).join(', ') || 'None'],
      ['Behaviors Observed', row.behaviors.map(nest => nest.value).join(', ') || 'None'],
    ];
    return birdInfo.map(([title, content]) => (
      <Tr key={title + content}>
        <Td border="0" paddingBottom="0" paddingTop="0">
          <Text fontWeight="500">{title}</Text>
        </Td>
        <Td border="0" isNumeric>
          {content}
        </Td>
      </Tr>
    ));
  };

  return (
    <Container maxW="100vw">
      <Text fontWeight="600" fontSize="2xl">
        {speciesName}s
      </Text>
      <Grid marginTop="20px" minH="200px" templateColumns="repeat(6, 1fr)" gap="150">
        <GridItem colSpan="3">
          <Box overflow="hidden" border="1px solid darkgray" rounded="md">
            <Accordion as={Table} allowToggle width="100%" reduceMotion>
              <Thead bg="ochGrey">
                <tr>
                  <Th width="0" />
                  <Th color="#FDFDFD">Map #</Th>
                  <Th color="#FDFDFD">Adults</Th>
                  <Th color="#FDFDFD">Fledges</Th>
                  <Th color="#FDFDFD">Chicks</Th>
                  <Th width="0" />
                </tr>
              </Thead>
              {data.length === 0 && (
                <Tbody>
                  <Tr>
                    <Td colSpan={6} textAlign="center">
                      No birds added yet
                    </Td>
                  </Tr>
                </Tbody>
              )}
              {data.map((row, n) => (
                // eslint-disable-next-line react/no-array-index-key
                <AccordionItem key={row.id} as={Tbody}>
                  {({ isExpanded }) => (
                    <>
                      <Tr>
                        <Td width="0" borderBottomWidth="0">
                          <IconButton icon={<Icon as={FiEdit3} w="1.5em" h="1.5em" />} />
                        </Td>
                        <Td borderBottomWidth="0">{n + 1}</Td>
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
                              <Tbody>{createBirdInfo(row)}</Tbody>
                            </Table>
                          </Collapse>
                        </Td>
                      </Tr>
                    </>
                  )}
                </AccordionItem>
              ))}
              <Tfoot bg="ochGrey">
                <tr>
                  <Th borderBottom="0" color="#FDFDFD">
                    Total
                  </Th>
                  <Th borderBottom="0" />
                  <Th borderBottom="0" color="#FDFDFD">
                    {totals[0]}
                  </Th>
                  <Th borderBottom="0" color="#FDFDFD">
                    {totals[1]}
                  </Th>
                  <Th borderBottom="0" color="#FDFDFD">
                    {totals[2]}
                  </Th>
                  <Th width="0" />
                </tr>
              </Tfoot>
            </Accordion>
          </Box>
          <Button onClick={openModal} width="100%" marginTop="10px" colorScheme="cyan">
            Add Sighted {speciesCode} +
          </Button>
          <Modal size="full" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent margin={0} rounded="none">
              <ListedSpeciesPopup closeModal={onClose} adultName={speciesName} addRow={addRow} />
            </ModalContent>
          </Modal>
        </GridItem>
        <GridItem colSpan="2">
          <VStack alignItems="start">
            <Text fontWeight="600" fontSize="xl">
              Injured {speciesName}s
            </Text>
            <Text>To report a sick or injured bird, contact the WWCC at 714.374.5587</Text>
            <FormControl>
              <NumberInput
                ref={register(`${formPrefix}injuredCount`)}
                onChange={val => setValue(`${formPrefix}injuredCount`, val)}
                defaultValue={0}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            {/* <Text fontWeight="600" fontSize="xl">
              Marked Map (PNG or JPEG Only)
            </Text>
            <Text>
              Provide a map with the locations of sighted Western Snowy Plovers marked with Map #
              according to the Tracker table.
            </Text> */}
          </VStack>
        </GridItem>
      </Grid>
    </Container>
  );
};

ListedSpeciesTab.propTypes = {
  tab: PropTypes.number.isRequired,
  speciesName: PropTypes.string.isRequired,
  speciesCode: PropTypes.string.isRequired,
};

export default ListedSpeciesTab;
