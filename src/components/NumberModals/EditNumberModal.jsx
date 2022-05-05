import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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

const EditNumberModal = ({ numberData, editNumber, disclosure }) => {
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [note, setNote] = useState(null);
  const [isValid, setIsValid] = useState(true);

  // setName(contactName);
  // setNumber(contactNumber);
  // setNote(contactNote);

  const checkInput = () => {
    if (name && number) {
      editNumber({ name, number, note });
      setIsValid(true);
      disclosure.onClose();
    } else setIsValid(false);
  };

  useEffect(() => {
    setName(numberData?.name);
    setNumber(numberData?.number);
    setNote(numberData?.note);
  }, [numberData]);

  return (
    <Modal size="xl" isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader align="left" fontWeight={700} fontSize="18px" mb="1em">
          Edit Contact
        </ModalHeader>

        <ModalCloseButton onClick={disclosure.onClose} />
        <ModalBody>
          <Stack spacing="2em" direction="column">
            <VStack align="left">
              <Text fontWeight={500} fontSize="16px">
                Contact Name
              </Text>
              <Input
                style={{ width: '30em' }}
                value={name}
                onChange={event => {
                  setName(event.target.value);
                }}
              />
              {/* <Input style={{ width: '30em' }} onChange={e => setName(e.target.value)} /> */}
            </VStack>
            <VStack align="left">
              <Text fontWeight={500} fontSize="16px">
                Contact Number
              </Text>
              <Input
                style={{ width: '30em' }}
                value={number}
                onChange={e => setNumber(e.target.value)}
              />
            </VStack>
            <VStack align="left">
              <Text fontWeight={500} fontSize="16px">
                Additional Note (Optional)
              </Text>
              <Textarea
                style={{ width: '30em', height: '8em' }}
                value={note}
                onChange={e => setNote(e.target.value)}
              />
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
              <Button colorScheme="teal" variant="outline" mr={3} onClick={disclosure.onClose}>
                Cancel
              </Button>
              <Button background="#2BC0E3" variant="solid" onClick={checkInput}>
                Save Contact
              </Button>
            </HStack>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

EditNumberModal.defaultProps = {
  editNumber: PropTypes.func,
};

EditNumberModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  numberData: PropTypes.object.isRequired,
  editNumber: PropTypes.func,
  disclosure: PropTypes.shape({
    isOpen: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
  }).isRequired,
};

export default EditNumberModal;
