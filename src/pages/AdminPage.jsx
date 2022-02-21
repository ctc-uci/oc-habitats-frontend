import { React, useState } from 'react';
import { Th, Thead, Table, Td, Tr, Tbody, Heading, Checkbox, Select } from '@chakra-ui/react';
import './AdminPage.css';
import EditLogPopup from '../components/Table/EditLogPopup';

const dummy = [
  {
    segment: 'Coastal Dune',
    date: '11/15/2021',
    approved: 'yes',
    volunteer: 'Segun Adebayo',
    status: 'in-training',
  },
  {
    segment: 'Coastal Dune',
    date: '11/15/2021',
    approved: 'no',
    volunteer: 'Segun Adebayo',
    status: 'in-training',
  },
  {
    segment: 'Coastal Dune',
    date: '11/15/2021',
    approved: 'yes',
    volunteer: 'Segun Adebayo',
    status: 'in-training',
  },
  {
    segment: 'Coastal Dune',
    date: '11/15/2021',
    approved: 'yes',
    volunteer: 'Segun Adebayo',
    status: 'in-training',
  },
  {
    segment: 'Coastal Dune',
    date: '11/15/2021',
    approved: 'no',
    volunteer: 'Segun Adebayo',
    status: 'training',
  },
];

const AdminPage = () => {
  const [checked, setChecked] = useState([]);
  const [segmentFilter, setSegmentFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [approvalFilter, setApprovalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const createTable = m => {
    return m.map((row, index) =>
      (!segmentFilter || row.segment === segmentFilter) &&
      (!dateFilter || row.date === dateFilter) &&
      (!approvalFilter || row.approved === approvalFilter) &&
      (!statusFilter || row.status === statusFilter) ? (
        <Tr key={row.id} bg="#FBFBFB">
          <Td>
            <Checkbox
              bg="#FFFFFF"
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
          <Td>{row.approved}</Td>
          <Td>{row.volunteer}</Td>
          <Td>{row.status}</Td>
          <Td>
            <EditLogPopup />
          </Td>
        </Tr>
      ) : (
        <></>
      ),
    );
  };

  return (
    <div>
      <Heading>Monitor Logs</Heading>
      <Table>
        <Thead>
          <Tr id="table-head">
            <Th>{checked.length} Selected</Th>
            <Th>
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
            </Th>
            <Th>
              <Select
                backgroundColor="white"
                color="black"
                placeholder="Date"
                onChange={event => {
                  setDateFilter(event.target.value);
                }}
              >
                {dummy
                  .filter(
                    (value, index, self) => self.findIndex(v => v.date === value.date) === index,
                  )
                  .map(val => (
                    <option key={val.date}>{val.date}</option>
                  ))}
              </Select>
            </Th>
            <Th>
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
            </Th>
            <Th>
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
                    (value, index, self) =>
                      self.findIndex(v => v.status === value.status) === index,
                  )
                  .map(val => (
                    <option key={val.status}>{val.status}</option>
                  ))}
              </Select>
            </Th>
            <Th>Search Filter</Th>
          </Tr>
          <Tr id="table-head">
            <Th>
              <Checkbox bg="#FFFFFF" />
            </Th>
            <Th color="#FFFFFF">Segment</Th>
            <Th>Date</Th>
            <Th>Approved</Th>
            <Th>Volunteer</Th>
            <Th>Training Status</Th>
          </Tr>
        </Thead>
        <Tbody id="table-body">{createTable(dummy)}</Tbody>
      </Table>
    </div>
  );
};

export default AdminPage;
