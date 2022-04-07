/* eslint-disable react/jsx-key */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Button,
  Collapse,
  Container,
  FormControl,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiEdit3 } from 'react-icons/fi';
import ListedSpeciesPopup from '../ListedSpecies/ListedSpeciesPopup';

const ListedSpeciesTab = ({ tab, speciesName, speciesCode }) => {
  const { isOpen, onOpen: openPopup, onClose } = useDisclosure();
  const confirmDeleteModal = useDisclosure();
  const [data, setData] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(undefined);
  const [rowToDelete, setRowToDelete] = useState(undefined);
  const [totals, setTotals] = useState([0, 0, 0]);
  const { setValue } = useFormContext();
  const toast = useToast();
  const formPrefix = `listedSpecies.${tab}.`;

  useEffect(() => {
    setTotals(
      data
        .map(row => [row.totalAdults, row.totalFledges, row.totalChicks])
        .reduce((l, r) => [l[0] + r[0], l[1] + r[1], l[2] + r[2]], [0, 0, 0]),
    );
  }, [data]);

  const addRow = formData => {
    if (formData.editing !== undefined) {
      setData(update(data, { [formData.editing]: { $set: formData } }));
      toast({
        title: `Successfully edited Map #${formData.map} on ${speciesName} Tracker`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setRowToEdit(undefined);
    } else {
      setData([...data, formData]);
      toast({
        title: `Successfully added Map #${formData.map} to ${speciesName} Tracker`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const editRow = (row, idx) => {
    setRowToEdit({ ...row, editing: idx, map: idx + 1 });
    openPopup();
  };

  const deleteRow = idx => {
    setData(update(data, { $splice: [[idx, 1]] }));
  };

  const showConfirmDeleteModal = idx => {
    setRowToDelete(idx);
    confirmDeleteModal.onOpen();
  };

  const hideConfirmDeleteModal = remove => {
    if (remove) {
      deleteRow(rowToDelete);
    }
    setRowToDelete(undefined);
    confirmDeleteModal.onClose();
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
      <Tr key={title}>
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
              <Modal
                isOpen={confirmDeleteModal.isOpen}
                closeOnEsc={false}
                onClose={() => hideConfirmDeleteModal(false)}
              >
                <ModalOverlay />
                <ModalContent rounded="none">
                  <ModalHeader>Delete Sighted Species</ModalHeader>
                  <ModalBody>
                    Are you sure you want to{' '}
                    <Text as="span" color="red">
                      delete
                    </Text>{' '}
                    <Text as="span" fontWeight="bold">
                      {speciesName} #{rowToDelete + 1}
                    </Text>
                    ? This action cannot be undone.
                  </ModalBody>

                  <ModalFooter>
                    <Button mr="3" onClick={() => hideConfirmDeleteModal(false)}>
                      Cancel
                    </Button>
                    <Button colorScheme="red" onClick={() => hideConfirmDeleteModal(true)}>
                      Delete
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {data.map((row, n) => (
                // eslint-disable-next-line react/no-array-index-key
                <AccordionItem key={row.id} as={Tbody}>
                  {({ isExpanded }) => (
                    <>
                      <Tr>
                        <Td width="0" borderBottomWidth="0">
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<Icon as={FiEdit3} w="1.5em" h="1.5em" />}
                            />
                            <MenuList>
                              <MenuItem onClick={() => editRow(row, n)}>
                                Edit Sighted {speciesCode} #{n + 1}
                              </MenuItem>
                              <MenuItem color="red" onClick={() => showConfirmDeleteModal(n)}>
                                Delete Sighted {speciesCode} #{n + 1}
                              </MenuItem>
                            </MenuList>
                          </Menu>
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
                              <Tbody>{createBirdInfo({ ...row, map: n + 1 })}</Tbody>
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
          <Button onClick={openPopup} width="100%" marginTop="10px" colorScheme="cyan">
            Add Sighted {speciesCode} +
          </Button>
          <Modal size="full" isOpen={isOpen} closeOnEsc={false}>
            <ModalOverlay />
            <ModalContent margin={0} rounded="none">
              <ListedSpeciesPopup
                closeModal={onClose}
                adultName={speciesName}
                addRow={addRow}
                prefilledData={rowToEdit}
              />
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
                min={0}
                onChange={val => setValue(`${formPrefix}injuredCount`, parseInt(val, 10))}
                defaultValue={0}
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
