/* eslint-disable react/forbid-prop-types */
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
import { DeleteIcon } from '@chakra-ui/icons';
import { FiEdit2 } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { BsArrowDown } from 'react-icons/bs';
import { RiSaveFill } from 'react-icons/ri';
import DropdownSearch from '../DropdownSearch';
import DeleteRowModal from './DeleteRowModal';

const options = [
  { value: 'Plover: Snowy (WSPL)', label: 'Plover: Snowy (WSPL)' },
  { value: 'end2', label: 'end2' },
  { value: 'end3', label: 'end3' },
  { value: 'add1', label: 'add1' },
  { value: 'add2', label: 'add2' },
  { value: 'add3', label: 'add3' },
];

const EditSpeciesModal = ({ specie }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDelete, setIsDelete] = useState(false);
  const [specieName, setSpecieName] = useState(specie.name);
  const [totalSighted, setTotalSighted] = useState(specie.total);
  const [notes, setNotes] = useState(specie.notes);

  // console.log('edit specie', specie);
  const setSpecie = e => {
    setSpecieName(e.value);
  };

  return (
    <div>
      <IconButton size="md" icon={<Icon as={FiEdit2} />} onClick={onOpen} />
      {isDelete ? (
        <DeleteRowModal
          setIsShowing={setIsDelete}
          isShowing={isDelete}
          species="Sandpiper: Long-billed Curlew (LCBU)"
        />
      ) : (
        <Modal isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent h="85vh" w="50em">
            <ModalHeader alignSelf="center">Edit Species Row</ModalHeader>
            <ModalCloseButton onClick={onClose} />
            <ModalBody>
              <Text fontSize="12px">
                To choose a new species, re-search using the Search for a Species dropdown.
              </Text>
              <FormLabel fontWeight="600">Search for a Species:</FormLabel>
              <SimpleGrid columns={6} h="100%" columnGap="9px" rowGap=".75em">
                <GridItem colSpan={5}>
                  <VStack w="full" h="100%" position="relative" alignItems>
                    <DropdownSearch
                      options={options}
                      value={specieName}
                      onChange={opt => opt.label}
                      handleSelectedValue={setSpecie}
                    />
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
                    defaultValue={0}
                    value={totalSighted}
                    onChange={e => {
                      setTotalSighted(e);
                    }}
                    min={1}
                    max={20}
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
                    value={notes}
                    onChange={e => {
                      setNotes(e.target.value);
                    }}
                  />
                </GridItem>
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <VStack>
                <Button bgColor="#2BC0E3" width="400px">
                  Save <RiSaveFill />
                </Button>
                <Button
                  w="full"
                  position="relative"
                  bottom={0}
                  fontWeight="700"
                  colorScheme="red"
                  variant="outline"
                  //   isDisabled={disabled}
                  //   onClick={handleDeleteRows}
                  rightIcon={<DeleteIcon />}
                  onClick={e => {
                    setIsDelete(true);
                  }}
                >
                  Delete
                </Button>
              </VStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

EditSpeciesModal.defaultProps = {
  specie: PropTypes.object,
};

EditSpeciesModal.propTypes = {
  specie: PropTypes.object,
};

export default EditSpeciesModal;
