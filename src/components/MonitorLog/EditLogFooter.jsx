import { ButtonGroup, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const EditLogFooter = ({ editForm, formMethods, submissionId }) => {
  return (
    <>
      <ButtonGroup>
        <Link to={`/review-log/${submissionId}`}>
          <Button
            variant="outline"
            color="white"
            _hover={{ color: 'black', backgroundColor: 'gray.200' }}
          >
            Exit Edit Mode
          </Button>
        </Link>
        <Button
          colorScheme="cyan"
          type="submit"
          onClick={() => {
            formMethods.setValue('status', 'RESUBMITTED');
            editForm();
          }}
        >
          {/* {prefilledData !== undefined ? 'Save' : 'Add'} to Tracker */}
          Save Changes
        </Button>
      </ButtonGroup>
    </>
  );
};

EditLogFooter.propTypes = {
  submissionId: PropTypes.string.isRequired,
  editForm: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formMethods: PropTypes.object.isRequired,
};

export default EditLogFooter;
