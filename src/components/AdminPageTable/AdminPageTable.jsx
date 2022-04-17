/* eslint-disable react/jsx-key */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import { Table, Tr, Td, Tbody } from '@chakra-ui/react';
import AdminPageHeader from './AdminPageHeader';
import Pagination from './Pagination';
import CellStructure from './AdminPageStructure';
// import { ApprovalStatus, DateFormat, Check } from './AdminPageRows';

// /* eslint-disable react/destructuring-assignment, react/prop-types */
// const cellStructure = [
//   {
//     id: 'checkbox',
//     Header: <Check />,
//     accessor: 'temp',
//     Cell: () => <Check setChecked={setChecked} />,
//   },
//   {
//     id: 'segment',
//     Header: 'Segment',
//     accessor: 'generalFieldValues.surveySegment',
//     Cell: props => <p>{props.value}</p>,
//   },
//   {
//     id: 'date',
//     Header: 'Date',
//     accessor: 'submittedAt',
//     Cell: ({ value }) => <DateFormat date={value} />,
//   },
//   {
//     id: 'volunteers',
//     Header: 'Volunteer(s)',
//     accessor: d => ({
//       submitter: d.submitter,
//       partners: d.sessionPartners,
//     }),
//     Cell: props => <p>{props.value.submitter}</p>,
//   },
//   {
//     id: 'approval',
//     Header: 'Approval Status',
//     accessor: 'isApproved',
//     Cell: ({ value }) => <ApprovalStatus isApproved={value} />,
//   },
// ];
/* eslint-enable react/destructuring-assignment, react/prop-types */

const AdminPageTable = ({ tableData }) => {
  const m = new Map();
  for (let i = 0; i < tableData.length; i += 1) {
    // m.set(tableData[i]._id, false);
  }

  const [checked, setChecked] = useState(m);
  const [allChecked, setAllChecked] = useState(false);

  const columns = useMemo(() => CellStructure(checked, setChecked, allChecked, setAllChecked), []);
  const data = useMemo(() => tableData, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination,
  );

  return (
    <>
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2,
          )}
        </code>
      </pre> */}
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
      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
        previousPage={previousPage}
        nextPage={nextPage}
        totalData={rows.length}
      />
    </>
  );
};

AdminPageTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tableData: PropTypes.object.isRequired,
};

export default AdminPageTable;
