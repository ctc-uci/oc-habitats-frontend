import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@chakra-ui/react';

const STATUS_MAP = {
  UNDER_REVIEW: ['blue', 'READY TO REVIEW'],
  EDITS_REQUESTED: ['red', 'EDITS REQUESTED'],
  APPROVED: ['green', 'APPROVED'],
  UNSUBMITTED: ['gray', 'DRAFT'],
  RESUBMITTED: ['purple', 'RESUBMITTED'],
};

const SubmissionStatusBadge = ({ status }) => {
  if (STATUS_MAP[status] !== undefined) {
    const [color, text] = STATUS_MAP[status];
    return (
      <Badge variant="solid" colorScheme={color}>
        {text}
      </Badge>
    );
  }
  return <Badge variant="solid">{status}</Badge>;
};

SubmissionStatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export { SubmissionStatusBadge, STATUS_MAP };
