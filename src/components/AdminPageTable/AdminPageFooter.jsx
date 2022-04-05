// import React from 'react';
// import PropTypes from 'prop-types';
// import { Flex, Select, Text, Tooltip, IconButton, Box } from '@chakra-ui/react';

// const AdminPageFooter = ({ pageSize, totalData, currentPage }) => {
//   return (
//     <Flex
//       bg="#4E4E4E"
//       alignItems="center"
//       pl="24px"
//       pt="8px"
//       pb="8px"
//       pr="24px"
//       borderBottomRadius={10}
//     >
//       <Flex alignItems="center">
//         <Flex pr="8px">
//           <Text color="white">Show rows per page</Text>
//         </Flex>
//         <Flex>
//           <Select
//             value={pageSize}
//             onChange={e => {
//               const oldSize = pageSize;
//               const newSize = parseInt(e.target.value, 10);
//               setPageSize(newSize);
//               updateChangedPage(oldSize, newSize);
//             }}
//             bg="white"
//             w="75px"
//           >
//             {[10, 20, 30, 40, 50].map(size => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </Select>
//         </Flex>
//       </Flex>
//       <Spacer />
//       <Flex>
//         <Flex alignItems="center" pr="15px">
//           <Text color="white">
//             {currentPage} - {Math.ceil(totalData / pageSize)} of {totalData}
//           </Text>
//         </Flex>
//         <Flex alignItems="center" pr="4px">
//           <IconButton
//             style={{ backgroundColor: 'transparent' }}
//             icon={<ChevronLeftIcon color="white" />}
//             isDisabled={currentPage === 1}
//             onClick={() => {
//               if (currentPage !== 1) {
//                 let temp = currentPage;
//                 setCurrentPage((temp -= 1));
//               }
//             }}
//           />
//         </Flex>
//         <Flex>
//           <IconButton
//             style={{ backgroundColor: 'transparent' }}
//             icon={<ChevronRightIcon color="white" />}
//             isDisabled={currentPage === Math.ceil(totalData / pageSize)}
//             onClick={() => {
//               if (currentPage !== Math.ceil(totalData / pageSize)) {
//                 let temp = currentPage;
//                 setCurrentPage((temp += 1));
//               }
//             }}
//           />
//         </Flex>
//       </Flex>
//     </Flex>
//   );
// };
