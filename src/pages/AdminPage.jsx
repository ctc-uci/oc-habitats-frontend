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
  InputRightAddon,
  Input,
  Container,
  Text,
  Flex,
  IconButton,
  Spacer,
  HStack,
  Box,
  Button,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import './AdminPage.css';

const dummy = [
  {
    id: 0,
    segment: 'OC21',
    date: '11/15/2021',
    approved: 'APPROVED',
    volunteer: 'Segun Adebayo',
    status: 'IN-TRAINING',
  },
  {
    id: 1,
    segment: 'OC20',
    date: '12/15/2021',
    approved: 'READY TO REVIEW',
    volunteer: 'Segun Adebayo',
    status: 'TRAINED',
  },
  {
    id: 2,
    segment: 'OC09b',
    date: '03/15/2022',
    approved: 'RESUBMITTED',
    volunteer: 'Yae Miko',
    status: 'TRAINED',
  },
  {
    id: 3,
    segment: 'OC21',
    date: '03/14/2022',
    approved: 'APPROVED',
    volunteer: 'Segun Adebayo',
    status: 'IN-TRAINING',
  },
  {
    id: 4,
    segment: 'OC16',
    date: '02/15/2021',
    approved: 'EDITS REQUESTED',
    volunteer: 'Segun Adebayo',
    status: 'IN-TRAINING',
  },
  {
    id: 5,
    segment: 'OC16',
    date: '11/15/2021',
    approved: 'APPROVED',
    volunteer: 'Yae Miko',
    status: 'TRAINED',
  },
];

function segmentAscend(a, b) {
  if (a.segment < b.segment) {
    return -1;
  }
  if (a.segment > b.segment) {
    return 1;
  }
  return 0;
}

function segmentDescend(a, b) {
  if (a.segment > b.segment) {
    return -1;
  }
  if (a.segment < b.segment) {
    return 1;
  }
  return 0;
}

function dateAscend(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

function dateDescend(a, b) {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
}

function volunteerAscend(a, b) {
  if (a.volunteer < b.volunteer) {
    return -1;
  }
  if (a.volunteer > b.volunteer) {
    return 1;
  }
  return 0;
}

function volunteerDescend(a, b) {
  if (a.volunteer > b.volunteer) {
    return -1;
  }
  if (a.volunteer < b.volunteer) {
    return 1;
  }
  return 0;
}

function approvalAscend(a, b) {
  if (a.approved < b.approved) {
    return -1;
  }
  if (a.approved > b.approved) {
    return 1;
  }
  return 0;
}

function approvalDescend(a, b) {
  if (a.approved > b.approved) {
    return -1;
  }
  if (a.approved < b.approved) {
    return 1;
  }
  return 0;
}

const AdminPage = () => {
  const m = new Map();
  for (let i = 0; i < dummy.length; i += 1) {
    m.set(dummy[i].id, false);
  }

  // useStates and useEffect
  const [checked, setChecked] = useState(m);
  const [segmentFilter, setSegmentFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [approvalFilter, setApprovalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [allChecked, setAllChecked] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [searchFilter, setSearchFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [isSegmentAscend, setSegmentAscend] = useState(false);
  const [isDateAscend, setDateAscend] = useState(false);
  const [isVolunteerAscend, setVolunteerAscend] = useState(false);
  const [isApprovalAscend, setApprovalAscend] = useState(false);

  const isFiltered = row => {
    return (
      (!segmentFilter || row.segment === segmentFilter) &&
      // (!dateFilter || row.date === dateFilter) &&
      (!approvalFilter || row.approved === approvalFilter) &&
      (!statusFilter || row.status === statusFilter) &&
      (!nameFilter || row.volunteer.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (dateFilter === null ||
        parseInt([...row.date].splice(0, 2).join(''), 10) - 1 === dateFilter.getMonth()) &&
      (dateFilter === null ||
        parseInt([...row.date].splice(-4).join(''), 10) === dateFilter.getFullYear())
    );
  };

  const [dataDisplay, setDataDisplay] = useState(dummy.filter(row => isFiltered(row)));

  useEffect(() => {
    setDataDisplay(dummy.filter(row => isFiltered(row)));
  }, [segmentFilter, dateFilter, approvalFilter, statusFilter]);

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
        <Td>{row.date}</Td>
        <Td>
          <HStack>
            <Text>{row.volunteer}</Text>
            <Text>{row.status}</Text>
          </HStack>
        </Td>
        <Td>{row.approved}</Td>
      </Tr>
    ));
  };

  return (
    <Container maxW="container.xl">
      <div>
        <Heading>Monitor Logs</Heading>
        <Flex bg="#4E4E4E" pt="2" pr="3" pl="3">
          <Box>
            <Text color="white">{checked.length} Selected</Text>
          </Box>
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
              {dummy
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
              {dummy
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
                setStatusFilter(event.target.value);
              }}
            >
              {dummy
                .filter(
                  (value, index, self) => self.findIndex(v => v.status === value.status) === index,
                )
                .map(val => (
                  <option key={val.status}>{val.status}</option>
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
              <InputRightAddon>
                <Button
                  onClick={() => {
                    setNameFilter(searchFilter);
                  }}
                >
                  search
                </Button>
              </InputRightAddon>
            </InputGroup>
          </Box>
        </Flex>
        <Table w="100%">
          <Thead>
            <Tr id="table-head" w="parent">
              <Th>
                <Checkbox bg="#FFFFFF" onChange={handleAllChecked} />
              </Th>
              <Th color="#FFFFFF">
                <Button
                  colorScheme="#4e4e4e"
                  variant="link"
                  onClick={() => {
                    if (isSegmentAscend) {
                      const sortedData = [...dataDisplay].sort((a, b) => segmentDescend(a, b));
                      setDataDisplay(sortedData);
                    } else {
                      const sortedData = [...dataDisplay].sort((a, b) => segmentAscend(a, b));
                      setDataDisplay(sortedData);
                    }
                    setSegmentAscend(!isSegmentAscend);
                  }}
                >
                  Segment
                </Button>
              </Th>
              <Th>
                <Button
                  colorScheme="#4e4e4e"
                  variant="link"
                  onClick={() => {
                    if (isDateAscend) {
                      const sortedData = [...dataDisplay].sort((a, b) => dateDescend(a, b));
                      setDataDisplay(sortedData);
                    } else {
                      const sortedData = [...dataDisplay].sort((a, b) => dateAscend(a, b));
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
                  variant="link"
                  onClick={() => {
                    if (isVolunteerAscend) {
                      const sortedData = [...dataDisplay].sort((a, b) => volunteerDescend(a, b));
                      setDataDisplay(sortedData);
                    } else {
                      const sortedData = [...dataDisplay].sort((a, b) => volunteerAscend(a, b));
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
                  variant="link"
                  onClick={() => {
                    if (isApprovalAscend) {
                      const sortedData = [...dataDisplay].sort((a, b) => approvalDescend(a, b));
                      setDataDisplay(sortedData);
                    } else {
                      const sortedData = [...dataDisplay].sort((a, b) => approvalAscend(a, b));
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
        <Flex bg="#4E4E4E" alignItems="center" p={1}>
          <Text color="white">Show rows per page</Text>
          <Select
            value={pageSize}
            onChange={e => {
              setPageSize(e.target.value);
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
          <Spacer />
          <IconButton icon={<ChevronLeftIcon />} />
          <IconButton icon={<ChevronRightIcon />} />
        </Flex>
      </div>
    </Container>
  );
};

export default AdminPage;
