import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  ModalFooter,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { FiPieChart } from 'react-icons/fi';

// modal for the generate report button
const GenerateReportModal = () => {
  const [reportDate, setReportDate] = useState(new Date());

  const { isOpen: isReportOpen, onOpen: onReportOpen, onClose: onReportClose } = useDisclosure();
  const toast = useToast();

  const generateReport = () => {
    onReportClose();

    // Make backend call
    // eslint-disable-next-line no-console
    console.log(`Generating report for ${reportDate}`);

    setReportDate(new Date());
    toast({
      title: 'Successfully Generated Report',
      description: `You've generated a report for ${reportDate.toLocaleString('default', {
        month: 'long',
      })} ${reportDate.getFullYear()}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        onClick={onReportOpen}
        variant="solidNoHover"
        bg="ochBluePress"
        color="white"
        rightIcon={<FiPieChart />}
      >
        Generate Report
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isReportOpen} onClose={onReportClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Report</ModalHeader>
          <ModalBody>
            <Text>Select a month and year you&apos;d like to generate a report for.</Text>
            <DatePicker
              selected={reportDate}
              showMonthYearPicker
              inline
              onChange={date => {
                setReportDate(date);
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              mr="12px"
              onClick={() => {
                onReportClose();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => generateReport()}
              variant="solidNoHover"
              bg="ochBlue"
              disabled={!reportDate}
            >
              Generate Report
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GenerateReportModal;
