/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
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
  Container,
} from '@chakra-ui/react';
import { DeleteIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { MdArrowBackIos } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';

import PropTypes from 'prop-types';

const DeleteRowModal = ({ species, isShowing, setIsShowing, deleteSpecie }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isShowing} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent minWidth="30vw" minHeight="85vh">
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
              mt="2%"
              ml="5%"
            />
          </HStack>

          <ModalHeader alignSelf="center" fontWeight={650} fontSize="1.25em">
            Delete Row
          </ModalHeader>
          <ModalBody>
            <Container>
              <HStack justify="center">
                <Icon as={AiFillDelete} w="6em" h="6em" color="#CC0000" />
              </HStack>
              <Box bg="transparent" w="100%" p={4} />
              <Text fontSize="14.5px" color="black">
                Are you sure you want to
                <Text fontSize="14.5px" color="#CC0000" display="inline">
                  {' '}
                  delete{' '}
                </Text>
                the{' '}
                <Text fontSize="14.5px" fontWeight={500} display="inline">
                  {species}
                </Text>{' '}
                row? This action cannot be undone.
              </Text>
              <Box bg="transparent" w="100%" p={6} />
              <VStack>
                <Button
                  w="100%"
                  bgColor="#CC0000"
                  color="white"
                  fontSize="1em"
                  onClick={deleteSpecie}
                >
                  Yes, Delete Row
                </Button>
                <Button
                  variant="outline"
                  w="100%"
                  height="38px"
                  mr={3}
                  onClick={e => {
                    setIsShowing(false);
                  }}
                  borderColor="#2D3748"
                  color="#2D3748"
                  fontSize="1em"
                >
                  Cancel
                </Button>
              </VStack>
            </Container>
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
  deleteSpecie: PropTypes.func,
};

DeleteRowModal.propTypes = {
  species: PropTypes.string,
  isShowing: PropTypes.bool,
  setIsShowing: PropTypes.func,
  deleteSpecie: PropTypes.func,
};

export default DeleteRowModal;
