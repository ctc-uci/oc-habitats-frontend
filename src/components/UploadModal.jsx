import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlinePicture } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import {
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Dropzone from './Dropzone';

function UploadModal({ title, isOpen, toggleOpen, saveUpload }) {
  const [files, setFiles] = useState([]);
  const preview = files.map(file => (
    <Image
      // boxSize="31em"
      w="94%"
      objectFit="contain"
      src={file.preview}
      key={file.name}
    />
  ));

  const hasUpload = files.length > 0;

  return (
    <>
      <Modal isOpen={isOpen} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="left" fontWeight={650} fontSize="1.25em">
            {title}
          </ModalHeader>

          <ModalBody>
            <VStack>
              <Text align="left" w="95%" color="ochBlack" fontWeight={500}>
                Upload Image (PNG, JPG, or JPEG Only)
              </Text>
              <Dropzone hasUpload={hasUpload} setFiles={setFiles} />
              {files.length > 0 && (
                <Flex
                  borderWidth="2px"
                  borderColor="#E2E8F0"
                  w="94%"
                  alignItems="center"
                  fontWeight={450}
                  borderRadius="3px"
                >
                  <Icon
                    w="1.6em"
                    h="1.6em"
                    ml="1em"
                    mr=".8em"
                    borderRadius="45%"
                    as={AiOutlinePicture}
                  />
                  <Text w="100%">{files && files[0].name}</Text>
                  <IconButton
                    bgColor="transparent"
                    fontSize="1.5em"
                    w="1.5em"
                    h="1.5em"
                    _hover={{
                      background: 'transparent',
                    }}
                    _focus={{ outline: 'none' }}
                    icon={<FiTrash />}
                    onClick={() => setFiles([])}
                  />
                </Flex>
              )}
              {preview}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <VStack>
              <HStack spacing={4}>
                <Button
                  colorScheme="gray"
                  mr={3}
                  onClick={e => {
                    e.preventDefault();
                    setFiles([]);
                    toggleOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  bgColor="ochBlue"
                  variant="solid"
                  onClick={() => {
                    saveUpload(files[0]);
                    toggleOpen(false);
                    setFiles([]);
                  }}
                  isDisabled={!hasUpload}
                >
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
