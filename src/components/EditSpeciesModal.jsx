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

function EditSpeciesModal({ editSpecies, specie, predOrSpecies }) {
  const [isToggled, setIsToggled] = useState(false);
  const [speciesName, setSpeciesName] = useState(specie.name);
  const [speciesCode, setSpeciesCode] = useState(specie.code);
  const [speciesGroup, setSpeciesGroup] = useState(specie.isListed ? 'listed' : 'nonListed');
  const [speciesPredator, setSpeciesPredator] = useState(specie.isPredator ? 'Yes' : 'No');
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
        Edit {predOrSpecies}
      </MenuItem>
      <Modal isOpen={isToggled} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="left" fontWeight={650} fontSize="28px">
            Edit {predOrSpecies}
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
                    {predOrSpecies} Name
                  </Text>
                  <Input value={speciesName} onChange={e => setSpeciesName(e.target.value)} />
                  <Text fontWeight={550} fontSize="18px">
                    {predOrSpecies} Id
                  </Text>
                  <Input value={speciesCode} onChange={e => setSpeciesCode(e.target.value)} />
                </VStack>
              </InputGroup>
              {predOrSpecies === 'Predator' && (
                <>
                  <Text fontWeight={400} fontSize="16px" color="#718096">
                    If this Predator is also a Non-Listed Species, please provide an appropriate
                    4-letter Id.
                  </Text>
                  <Text fontWeight={550} fontSize="18px">
                    Is also Non-Listed
                  </Text>
                  <RadioGroup
                    value={speciesGroup}
                    onChange={val => setSpeciesGroup(val)}
                    as={HStack}
                    spacing={10}
                  >
                    <Radio color="#3182CE" value="listed">
                      <Text fontWeight={475}>No</Text>
                    </Radio>
                    <Radio color="#3182CE" value="nonListed">
                      <Text fontWeight={475}>Yes</Text>
                    </Radio>
                  </RadioGroup>
                </>
              )}
              {predOrSpecies === 'Species' && (
                <>
                  <Text fontWeight={550} fontSize="18px">
                    Species Type
                  </Text>
                  <RadioGroup
                    value={speciesGroup}
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
                        value={speciesPredator}
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
                <Text color="#C53030" fontWeight={500} align="center">
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
  predOrSpecies: PropTypes.string.isRequired,
  specie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    isListed: PropTypes.bool.isRequired,
    isPredator: PropTypes.bool.isRequired,
  }).isRequired,
};

export default EditSpeciesModal;
