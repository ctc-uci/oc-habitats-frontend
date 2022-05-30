import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  Text,
  ModalFooter,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { CgSoftwareUpload } from 'react-icons/cg';

// modal for the export selected logs button
const ExportLogsModal = ({ count }) => {
  const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();
  const toast = useToast();

  const exportLogs = () => {
    onExportClose();

    // TO DO: Make backend call
    // eslint-disable-next-line no-console
    console.log(`Exporting ${count} logs`);

    toast({
      title: 'Export Successful!',
      description: `You've exported ${count} log(s).`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        onClick={onExportOpen}
        variant="solidNoHover"
        bg="ochBlue"
        rightIcon={<CgSoftwareUpload />}
      >
        Export Selected Logs
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isExportOpen} onClose={onExportClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export Selected Logs</ModalHeader>
          <ModalBody>
            {count === 0 ? (
              <Text>You have not selected any logs to export.</Text>
            ) : (
              <Text>You are about to export {count} log(s) as csv files.</Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr="12px" onClick={onExportClose}>
              Cancel
            </Button>
            <Button
              bg="green.500"
              color="white"
              variant="solidNoHover"
              onClick={() => exportLogs()}
              isDisabled={count === 0}
              _hover={{ _disabled: { opacity: 0.4 } }}
            >
              Yes, Export
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

ExportLogsModal.propTypes = {
  count: PropTypes.number.isRequired,
};

export default ExportLogsModal;
