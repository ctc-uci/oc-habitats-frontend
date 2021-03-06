import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

import { OCHBackend } from '../common/utils';

const NewQuestionModal = ({ currentTemplate, refreshTrigger }) => {
  const [title, setTitle] = useState();
  const [titleLength, setTitleLength] = useState(0);
  const [type, setType] = useState('TEXT');
  const [tooltip, setTooltip] = useState();
  const addQuestionModal = useDisclosure();

  const addQuestion = async () => {
    await OCHBackend.post(
      '/forms/create/field',
      {
        formType: currentTemplate,
        fieldBody: {
          title,
          subtitle: 'temporary subtitle',
          fieldType: type,
          static: false,
          tooltip,
        },
      },
      { withCredentials: true },
    );
    refreshTrigger(true);
    addQuestionModal.onClose();
  };
  return (
    <>
      <Button bgColor="ochOrange" onClick={addQuestionModal.onOpen}>
        + Add Question
      </Button>

      <Modal
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
          <ModalHeader>Add Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormControl>
                <FormControl>
                  <FormLabel htmlFor="title">Question Title</FormLabel>
                  <Input
                    maxLength={40}
                    id="title"
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={({ target }) => {
                      setTitle(target.value);
                      setTitleLength(target.value.length);
                    }}
                    w="412px"
                    mb="20px"
                  />
                </FormControl>
                <Text ml="360px" fontSize="12px" color="gray">
                  {titleLength}/40
                </Text>
                <FormControl>
                  <FormLabel htmlFor="type">Question Type</FormLabel>
                  <RadioGroup id="type" onChange={e => setType(e)} value={type} maxW="700px">
                    <HStack spacing="2px" mb="10px">
                      <Radio value="TEXT" mr="10px">
                        Text Input
                      </Radio>
                      <Radio value="NUMBER">Number Input</Radio>
                    </HStack>
                  </RadioGroup>
                  <FormControl>
                    <FormLabel>Tooltip (optional)</FormLabel>
                    <Textarea
                      value={tooltip}
                      onChange={({ target }) => setTooltip(target.value)}
                      placeholder="Type here..."
                      w="412px"
                      h="128px"
                      mb="20px"
                    />
                  </FormControl>
                </FormControl>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              disabled={!title}
              bgColor="ochBlue"
              w="412px"
              h="40px"
              onClick={addQuestion}
            >
              Add Question
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

NewQuestionModal.defaultProps = {
  currentTemplate: '',
};
NewQuestionModal.propTypes = {
  currentTemplate: PropTypes.string,
  refreshTrigger: PropTypes.func.isRequired,
};
export default NewQuestionModal;
