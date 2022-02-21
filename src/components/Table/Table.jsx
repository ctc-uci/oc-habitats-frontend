import React from 'react';
import {
  useTable,
  usePagination,
  useFilters,
  useSortBy,
  useRowSelect,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  // Tfoot,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  Icon,
  Badge,
  Avatar,
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { BsFillClockFill, BsFillPersonFill } from 'react-icons/bs';
import { AiFillTag } from 'react-icons/ai';

// import makeData from "./makeData";
import './App.css';

// Define a default UI for filtering
function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  );
}

function createData(name, email, activeStatus, trainingStatus) {
  return {
    name,
    email,
    activeStatus,
    trainingStatus,
  };
}

// Some Test Static Data
const makeRows = [
  createData('Alexander Adebayo', 'alexander@chakra-ui.com', 'ACTIVE', 'In-Training'),
  createData('Emily Sue', 'emily@chakra-ui.com', 'ACTIVE', 'Training Complete'),
  createData('Emmerick Hopkins', 'emmerick@chakra-ui.com', 'ACTIVE', 'In-Training'),
  createData('Ophelia Santiago', 'ophelia@chakra-ui.com', 'ACTIVE', 'Training Complete'),
  createData('Steve Rogers', 'steve@chakra-ui.com', 'ACTIVE', 'Training Complete'),
  createData('Edward Elrich', 'edward@chakra-ui.com', 'INACTIVE', 'Training Complete'),
  createData('Edward Elrich', 'edward@chakra-ui.com', 'INACTIVE', 'Training Complete'),
  createData('Edward Elrich', 'edward@chakra-ui.com', 'INACTIVE', 'Training Complete'),
  createData('Edward Elrich', 'edward@chakra-ui.com', 'INACTIVE', 'Training Complete'),
  createData('Edward Elrich', 'edward@chakra-ui.com', 'INACTIVE', 'Training Complete'),
  createData('Edward Elrich', 'edward@chakra-ui.com', 'INACTIVE', 'Training Complete'),
];

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

function getActiveStatus(status) {
  if (status === 'ACTIVE') {
    return (
      <Badge variant="solid" colorScheme="green">
        {status}
      </Badge>
    );
  }
  return <Badge variant="solid">{status}</Badge>;
}

function getTrainingStatus(status) {
  if (status === 'In-Training') {
    return (
      <Badge variant="solid" colorScheme="orange">
        {status}
      </Badge>
    );
  }
  return (
    <Badge variant="solid" colorScheme="purple">
      {status}
    </Badge>
  );
}

// Custom component to render ActiveStatus
const ActiveStatus = ({ value }) => {
  return getActiveStatus(value);
};

// Custom component to render TrainingStatus
const TrainingStatus = ({ value }) => {
  return getTrainingStatus(value);
};

// Custom component to render Name
const Name = ({ value }) => {
  return (
    <>
      <div className="user-container">
        <Avatar size="md" name={`${value}`} src="something" />

        <div className="name-container">{`${value}`}</div>
      </div>
    </>
  );
};

function PeopleTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // used instead of rows
    canPreviousPage,
    canNextPage,
    // pageOptions,
    rows,
    // pageCount,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
    visibleColumns,
    // selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
      },
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
  );

  // Render the UI for your table
  return (
    <>
      <div className="table-container">
        <Table {...getTableProps()}>
          <Thead>
            <tr>
              <th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: 'left',
                }}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th userSelect="none" {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <Flex alignItems="center">
                      {column.icon}
                      {column.render('Header')}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ChevronDownIcon ml={1} w={4} h={4} />
                        ) : (
                          <ChevronUpIcon ml={1} w={4} h={4} />
                        )
                      ) : (
                        ''
                      )}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>

      <div className="footer-container">
        <Flex justifyContent="space-between" m={4} alignItems="center">
          <Flex alignItems="center">
            <Text flexShrink="0">Show rows per page: </Text>{' '}
            <Select
              ml={2}
              w={32}
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              <Text fontWeight="bold" as="span">
                {1}-{pageSize * (pageIndex + 1) + 1}
              </Text>{' '}
              of <Text as="span">{rows.length}</Text>
            </Text>
            <Tooltip label="Previous Page">
              <IconButton
                onClick={previousPage}
                isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Next Page">
              <IconButton
                onClick={nextPage}
                isDisabled={!canNextPage}
                icon={<ChevronRightIcon h={6} w={6} />}
                ml={4}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </div>
    </>
  );
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: d => `${d.name} ${d.email}`,
        icon: <Icon as={BsFillPersonFill} mr={1} />,
        Cell: ({ cell: { value } }) => <Name value={value} />,
      },
      // {
      //   Header: "Email",
      //   accessor: "email"
      // },
      {
        Header: 'Active Status',
        accessor: 'activeStatus',
        icon: <Icon as={BsFillClockFill} mr={1} />,
        Cell: ({ cell: { value } }) => <ActiveStatus value={value} />,
      },
      {
        Header: 'Training Status',
        accessor: 'trainingStatus',
        icon: <Icon as={AiFillTag} mr={1} />,
        Cell: ({ cell: { value } }) => <TrainingStatus value={value} />,
      },
    ],
    [],
  );

  const data = React.useMemo(() => makeRows, []);

  return <PeopleTable columns={columns} data={data} />;
}
export default App;
