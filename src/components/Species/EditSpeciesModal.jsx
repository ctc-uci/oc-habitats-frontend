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
  const [speciesName, setSpeciesName] = useState('');
  const [speciesCode, setSpeciesCode] = useState('');
  const [speciesCategory, setSpeciesCategory] = useState('');
  const [isValid, setIsValid] = useState(true);

  const checkInput = () => {
    if (speciesName && speciesCode && speciesCategory) {
      editSpecies(
        {
          name: speciesName,
          code: speciesCode,
          category: speciesCategory,
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
          setSpeciesName(specie.name);
          setSpeciesCode(specie.code);
          setSpeciesCategory(specie.category);
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
                    value={speciesCategory}
                    onChange={val => setSpeciesCategory(val)}
                    as={HStack}
                    spacing={10}
                  >
                    <Radio color="#3182CE" value="JUST_PREDATOR">
                      <Text fontWeight={475}>No</Text>
                    </Radio>
                    <Radio color="#3182CE" value="NON_LISTED_PREDATOR">
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
                    value={
                      speciesCategory === 'NON_LISTED_PREDATOR' ? 'NON_LISTED' : speciesCategory
                    }
                    onChange={val => setSpeciesCategory(val)}
                    as={HStack}
                    spacing={10}
                    defaultValue={speciesCategory}
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
                        value={speciesCategory}
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
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditSpeciesModal;
