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
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { BsArrowDown } from 'react-icons/bs';
import DropdownSearch from '../DropdownSearch';

const options = [
  { value: 'Plover: Snowy (WSPL)', label: 'Plover: Snowy (WSPL)' },
  { value: 'end2', label: 'end2' },
  { value: 'end3', label: 'end3' },
  { value: 'add1', label: 'add1' },
  { value: 'add2', label: 'add2' },
  { value: 'add3', label: 'add3' },
];

const SpeciesRowModal = () => {
  const [isOpen, setIsOpen, onClose] = useState(false);
  const [option, setOption] = useState('test');

  return (
    <div>
      <Button
        onClick={e => {
          setIsOpen(!isOpen);
        }}
        bgColor="#2BC0E3"
        width="584px"
        height="48px"
        margin-top="15px"
      >
        Add New Row +
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="70vh">
          <ModalHeader>Add Species Row</ModalHeader>
          <ModalCloseButton
            onClick={e => {
              setIsOpen(false);
            }}
          />
          <ModalBody>
            <FormLabel fontWeight="600">Search for a Species:</FormLabel>
            <SimpleGrid columns={6} h="100%" columnGap="9px">
              <GridItem colSpan={5}>
                <VStack w="full" h="100%" position="relative" alignItems>
                  <DropdownSearch options={options} />
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
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button bgColor="#2BC0E3" mr={3} width="536px" height="48px">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SpeciesRowModal;
