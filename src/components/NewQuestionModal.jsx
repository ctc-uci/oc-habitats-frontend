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
} from '@chakra-ui/react';

const NewQuestionModal = () => {
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [tooltip, setTooltip] = useState();
  /*
  const handleSubmit = async e => {
    try {
      // INSERT NEW QUESTION LOGIC HERE
    } catch (err) {
      // HANDLE ERROR HERE
    }
  };
*/
  return (
    <Box w="460px" h="512px" bgColor="rgba(253, 253, 253, 1)" px="15px" py="10px">
      <Heading size="md" mb="10px">
        Add Question
      </Heading>
      <FormControl>
        <FormControl>
          <FormLabel htmlFor="title">Question Title</FormLabel>
          <Input
            id="title"
            type="text"
            value={title}
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
            w="412px"
            mb="20px"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="type">Question Type</FormLabel>
          <RadioGroup
            id="type"
            onChange={e => setType(e)}
            value={type}
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
        <Button type="submit" bgColor="ochBlue" w="412px" h="40px" /* onClick={handleSubmit} */>
          Add Question
        </Button>
      </FormControl>
    </Box>
  );
};

export default NewQuestionModal;
