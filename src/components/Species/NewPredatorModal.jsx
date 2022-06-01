import React, { useState } from 'react';
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
  RadioGroup,
  Radio,
  HStack,
  InputGroup,
  Input,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

function NewPredatorModal({ addNewPredator }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [speciesName, setSpeciesName] = useState(null);
  const [speciesCode, setSpeciesCode] = useState(null);
  const [speciesCategory, setSpeciesCategory] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const checkInput = () => {
    if (speciesName && speciesCode && speciesCategory) {
      addNewPredator({
        name: speciesName,
        code: speciesCode,
        category: speciesCategory,
      });
      setIsValid(true);
      onClose();
    } else setIsValid(false);
  };

  return (
    <>
      <Button bg="#F49923" color="ochBlack" onClick={onOpen}>
        + New Predator
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="left" fontWeight={650} fontSize="28px">
            Add a New Predator
          </ModalHeader>

          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <VStack align="left">
              <InputGroup>
                <VStack w="100%" align="left">
                  <Text fontWeight={550} fontSize="18px">
                    Predator Name
                  </Text>
                  <Input placeholder="Enter Name" onChange={e => setSpeciesName(e.target.value)} />
                  <Text fontWeight={550} fontSize="18px">
                    Predator Id
                  </Text>
                  <Input placeholder="Enter Code" onChange={e => setSpeciesCode(e.target.value)} />
                </VStack>
              </InputGroup>
              <Text fontWeight={400} fontSize="16px" color="#718096">
                If this Predator is also a Non-Listed Species, please provide an appropriate
                4-letter Id.
              </Text>
              <Text fontWeight={550} fontSize="18px">
                Is also Non-Listed
              </Text>
              <RadioGroup onChange={val => setSpeciesCategory(val)} as={HStack} spacing={10}>
                <Radio color="#3182CE" value="JUST_PREDATOR">
                  <Text fontWeight={475}>No</Text>
                </Radio>
                <Radio color="#3182CE" value="NON_LISTED_PREDATOR">
                  <Text fontWeight={475}>Yes</Text>
                </Radio>
              </RadioGroup>
            </VStack>
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

              <HStack spacing={4}>
                <Button
                  color="ochBlack"
                  bgColor="#E2E8F0"
                  variant="outline"
                  mr={3}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button bgColor="ochBlue" color="ochGrey" variant="solid" onClick={checkInput}>
                  Add Predator
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

NewPredatorModal.propTypes = {
  addNewPredator: PropTypes.func.isRequired,
};

export default NewPredatorModal;
