/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Text,
  VStack,
  SimpleGrid,
  GridItem,
  Button,
  Icon,
  Box,
  HStack,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { DeleteIcon, TrashIcon, ChevronLeftIcon } from '@chakra-ui/icons';

import PropTypes from 'prop-types';

const DeleteRowModal = ({ species, isShowing, setIsShowing }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isShowing} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <HStack>
            <Button
              bgColor="transparent"
              _hover={{ bg: 'transparent' }}
              _active={{
                bg: 'transparent',
                transform: 'scale(0.98)',
              }}
              _focus={{
                bg: 'transparent',
              }}
              rightIcon={<ChevronLeftIcon />}
              onClick={e => {
                setIsShowing(false);
              }}
            />
          </HStack>

          <ModalHeader alignSelf="center">Delete Row</ModalHeader>
          <ModalBody>
            <HStack justify="center">
              <DeleteIcon w={20} h={20} color="red" />
            </HStack>
            <Text>
              Are you sure you want to
              <Text color="red" style={{ display: 'inline' }}>
                {' '}
                delete{' '}
              </Text>
              the {species} row? This action cannot be undone.
            </Text>
            <VStack width="400px">
              <Button w="100%" bgColor="red" height="48px" onClick={onClose}>
                Yes, Delete Row
              </Button>
              <Button
                w="100%"
                height="48px"
                mr={3}
                onClick={e => {
                  setIsShowing(false);
                }}
              >
                Cancel
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

DeleteRowModal.defaultProps = {
  species: PropTypes.string,
  isShowing: PropTypes.bool,
  setIsShowing: PropTypes.func,
};

DeleteRowModal.propTypes = {
  species: PropTypes.string,
  isShowing: PropTypes.bool,
  setIsShowing: PropTypes.func,
};

export default DeleteRowModal;
