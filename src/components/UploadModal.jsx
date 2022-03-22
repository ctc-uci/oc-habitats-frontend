/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
  Stack,
  HStack,
  InputGroup,
  Input,
  Text,
  VStack,
  Spacer,
} from '@chakra-ui/react';

function UploadModal({ title, isOpen, toggleOpen, saveUpload }) {
  const [isValid, setIsValid] = useState(true);

  return (
    <>
      <Modal isOpen={isOpen} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="left" fontWeight={650} fontSize="1.25em">
            {title}
          </ModalHeader>

          <ModalBody />
          <ModalFooter>
            <VStack>
              {/* TEMP ERROR MSG, NEED OFFICIAL DESIGNS */}
              {isValid ? (
                <></>
              ) : (
                <Text color="red" fontWeight={500} align="center">
                  Error. Please check inputs again.
                </Text>
              )}

              <HStack spacing={4}>
                <Button
                  colorScheme="gray"
                  mr={3}
                  onClick={e => {
                    e.preventDefault();
                    toggleOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button bgColor="ochBlue" variant="solid">
                  Save Changes
                </Button>
              </HStack>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

UploadModal.defaultProps = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  saveUpload: PropTypes.func,
  toggleOpen: PropTypes.func,
};

UploadModal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  saveUpload: PropTypes.func,
  toggleOpen: PropTypes.func,
};

export default UploadModal;
