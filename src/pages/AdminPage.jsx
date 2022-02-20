import { React } from 'react';
import { Th, Thead, Table, Td, Tr, Tbody, Heading, Checkbox } from '@chakra-ui/react';
import './AdminPage.css';

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
  const createTable = m => {
    return m.map(row => (
      <Tr bg="#FBFBFB" key={row.id}>
        <Td>
          <Checkbox bg="#FFFFFF" />
        </Td>
        <Td>{row.segment}</Td>
        <Td>{row.date}</Td>
        <Td>{row.approved}</Td>
        <Td>{row.volunteer}</Td>
        <Td>{row.status}</Td>
      </Tr>
    ));
  };

  return (
    <div>
      <Heading>Monitor Logs</Heading>
      <Table>
        <Thead>
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
