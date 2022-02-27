import { React, useState } from 'react';
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
    segment: 'OC21',
    date: '11/15/2021',
    approved: 'APPROVED',
    volunteer: 'Segun Adebayo',
    status: 'IN-TRAINING',
  },
  {
    segment: 'OC20',
    date: '12/15/2021',
    approved: 'READY TO REVIEW',
    volunteer: 'Segun Adebayo',
    status: 'TRAINED',
  },
  {
    segment: 'OC09b',
    date: '01/15/2021',
    approved: 'RESUBMITTED',
    volunteer: 'Segun Adebayo',
    status: 'TRAINED',
  },
  {
    segment: 'OC16',
    date: '02/15/2021',
    approved: 'EDITS REQUESTED',
    volunteer: 'Segun Adebayo',
    status: 'IN-TRAINING',
  },
  {
    segment: 'OC16',
    date: '11/15/2021',
    approved: 'APPROVED',
    volunteer: 'Yae Miko',
    status: 'TRAINED',
  },
];

const AdminPage = () => {
  const [checked, setChecked] = useState([]);
  const [segmentFilter, setSegmentFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(new Date());
  const [approvalFilter, setApprovalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [allChecked, setAllChecked] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [searchFilter, setSearchFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  const handleAllChecked = () => {
    let newCheckedData = [...checked];
    if (allChecked) {
      newCheckedData = [];
    } else {
      newCheckedData = [...Array(dummy.length).keys()];
    }
    setAllChecked(!allChecked);
    setChecked(newCheckedData);
  };

  const createTable = m => {
    return m.map((row, index) =>
      (!segmentFilter || row.segment === segmentFilter) &&
      // (!dateFilter || row.date === dateFilter) &&
      (!approvalFilter || row.approved === approvalFilter) &&
      (!statusFilter || row.status === statusFilter) &&
      (!nameFilter || row.volunteer.toLowerCase().includes(nameFilter.toLowerCase())) ? (
        <Tr key={row.id} bg="#FBFBFB">
          <Td>
            <Checkbox
              bg="#FFFFFF"
              isChecked={checked.includes(index)}
              onChange={event => {
                if (event.target.checked) {
                  setChecked([...checked, index]);
                } else {
                  const remainingChecks = [...checked];
                  remainingChecks.splice(checked.indexOf(index), 1);
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
      ) : (
        <></>
      ),
    );
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
              onChange={date => setDateFilter(date)}
              dateFormat="MMMM, yyyy"
              showMonthYearPicker
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
                  console.log(searchFilter);
                }}
              />
              <InputRightAddon>
                <Button
                  onClick={() => {
                    setNameFilter(searchFilter);
                    console.log(nameFilter);
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
              <Th color="#FFFFFF">Segment</Th>
              <Th>DATE</Th>
              <Th>VOLUNTEER(S)</Th>
              <Th>APPROVAL STATUS</Th>
            </Tr>
          </Thead>
          <Tbody id="table-body">{createTable(dummy)}</Tbody>
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
