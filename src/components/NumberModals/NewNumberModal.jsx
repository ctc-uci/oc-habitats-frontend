import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PhoneIcon } from '@chakra-ui/icons';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Input,
  Text,
  VStack,
  Stack,
  Textarea,
} from '@chakra-ui/react';

function NewNumberModal({ addNewNumber }) {
  const [isToggled, setIsToggled] = useState(false);
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [note, setNote] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const checkInput = () => {
    if (name && number) {
      addNewNumber({ name, number, note });
      setIsValid(true);
      setIsToggled(!isToggled);
    } else setIsValid(false);
  };

  return (
    <>
      <Button
        rightIcon={<PhoneIcon />}
        bg="#2BC0E3"
        color="#231F20"
        variant="solid"
        width="200px"
        height="40px"
        onClick={e => {
          e.preventDefault();
          setIsToggled(!isToggled);
          setIsValid(true);
        }}
      >
        Add Contact
      </Button>
      <Modal isOpen={isToggled} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="left" fontWeight={700} fontSize="18px" mb="1em">
            Add Contact
          </ModalHeader>

          <ModalCloseButton
            onClick={e => {
              e.preventDefault();
              setIsToggled(false);
            }}
          />
          <ModalBody>
            <Stack spacing="2em" direction="column">
              <VStack align="left">
                <Text fontWeight={500} fontSize="16px">
                  Contact Name
                </Text>
                <Input w="100%" onChange={e => setName(e.target.value)} />
              </VStack>
              <VStack align="left">
                <Text fontWeight={500} fontSize="16px">
                  Contact Number
                </Text>
                <Input w="100%" onChange={e => setNumber(e.target.value)} />
              </VStack>
              <VStack align="left">
                <Text fontWeight={500} fontSize="16px">
                  Additional Note (Optional)
                </Text>
                <Textarea w="100%" onChange={e => setNote(e.target.value)} />
              </VStack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <VStack>
              {/* TEMP ERROR MSG, NEED OFFICIAL DESIGNS */}
              {isValid ? (
                <></>
              ) : (
                <Text color="red" fontWeight={500} align="center">
                  Error. Please check inputs again.
                </Text>
              )}

              <HStack spacing={4} mt="2em">
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
                <Button background="#2BC0E3" variant="solid" onClick={checkInput}>
                  Add Contact
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

NewNumberModal.defaultProps = {
  addNewNumber: PropTypes.func,
};

NewNumberModal.propTypes = {
  addNewNumber: PropTypes.func,
};

export default NewNumberModal;
