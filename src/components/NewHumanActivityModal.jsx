import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
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

const NewHumanActivityModal = () => {
  const [category, setCategory] = useState();
  const [categoryLength, setCategoryLength] = useState(0);
  const [examples, setExamples] = useState();
  const [examplesLength, setExamplesLength] = useState(0);
  const addHumanActivityModal = useDisclosure();

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
  const addHumanActivity = async () => {
    await OCHBackend.post('/forms/create/field', {
      formType: 'human-activity',
      fieldBody: {
        title: category,
        subtitle: examples,
        static: false,
      },
    });
    addHumanActivityModal.onClose();
  };
  return (
    <>
      <Button
        bgColor="ochOrange"
        // type="submit"
        onClick={addHumanActivityModal.onOpen}
      >
        + Add Human Activity
      </Button>

      <Modal
        w="460px"
        h="512px"
        bgColor="rgba(253, 253, 253, 1)"
        px="15px"
        py="10px"
        isOpen={addHumanActivityModal.isOpen}
        onClose={addHumanActivityModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Human Activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormControl>
                <FormControl>
                  <FormLabel htmlFor="category">Activity Category</FormLabel>
                  <Input
                    id="category"
                    type="text"
                    maxLength={25}
                    value={category}
                    placeholder="Category Name"
                    onChange={({ target }) => {
                      setCategory(target.value);
                      setCategoryLength(target.value.length);
                    }}
                    w="412px"
                  />
                </FormControl>
                <Text ml="360px" fontSize="12px" color="gray">
                  {`${categoryLength}/25`}
                </Text>
                <FormControl>
                  <FormLabel htmlFor="examples">Activity Examples</FormLabel>
                  <Textarea
                    maxLength={30}
                    placeholder="Type here..."
                    w="412px"
                    h="64px"
                    onChange={({ target }) => {
                      setExamples(target.value);
                      setExamplesLength(target.value.length);
                    }}
                  />
                </FormControl>
                <Text ml="360px" fontSize="12px" color="gray">
                  {examplesLength}/30
                </Text>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" bgColor="ochBlue" w="412px" h="40px" onClick={addHumanActivity}>
              Add Human Activity
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewHumanActivityModal;
