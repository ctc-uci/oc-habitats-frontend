import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { useToast } from '@chakra-ui/core';

const { isOpen: isReportOpen, onOpen: onReportOpen, onClose: onReportClose } = useDisclosure();
const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();
const {
  isOpen: isReminderOpen,
  onOpen: onReminderOpen,
  onClose: onReminderClose,
} = useDisclosure();

const generateReport = () => {
  return (
    <>
      <Button onClick={onReportOpen}>Generate Report</Button>

      <Modal isOpen={isReportOpen} onClose={onReportClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Report</ModalHeader>
          <ModalBody>
            <Text>Select a month and year you&apos;d like to generate a report for.</Text>
            <DatePicker
              dateFormat="MMMM, yyyy"
              showMonthYearPicker
              placeholderText="Select a month"
              isClearable
              inline
            />
          </ModalBody>

          <ModalFooter>
            <Button mr="12px">Cancel</Button>
            <Button bg="#2BC0E3" isDisabled>
              Generate Report
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const exportSelectedLogs = count => {
  const toast = useToast();
  return (
    <>
      <Button onClick={onExportOpen}>Export Selected Logs</Button>

      <Modal isOpen={isExportOpen} onClose={onExportClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export Selected Logs</ModalHeader>
          <ModalBody>
            <Text>You are about to export {count} logs as csv files.</Text>
          </ModalBody>

          <ModalFooter>
            <Button mr="12px" onClick={onExportClose}>
              Cancel
            </Button>
            <Button
              bg="#38A169"
              color="white"
              onClick={() => {
                onExportClose();
                toast({
                  title: 'Export Successful!',
                  description: "You've exported {countChecked()} logs.",
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });
              }}
            >
              Yes, Export
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const setReminder = () => {
  return (
    <>
      <Button onClick={onReminderOpen}>Set Reminder</Button>

      <Modal isOpen={isReminderOpen} onClose={onReminderClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Schedule a Reminder</ModalHeader>
          <ModalBody>
            <Text>Would you like to...</Text>
          </ModalBody>

          <ModalFooter>
            <Button mr="12px">Cancel</Button>
            <Button bg="#2BC0E3" isDisabled>
              Next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

exportSelectedLogs.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  count: PropTypes.number.isRequired,
};

export { generateReport, exportSelectedLogs, setReminder };
