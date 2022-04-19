/* eslint-disable react/jsx-key */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import { Table, Tr, Td, Tbody } from '@chakra-ui/react';
import AdminPageHeader from './AdminPageHeader';
import Pagination from './Pagination';
import CellStructure from './AdminPageStructure';

/* eslint-enable react/destructuring-assignment, react/prop-types */

const AdminPageTable = ({ tableData }) => {
  const m = new Map();
  for (let i = 0; i < tableData.length; i += 1) {
    // eslint-disable-next-line dot-notation
    m.set(tableData[i]['_id'], false);
  }

  console.log(tableData);

  const [checked, setChecked] = useState(m);
  const [allChecked, setAllChecked] = useState(false);

  const columns = useMemo(
    () => CellStructure(checked, setChecked, allChecked, setAllChecked),
    [checked, setChecked, allChecked, setAllChecked],
  );
  // const data = useMemo(() => tableData, []);
  const data = tableData;

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

  console.log(`Columns: ${columns}`);
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
        <AdminPageHeader headerGroups={headerGroups} checked={checked} />
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
  tableData: PropTypes.array.isRequired,
};

export default AdminPageTable;
