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
  useDisclosure,
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

const AddSpeciesModal = ({ addNewRow }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [option, setOption] = useState('test');
  const [specieName, setSpecieName] = useState(null);
  const [totalSighted, setTotalSighted] = useState(1);
  const [notes, setNotes] = useState(null);

  const addNewSpecie = () => {
    addNewRow({ name: specieName, total: totalSighted, notes });
    onClose();
  };

  const setSpecie = e => {
    setSpecieName(e.value);
  };

  return (
    <div>
      <Button onClick={onOpen} bgColor="#2BC0E3" width="584px" height="48px">
        Add New Row +
      </Button>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent h="85vh" w="50em">
          <ModalHeader alignSelf="center">Add Species Row</ModalHeader>
          <ModalCloseButton onClick={onClose} />

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
                  <DropdownSearch options={options} handleSelectedValue={setSpecie} />
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
                <NumberInput
                  defaultValue={1}
                  min={1}
                  max={20}
                  onChange={e => {
                    setTotalSighted(e);
                  }}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </GridItem>
              <GridItem colSpan={6}>
                <FormLabel fontWeight="600">Notes (Optional)</FormLabel>
                <Textarea
                  placeholder="Type Here..."
                  onChange={e => {
                    setNotes(e.target.value);
                  }}
                />
              </GridItem>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <VStack>
              <Button bgColor="#2BC0E3" width="400px" onClick={addNewSpecie}>
                Save <RiSaveFill />
              </Button>
              <Button width="400px" onClick={onClose}>
                Cancel
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

AddSpeciesModal.defaultProps = {
  addNewRow: PropTypes.func,
};

AddSpeciesModal.propTypes = {
  addNewRow: PropTypes.func,
};

export default AddSpeciesModal;
