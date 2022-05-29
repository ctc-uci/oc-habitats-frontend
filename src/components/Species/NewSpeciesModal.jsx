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
} from '@chakra-ui/react';

function NewSpeciesModal({ addNewSpecies }) {
  const [isToggled, setIsToggled] = useState(false);
  const [speciesName, setSpeciesName] = useState(null);
  const [speciesCode, setSpeciesCode] = useState(null);
  const [speciesCategory, setSpeciesCategory] = useState(null);
  // const [speciesPredator, setSpeciesPredator] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const checkInput = () => {
    if (speciesName && speciesCode && speciesCategory) {
      addNewSpecies({
        name: speciesName,
        code: speciesCode,
        category: speciesCategory,
      });
      setIsValid(true);
      setIsToggled(!isToggled);
      setSpeciesName(null);
      setSpeciesCode(null);
      setSpeciesCategory(null);
    } else setIsValid(false);
  };

  return (
    <>
      <Button
        bg="#6B46C1"
        color="white"
        onClick={e => {
          e.preventDefault();
          setIsToggled(!isToggled);
          setIsValid(true);
        }}
      >
        + New Species
      </Button>
      <Modal isOpen={isToggled} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="left" fontWeight={650} fontSize="28px">
            Add a New Species
          </ModalHeader>

          <ModalCloseButton
            onClick={e => {
              e.preventDefault();
              setIsToggled(false);
            }}
          />
          <ModalBody>
            <VStack align="left">
              <InputGroup>
                <VStack w="100%" align="left">
                  <Text fontWeight={550} fontSize="18px">
                    Species Name
                  </Text>
                  <Input placeholder="Enter Name" onChange={e => setSpeciesName(e.target.value)} />
                  <Text fontWeight={550} fontSize="18px">
                    Species Id
                  </Text>
                  <Input placeholder="Enter Code" onChange={e => setSpeciesCode(e.target.value)} />
                </VStack>
              </InputGroup>
              <Text fontWeight={550} fontSize="18px">
                Species Type
              </Text>
              <RadioGroup
                defaultValue=""
                onChange={val => setSpeciesCategory(val)}
                as={HStack}
                spacing={10}
              >
                <Radio color="#3182CE" value="NON_LISTED">
                  <Text fontWeight={475}>Non-Listed</Text>
                </Radio>
                <Radio color="#3182CE" value="LISTED">
                  <Text fontWeight={475}>Listed</Text>
                </Radio>
              </RadioGroup>
              {speciesCategory && speciesCategory !== 'LISTED' && (
                <>
                  <Text fontWeight={550} fontSize="18px">
                    Is a Predator
                  </Text>
                  <RadioGroup
                    defaultValue=""
                    onChange={val => setSpeciesCategory(val)}
                    as={HStack}
                    spacing={10}
                  >
                    <Radio color="#3182CE" value="NON_LISTED">
                      <Text fontWeight={475}>No</Text>
                    </Radio>
                    <Radio color="#3182CE" value="NON_LISTED_PREDATOR">
                      <Text fontWeight={475}>Yes</Text>
                    </Radio>
                  </RadioGroup>
                </>
              )}
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
                  onClick={e => {
                    e.preventDefault();
                    setIsToggled(false);
                  }}
                >
                  Cancel
                </Button>
                <Button bgColor="ochBlue" color="ochGrey" variant="solid" onClick={checkInput}>
                  Add Species
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

NewSpeciesModal.propTypes = {
  addNewSpecies: PropTypes.func.isRequired,
};

export default NewSpeciesModal;
