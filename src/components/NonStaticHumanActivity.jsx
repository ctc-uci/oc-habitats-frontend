/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
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
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { React, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FiArrowLeft } from 'react-icons/fi';
// import { InfoIcon } from '@chakra-ui/icons';
import { OCHBackend } from '../common/utils';

function NonStaticHumanActivity({ refreshTrigger, isTemplate, question }) {
  const [newCategory, setNewCategory] = useState();
  const [newCategoryLength, setNewCategoryLength] = useState(0);
  const [newExamples, setNewExamples] = useState();
  const [newExamplesLength, setNewExamplesLength] = useState(0);
  const [idOfFieldBeingEdited, setIdOfFieldBeingEdited] = useState();
  const editHumanActivityModal = useDisclosure();
  const deleteHumanActivityModal = useDisclosure();

  const updateHumanActivity = async () => {
    console.log(`updateHumanActivity called with fieldId: ${idOfFieldBeingEdited}`);
    console.log(`fieldBody: ${newCategory}, ${newExamples}`);
    await OCHBackend.put('/forms/update/field', {
      type: 'human-activity',
      fieldId: idOfFieldBeingEdited,
      fieldBody: {
        title: newCategory,
        subtitle: newExamples,
      },
    });
    refreshTrigger();
    editHumanActivityModal.onClose();
  };

  const deleteHumanActivity = async () => {
    console.log(`deleteHumanActivity called with fieldId ${idOfFieldBeingEdited}`);
    await OCHBackend.delete('/forms/delete/field', {
      data: {
        formType: 'human-activity',
        fieldId: idOfFieldBeingEdited,
      },
    });
    refreshTrigger();
    deleteHumanActivityModal.onClose();
  };

  return (
    <>
      <Box
        borderRadius="6px"
        key={question.title}
        _hover={isTemplate ? { bgColor: 'rgba(43, 192, 227, 0.25)' } : null}
        onClick={
          isTemplate
            ? () => {
                editHumanActivityModal.onOpen();
                setNewCategory(question.title);
                setNewCategoryLength(question.title.length);
                setNewExamples(question.subtitle);
                setNewExamplesLength(question.subtitle.length);
                setIdOfFieldBeingEdited(question._id);
                console.log(`idOfFieldBeingEdited: ${idOfFieldBeingEdited}`);
              }
            : null
        }
      >
        <GridItem py="10px" px="5px" key={question.title} colSpan={1} rowSpan={1}>
          <VStack spacing="8px" align="left">
            <Text fontWeight="500" fontSize="md">
              {question.title}
            </Text>
            <Text fontWeight="400" fontSize="md">
              {question.subtitle}
            </Text>
            <NumberInput w="350px" mt="8px" h="40px" allowMouseWheel>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {isTemplate ? <Text color="#718096">Non-Static</Text> : null}
          </VStack>
        </GridItem>
      </Box>

      {/* EDIT HUMAN ACTIVITY MODAL STARTS HERE */}
      <Modal
        w="460px"
        h="562px"
        bgColor="rgba(253, 253, 253, 1)"
        px="15px"
        py="10px"
        isOpen={editHumanActivityModal.isOpen}
        onClose={editHumanActivityModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Human Activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormControl>
                <FormControl>
                  <FormLabel htmlFor="category">Activity Category</FormLabel>
                  <Input
                    id="category"
                    type="text"
                    maxLength={50}
                    value={newCategory}
                    placeholder="Category Name"
                    onChange={({ target }) => {
                      setNewCategory(target.value);
                      setNewCategoryLength(target.value.length);
                    }}
                    w="412px"
                  />
                </FormControl>
                <Text ml="360px" fontSize="12px" color="gray">
                  {`${newCategoryLength}/50`}
                </Text>
                <FormControl>
                  <FormLabel htmlFor="examples">Activity Examples</FormLabel>
                  <Textarea
                    value={newExamples}
                    maxLength={60}
                    placeholder="Type here..."
                    w="412px"
                    h="64px"
                    onChange={({ target }) => {
                      setNewExamples(target.value);
                      setNewExamplesLength(target.value.length);
                    }}
                  />
                </FormControl>
                <Text ml="360px" fontSize="12px" color="gray">
                  {newExamplesLength}/60
                </Text>
                <VStack>
                  <Button
                    w="412px"
                    h="40px"
                    bgColor="ochBlue"
                    disabled={!newCategory || !newExamples}
                    onClick={updateHumanActivity}
                  >
                    Save Changes
                  </Button>
                  <Button
                    w="412px"
                    h="40px"
                    bgColor="white"
                    border="1px solid #C53030"
                    color="#C53030"
                    onClick={() => {
                      editHumanActivityModal.onClose();
                      deleteHumanActivityModal.onOpen();
                    }}
                  >
                    Delete Question
                  </Button>
                </VStack>
              </FormControl>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* DELETE HUMAN ACTIVITY MODAL STARTS HERE */}
      <Modal isOpen={deleteHumanActivityModal.isOpen} onClose={deleteHumanActivityModal.onClose}>
        <ModalOverlay />
        <ModalContent h="378px">
          <ModalHeader pl="5px" pb="0px">
            <Button
              bgColor="white"
              onClick={() => {
                deleteHumanActivityModal.onClose();
                editHumanActivityModal.onOpen();
              }}
            >
              <FiArrowLeft size="24px" />
            </Button>
          </ModalHeader>
          <ModalBody>
            <Box bgColor="rgba(253, 253, 253, 1)">
              <Heading size="md" mb="50px">
                Delete Human Activity
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
                onClick={deleteHumanActivity}
              >
                Yes, Delete
              </Button>
              <Button
                type="submit"
                w="100%"
                h="40px"
                onClick={() => {
                  deleteHumanActivityModal.onClose();
                  editHumanActivityModal.onOpen();
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

NonStaticHumanActivity.propTypes = {
  refreshTrigger: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  isTemplate: PropTypes.bool.isRequired,
};

export default NonStaticHumanActivity;
