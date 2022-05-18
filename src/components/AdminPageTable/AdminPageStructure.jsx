import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';
import { ApplyBadge, DateFormat, Check, AllCheck, VolunteerColumn } from './AdminPageRows';

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
      id: 'submittedAt',
      Header: 'Date',
      accessor: 'submittedAt',
      Cell: ({ value }) => <DateFormat date={value} />,
    },
    {
      id: 'submitter',
      Header: 'Volunteer(s)',
      accessor: d => ({
        submitter: d.submitter,
        isSubmittedByTrainee: d.isSubmittedByTrainee,
      }),
      Cell: props => <VolunteerColumn data={props.value} />,
    },
    {
      id: 'status',
      Header: 'Approval Status',
      accessor: 'status',
      Cell: ({ value }) => <ApplyBadge approval={value} />,
    },
    {
      id: 'review',
      Header: '',
      accessor: '_id',
      disableSortBy: true,
      Cell: ({ value }) => <Button approval={value}>Review</Button>,
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
