import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { React, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import CollapsibleSection from '../CollapsibleSection/CollapsibleSection';
import options from './DropdownOptions';
import footNotes from './FootNotes';
import { OCHBackend } from '../../common/utils';

// component/section name not final
const GeneralListedInformation = ({ isTemplate, additionalQuestions }) => {
  const { register, setValue, getValues } = useFormContext();
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
      formType: 'listed-species',
      fieldId: idOfFieldBeingEdited,
    });
    editQuestionModal.onClose();
  };

  const createOptions = () => {
    return options.habitat.map(option => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });
  };

  return (
    <>
      <CollapsibleSection title="General Information">
        <Stack direction={['column', 'row']} w="100%" spacing="2em">
          <FormControl>
            <FormLabel>
              # of Adults
              <NumberInput
                min={1}
                defaultValue={getValues().totalAdults}
                onChange={val => setValue('totalAdults', parseInt(val, 10), { shouldDirty: true })}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex justify="space-between" align="center">
                # of Fledges
                <Tooltip label={footNotes.fledge} fontSize="md">
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <NumberInput
                min={0}
                onChange={val => setValue('totalFledges', parseInt(val, 10), { shouldDirty: true })}
                defaultValue={getValues().totalFledges}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>

          <FormControl>
            <FormLabel>
              # of Chicks
              <NumberInput
                min={0}
                onChange={val => setValue('totalChicks', parseInt(val, 10), { shouldDirty: true })}
                defaultValue={getValues().totalChicks}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>
        </Stack>

        <br />

        <Stack direction={['column', 'row']} w="100%" spacing="2em">
          <FormControl>
            <FormLabel>
              Time
              <InputGroup>
                <Input type="time" {...register('time')} />
              </InputGroup>
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>

          <FormControl>
            <FormLabel>
              Map #
              <Input disabled placeholder="None" {...register('map')} />
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>
          <FormControl>
            <FormLabel>
              <Flex justify="space-between" align="center">
                Habitat Description
                <Tooltip label={footNotes.habitat} fontSize="md">
                  <InfoIcon />
                </Tooltip>
              </Flex>
              <Select placeholder="None" {...register('habitat')}>
                {createOptions()}
              </Select>
            </FormLabel>
            {isTemplate && <Text color="#718096">Static</Text>}
          </FormControl>
        </Stack>
        <SimpleGrid mt="30px" columns={3} spacing="2em">
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
                  // eslint-disable-next-line
                  setIdOfFieldBeingEdited(question._id);
                }}
                px="10px"
                py="10px"
              >
                <FormControl key={question.title}>
                  <FormLabel>{question.title}</FormLabel>
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
                </FormControl>
              </Box>
            );
          })}
        </SimpleGrid>
      </CollapsibleSection>
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
                  <FormLabel htmlFor="title">Question Title</FormLabel>
                  <Input
                    id="title"
                    type="text"
                    value={newTitle}
                    placeholder="Question Title"
                    onChange={({ target }) => setNewTitle(target.value)}
                    w="412px"
                    mb="20px"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="type">Question Type</FormLabel>
                  <RadioGroup
                    id="type"
                    onChange={e => setNewFieldType(e)}
                    value={newFieldType}
                    maxW="700px"
                    defaultValue="TEXT"
                  >
                    <HStack spacing="2px" mb="10px">
                      <Radio value="TEXT" mr="10px">
                        Text Input
                      </Radio>
                      <Radio value="NUMBER">Number Input</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormControl>
                    <FormLabel>Tooltip (Optional)</FormLabel>
                    <Textarea
                      value={newTooltip}
                      onChange={({ target }) => setNewTooltip(target.value)}
                      placeholder="Type here..."
                      w="412px"
                      h="128px"
                      mb="60px"
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
    </>
  );
};

GeneralListedInformation.defaultProps = {
  isTemplate: false,
  additionalQuestions: null,
};
GeneralListedInformation.propTypes = {
  isTemplate: PropTypes.bool,
  additionalQuestions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};

export default GeneralListedInformation;
