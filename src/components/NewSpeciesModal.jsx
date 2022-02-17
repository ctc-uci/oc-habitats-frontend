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
        bg="#F49923"
        color="#4E4E4E"
        onClick={e => {
          e.preventDefault();
          setIsToggled(!isToggled);
        }}
      >
        {' '}
        + New Species{' '}
      </Button>
      <Modal isOpen={isToggled} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="center" fontWeight={650} fontSize="28px">
            {' '}
            Add a New Species{' '}
          </ModalHeader>

          <ModalCloseButton
            onClick={e => {
              e.preventDefault();
              setIsToggled(false);
            }}
          />
          <ModalBody>
            <HStack m="1.5em 1em 3em 1em">
              <InputGroup>
                <VStack align="left" mr="2em">
                  <Text fontWeight={550} fontSize="18px">
                    Species Name
                  </Text>
                  <Input placeholder="Enter Name" style={{ width: '18em' }} />
                </VStack>
                <VStack align="left" ml="1em">
                  <Text fontWeight={550} fontSize="18px">
                    Species Code
                  </Text>
                  <Input placeholder="Enter Code" style={{ width: '10em' }} />
                </VStack>
              </InputGroup>
            </HStack>
            <Spacer />
            <RadioGroup defaultValue="2">
              <Stack spacing={2} direction="column" m="1.5em 1em 2em 1em">
                <Radio colorScheme="teal" value="1">
                  <Text fontWeight={475}>Listed Species (Endangered)</Text>
                </Radio>
                <Radio colorScheme="teal" value="2">
                  <Text fontWeight={475}>Additional Species</Text>
                </Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4}>
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
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewSpeciesButton;
