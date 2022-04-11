/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import { Table, Tr, Td, Checkbox, HStack, Text, Tbody } from '@chakra-ui/react';
import AdminPageHeader from './AdminPageHeader';

/* eslint-disable react/destructuring-assignment, react/prop-types */
const cellStructure = [
  {
    id: 'checkbox',
    Header: <Checkbox bg="#FFFFFF" />,
    accessor: 'temp',
    Cell: () => <Checkbox bg="#FFFFFF" />,
  },
  {
    id: 'segment',
    Header: 'Segment',
    accessor: 'generalFieldValues.surveySegment',
    Cell: props => <p>{props.value}</p>,
  },
  {
    id: 'date',
    Header: 'Date',
    accessor: 'submittedAt',
    Cell: props => <p>{props.value}</p>,
  },
  {
    id: 'volunteers',
    Header: 'Volunteer(s)',
    accessor: d => ({
      submitter: d.submitter,
      partners: d.sessionPartners,
    }),
    Cell: props => <p>{props.value.submitter}</p>,
  },
  {
    id: 'approval',
    Header: 'Approval Status',
    accessor: 'isApproved',
    Cell: props => <p> {props.value} </p>,
  },
];
/* eslint-enable react/destructuring-assignment, react/prop-types */

const AdminPageTable = ({ tableData }) => {
  const columns = useMemo(() => cellStructure, []);
  const data = useMemo(() => tableData, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <Table variant="striped" {...getTableProps()}>
      <AdminPageHeader headerGroups={headerGroups} />
      <Tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <Td fontSize="14px" key={row.id} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

AdminPageTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tableData: PropTypes.object.isRequired,
};

export default AdminPageTable;
