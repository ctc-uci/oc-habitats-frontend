import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';
import { DateFormat, Check, AllCheck, Partners, EditButton } from './VolunteerLogsRows';
import { SubmissionStatusBadge } from '../../common/SubmissionStatusBadge';

const CellStructure = (checked, setChecked, allChecked, setAllChecked) => {
  /* eslint-disable react/destructuring-assignment, react/prop-types */
  const cellStructure = [
    {
      id: 'checkbox',
      Header: (
        <AllCheck
          checked={checked}
          setChecked={setChecked}
          allChecked={allChecked}
          setAllChecked={setAllChecked}
        />
      ),
      accessor: '_id',
      disableSortBy: true,
      Cell: ({ value }) => <Check checked={checked} setChecked={setChecked} id={value} />,
    },
    {
      id: 'segment',
      Header: 'Segment',
      accessor: 'segment.segmentId',
      Cell: props => <p>{props.value}</p>,
    },
    {
      id: 'segmentName',
      Header: 'Segment Name',
      accessor: 'segment.name',
      Cell: props => <p>{props.value}</p>,
    },
    {
      id: 'date',
      Header: 'Log Date',
      accessor: 'date',
      Cell: ({ value }) => <DateFormat date={value} />,
    },
    {
      id: 'status',
      Header: 'Approval Status',
      accessor: 'status',
      minWidth: 100,
      Cell: ({ value }) => <SubmissionStatusBadge status={value} />,
    },
    {
      id: 'partners',
      Header: 'Monitor Partners',
      accessor: 'sessionPartners',
      disableSortBy: true,
      Cell: props => (props.value ? <Partners sessionPartners={props.value} /> : ''),
    },
    {
      id: 'edit',
      Header: '',
      accessor: '_id',
      disableSortBy: true,
      Cell: props => (
        <EditButton logId={props.row.original._id} approval={props.row.original.status} />
      ),
    },
    {
      // combined approval status and edit for mobile table
      id: 'statusAndEdit',
      Header: 'Approval Status',
      accessor: 'status',
      disableSortBy: true,
      Cell: props => (
        <Flex direction="row" justify="space-between" align="center">
          <SubmissionStatusBadge status={props.row.original.status} />
          <EditButton logId={props.row.original._id} approval={props.row.original.status} />
        </Flex>
      ),
    },
  ];
  return cellStructure;
};

CellStructure.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  checked: PropTypes.object.isRequired,
  setChecked: PropTypes.func.isRequired,
  allChecked: PropTypes.bool.isRequired,
  setAllChecked: PropTypes.func.isRequired,
};

export default CellStructure;
