/* eslint-disable no-unused-vars */
// import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  SimpleGrid,
  GridItem,
  VStack,
  Select,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Icon,
  Box,
  HStack,
  Text,
  Container,
  Flex,
} from '@chakra-ui/react';
import { DeleteIcon, InfoIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { BsArrowDown } from 'react-icons/bs';
import { RiSaveFill } from 'react-icons/ri';
import DropdownSearch from '../DropdownSearch';

const options = [
  { value: 'Plover: Snowy (WSPL)', label: 'Plover: Snowy (WSPL)' },
  { value: 'end2', label: 'end2' },
  { value: 'end3', label: 'end3' },
  { value: 'add1', label: 'add1' },
  { value: 'add2', label: 'add2' },
  { value: 'add3', label: 'add3' },
];

const SpeciesRowModal = ({ type, isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen, onClose] = useState(false);
  const [option, setOption] = useState('test');

  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent h="85vh" w="50em">
          <ModalHeader>{type} Species Row</ModalHeader>
          <ModalCloseButton
            onClick={e => {
              setIsOpen(false);
            }}
          />

          <HStack bgColor="orange" p=".4em">
            <Container>
              <Flex alignItems="center" w="87%" justifyContent="space-between">
                <InfoIcon />
                <Text>Search and add a species from the drop down.</Text>
              </Flex>
            </Container>
          </HStack>

          <ModalBody>
            <Text fontSize="12px">
              {`If the specimen is not listed, choose "Other" and note the possible species in the
              Notes.`}
            </Text>
            <FormLabel fontWeight="600">Search for a Species:</FormLabel>
            <SimpleGrid columns={6} h="100%" columnGap="9px" rowGap=".75em">
              <GridItem colSpan={5}>
                <VStack w="full" h="100%" position="relative" alignItems>
                  <DropdownSearch options={options} onChange={opt => opt.label} />
                </VStack>
              </GridItem>

              <GridItem colSpan={1}>
                <IconButton
                  w="full"
                  //   onClick={handleAddRow}
                  aria-label="Enter"
                  icon={<BsArrowDown />}
                />
              </GridItem>

              <GridItem colSpan={5}>
                <FormLabel fontWeight="600">Total Sighted:</FormLabel>
                <NumberInput defaultValue={0} min={0} max={20}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </GridItem>
              <GridItem colSpan={6}>
                <FormLabel fontWeight="600">Notes (Optional)</FormLabel>
                <Textarea placeholder="Type Here..." />
              </GridItem>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <VStack>
              <Button bgColor="#2BC0E3" width="400px">
                Save <RiSaveFill />
              </Button>
              {type === 'Add' ? (
                <Button
                  width="400px"
                  onClick={e => {
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  w="full"
                  position="relative"
                  bottom={0}
                  fontWeight="700"
                  //   isDisabled={disabled}
                  //   onClick={handleDeleteRows}
                  rightIcon={<DeleteIcon />}
                >
                  Delete Selected
                </Button>
              )}
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

SpeciesRowModal.defaultProps = {
  type: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};
SpeciesRowModal.propTypes = {
  type: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default SpeciesRowModal;
