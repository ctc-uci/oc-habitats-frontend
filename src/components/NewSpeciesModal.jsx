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
  Stack,
  HStack,
  InputGroup,
  Input,
  Text,
  VStack,
  Spacer,
} from '@chakra-ui/react';

function NewSpeciesButton({ addNewSpecies }) {
  const [isToggled, setIsToggled] = useState(false);
  const [speciesName, setSpeciesName] = useState(null);
  const [speciesCode, setSpeciesCode] = useState(null);
  const [speciesGroup, setSpeciesGroup] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const checkInput = () => {
    if (speciesName && speciesCode && speciesGroup) {
      addNewSpecies({ name: speciesName, code: speciesCode, group: speciesGroup });
      setIsValid(true);
      setIsToggled(!isToggled);
    } else setIsValid(false);
  };

  return (
    <>
      <Button
        bg="#F49923"
        color="#4E4E4E"
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
          <ModalHeader align="center" fontWeight={650} fontSize="28px">
            Add a New Species
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
                  <Input
                    placeholder="Enter Name"
                    style={{ width: '18em' }}
                    onChange={e => setSpeciesName(e.target.value)}
                  />
                </VStack>
                <VStack align="left" ml="1em">
                  <Text fontWeight={550} fontSize="18px">
                    Species Code
                  </Text>
                  <Input
                    placeholder="Enter Code"
                    style={{ width: '10em' }}
                    onChange={e => setSpeciesCode(e.target.value)}
                  />
                </VStack>
              </InputGroup>
            </HStack>
            <Spacer />
            <RadioGroup defaultValue="" onChange={val => setSpeciesGroup(val)}>
              <Stack spacing={2} direction="column" m="1.5em 1em 2em 1em">
                <Radio colorScheme="teal" value="endangered">
                  <Text fontWeight={475}>Listed Species (Endangered)</Text>
                </Radio>
                <Radio colorScheme="teal" value="additional">
                  <Text fontWeight={475}>Additional Species</Text>
                </Radio>
              </Stack>
            </RadioGroup>
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
                <Button colorScheme="teal" variant="solid" onClick={checkInput}>
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

NewSpeciesButton.defaultProps = {
  addNewSpecies: PropTypes.func,
};

NewSpeciesButton.propTypes = {
  addNewSpecies: PropTypes.func,
};

export default NewSpeciesButton;
