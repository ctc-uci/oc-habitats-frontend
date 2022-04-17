import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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
  Flex,
} from '@chakra-ui/react';

function DeleteSpeciesModal({ deleteSpecies, specie, predOrSpecies }) {
  const [isToggled, setIsToggled] = useState(false);
  // const [speciesName] = useState(specie.name);
  // const [speciesCode] = useState(specie.code);
  // const [speciesGroup] = useState(specie.isListed ? 'listed' : 'nonListed');
  // const [speciesPredator] = useState(specie.isPredator ? 'Yes' : 'No');

  const [isValid, setIsValid] = useState(true);
  console.log(specie);
  const checkDelete = () => {
    // eslint-disable-next-line dot-notation
    deleteSpecies(specie['_id']);
    setIsToggled(false);
  };

  return (
    <>
      <MenuItem
        bg="white"
        color="#C53030"
        onClick={e => {
          e.preventDefault();
          setIsToggled(!isToggled);
          setIsValid(true);
        }}
      >
        Delete {predOrSpecies}
      </MenuItem>
      <Modal isOpen={isToggled} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="left" fontWeight={650} fontSize="28px">
            Delete {predOrSpecies}
          </ModalHeader>
          <ModalCloseButton
            onClick={e => {
              e.preventDefault();
              setIsToggled(false);
            }}
          />
          <ModalBody>
            <Text>
              Are you sure you want to
              <Text color="#C53030" fontWeight={650} display="inline">
                {' '}
                delete{' '}
              </Text>
              <Text fontWeight={650} display="inline">
                {' '}
                {specie.name}
              </Text>
              ? This action cannot be undone.
            </Text>
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
                <Button bgColor="#C53030" color="white" variant="solid" onClick={checkDelete}>
                  Yes, Delete
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

DeleteSpeciesModal.propTypes = {
  deleteSpecies: PropTypes.func.isRequired,
  predOrSpecies: PropTypes.string.isRequired,
  specie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeleteSpeciesModal;
