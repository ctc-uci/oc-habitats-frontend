import { React, useState, useEffect } from 'react';
import {
  Th,
  Thead,
  Table,
  Td,
  Tr,
  Tbody,
  Heading,
  Checkbox,
  Select,
  InputGroup,
  InputRightElement,
  Input,
  Container,
  Text,
  Flex,
  IconButton,
  Spacer,
  HStack,
  VStack,
  Box,
  Button,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons';
import './AdminPage.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';

const dummy = [
  {
    id: 0,
    segment: 'OC21',
    date: new Date(2021, 10, 15),
    approved: 'APPROVED',
    volunteer: 'Segun Adebayo',
    status: false,
  },
];
function ascend(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

function descend(a, b) {
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
  }
  return 0;
}

function checkStatus(status, filter = false) {
  if (filter) {
    if (status) {
      return 'TRAINED';
    }
    return 'IN-TRAINING';
  }

  if (status) {
    return '';
  }
  return (
    <Badge variant="solid" colorScheme="orange">
      IN TRAINING
    </Badge>
  );
}

function checkStatusBoolean(status) {
  if (status === 'TRAINED') {
    return true;
  }
  if (status === 'IN-TRAINING') {
    return false;
  }

  return null;
}

const AdminPage = () => {
  // useStates and useEffect
  const [segmentFilter, setSegmentFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [approvalFilter, setApprovalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [allChecked, setAllChecked] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [searchFilter, setSearchFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [isSegmentAscend, setSegmentAscend] = useState(false);
  const [isDateAscend, setDateAscend] = useState(false);
  const [isVolunteerAscend, setVolunteerAscend] = useState(false);
  const [isApprovalAscend, setApprovalAscend] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(dummy);
  // const [change, setChange] = useState(true);

  const m = new Map();
  for (let i = 0; i < data.length; i += 1) {
    m.set(data[i].id, false);
  }

  const [checked, setChecked] = useState(m);

  // get data from backend
  const getSubmissions = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/submissions`);
      const submissions = res.data.map(submission => ({}));
      setData(submissions);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    getSubmissions();
  });

  let totalData;

  const countChecked = () => {
    let count = 0;
    checked.forEach(val => {
      if (val) {
        count += 1;
      }
    });
    return count;
  };

  const applyBadge = approval => {
    if (approval === 'READY TO REVIEW') {
      return (
        <Badge variant="solid" colorScheme="blue">
          {approval}
        </Badge>
      );
    }
    if (approval === 'RESUBMITTED') {
      return (
        <Badge variant="solid" colorScheme="purple">
          {approval}
        </Badge>
      );
    }
    if (approval === 'EDITS REQUESTED') {
      return (
        <Badge variant="solid" colorScheme="red">
          {approval}
        </Badge>
      );
    }

    return <Text fontSize="xs">{approval}</Text>;
  };

  const isFiltered = row => {
    return (
      (!segmentFilter || row.segment === segmentFilter) &&
      (!approvalFilter || row.approved === approvalFilter) &&
      (statusFilter == null || row.status === statusFilter) &&
      (!nameFilter || row.volunteer.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (dateFilter === null || row.date.getMonth() === dateFilter.getMonth()) &&
      (dateFilter === null || row.date.getFullYear() === dateFilter.getFullYear())
    );
  };

  const updateChangedPage = (oldSize, newSize) => {
    if (currentPage === 1) {
      return;
    }
    const cutoff = (currentPage - 1) * oldSize;
    let newPage = 1;
    let flag = true;
    while (flag) {
      if (Math.ceil(totalData / newSize) === newPage) {
        flag = false;
      } else if ((newPage - 1) * newSize <= cutoff && newPage * newSize - 1 >= cutoff) {
        flag = false;
      } else {
        newPage += 1;
      }
    }
    setCurrentPage(newPage);
  };

  const perPage = () => {
    const d = data.filter(row => isFiltered(row));
    totalData = d.length;

    if (Math.ceil(totalData / pageSize) !== currentPage) {
      return d.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize);
    }
    return data.slice(
      (currentPage - 1) * pageSize,
      (currentPage - 1) * pageSize + (totalData % pageSize),
    );
  };

  const [dataDisplay, setDataDisplay] = useState(perPage());

  useEffect(() => {
    setDataDisplay(perPage());
  }, [
    segmentFilter,
    dateFilter,
    approvalFilter,
    statusFilter,
    nameFilter,
    checked,
    currentPage,
    pageSize,
  ]);

  // handle when the "all" checkbox is selected
  const handleAllChecked = () => {
    const newCheckedData = new Map(checked);
    if (allChecked) {
      dataDisplay.forEach(row => {
        newCheckedData.set(row.id, false);
      });
    } else {
      dataDisplay.forEach(row => {
        newCheckedData.set(row.id, true);
      });
    }
    setAllChecked(!allChecked);
    setChecked(newCheckedData);
  };

  const { isOpen: isReportOpen, onOpen: onReportOpen, onClose: onReportClose } = useDisclosure();
  const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();
  const {
    isOpen: isReminderOpen,
    onOpen: onReminderOpen,
    onClose: onReminderClose,
  } = useDisclosure();
  const { isOpen: isOneTimeOpen, onOpen: onOneTimeOpen, onClose: onOneTimeClose } = useDisclosure();
  const { isOpen: isMonthlyOpen, onOpen: onMonthlyOpen, onClose: onMonthlyClose } = useDisclosure();

  const [reportDate, setReportDate] = useState(null);
  const [generate, setGenerate] = useState(true);

  const generateReport = () => {
    const toast = useToast();
    return (
      <>
        <Button onClick={onReportOpen}>Generate Report</Button>

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
                  setGenerate(false);
                  setReportDate(date);
                }}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                mr="12px"
                onClick={() => {
                  onReportClose();
                  setGenerate(true);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onReportClose();
                  setGenerate(true);
                  toast({
                    title: 'Successfully Generated Report',
                    description: `You've generated a report for ${reportDate.toLocaleString(
                      'default',
                      { month: 'long' },
                    )} ${reportDate.getFullYear()}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });
                  setReportDate(null);
                }}
                bg="#2BC0E3"
                isDisabled={generate}
              >
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

        <Modal closeOnOverlayClick={false} isOpen={isExportOpen} onClose={onExportClose} isCentered>
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
                    description: `You've exported ${count} logs.`,
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

  const setDate = (day, hour, minute) => {
    const d = new Date();
    if (d.getDate() === day) {
      if (d.getHours() > hour) {
        d.setMonth(d.getMonth() + 1);
      } else if (d.getHours() === hour && d.getMinutes() > minute) {
        d.setMonth(d.getMonth() + 1);
      }
    } else if (d.getDate() > day) {
      d.setMonth(d.getMonth() + 1);
    }
    d.setDate(day);
    d.setHours(hour);
    d.setMinutes(minute);
    return d;
  };

  const [reminderValue, setReminderValue] = useState(null);
  const [scheduleReminder, setScheduleReminder] = useState(true);

  const [oneTimeDate, setOneTimeDate] = useState(new Date());
  // const [timeAMPM, setTimeAMPM] = useState(true);

  const [monthlyReminder, setMonthlyReminder] = useState(setDate(20, 13, 0));
  const [monthlyDue, setMonthlyDue] = useState(setDate(28, 13, 0));
  const [reminderDay, setReminderDay] = useState(20);
  const [reminderTime, setReminderTime] = useState('13:00');
  const [dueDay, setDueDay] = useState(28);
  const [dueTime, setDueTime] = useState('13:00');

  const setReminder = () => {
    const toast = useToast();
    return (
      <>
        <Button onClick={onReminderOpen}>Set Reminder</Button>

        <Modal
          closeOnOverlayClick={false}
          isOpen={isReminderOpen}
          onClose={onReminderClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Schedule a Reminder</ModalHeader>
            <ModalBody>
              <Text>Would you like to...</Text>
              <RadioGroup
                onChange={e => {
                  setScheduleReminder(false);
                  setReminderValue(e);
                }}
                value={reminderValue}
              >
                <Radio value="1">Schedule a 1-time reminder</Radio>
                <Radio value="monthly" verticalAlign="baseline">
                  <Flex flexDirection="column">
                    <Text whiteSpace="nowrap">Reschedule the monthly reminder</Text>
                    <Text as="i">Monthly Reminders are currently sent on the 20th.</Text>
                    <Text as="i">Monitor Logs are currently due on the 28th.</Text>
                  </Flex>
                </Radio>
              </RadioGroup>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => {
                  setScheduleReminder(true);
                  setReminderValue(null);
                  onReminderClose();
                }}
                mr="12px"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onReminderClose();
                  if (reminderValue === '1') {
                    onOneTimeOpen();
                  } else {
                    onMonthlyOpen();
                  }
                  setReminderValue(null);
                  setScheduleReminder(true);
                }}
                bg="#2BC0E3"
                isDisabled={scheduleReminder}
              >
                Next
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          closeOnOverlayClick={false}
          isOpen={isOneTimeOpen}
          onClose={onOneTimeClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Schedule a 1-Time Reminder</ModalHeader>
            <ModalBody>
              <Text>Select a due date and time.</Text>
              <DatePicker
                selected={oneTimeDate}
                value={oneTimeDate}
                inline
                onChange={date => {
                  setGenerate(false);
                  setOneTimeDate(date);
                }}
              />
              <VStack spacing="8px" align="left">
                <Text fontWeight="500" fontSize="md">
                  Reminder Time
                </Text>
                <InputGroup>
                  <Input
                    className="without-meridiem"
                    type="time"
                    value={oneTimeDate.toLocaleDateString()}
                    onChange={e => {
                      const date = new Date(oneTimeDate);
                      date.setHours(e.target.value.slice(0, 2));
                      date.setMinutes(e.target.value.slice(3, 5));
                      setOneTimeDate(date);
                    }}
                  />
                  {/* <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setTimeAMPM(!timeAMPM)}>
                      {timeAMPM ? 'AM' : 'PM'}
                    </Button>
                  </InputRightElement> */}
                </InputGroup>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                mr="12px"
                onClick={() => {
                  setOneTimeDate(new Date());
                }}
              >
                Clear
              </Button>
              <Button
                bg="#38A169"
                color="white"
                onClick={() => {
                  onOneTimeClose();
                  toast({
                    title: `Scheduled a Reminder to Submit Monitor Logs by ${oneTimeDate.toLocaleString(
                      'default',
                      { month: 'long' },
                    )} ${oneTimeDate.getDate()} ${oneTimeDate.getFullYear()} at ${oneTimeDate.toLocaleTimeString()}!`,
                    description: `This reminder is scheduled to send on ${oneTimeDate.toLocaleString(
                      'default',
                      { month: 'long' },
                    )} ${oneTimeDate.getDate()} ${oneTimeDate.getFullYear()} at ${oneTimeDate.toLocaleTimeString()} to monitors that haven't submitted logs.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              >
                Schedule Reminder
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          closeOnOverlayClick={false}
          isOpen={isMonthlyOpen}
          onClose={onMonthlyClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Reschedule Monthly Reminder</ModalHeader>
            <ModalBody>
              <Text>
                Current Reminder Date: {monthlyReminder.getDate()} at{' '}
                {monthlyReminder.toLocaleTimeString()}
              </Text>
              <Text>
                Current Due Date: {monthlyDue.getDate()} at {monthlyDue.toLocaleTimeString()}
              </Text>
              <br />
              <Text>Reminder Date</Text>
              <Select onChange={e => setReminderDay(e)}>
                {Array.from(Array(31).keys(), n => n + 1).map(date => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </Select>
              <Text>Reminder Time</Text>
              <InputGroup>
                <Input
                  className="without-meridiem"
                  type="time"
                  value={reminderTime}
                  onChange={e => {
                    setReminderTime(e.target.value);
                  }}
                />
                {/* <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setTimeAMPM(!timeAMPM)}>
                      {timeAMPM ? 'AM' : 'PM'}
                    </Button>
                  </InputRightElement> */}
              </InputGroup>
              <br />
              <Text>Due Date</Text>
              <Select onChange={e => setDueDay(e)}>
                {Array.from(Array(31).keys(), n => n + 1).map(date => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </Select>
              <Text>Due Time</Text>
              <InputGroup>
                <Input
                  className="without-meridiem"
                  type="time"
                  value={dueTime}
                  onChange={e => {
                    setDueTime(e.target.value);
                  }}
                />
                {/* <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setTimeAMPM(!timeAMPM)}>
                      {timeAMPM ? 'AM' : 'PM'}
                    </Button>
                  </InputRightElement> */}
              </InputGroup>
            </ModalBody>

            <ModalFooter>
              <Button mr="12px" onClick={onMonthlyClose}>
                Cancel
              </Button>
              <Button
                bg="#38A169"
                color="white"
                onClick={() => {
                  onMonthlyClose();
                  setMonthlyReminder(
                    setDate(
                      reminderDay,
                      parseInt(reminderTime.slice(0, 2), 10),
                      parseInt(reminderTime.slice(3, 5), 10),
                    ),
                  );
                  setMonthlyDue(
                    setDate(
                      dueDay,
                      parseInt(dueTime.slice(0, 2), 10),
                      parseInt(dueTime.slice(3, 5), 10),
                    ),
                  );
                  toast({
                    title: `Reschedule the Monthly Due Date to ${reminderDay} at ${monthlyReminder.toLocaleTimeString()}!`,
                    description: `This reminder is scheduled to send on ${reminderDay} at ${monthlyReminder.toLocaleTimeString()} to monitors that haven't submitted logs.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });
                  toast({
                    title: `Reschedule the Monthly Due Date to ${dueDay} at ${monthlyDue.toLocaleTimeString()}!`,
                    description: `This reminder is scheduled to send on ${dueDay} at ${monthlyDue.toLocaleTimeString()} to monitors that haven't submitted logs.`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              >
                Schedule Reminder
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };

  // create the table
  const createTable = () => {
    return dataDisplay.map(row => (
      <Tr key={row.id} bg="#FBFBFB">
        <Td>
          <Checkbox
            bg="#FFFFFF"
            isChecked={checked.get(row.id)}
            onChange={event => {
              if (event.target.checked) {
                const remainingChecks = new Map(checked);
                remainingChecks.set(row.id, true);
                setChecked(remainingChecks);
              } else {
                const remainingChecks = new Map(checked);
                remainingChecks.set(row.id, false);
                setChecked(remainingChecks);
              }
            }}
          />
        </Td>
        <Td>{row.segment}</Td>
        <Td>{`${row.date.getMonth() + 1}/${row.date.getDate()}/${row.date.getFullYear()}`}</Td>
        <Td>
          <HStack>
            <Text>{row.volunteer}</Text>
            <Text>{checkStatus(row.status)}</Text>
          </HStack>
        </Td>
        <Td>{applyBadge(row.approved)}</Td>
      </Tr>
    ));
  };

  return (
    <Container maxW="container.xl">
      <div>
        <Heading mt="40px" mb="50px">
          Monitor Log Submissions
        </Heading>
        <Flex gap="24px">
          {generateReport()}
          {exportSelectedLogs(countChecked())}
          {setReminder()}
        </Flex>
        <Text font size="md" fontWeight="700px" mt="24px" mb="16px">
          Click on a column header (e.g. <span className="bold">DATE</span>) to sort by descending{' '}
          <ChevronDownIcon /> or ascending <ChevronUpIcon />. Sorting is alphanumeric for{' '}
          <span className="bold">SEGMENT</span>, <span className="bold">VOLUNTEER(S)</span>, and
          <span className="bold"> APPROVAL STATUS</span>.
        </Text>
        <Flex bg="#4E4E4E" pt="14px" pr="28px" pl="28px" borderTopRadius={10}>
          <Flex alignItems="center">
            <Text color="white">{countChecked()} Selected</Text>
          </Flex>
          <Spacer />
          <Box>
            <Select
              backgroundColor="white"
              color="black"
              placeholder="Segment"
              onChange={event => {
                setSegmentFilter(event.target.value);
              }}
            >
              {data
                .filter(
                  (value, index, self) =>
                    self.findIndex(v => v.segment === value.segment) === index,
                )
                .map(val => (
                  <option key={val.segment}>{val.segment}</option>
                ))}
            </Select>
          </Box>
          <Spacer />
          <Box>
            <DatePicker
              selected={dateFilter}
              onChange={date => {
                setDateFilter(date);
              }}
              dateFormat="MMMM, yyyy"
              showMonthYearPicker
              placeholderText="Select a month"
              isClearable
            />
          </Box>
          <Spacer />
          <Box>
            <Select
              backgroundColor="white"
              color="black"
              placeholder="Approval"
              onChange={event => {
                setApprovalFilter(event.target.value);
              }}
            >
              {data
                .filter(
                  (value, index, self) =>
                    self.findIndex(v => v.approved === value.approved) === index,
                )
                .map(val => (
                  <option key={val.approved}>{val.approved}</option>
                ))}
            </Select>
          </Box>
          <Spacer />
          <Box>
            <Select
              backgroundColor="white"
              color="black"
              placeholder="Status"
              onChange={event => {
                setStatusFilter(checkStatusBoolean(event.target.value));
              }}
            >
              {data
                .filter(
                  (value, index, self) => self.findIndex(v => v.status === value.status) === index,
                )
                .map(val => (
                  <option key={val.status}>{checkStatus(val.status, true)}</option>
                ))}
            </Select>
          </Box>
          <Spacer />
          <Box>
            <InputGroup>
              <Input
                bg="#FFFFFF"
                color="#2D3748"
                onChange={event => {
                  setSearchFilter(event.target.value);
                }}
              />
              <InputRightElement w="84px">
                <Button
                  onClick={() => {
                    setNameFilter(searchFilter);
                  }}
                >
                  search
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Flex>
        <Table w="100%" variant="striped">
          <Thead>
            <Tr id="table-head" w="parent">
              <Th>
                <Checkbox bg="#FFFFFF" onChange={handleAllChecked} />
              </Th>
              <Th color="#FFFFFF">
                <Button
                  colorScheme="#4e4e4e"
                  onClick={() => {
                    if (isSegmentAscend) {
                      const sortedData = [...dataDisplay].sort((a, b) => descend(a, b));
                      setDataDisplay(sortedData);
                    } else {
                      const sortedData = [...dataDisplay].sort((a, b) =>
                        ascend(a.segment, b.segment),
                      );
                      setDataDisplay(sortedData);
                    }
                    setSegmentAscend(!isSegmentAscend);
                  }}
                >
                  SEGMENT
                </Button>
              </Th>
              <Th>
                <Button
                  colorScheme="#4e4e4e"
                  onClick={() => {
                    if (isDateAscend) {
                      const sortedData = [...dataDisplay].sort((a, b) => descend(a.date, b.date));
                      setDataDisplay(sortedData);
                    } else {
                      const sortedData = [...dataDisplay].sort((a, b) => ascend(a.date, b.date));
                      setDataDisplay(sortedData);
                    }
                    setDateAscend(!isDateAscend);
                  }}
                >
                  DATE
                </Button>
              </Th>
              <Th>
                <Button
                  colorScheme="#4e4e4e"
                  onClick={() => {
                    if (isVolunteerAscend) {
                      const sortedData = [...dataDisplay].sort((a, b) =>
                        descend(a.volunteer, b.volunteer),
                      );
                      setDataDisplay(sortedData);
                    } else {
                      const sortedData = [...dataDisplay].sort((a, b) =>
                        ascend(a.volunteer, b.volunteer),
                      );
                      setDataDisplay(sortedData);
                    }
                    setVolunteerAscend(!isVolunteerAscend);
                  }}
                >
                  VOLUNTEER(S)
                </Button>
              </Th>
              <Th>
                <Button
                  colorScheme="#4e4e4e"
                  onClick={() => {
                    if (isApprovalAscend) {
                      const sortedData = [...dataDisplay].sort((a, b) =>
                        descend(a.approved, b.approved),
                      );
                      setDataDisplay(sortedData);
                    } else {
                      const sortedData = [...dataDisplay].sort((a, b) =>
                        ascend(a.approved, b.approved),
                      );
                      setDataDisplay(sortedData);
                    }
                    setApprovalAscend(!isApprovalAscend);
                  }}
                >
                  APPROVAL STATUS
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody id="table-body">{createTable()}</Tbody>
        </Table>
        <Flex
          bg="#4E4E4E"
          alignItems="center"
          pl="24px"
          pt="8px"
          pb="8px"
          pr="24px"
          borderBottomRadius={10}
        >
          <Flex alignItems="center">
            <Flex pr="8px">
              <Text color="white">Show rows per page</Text>
            </Flex>
            <Flex>
              <Select
                value={pageSize}
                onChange={e => {
                  const oldSize = pageSize;
                  const newSize = parseInt(e.target.value, 10);
                  setPageSize(newSize);
                  updateChangedPage(oldSize, newSize);
                }}
                bg="white"
                w="75px"
              >
                {[10, 20, 30, 40, 50].map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
          <Spacer />
          <Flex>
            <Flex alignItems="center" pr="15px">
              <Text color="white">
                {currentPage} - {Math.ceil(totalData / pageSize)} of {totalData}
              </Text>
            </Flex>
            <Flex alignItems="center" pr="4px">
              <IconButton
                style={{ backgroundColor: 'transparent' }}
                icon={<ChevronLeftIcon color="white" />}
                isDisabled={currentPage === 1}
                onClick={() => {
                  if (currentPage !== 1) {
                    let temp = currentPage;
                    setCurrentPage((temp -= 1));
                  }
                }}
              />
            </Flex>
            <Flex>
              <IconButton
                style={{ backgroundColor: 'transparent' }}
                icon={<ChevronRightIcon color="white" />}
                isDisabled={currentPage === Math.ceil(totalData / pageSize)}
                onClick={() => {
                  if (currentPage !== Math.ceil(totalData / pageSize)) {
                    let temp = currentPage;
                    setCurrentPage((temp += 1));
                  }
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Container>
  );
};

export default AdminPage;
