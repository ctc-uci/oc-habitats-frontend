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
  MenuItem,
} from '@chakra-ui/react';

function EditSpeciesModal({ editSpecies, specie }) {
  const [isToggled, setIsToggled] = useState(false);
  const [speciesName, setSpeciesName] = useState(null);
  const [speciesCode, setSpeciesCode] = useState(null);
  const [speciesGroup, setSpeciesGroup] = useState(null);
  const [speciesPredator, setSpeciesPredator] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const checkInput = () => {
    if (speciesName && speciesCode && speciesGroup) {
      editSpecies(
        {
          name: speciesName,
          code: speciesCode,
          group: speciesGroup,
          predator: speciesPredator,
        },
        specie,
      );
      setIsValid(true);
      setIsToggled(!isToggled);
    } else setIsValid(false);
  };
  return (
    <>
      <MenuItem
        bg="white"
        color="ochGrey"
        onClick={e => {
          e.preventDefault();
          setIsToggled(!isToggled);
          setIsValid(true);
        }}
      >
        Edit Species
      </MenuItem>
      <Modal isOpen={isToggled} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="left" fontWeight={650} fontSize="28px">
            Edit Species
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
                  <Input
                    defaultValue={specie.name}
                    onChange={e => setSpeciesName(e.target.value)}
                  />
                  <Text fontWeight={550} fontSize="18px">
                    Species Id
                  </Text>
                  <Input
                    defaultValue={specie.code}
                    onChange={e => setSpeciesCode(e.target.value)}
                  />
                </VStack>
              </InputGroup>
              <Text fontWeight={550} fontSize="18px">
                Species Type
              </Text>
              <RadioGroup
                defaultValue={specie.isListed ? 'listed' : 'nonListed'}
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
                    defaultValue={specie.predator}
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
                  Save Changes
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

EditSpeciesModal.propTypes = {
  editSpecies: PropTypes.func.isRequired,
  specie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    isListed: PropTypes.bool.isRequired,
    predator: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditSpeciesModal;
