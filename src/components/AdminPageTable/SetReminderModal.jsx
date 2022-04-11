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
//   RadioGroup,
//   Radio,
//   Flex,
//   InputGroup,
//   Input,
//   VStack,
//   Select,
// } from '@chakra-ui/react';
// import DatePicker from 'react-datepicker';

// // modal for the set reminder button
// const SetReminderModal = () => {
//   const toast = useToast();
//   return (
//     <>
//       <Button onClick={onReminderOpen}>Set Reminder</Button>

//       <Modal
//         closeOnOverlayClick={false}
//         isOpen={isReminderOpen}
//         onClose={onReminderClose}
//         isCentered
//       >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Schedule a Reminder</ModalHeader>
//           <ModalBody>
//             <Text>Would you like to...</Text>
//             <RadioGroup
//               onChange={e => {
//                 setScheduleReminder(false);
//                 setReminderValue(e);
//               }}
//               value={reminderValue}
//             >
//               <Radio value="1">Schedule a 1-time reminder</Radio>
//               <Radio value="monthly" verticalAlign="baseline">
//                 <Flex flexDirection="column">
//                   <Text whiteSpace="nowrap">Reschedule the monthly reminder</Text>
//                   <Text as="i">Monthly Reminders are currently sent on the 20th.</Text>
//                   <Text as="i">Monitor Logs are currently due on the 28th.</Text>
//                 </Flex>
//               </Radio>
//             </RadioGroup>
//           </ModalBody>

//           <ModalFooter>
//             <Button
//               onClick={() => {
//                 setScheduleReminder(true);
//                 setReminderValue(null);
//                 onReminderClose();
//               }}
//               mr="12px"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={() => {
//                 onReminderClose();
//                 if (reminderValue === '1') {
//                   onOneTimeOpen();
//                 } else {
//                   onMonthlyOpen();
//                 }
//                 setReminderValue(null);
//                 setScheduleReminder(true);
//               }}
//               bg="#2BC0E3"
//               isDisabled={scheduleReminder}
//             >
//               Next
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       <Modal closeOnOverlayClick={false} isOpen={isOneTimeOpen} onClose={onOneTimeClose} isCentered>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Schedule a 1-Time Reminder</ModalHeader>
//           <ModalBody>
//             <Text>Select a due date and time.</Text>
//             <DatePicker
//               selected={oneTimeDate}
//               value={oneTimeDate}
//               inline
//               onChange={date => {
//                 setGenerate(false);
//                 setOneTimeDate(date);
//               }}
//             />
//             <VStack spacing="8px" align="left">
//               <Text fontWeight="500" fontSize="md">
//                 Reminder Time
//               </Text>
//               <InputGroup>
//                 <Input
//                   className="without-meridiem"
//                   type="time"
//                   value={oneTimeDate.toLocaleDateString()}
//                   onChange={e => {
//                     const date = new Date(oneTimeDate);
//                     date.setHours(e.target.value.slice(0, 2));
//                     date.setMinutes(e.target.value.slice(3, 5));
//                     setOneTimeDate(date);
//                   }}
//                 />
//                 {/* <InputRightElement width="4.5rem">
//                   <Button h="1.75rem" size="sm" onClick={() => setTimeAMPM(!timeAMPM)}>
//                     {timeAMPM ? 'AM' : 'PM'}
//                   </Button>
//                 </InputRightElement> */}
//               </InputGroup>
//             </VStack>
//           </ModalBody>

//           <ModalFooter>
//             <Button
//               mr="12px"
//               onClick={() => {
//                 setOneTimeDate(new Date());
//               }}
//             >
//               Clear
//             </Button>
//             <Button
//               bg="#38A169"
//               color="white"
//               onClick={() => {
//                 onOneTimeClose();
//                 toast({
//                   title: `Scheduled a Reminder to Submit Monitor Logs by ${oneTimeDate.toLocaleString(
//                     'default',
//                     { month: 'long' },
//                   )} ${oneTimeDate.getDate()} ${oneTimeDate.getFullYear()} at ${oneTimeDate.toLocaleTimeString()}!`,
//                   description: `This reminder is scheduled to send on ${oneTimeDate.toLocaleString(
//                     'default',
//                     { month: 'long' },
//                   )} ${oneTimeDate.getDate()} ${oneTimeDate.getFullYear()} at ${oneTimeDate.toLocaleTimeString()} to monitors that haven't submitted logs.`,
//                   status: 'success',
//                   duration: 5000,
//                   isClosable: true,
//                 });
//               }}
//             >
//               Schedule Reminder
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       <Modal closeOnOverlayClick={false} isOpen={isMonthlyOpen} onClose={onMonthlyClose} isCentered>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Reschedule Monthly Reminder</ModalHeader>
//           <ModalBody>
//             <Text>
//               Current Reminder Date: {monthlyReminder.getDate()} at{' '}
//               {monthlyReminder.toLocaleTimeString()}
//             </Text>
//             <Text>
//               Current Due Date: {monthlyDue.getDate()} at {monthlyDue.toLocaleTimeString()}
//             </Text>
//             <br />
//             <Text>Reminder Date</Text>
//             <Select onChange={e => setReminderDay(e)}>
//               {Array.from(Array(31).keys(), n => n + 1).map(date => (
//                 <option key={date} value={date}>
//                   {date}
//                 </option>
//               ))}
//             </Select>
//             <Text>Reminder Time</Text>
//             <InputGroup>
//               <Input
//                 className="without-meridiem"
//                 type="time"
//                 value={reminderTime}
//                 onChange={e => {
//                   setReminderTime(e.target.value);
//                 }}
//               />
//               {/* <InputRightElement width="4.5rem">
//                   <Button h="1.75rem" size="sm" onClick={() => setTimeAMPM(!timeAMPM)}>
//                     {timeAMPM ? 'AM' : 'PM'}
//                   </Button>
//                 </InputRightElement> */}
//             </InputGroup>
//             <br />
//             <Text>Due Date</Text>
//             <Select onChange={e => setDueDay(e)}>
//               {Array.from(Array(31).keys(), n => n + 1).map(date => (
//                 <option key={date} value={date}>
//                   {date}
//                 </option>
//               ))}
//             </Select>
//             <Text>Due Time</Text>
//             <InputGroup>
//               <Input
//                 className="without-meridiem"
//                 type="time"
//                 value={dueTime}
//                 onChange={e => {
//                   setDueTime(e.target.value);
//                 }}
//               />
//               {/* <InputRightElement width="4.5rem">
//                   <Button h="1.75rem" size="sm" onClick={() => setTimeAMPM(!timeAMPM)}>
//                     {timeAMPM ? 'AM' : 'PM'}
//                   </Button>
//                 </InputRightElement> */}
//             </InputGroup>
//           </ModalBody>

//           <ModalFooter>
//             <Button mr="12px" onClick={onMonthlyClose}>
//               Cancel
//             </Button>
//             <Button
//               bg="#38A169"
//               color="white"
//               onClick={() => {
//                 onMonthlyClose();
//                 setMonthlyReminder(
//                   setDate(
//                     reminderDay,
//                     parseInt(reminderTime.slice(0, 2), 10),
//                     parseInt(reminderTime.slice(3, 5), 10),
//                   ),
//                 );
//                 setMonthlyDue(
//                   setDate(
//                     dueDay,
//                     parseInt(dueTime.slice(0, 2), 10),
//                     parseInt(dueTime.slice(3, 5), 10),
//                   ),
//                 );
//                 toast({
//                   title: `Reschedule the Monthly Due Date to ${reminderDay} at ${monthlyReminder.toLocaleTimeString()}!`,
//                   description: `This reminder is scheduled to send on ${reminderDay} at ${monthlyReminder.toLocaleTimeString()} to monitors that haven't submitted logs.`,
//                   status: 'success',
//                   duration: 5000,
//                   isClosable: true,
//                 });
//                 toast({
//                   title: `Reschedule the Monthly Due Date to ${dueDay} at ${monthlyDue.toLocaleTimeString()}!`,
//                   description: `This reminder is scheduled to send on ${dueDay} at ${monthlyDue.toLocaleTimeString()} to monitors that haven't submitted logs.`,
//                   status: 'success',
//                   duration: 5000,
//                   isClosable: true,
//                 });
//               }}
//             >
//               Schedule Reminder
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default SetReminderModal;
