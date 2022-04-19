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
  const [speciesGroup, setSpeciesGroup] = useState(null);
  const [speciesPredator, setSpeciesPredator] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const checkInput = () => {
    if (speciesName && speciesCode && speciesGroup) {
      addNewSpecies({
        name: speciesName,
        code: speciesCode,
        group: speciesGroup,
        predator: speciesPredator,
      });
      setIsValid(true);
      setIsToggled(!isToggled);
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
                onChange={val => setSpeciesGroup(val)}
                as={HStack}
                spacing={10}
              >
                <Radio color="#3182CE" value="nonListed">
                  <Text fontWeight={475}>Non-Listed</Text>
                </Radio>
                <Radio color="#3182CE" value="listed">
                  <Text fontWeight={475}>Listed</Text>
                </Radio>
              </RadioGroup>
              {speciesGroup === 'nonListed' && (
                <>
                  <Text fontWeight={550} fontSize="18px">
                    Is a Predator
                  </Text>
                  <RadioGroup
                    defaultValue=""
                    onChange={val => setSpeciesPredator(val)}
                    as={HStack}
                    spacing={10}
                  >
                    <Radio color="#3182CE" value="No">
                      <Text fontWeight={475}>No</Text>
                    </Radio>
                    <Radio color="#3182CE" value="Yes">
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
