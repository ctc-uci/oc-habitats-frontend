/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
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
  Badge,
  Avatar,
  VStack,
  HStack,
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PropTypes from 'prop-types';

// import makeData from "./makeData";
import './Table.css';

// Define a default UI for filtering
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(val => {
    setGlobalFilter(val || undefined);
  }, 200);

  return (
    <span>
      {' '}
      <input
        Icon="Search2Icon"
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Search..."
        style={{
          fontSize: '1.1rem',
          border: '1px #E2E8F0 solid',
          color: 'ochBlack',
        }}
      />
    </span>
  );
}

function createData(name, email, activeStatus, trainingStatus, lastUpdated, assignedSegments) {
  return {
    name,
    email,
    activeStatus,
    trainingStatus,
    lastUpdated,
    assignedSegments,
  };
}

// Some Test Static Data
const makeRows = [
  createData(
    'Alexander Adebayo',
    'alexander@chakra-ui.com',
    'ACTIVE',
    'In-Training',
    '01-20-2022',
    ['OC03 Sunset Beach (19th Street to Warner Ave)', 'OC19 Seal Beach (1st Street)'],
  ),
  createData('Emily Sue', 'emily@chakra-ui.com', 'ACTIVE', 'Training Complete', '01-29-2022'),
  createData('Emmerick Hopkins', 'emmerick@chakra-ui.com', 'ACTIVE', 'In-Training', '01-20-2022', [
    'OC17 Laguna Beach',
  ]),
  createData(
    'Ophelia Santiago',
    'ophelia@chakra-ui.com',
    'ACTIVE',
    'Training Complete',
    '12-20-2021',
  ),
  createData('Steve Rogers', 'steve@chakra-ui.com', 'ACTIVE', 'Training Complete', '12-27-2021'),
  createData(
    'Edward Elrich',
    'edward@chakra-ui.com',
    'INACTIVE',
    'Training Complete',
    '11-07-2021',
  ),
  createData(
    'Edward Elrich',
    'edward@chakra-ui.com',
    'INACTIVE',
    'Training Complete',
    '11-14-2021',
  ),
  createData(
    'Edward Elrich',
    'edward@chakra-ui.com',
    'INACTIVE',
    'Training Complete',
    '01-20-2022',
  ),
  createData(
    'Edward Elrich',
    'edward@chakra-ui.com',
    'INACTIVE',
    'Training Complete',
    '01-20-2022',
  ),
  createData(
    'Edward Elrich',
    'edward@chakra-ui.com',
    'INACTIVE',
    'Training Complete',
    '01-20-2022',
  ),
  createData(
    'Edward Elrich',
    'edward@chakra-ui.com',
    'INACTIVE',
    'Training Complete',
    '01-20-2022',
  ),
];

function getTrainingStatus(status) {
  return (
    <Badge className="training-badge" variant="solid" colorScheme="orange" fontSize="12px">
      {status}
    </Badge>
  );
}

function getLastUpdated(status) {
  return <div className="last-updated">{status}</div>;
}

function getAssignedSegments(status) {
  if (status != null) {
    const options = [];
    for (let i = 0; i < status.length; i += 1) {
      options.push(
        <HStack>
          <div className="segment-id" align-self="left">
            {status[i].split(' ')[0]}
          </div>
          <div className="segment-location" fontStyle="regular">
            {status[i].substring(status[i].indexOf(' ') + 1)}
          </div>
        </HStack>,
      );
    }
    return <VStack align="normal">{options}</VStack>;
  }

  return null;
}
/*
<VStack>
      <Icon viewBox='0 0 100 100' >
        <path
          fill='currentColor'
          d='M 20, 20 m -15, 0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0'
        />
      </Icon>
      <Icon viewBox='0 0 100 100' >
        <path
          fill='currentColor'
          d='M 20, 20 m -15, 0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0'
        />
      </Icon>
      <Icon viewBox='0 0 100 100' >
        <path
          fill='currentColor'
          d='M 20, 20 m -15, 0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0'
        />
      </Icon>
    </VStack>
*/
function getButton() {
  return <IconButton icon={<BsThreeDotsVertical />} position="static" />;
}

// Custom component to render TrainingStatus
const TrainingStatus = ({ value }) => {
  return getTrainingStatus(value);
};

// Custom component to render LastUpdated
const LastUpdated = ({ value }) => {
  return getLastUpdated(value);
};

// Custom component to render LastUpdated
const AssignedSegments = ({ value }) => {
  return getAssignedSegments(value);
};

const ViewEditProfile = () => {
  return getButton();
};

// Custom component to render Name
const Name = ({ value }) => {
  return (
    <>
      <div className="user-container">
        <Avatar size="md" position="static" name={value} src="something" />
        <VStack className="user-info-container">
          <div className="name-container">{`${`${value.split(' ')[0]} ${
            value.split(' ')[1]
          }`}`}</div>
          <div className="email-container">{`${value.split(' ')[2]}`}</div>

          {value.split(' ')[3] === 'In-Training' ? (
            <TrainingStatus value={`${value.split(' ')[3]}`} />
          ) : null}
        </VStack>
      </div>
    </>
  );
};

Name.propTypes = {
  value: PropTypes.string.isRequired,
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
  );

  // Render the UI for your table

  // Needs to be updated such that sorting is possible
  return (
    <>
      <div>
        <Flex justifyContent="space-between">
          <GlobalFilter
            className="search-bar"
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <div style={{ display: 'flex', justifyContent: 'right', width: '50%' }}>
            <p className="sort-by">SORT BY</p>
            <Select className="sort-options" width="30%">
              <option value="option1">Name: A-Z</option>
              <option value="option2">Name: Z-A</option>
            </Select>
          </div>
        </Flex>
      </div>
      <div className="table-container">
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th
                    className="table-head"
                    key={column.id}
                    userSelect="none"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    color="white"
                  >
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
                // eslint-disable-next-line react/no-array-index-key
                <Tr key={i} {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <Td key={row.id} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>

      <div className="footer-container" style={{ margin: 'auto' }}>
        <Flex justifyContent="space-between" m={4} alignItems="center">
          <Flex alignItems="center">
            <Text flexShrink="0">Show rows per page: </Text>{' '}
            <Select
              backgroundColor="white"
              color="#2d3748"
              ml={2}
              w={32}
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>
                  {size}
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
                backgroundColor="#2d3748"
                onClick={previousPage}
                isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Next Page">
              <IconButton
                backgroundColor="#2d3748"
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
        accessor: d => `${d.name} ${d.email} ${d.trainingStatus}`,
        // icon: <Icon as={BsFillPersonFill} mr={1} />,
        Cell: ({ cell: { value } }) => <Name value={value} />,
      },
      {
        Header: 'Last Updated',
        accessor: 'lastUpdated',
        // icon: <Icon as={AiFillTag} mr={1} />,
        Cell: ({ cell: { value } }) => <LastUpdated value={value} />,
      },
      {
        Header: 'Assigned Segment(s)',
        accessor: 'assignedSegments',
        // icon: <Icon as={AiFillTag} mr={1} />,
        Cell: ({ cell: { value } }) => <AssignedSegments value={value} />,
      },
      {
        Header: '',
        accessor: 'button',
        Cell: <ViewEditProfile />,
      },
    ],
    [],
  );

  const data = React.useMemo(() => makeRows, []);

  return <PeopleTable columns={columns} data={data} />;
}
export default App;
