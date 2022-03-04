/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormLabel,
  SimpleGrid,
  GridItem,
  VStack,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Icon,
  HStack,
  Text,
  Container,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { FiEdit2 } from 'react-icons/fi';
import PropTypes from 'prop-types';
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

const EditSpeciesModal = ({ specie, editRow, deleteRow }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDelete, setIsDelete] = useState(false);
  const [specieName, setSpecieName] = useState(specie.name);
  const [totalSighted, setTotalSighted] = useState(specie.total);
  const [notes, setNotes] = useState(specie.notes);

  const updateSpecies = () => {
    editRow({ oldName: specie.name, name: specieName, total: totalSighted, notes });
    onClose();
  };

  const deleteSpecie = () => {
    deleteRow(specie.name);
    onClose();
  };

  return (
    <div>
      <IconButton
        size="md"
        w="2.75em"
        h="2.75em"
        icon={<Icon as={FiEdit2} w="1.5em" h="1.5em" />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} isCentered size="md">
        <ModalOverlay />
        {isDelete ? (
          <DeleteRowModal
            setIsShowing={setIsDelete}
            species={specieName}
            deleteSpecie={deleteSpecie}
          />
        ) : (
          <ModalContent>
            <HStack pl="4%" pt="3%">
              <IconButton
                size="xs"
                icon={<CloseIcon w="1.25em" h="1.25em" />}
                onClick={onClose}
                bgColor="transparent"
                _hover={{ bg: 'transparent' }}
                _active={{
                  bg: 'transparent',
                  transform: 'scale(0.98)',
                }}
                _focus={{
                  bg: 'transparent',
                }}
              />
            </HStack>
            <ModalHeader alignSelf="center" fontWeight={650} fontSize="1.25em">
              Edit Species Row
            </ModalHeader>

            <Container>
              <ModalBody>
                <Text fontSize=".825em" fontWeight={450} mb="2em" color="black">
                  To choose a new species, re-search using the{' '}
                  <Text display="inline" fontWeight={600}>
                    Search for a Species{' '}
                  </Text>
                  dropdown.
                </Text>
                <VStack align="left" spacing="1em">
                  <SimpleGrid columns={6} columnGap="9px" rowGap="1.25em">
                    <GridItem colSpan={6}>
                      <FormLabel fontSize="14px" fontWeight="600">
                        Search for a Species:
                      </FormLabel>
                      <VStack w="full" h="100%" position="relative" alignItems>
                        <DropdownSearch
                          options={options}
                          onChange={opt => opt.label}
                          value={specieName}
                          handleSelectedValue={setSpecieName}
                        />
                      </VStack>
                    </GridItem>

                    <GridItem colSpan={6}>
                      <FormLabel fontSize="14px" fontWeight="600">
                        Total Sighted
                      </FormLabel>
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
                      <FormLabel fontSize="14px" fontWeight="600">
                        Notes (Optional)
                      </FormLabel>
                      <Textarea
                        placeholder="Type Here..."
                        minHeight="10em"
                        value={notes || ''}
                        onChange={e => {
                          setNotes(e.target.value);
                        }}
                      />
                    </GridItem>
                  </SimpleGrid>
                </VStack>
              </ModalBody>
              <ModalFooter mb="1em">
                <VStack w="100%">
                  <Button
                    rightIcon={<RiSaveFill />}
                    bgColor="#2BC0E3"
                    fontWeight="600"
                    w="100%"
                    onClick={updateSpecies}
                  >
                    Save
                  </Button>
                  <Button
                    w="100%"
                    fontWeight="600"
                    colorScheme="red"
                    variant="outline"
                    rightIcon={<DeleteIcon />}
                    onClick={e => {
                      e.preventDefault();
                      setIsDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </VStack>
              </ModalFooter>
            </Container>
          </ModalContent>
        )}
      </Modal>
    </div>
  );
};

EditSpeciesModal.defaultProps = {
  specie: PropTypes.object,
  editRow: PropTypes.func,
  deleteRow: PropTypes.func,
};

EditSpeciesModal.propTypes = {
  specie: PropTypes.object,
  editRow: PropTypes.func,
  deleteRow: PropTypes.func,
};

export default EditSpeciesModal;
