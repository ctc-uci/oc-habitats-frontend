/* eslint-disable react/jsx-key */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Button,
  Center,
  Collapse,
  FormControl,
  Grid,
  GridItem,
  HStack,
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
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
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
import { useFormContext, useForm } from 'react-hook-form';
import { FiEdit3, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ListedSpeciesPopup from '../ListedSpecies/ListedSpeciesPopup';
import GeneralListedInformation from '../ListedSpecies/GeneralListedInformation';
import Location from '../ListedSpecies/Location';
import SexSection from '../ListedSpecies/SexSection';
import BandingSection from '../ListedSpecies/BandingSection';
import BehaviorsSection from '../ListedSpecies/BehaviorsSection';
import options from '../ListedSpecies/DropdownOptions';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import NewQuestionModal from '../NewQuestionModal';
import { OCHBackend } from '../../common/utils';

const ListedSpeciesTab = ({
  tab,
  speciesName,
  speciesCode,
  speciesId,
  showHeader,
  isDisabled,
  isTemplate,
}) => {
  const formPrefix = `listedSpecies.${tab}.`;

  const { isOpen, onOpen: openPopup, onClose } = useDisclosure();
  const { setValue, getValues } = useFormContext();
  const confirmDeleteModal = useDisclosure();
  const [data, setData] = useState(getValues(`${formPrefix}entries`) || []);
  const [rowToEdit, setRowToEdit] = useState(undefined);
  const [rowToDelete, setRowToDelete] = useState(undefined);
  const [totals, setTotals] = useState([0, 0, 0]);
  const [listedSpeciesList, setListedSpeciesList] = useState([]);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [questionAdded, setQuestionAdded] = useState(false);
  const [tabEdited, setTabEdited] = useState(false);

  const toast = useToast();

  const formMethods = useForm({
    defaultValues: {
      totalAdults: 1,
      totalFledges: 0,
      totalChicks: 0,
      time: '07:00',
      meridiem: 'AM',
      map: '1',
      habitat: '',
      sex: [0, 0, 0, 0, 0, 0],
      nesting: [],
      behaviors: [],
      gps: [
        { longitude: '', latitude: '' },
        { longitude: '', latitude: '' },
        { longitude: '', latitude: '' },
        { longitude: '', latitude: '' },
      ],
      bandTabs: [],
    },
  });

  const toggleTabEdited = () => {
    setTabEdited(!tabEdited);
  };

  const toggleQuestionAdded = () => {
    setQuestionAdded(!questionAdded);
  };

  useEffect(async () => {
    const newQuestions = await OCHBackend.get(`/forms/listed-species`);
    const questions = await newQuestions.data;
    setAdditionalQuestions(questions.additionalFields);

    setTotals(
      data
        .map(row => [row.totalAdults, row.totalFledges, row.totalChicks])
        .reduce((l, r) => [l[0] + r[0], l[1] + r[1], l[2] + r[2]], [0, 0, 0]),
    );
    setValue(`${formPrefix}data`, data);

    // querying listed species from backend and wrangling with the data
    const species = await OCHBackend.get('/species/');
    const speciesData = await species.data;
    const filteredSpeciesData = speciesData.filter(el => el.isListed);
    const mappedSpecies = filteredSpeciesData.map(el => `${el.name} (${el.code})`);
    setListedSpeciesList(mappedSpecies);
  }, [data, questionAdded, tabEdited]);

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
      ['Time', row.time],
      ['Map #', row.map],
      [
        'GPS',
        row.gps.map((gps, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={idx}>
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
          {row.sex.slice(0, 3).map((sex, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx}>{sex}</div>
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
      ['Bands Observed', row.bandTabs.map(bandTab => bandTab.code).join(', ') || 'None'],
      [('Nest & Eggs', row.nesting.map(nest => nest.value).join(', ') || 'None')],
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
    <>
      {isTemplate ? (
        <HStack>
          <Text fontWeight="600" fontSize="2xl" mt="30px" mb="5px">
            Listed Species
          </Text>
          <Spacer />
          <NewQuestionModal currentTemplate="listed-species" refreshTrigger={toggleQuestionAdded} />
        </HStack>
      ) : (
        // {showHeader && (
        <Text fontWeight="600" fontSize="2xl">
          {speciesName}s
        </Text>
        // )}
      )}
      {isTemplate && (
        <>
          {/* TODO: UPDATE SPECIES CATALOG LINK BEFORE HANDING OFF THE PROJECT */}
          <Text mt="30px" color="ochPurple" fontWeight="500">
            The following listed species are tracked in their own section of the monitor log.
          </Text>
          <HStack>
            <Text color="ochPurple" fontWeight="500">
              To view or edit the current catalogue of Listed Species,
            </Text>
            <Link to="/species">
              <Text color="#2B6CB0" fontWeight="500" maxW="100vw">
                Open Species Catalog
              </Text>
            </Link>
            <Link to="/species">
              <Text color="#2B6CB0" fontWeight="500" maxW="100vw">
                <FiExternalLink />
              </Text>
            </Link>
          </HStack>
          <HStack
            overflowX="scroll"
            mt="10px"
            bgColor="ochLightGrey"
            borderRadius="6px"
            pl="20px"
            w="100%"
            h="70px"
          >
            {listedSpeciesList.map(e => {
              return (
                <Center
                  w="375px"
                  h="40px"
                  bgColor="white"
                  mr="10px"
                  my="auto"
                  border="1px solid #CBD5E0"
                  borderRadius="6px"
                >
                  <Text>{e}</Text>
                </Center>
              );
            })}
          </HStack>
          <Text mt="35px" color="ochPurple" fontWeight="500">
            In the &quot;General Information&quot; portion, &quot;Non-Static&quot; questions can be
            added, edited, and/or deleted.
          </Text>
          <Text mb="25px" color="ochPurple" fontWeight="500">
            &quot;Static&quot; questions can&apos;t be deleted or edited. You can only Add, Edit, or
            Remove Tooltips for &quot;Static&quot; questions.
          </Text>
          <Text fontWeight="600" fontSize="2xl" mt="30px" mb="5px">
            Aggregated [Listed Species] Data
          </Text>
          <Text fontWeight="600" fontSize="xl" mt="30px">
            [Listed Species] Tracker
          </Text>
        </>
      )}

      <Stack
        mt="20px"
        minH="200px"
        direction={{ lg: 'row', base: 'column' }}
        spacing={{ lg: '100px', base: '30px' }}
      >
        <VStack w={{ lg: '650px', base: '100%' }} align="start">
          <Box
            w="100%"
            border="1px solid darkgray"
            rounded="md"
            overflow="scroll"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <Accordion as={Table} allowToggle width="100%" reduceMotion>
              <Thead bg="ochGrey">
                <Tr>
                  <Th width="0" />
                  <Th textAlign="center" color="#FDFDFD">
                    Map #
                  </Th>
                  <Th textAlign="center" color="#FDFDFD">
                    Adults
                  </Th>
                  <Th textAlign="center" color="#FDFDFD">
                    Fledges
                  </Th>
                  <Th textAlign="center" color="#FDFDFD">
                    Chicks
                  </Th>
                  <Th width="0" />
                </Tr>
              </Thead>
              {data.length === 0 && (
                <Tbody>
                  <Tr>
                    <Td colSpan={6} textAlign="center">
                      No birds added
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
                          {!isDisabled && (
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
                          )}
                        </Td>
                        <Td textAlign="center" borderBottomWidth="0">
                          {n + 1}
                        </Td>
                        <Td textAlign="center" borderBottomWidth="0">
                          {row.totalAdults}
                        </Td>
                        <Td textAlign="center" borderBottomWidth="0">
                          {row.totalFledges}
                        </Td>
                        <Td textAlign="center" borderBottomWidth="0">
                          {row.totalChicks}
                        </Td>
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
                  <Th textAlign="center" borderBottom="0" color="#FDFDFD">
                    {totals[0]}
                  </Th>
                  <Th textAlign="center" borderBottom="0" color="#FDFDFD">
                    {totals[1]}
                  </Th>
                  <Th textAlign="center" borderBottom="0" color="#FDFDFD">
                    {totals[2]}
                  </Th>
                  <Th width="0" />
                </tr>
              </Tfoot>
            </Accordion>
          </Box>
          {!isDisabled && (
            <>
              <Button
                disabled={isTemplate}
                onClick={openPopup}
                width="100%"
                marginTop="10px"
                colorScheme="cyan"
              >
                {isTemplate ? 'Add New Row +' : `Add Sighted ${speciesCode} +`}
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
            </>
          )}
        </VStack>
        <VStack alignItems="start" maxW="768px">
          <VStack alignItems="start">
            {isTemplate ? (
              <Text fontWeight="600" fontSize="xl">
                Injured [Listed Species]
              </Text>
            ) : (
              <Text fontWeight="600" fontSize="xl">
                Injured {speciesName}s
              </Text>
            )}

            <Text>To report a sick or injured bird, contact the WWCC at 714.374.5587</Text>
            <FormControl>
              <NumberInput
                isDisabled={isDisabled}
                min={0}
                onChange={val => setValue(`${formPrefix}injuredCount`, parseInt(val, 10))}
                defaultValue={getValues(`${formPrefix}injuredCount`) || 0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </VStack>
        </VStack>
      </Stack>
      {isTemplate && (
        <>
          <Text mt="120px" mb="30px" fontWeight="500">
            The questions below are shown when a new row is added to the monitor log species
            tracker.
          </Text>
          <VStack align="start" spacing="4em">
            <GeneralListedInformation
              refreshTrigger={toggleTabEdited}
              additionalQuestions={additionalQuestions}
              isTemplate
            />
            <Location isTemplate />
            <SexSection isTemplate />
            <BehaviorsSection
              behaviorOptions={options.behavior}
              nestingOptions={options.nesting}
              isTemplate
            />
            <BandingSection />
            <CollapsibleSection title="Additional Notes (Optional)">
              <Textarea
                h="10em"
                placeholder="Type Here..."
                {...formMethods.register('additionalNotes')}
              />
            </CollapsibleSection>
          </VStack>
        </>
      )}
    </>
  );
};

ListedSpeciesTab.defaultProps = {
  showHeader: true,
  isDisabled: false,
  isTemplate: false,
};

ListedSpeciesTab.propTypes = {
  tab: PropTypes.number.isRequired,
  speciesName: PropTypes.string.isRequired,
  speciesCode: PropTypes.string.isRequired,
  speciesId: PropTypes.string.isRequired,
  showHeader: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isTemplate: PropTypes.bool,
};

export default ListedSpeciesTab;
