/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
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
import { FiArrowLeft } from 'react-icons/fi';
import { OCHBackend } from '../../common/utils';

function NonStaticQuestion({ question }) {
  const [newTitle, setNewTitle] = useState();
  const [newFieldType, setNewFieldType] = useState();
  const [newTooltip, setNewTooltip] = useState();
  const [idOfFieldBeingEdited, setIdOfFieldBeingEdited] = useState();
  const editQuestionModal = useDisclosure();
  const deleteQuestionModal = useDisclosure();

  const updateQuestion = async () => {
    console.log(`updateQuestion called with fieldId: ${idOfFieldBeingEdited}`);
    console.log(`fieldBody: ${newTitle}, ${newFieldType}, ${newTooltip}`);
    await OCHBackend.put('/forms/update/field', {
      type: 'general',
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

  return (
    <>
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
          console.log(`idOfFieldBeingEdited: ${idOfFieldBeingEdited}`);
          // console.log(additionalQuestions);
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
            <Text color="#718096">Non-Static</Text>
          </VStack>
        </GridItem>
      </Box>
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
                        onClick={() => {
                          editQuestionModal.onClose();
                          deleteQuestionModal.onOpen();
                        }}
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

      {/* DELETE QUESTION MODAL STARTS HERE */}
      <Modal isOpen={deleteQuestionModal.isOpen} onClose={deleteQuestionModal.onClose}>
        <ModalOverlay />
        <ModalContent h="378px">
          <ModalHeader pl="5px" pb="0px">
            <Button
              bgColor="white"
              onClick={() => {
                deleteQuestionModal.onClose();
                editQuestionModal.onOpen();
              }}
            >
              <FiArrowLeft size="24px" />
            </Button>
          </ModalHeader>
          <ModalBody>
            <Box bgColor="rgba(253, 253, 253, 1)">
              <Heading size="md" mb="50px">
                Delete Question
              </Heading>
              <Text mt="40px">
                Are you sure you want to delete {question.title}? This action cannot be undone.
              </Text>
              <Button
                mt="70px"
                mb="10px"
                type="submit"
                bgColor="ochRed"
                color="white"
                w="100%"
                h="40px"
                onClick={deleteQuestion}
              >
                Yes, Delete
              </Button>
              <Button
                type="submit"
                w="100%"
                h="40px"
                onClick={() => {
                  deleteQuestionModal.onClose();
                  editQuestionModal.onOpen();
                }}
              >
                Cancel
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

NonStaticQuestion.propTypes = {
  question: PropTypes.object.isRequired,
};

export default NonStaticQuestion;
