import React from 'react';
import PropTypes from 'prop-types';
import { chakra, Button } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { DateFormat, Check, AllCheck, VolunteerColumn } from './AdminPageRows';
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
      id: 'date',
      Header: 'Log Date',
      accessor: 'date',
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
      Cell: ({ value }) => <SubmissionStatusBadge status={value} />,
    },
    {
      id: 'review',
      Header: '',
      accessor: '_id',
      disableSortBy: true,
      Cell: ({ value }) => (
        <Link to={`/review-log/${value}`}>
          <Button bg="transparent" approval={value}>
            Review{' '}
            <chakra.span ml="2">
              <FiArrowRight />
            </chakra.span>
          </Button>
        </Link>
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
