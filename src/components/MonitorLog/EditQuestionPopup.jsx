import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

import { OCHBackend } from '../../common/utils';

const NewQuestionModal = ({ currentTemplate }) => {
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [tooltip, setTooltip] = useState();
  const addQuestionModal = useDisclosure();

  /*
  const handleSubmit = async () => {
    try {
      await NPOBackend.post('/forms/create/field', {
        formType: 
      });
    } catch (err) {
      // HANDLE ERROR HERE
    }
  };
  */
  const addQuestion = async () => {
    await OCHBackend.post('/forms/create/field', {
      formType: currentTemplate,
      fieldBody: {
        title,
        fieldType: type,
        tooltip,
      },
    });
    addQuestionModal.onClose();
  };
  return (
    <>
      {/* <Button
        bgColor="ochOrange"
        // type="submit"
        onClick={addQuestionModal.onOpen}
      >
        + Add Question
      </Button> */}

      {/* <Modal
        w="460px"
        h="512px"
        bgColor="rgba(253, 253, 253, 1)"
        px="15px"
        py="10px"
        isOpen={addQuestionModal.isOpen}
        onClose={addQuestionModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          
          <ModalCloseButton />
          <ModalBody> */}
      <Box w="460px" h="562px" border="1px solid black">
        <Heading>Add Question</Heading>
        <FormControl>
          <FormControl>
            <FormLabel htmlFor="title" ml="20px">
              Question Title
            </FormLabel>
            <Input
              id="title"
              type="text"
              value={title}
              placeholder="Question Title"
              onChange={({ target }) => setTitle(target.value)}
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
              onChange={e => setType(e)}
              value={type}
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
                value={tooltip}
                onChange={({ target }) => setTooltip(target.value)}
                placeholder="Type here..."
                w="412px"
                h="128px"
                mb="60px"
                ml="20px"
              />
              <VStack>
                <Button w="412px" h="40px" bgColor="ochBlue">
                  Save Changes
                </Button>
                <Button
                  w="412px"
                  h="40px"
                  bgColor="white"
                  border="1px solid #C53030"
                  color="#C53030"
                >
                  Delete Question
                </Button>
              </VStack>
            </FormControl>
          </FormControl>
        </FormControl>
      </Box>
      {/* </ModalBody>
          <ModalFooter>
            <Button type="submit" bgColor="ochBlue" w="412px" h="40px" onClick={addQuestion}>
              Add Question
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
};

NewQuestionModal.defaultProps = {
  currentTemplate: '',
};
NewQuestionModal.propTypes = {
  currentTemplate: PropTypes.string,
};
export default NewQuestionModal;
