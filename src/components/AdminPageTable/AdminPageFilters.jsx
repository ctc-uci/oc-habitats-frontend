// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   Flex,
//   Text,
//   Spacer,
//   Box,
//   Select,
//   InputGroup,
//   Input,
//   InputRightElement,
//   Button,
// } from '@chakra-ui/react';
// import DatePicker from 'react-datepicker';

// // set the filters when the user selects them
// const AdminPageFilters = () => {
//   return (
//     <Flex bg="#4E4E4E" pt="14px" pr="28px" pl="28px" borderTopRadius={10}>
//       <Flex alignItems="center">
//         <Text color="white">{countChecked()} Selected</Text>
//       </Flex>
//       <Spacer />
//       <Box>
//         <Select
//           backgroundColor="white"
//           color="black"
//           placeholder="Segment"
//           onChange={event => {
//             setSegmentFilter(event.target.value);
//           }}
//         >
//           {data
//             .filter(
//               (value, index, self) => self.findIndex(v => v.segment === value.segment) === index,
//             )
//             .map(val => (
//               <option key={val.segment}>{val.segment}</option>
//             ))}
//         </Select>
//       </Box>
//       <Spacer />
//       <Box>
//         <DatePicker
//           selected={dateFilter}
//           onChange={date => {
//             setDateFilter(date);
//           }}
//           dateFormat="MMMM, yyyy"
//           showMonthYearPicker
//           placeholderText="Select a month"
//           isClearable
//         />
//       </Box>
//       <Spacer />
//       <Box>
//         <Select
//           backgroundColor="white"
//           color="black"
//           placeholder="Approval"
//           onChange={event => {
//             setApprovalFilter(event.target.value);
//           }}
//         >
//           {data
//             .filter(
//               (value, index, self) => self.findIndex(v => v.approved === value.approved) === index,
//             )
//             .map(val => (
//               <option key={val.approved}>{val.approved}</option>
//             ))}
//         </Select>
//       </Box>
//       <Spacer />
//       <Box>
//         <Select
//           backgroundColor="white"
//           color="black"
//           placeholder="Status"
//           onChange={event => {
//             setStatusFilter(checkStatusBoolean(event.target.value));
//           }}
//         >
//           {data
//             .filter(
//               (value, index, self) => self.findIndex(v => v.status === value.status) === index,
//             )
//             .map(val => (
//               <option key={val.status}>{checkStatus(val.status, true)}</option>
//             ))}
//         </Select>
//       </Box>
//       <Spacer />
//       <Box>
//         <InputGroup>
//           <Input
//             bg="#FFFFFF"
//             color="#2D3748"
//             onChange={event => {
//               setSearchFilter(event.target.value);
//             }}
//           />
//           <InputRightElement w="84px">
//             <Button
//               onClick={() => {
//                 setNameFilter(searchFilter);
//               }}
//             >
//               search
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </Box>
//     </Flex>
//   );
// };

// export default AdminPageFilters;
