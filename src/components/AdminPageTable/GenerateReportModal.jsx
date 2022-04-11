// import React from 'react';
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   Text,
//   ModalFooter,
//   useToast,
// } from '@chakra-ui/react';

// // modal for the generate report button
// const GenerateReportModal = () => {
//   const toast = useToast();
//   return (
//     <>
//       <Button onClick={onReportOpen}>Generate Report</Button>

//       <Modal closeOnOverlayClick={false} isOpen={isReportOpen} onClose={onReportClose} isCentered>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Generate Report</ModalHeader>
//           <ModalBody>
//             <Text>Select a month and year you&apos;d like to generate a report for.</Text>
//             <DatePicker
//               selected={reportDate}
//               showMonthYearPicker
//               inline
//               onChange={date => {
//                 setGenerate(false);
//                 setReportDate(date);
//               }}
//             />
//           </ModalBody>

//           <ModalFooter>
//             <Button
//               mr="12px"
//               onClick={() => {
//                 onReportClose();
//                 setGenerate(true);
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={() => {
//                 onReportClose();
//                 setGenerate(true);
//                 toast({
//                   title: 'Successfully Generated Report',
//                   description: `You've generated a report for ${reportDate.toLocaleString(
//                     'default',
//                     { month: 'long' },
//                   )} ${reportDate.getFullYear()}`,
//                   status: 'success',
//                   duration: 5000,
//                   isClosable: true,
//                 });
//                 setReportDate(null);
//               }}
//               bg="#2BC0E3"
//               isDisabled={generate}
//             >
//               Generate Report
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default GenerateReportModal;
