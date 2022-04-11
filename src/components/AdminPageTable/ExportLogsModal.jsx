// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalHeader,
//   ModalBody,
//   Text,
//   ModalFooter,
//   useToast,
// } from '@chakra-ui/react';

// // modal for the export selected logs button
// const ExportLogsModal = count => {
//   const toast = useToast();
//   return (
//     <>
//       <Button onClick={onExportOpen}>Export Selected Logs</Button>

//       <Modal closeOnOverlayClick={false} isOpen={isExportOpen} onClose={onExportClose} isCentered>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Export Selected Logs</ModalHeader>
//           <ModalBody>
//             <Text>You are about to export {count} logs as csv files.</Text>
//           </ModalBody>

//           <ModalFooter>
//             <Button mr="12px" onClick={onExportClose}>
//               Cancel
//             </Button>
//             <Button
//               bg="#38A169"
//               color="white"
//               onClick={() => {
//                 onExportClose();
//                 toast({
//                   title: 'Export Successful!',
//                   description: `You've exported ${count} logs.`,
//                   status: 'success',
//                   duration: 5000,
//                   isClosable: true,
//                 });
//               }}
//             >
//               Yes, Export
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default ExportLogsModal;
