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
  Badge,
} from '@chakra-ui/react';
import { CgSoftwareUpload } from 'react-icons/cg';
import { saveAs } from 'file-saver';
import { OCHBackend } from '../../common/utils';

// modal for the export selected logs button
const ExportLogsModal = ({ logs, all }) => {
  const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();
  const toast = useToast();
  const count = logs.length;

  const exportLogs = async () => {
    onExportClose();
    try {
      // console.log(`Exporting ${count} logs`);

      const res = await OCHBackend.post('/report', { logIds: logs }, { responseType: 'blob' });
      saveAs(res.data, 'report.xlsx');

      toast({
        title: 'Export Successful!',
        description: `You've exported ${count} log(s).`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Export Failed',
        description: err?.message || 'Could not export logs.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        onClick={onExportOpen}
        variant="solidNoHover"
        bg="ochBlue"
        rightIcon={<CgSoftwareUpload />}
      >
        {all ? 'Export All with Current Filters' : 'Export Selected Logs'}
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isExportOpen} onClose={onExportClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{all ? 'Export All' : 'Export Selected Logs'}</ModalHeader>
          <ModalBody>
            {count === 0 ? (
              <Text>You have not selected any logs to export.</Text>
            ) : (
              <>
                <Text>You are about to export {count} log(s) as csv files.</Text>
                <Text>
                  Note that you may only export{' '}
                  <Badge variant="solid" colorScheme="green">
                    approved
                  </Badge>{' '}
                  logs.
                </Text>
              </>
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
  logs: PropTypes.arrayOf(PropTypes.string).isRequired,
  all: PropTypes.bool.isRequired,
};

export default ExportLogsModal;
