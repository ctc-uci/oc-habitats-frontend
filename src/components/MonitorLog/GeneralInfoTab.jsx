/* eslint-disable no-underscore-dangle */
import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Spacer,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Select as ReactSelect } from 'chakra-react-select';
import PropTypes from 'prop-types';
import { React, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';
import './GeneralInfoTab.css';
import { OCHBackend } from '../../common/utils';

function GeneralInfoTab({ assignedSegments, monitorPartners, isDisabled, showHeader, isTemplate }) {
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  // commented for prettier
  // const [isLoading, setIsLoading] = useState(true);
  const { control, register } = useFormContext();
  const editQuestionModal = useDisclosure();

  // states for editQuestion modal
  const [newTitle, setNewTitle] = useState();
  const [newFieldType, setNewFieldType] = useState();
  const [newTooltip, setNewTooltip] = useState();
  // const [fieldToEdit, setFieldToEdit] = useState();
  const [idOfFieldBeingEdited, setIdOfFieldBeingEdited] = useState();

  const updateQuestion = async () => {
    await OCHBackend.put('/forms/update/field', {
      type: newFieldType,
      fieldId: idOfFieldBeingEdited,
      fieldBody: {
        title: newTitle,
        fieldType: newFieldType,
        tooltip: newTooltip,
      },
    });
    editQuestionModal.onClose();
  };

  const deleteQuestion = async () => {
    await OCHBackend.delete('/forms/delete/field', {
      formType: 'general',
      fieldId: idOfFieldBeingEdited,
    });
    editQuestionModal.onClose();
  };

  useEffect(async () => {
    const newQuestions = await OCHBackend.get(`/forms/general`);
    const questions = await newQuestions.data;
    // for prettier
    // console.log(newQuestions);

    setAdditionalQuestions(questions.additionalFields);
    // prettier
    // setIsLoading(false);
  }, []);

  const partnerSelectOptions = monitorPartners.map(user => ({
    ...user,
    value: user.firebaseId,
    label: `${user.firstName} ${user.lastName} (${user.email})`,
  }));

  return (
    <div>
      {isTemplate && (
        <>
          <Text mt="30px" color="ochPurple" fontWeight="500">
            &quot;Static&quot; questions cannot be edited.
          </Text>
          <Text mb="20px" color="ochPurple" fontWeight="500">
            &quot;Non-Static&quot; questions can be added, edited, and/or deleted.
          </Text>
        </>
      )}
      {showHeader && (
        <Text mb="20px" fontWeight="600" fontSize="2xl">
          General Information
        </Text>
      )}
      <VStack spacing="23px" align="left">
        <SimpleGrid columns={4} rows={3} spacingX="64px" spacingY="68px">
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Survey Segment
              </Text>
              <Select disabled={isDisabled} {...register('segment')}>
                {assignedSegments.map(segment => (
                  <option value={segment.segmentId} key={segment.segmentId}>
                    {segment.segmentId} - {segment.name}
                  </option>
                ))}
              </Select>
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Date (MM/DD/YYYY)
              </Text>
              <Controller
                control={control}
                name="surveyDate"
                render={({ field }) => (
                  <DatePicker
                    disabled={isDisabled}
                    onChange={field.onChange}
                    selected={field.value}
                  />
                )}
              />
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Survey Start Time
              </Text>
              <Input disabled={isDisabled} type="time" {...register('startTime')} />
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Survey End Time
              </Text>
              <Input disabled={isDisabled} type="time" {...register('endTime')} />
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Temperature (F)
              </Text>
              <Input disabled={isDisabled} {...register('temperature')} />
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Cloud Cover (%)
              </Text>
              <Select disabled={isDisabled} {...register('cloudCover')}>
                <option value="0">0</option>
                <option value="33">33</option>
                <option value="66">66</option>
                <option value="100">100</option>
              </Select>
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Precipitation
              </Text>
              <Select disabled={isDisabled} {...register('precipitation')}>
                <option value="none">None</option>
                <option value="fog">Fog</option>
                <option value="drizzle">Drizzle</option>
                <option value="rain">Rain</option>
              </Select>
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Wind Speed/Direction
              </Text>
              <SimpleGrid columns={2} spacing="12px">
                <GridItem>
                  <Input disabled={isDisabled} {...register('windSpeed')} />
                </GridItem>
                <GridItem>
                  <Select disabled={isDisabled} {...register('windDirection')}>
                    <option value="N">N</option>
                    <option value="NE">NE</option>
                    <option value="NW">NW</option>
                    <option value="S">S</option>
                    <option value="SE">SE</option>
                    <option value="SW">SW</option>
                    <option value="E">E</option>
                    <option value="W">W</option>
                  </Select>
                </GridItem>
              </SimpleGrid>
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Tides (ft)
              </Text>
              <Input disabled={isDisabled} placeholder="00.00" {...register('tides')} />
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Flex align="center">
                <Text fontWeight="500" fontSize="md">
                  Overall Habitat Type
                </Text>
                <Spacer />
                <Tooltip
                  label="Habitat Type: (Sandy beach, Dunes, Vegetation-Native, Vegetation-Non-Native, Groomed, Stone/cobble, Rocky/outcroppings)"
                  placement="top"
                >
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <Select disabled={isDisabled} {...register('habitatType')}>
                <option value="sandy beach">Sandy beach</option>
                <option value="dunes">Dunes</option>
                <option value="vegetation-native">Vegetation-Native</option>
                <option value="vegetation-non-native">Vegetation-Non-Native</option>
                <option value="groomed">Groomed</option>
                <option value="stone/cobble">Stone/cobble</option>
                <option value="rocky/outcroppings">Rocky/outcroppings</option>
              </Select>
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <VStack spacing="8px" align="left">
              <Text fontWeight="500" fontSize="md">
                Habitat Width (ft)
              </Text>
              <Select disabled={isDisabled} {...register('habitatWidth')}>
                <option value="0=10">0-10</option>
                <option value="10-50">10-50</option>
                <option value="50-100">50-100</option>
                <option value="100-300">100-300</option>
                <option value="300+">300+</option>
              </Select>
              {isTemplate && <Text color="#718096">Static</Text>}
            </VStack>
          </GridItem>
          {additionalQuestions.map(question => {
            return (
              <Box
                w="255px"
                h="133px"
                borderRadius="6px"
                key={question.title}
                _hover={{ bgColor: 'rgba(43, 192, 227, 0.25)' }}
                onClick={() => {
                  editQuestionModal.onOpen();
                  setNewTitle(question.title);
                  setNewFieldType(question.fieldType);
                  setNewTooltip(question.tooltip);
                  setIdOfFieldBeingEdited(question._id);
                }}
                px="10px"
                py="10px"
              >
                <GridItem key={question.title} colSpan={1} rowSpan={1}>
                  <VStack spacing="8px" align="left">
                    <Text fontWeight="500" fontSize="md">
                      {question.title}
                    </Text>
                    {question.fieldType === 'TEXT' ? (
                      <Input type="text" />
                    ) : (
                      <NumberInput allowMouseWheel>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                    {isTemplate && <Text color="#718096">Non-Static</Text>}
                  </VStack>
                </GridItem>
              </Box>
            );
          })}
        </SimpleGrid>

        <VStack spacing="8px" align="left" maxW="600px">
          <Text fontWeight="500" fontSize="md">
            Monitoring Session Partners
          </Text>
          <Text>
            If you completed this monitoring session as a group, only one member should submit this
            form.
            {/* Added Partners will be notified when this monitor log is submitted for review. */}
          </Text>
          <Controller
            name="partners"
            control={control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                isDisabled={isDisabled}
                isMulti
                options={partnerSelectOptions}
                placeholder="Search for member by name or email..."
                closeMenuOnSelect={false}
                size="md"
                menuPosition="fixed"
              />
            )}
          />
        </VStack>
      </VStack>

      {/* EDIT QUESTION MODAL STARTS HERE */}
      <Modal
        w="460px"
        h="562px"
        bgColor="rgba(253, 253, 253, 1)"
        px="15px"
        py="10px"
        isOpen={editQuestionModal.isOpen}
        onClose={editQuestionModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormControl>
                <FormControl>
                  <FormLabel htmlFor="title" ml="20px">
                    Question Title
                  </FormLabel>
                  <Input
                    id="title"
                    type="text"
                    value={newTitle}
                    placeholder="Question Title"
                    onChange={({ target }) => setNewTitle(target.value)}
                    w="412px"
                    mb="20px"
                    ml="20px"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="type" ml="20px">
                    Question Type
                  </FormLabel>
                  <RadioGroup
                    id="type"
                    onChange={e => setNewFieldType(e)}
                    value={newFieldType}
                    maxW="700px"
                    defaultValue="TEXT"
                    ml="20px"
                  >
                    <HStack spacing="2px" mb="10px">
                      <Radio value="TEXT" mr="10px">
                        Text Input
                      </Radio>
                      <Radio value="NUMBER">Number Input</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormControl>
                    <FormLabel ml="20px">Tooltip (Optional)</FormLabel>
                    <Textarea
                      value={newTooltip}
                      onChange={({ target }) => setNewTooltip(target.value)}
                      placeholder="Type here..."
                      w="412px"
                      h="128px"
                      mb="60px"
                      ml="20px"
                    />
                    <VStack>
                      <Button w="412px" h="40px" bgColor="ochBlue" onClick={updateQuestion}>
                        Save Changes
                      </Button>
                      <Button
                        w="412px"
                        h="40px"
                        bgColor="white"
                        border="1px solid #C53030"
                        color="#C53030"
                        onClick={deleteQuestion}
                      >
                        Delete Question
                      </Button>
                    </VStack>
                  </FormControl>
                </FormControl>
              </FormControl>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

GeneralInfoTab.defaultProps = {
  isDisabled: false,
  showHeader: true,
  assignedSegments: [],
  monitorPartners: [],
  isTemplate: false,
};

GeneralInfoTab.propTypes = {
  assignedSegments: PropTypes.arrayOf(
    PropTypes.shape({
      segmentId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  monitorPartners: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      firebaseId: PropTypes.string.isRequired,
    }),
  ),
  isDisabled: PropTypes.bool,
  showHeader: PropTypes.bool,
  isTemplate: PropTypes.bool,
};

export default GeneralInfoTab;
