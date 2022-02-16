import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Radio,
  Stack,
  HStack,
  InputGroup,
  Input,
  Text,
  VStack,
  Spacer,
} from '@chakra-ui/react';

function NewSpeciesButton() {
  // eslint-disable-next-line no-undef
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line no-undef
  // const { isOpen } = useDisclosure();
  const [isToggled, setIsToggled] = useState(false);
  return (
    <>
      <Button
        bg="#2D3748"
        color="#F7FAFC"
        onClick={e => {
          e.preventDefault();
          setIsToggled(!isToggled);
        }}
      >
        {' '}
        + New Species{' '}
      </Button>
      <Modal isOpen={isToggled}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="center">Add a New Species</ModalHeader>

          <ModalCloseButton
            onClick={e => {
              e.preventDefault();
              setIsToggled(false);
            }}
          />
          <ModalBody>
            <HStack mt="2.5em">
              <InputGroup>
                <VStack align="left">
                  <Text>Species Name</Text>
                  <Input placeholder="Enter Name" style={{ width: '15em' }} />
                </VStack>
                <VStack align="left">
                  <Text>Species Code</Text>
                  <Input placeholder="Enter Code" style={{ width: '8.5em' }} />
                </VStack>
              </InputGroup>
            </HStack>
            <Spacer />
            <RadioGroup defaultValue="2">
              <Stack spacing={5} direction="column">
                <Radio colorScheme="teal" value="1">
                  Listed Species (Endangered)
                </Radio>
                <Radio colorScheme="teal" value="2">
                  Additional Species
                </Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              variant="outline"
              mr={3}
              onClick={e => {
                e.preventDefault();
                setIsToggled(false);
              }}
            >
              Cancel
            </Button>
            <Button colorScheme="teal" variant="solid">
              Add Species
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewSpeciesButton;
