/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Text,
  VStack,
  SimpleGrid,
  GridItem,
  Button,
  IconButton,
  Icon,
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
import { DeleteIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { MdArrowBackIos } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';

import PropTypes from 'prop-types';

const DeleteRowModal = ({ species, isShowing, setIsShowing }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isShowing} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <HStack>
            <IconButton
              bgColor="transparent"
              _hover={{ bg: 'transparent' }}
              _active={{
                bg: 'transparent',
                transform: 'scale(0.98)',
              }}
              _focus={{
                bg: 'transparent',
              }}
              icon={<Icon as={MdArrowBackIos} />}
              onClick={e => {
                setIsShowing(false);
              }}
            />
          </HStack>

          <ModalHeader alignSelf="center">Delete Row</ModalHeader>
          <ModalBody>
            <HStack justify="center">
              <Icon as={AiFillDelete} w={20} h={20} color="#CC0000" />
            </HStack>
            <Text>
              Are you sure you want to
              <Text color="#CC0000" display="inline">
                {' '}
                delete{' '}
              </Text>
              the{' '}
              <Text fontWeight={500} display="inline">
                {species}
              </Text>{' '}
              row? This action cannot be undone.
            </Text>
            <VStack width="400px">
              <Button w="100%" bgColor="#CC0000" color="white" height="48px" onClick={onClose}>
                Yes, Delete Row
              </Button>
              <Button
                variant="outline"
                w="100%"
                height="48px"
                mr={3}
                onClick={e => {
                  setIsShowing(false);
                }}
                borderColor="#2D3748"
                color="#2D3748"
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
