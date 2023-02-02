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
import { FiEdit3 } from 'react-icons/fi';
import PropTypes from 'prop-types';
import DropdownSearch from '../DropdownSearch';
import DeleteSpeciesModal from './DeleteSpeciesModal';

const EditSpeciesModal = ({ speciesId, speciesRow, editRow, deleteRow, speciesOptions }) => {
  const getSpeciesObj = id => speciesOptions.find(s => s.value === id);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDelete, setIsDelete] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(getSpeciesObj(speciesId));
  const [totalSighted, setTotalSighted] = useState(speciesRow.count);
  const [notes, setNotes] = useState(speciesRow.notes);

  const updateSpecies = () => {
    editRow({
      oldId: speciesId,
      species: selectedSpecies.value,
      count: parseInt(totalSighted, 10),
      notes,
    });
    onClose();
  };

  const deleteSpecie = () => {
    deleteRow(speciesId);
    onClose();
  };

  return (
    <div>
      <IconButton size="md" icon={<Icon as={FiEdit3} w="1.5em" h="1.5em" />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        {isDelete ? (
          <DeleteSpeciesModal
            setIsShowing={setIsDelete}
            speciesName={getSpeciesObj(speciesId)?.label}
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
                          options={speciesOptions}
                          onChange={opt => opt.label}
                          value={selectedSpecies}
                          handleSelectedValue={setSelectedSpecies}
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
                <HStack w="75%">
                  <Button
                    w="100%"
                    fontWeight="600"
                    colorScheme="red"
                    variant="outline"
                    rightIcon={<DeleteIcon />}
                    onClick={deleteSpecie}
                  >
                    Delete
                  </Button>
                  <Button bgColor="#2BC0E3" fontWeight="600" w="100%" onClick={updateSpecies}>
                    Save Changes
                  </Button>
                </HStack>
              </ModalFooter>
            </Container>
          </ModalContent>
        )}
      </Modal>
    </div>
  );
};

EditSpeciesModal.propTypes = {
  speciesRow: PropTypes.shape({
    species: PropTypes.string,
    count: PropTypes.number,
    notes: PropTypes.string,
  }).isRequired,
  speciesId: PropTypes.string.isRequired,
  editRow: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
  speciesOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
};

export default EditSpeciesModal;
