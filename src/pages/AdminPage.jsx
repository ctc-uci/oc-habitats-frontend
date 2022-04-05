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
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import './AdminPage.css';
import axios from 'axios';
// import {
//   generateReport,
//   exportSelectedLogs,
//   setReminder,
// } from '../components/AdminPageTable/AdminPageModals';

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

  const m = new Map();
  for (let i = 0; i < data.length; i += 1) {
    m.set(data[i].id, false);
  }

  const [checked, setChecked] = useState(m);

  const getSpecies = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/submissions`);
      console.log(res.data);
      setData(res.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

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
    // getSpecies();
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
                dateFormat="MMMM, yyyy"
                showMonthYearPicker
                placeholderText="Select a month"
                disabledKeyboardNavigation
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
                    title: 'Successdully Generated Report',
                    description: "You've exported {countChecked()} logs.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });
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
