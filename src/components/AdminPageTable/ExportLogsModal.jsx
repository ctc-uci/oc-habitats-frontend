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
import { BiExport } from 'react-icons/bi';

// modal for the export selected logs button
const ExportLogsModal = ({ count }) => {
  const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();
  const toast = useToast();

  const exportLogs = () => {
    onExportClose();

    // Make backend call
    // eslint-disable-next-line no-console
    console.log(`Exporting ${count} logs`);

    toast({
      title: 'Export Successful!',
      description: `You've exported ${count} logs.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button onClick={onExportOpen} variant="solidNoHover" bg="ochBlue" rightIcon={<BiExport />}>
        Export Selected Logs
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isExportOpen} onClose={onExportClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export Selected Logs</ModalHeader>
          <ModalBody>
            <Text>You are about to export {count} log(s) as csv files.</Text>
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
